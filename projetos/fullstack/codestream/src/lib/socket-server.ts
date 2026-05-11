import { Server as SocketIOServer, Socket } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import { createClient } from 'redis'
import { createAdapter } from '@socket.io/redis-adapter'

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserInfo {
  id: string
  username: string
  color: string  // hex color for cursor
  isGuest: boolean
}

interface CursorPosition {
  lineNumber: number
  column: number
}

interface CursorSelection {
  startLineNumber: number
  startColumn: number
  endLineNumber: number
  endColumn: number
}

interface CodeChangePayload {
  roomId: string
  value: string         // full document value
  changeEvent?: object  // Monaco IModelContentChangedEvent for OT
}

interface CursorPayload {
  roomId: string
  position: CursorPosition
  selection: CursorSelection | null
}

interface MessagePayload {
  roomId: string
  text: string
}

// Room state kept in Redis
interface RoomState {
  code: string
  language: string
  members: Record<string, UserInfo>
}

// ─── Redis helpers ────────────────────────────────────────────────────────────

const ROOM_KEY = (roomId: string) => `codestream:room:${roomId}`
const ROOM_TTL = 60 * 60 * 24 // 24 hours

async function getRoomState(
  redis: ReturnType<typeof createClient>,
  roomId: string
): Promise<RoomState | null> {
  const raw = await redis.get(ROOM_KEY(roomId))
  return raw ? (JSON.parse(raw) as RoomState) : null
}

async function setRoomState(
  redis: ReturnType<typeof createClient>,
  roomId: string,
  state: RoomState
): Promise<void> {
  await redis.setEx(ROOM_KEY(roomId), ROOM_TTL, JSON.stringify(state))
}

// ─── In-memory fallback (quando Redis não está disponível) ───────────────────

const memoryStore = new Map<string, RoomState>()

// ─── Socket.io server setup ──────────────────────────────────────────────────

export async function createSocketServer(httpServer: HTTPServer) {
  let redisAvailable = false
  let pubClient: ReturnType<typeof createClient> | null = null
  let subClient: ReturnType<typeof createClient> | null = null
  let stateClient: ReturnType<typeof createClient> | null = null

  if (process.env.REDIS_URL) {
    try {
      pubClient = createClient({ url: process.env.REDIS_URL })
      subClient = pubClient.duplicate()
      stateClient = pubClient.duplicate()
      await Promise.all([pubClient.connect(), subClient.connect(), stateClient.connect()])
      redisAvailable = true
      console.log('[Socket.io] Redis conectado')
    } catch {
      console.warn('[Socket.io] Redis indisponível — usando memória local')
      pubClient = subClient = stateClient = null
    }
  } else {
    console.warn('[Socket.io] REDIS_URL não definida — usando memória local')
  }

  const getRoom = (redisAvailable && stateClient)
    ? (id: string) => getRoomState(stateClient!, id)
    : (id: string): Promise<RoomState | null> => Promise.resolve(memoryStore.get(id) ?? null)

  const setRoom = (redisAvailable && stateClient)
    ? (id: string, s: RoomState) => setRoomState(stateClient!, id, s)
    : (id: string, s: RoomState): Promise<void> => { memoryStore.set(id, s); return Promise.resolve() }

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3003',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling'],
  })

  if (redisAvailable && pubClient && subClient) {
    io.adapter(createAdapter(pubClient, subClient))
  }

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.io] Connected: ${socket.id}`)

    // ── join-room ─────────────────────────────────────────────────────────────
    socket.on('join-room', async (payload: { roomId: string; user: UserInfo }) => {
      const { roomId, user } = payload

      await socket.join(roomId)

      // Get or initialize room state
      let state = await getRoom(roomId)
      if (!state) {
        state = { code: '', language: 'typescript', members: {} }
      }

      state.members[user.id] = user
      await setRoom(roomId, state)

      // Send current state to the joining user
      socket.emit('room-state', {
        code: state.code,
        language: state.language,
        members: Object.values(state.members),
      })

      // Notify others
      socket.to(roomId).emit('user-joined', { user })
    })

    // ── code-change ──────────────────────────────────────────────────────────
    socket.on('code-change', async (payload: CodeChangePayload) => {
      const { roomId, value } = payload

      const state = await getRoom(roomId)
      if (state) {
        state.code = value
        await setRoom(roomId, state)
      }

      // Broadcast to everyone in the room except sender
      socket.to(roomId).emit('code-updated', { value, changeEvent: payload.changeEvent })
    })

    // ── language-change ───────────────────────────────────────────────────────
    socket.on('language-change', async (payload: { roomId: string; language: string }) => {
      const { roomId, language } = payload

      const state = await getRoom(roomId)
      if (state) {
        state.language = language
        await setRoom(roomId, state)
      }

      socket.to(roomId).emit('language-changed', { language })
    })

    // ── cursor-move ───────────────────────────────────────────────────────────
    socket.on('cursor-move', (payload: { userId: string } & CursorPayload) => {
      const { roomId, userId, position, selection } = payload
      socket.to(roomId).emit('cursor-updated', { userId, position, selection })
    })

    // ── send-message ──────────────────────────────────────────────────────────
    socket.on('send-message', (payload: { userId: string; username: string } & MessagePayload) => {
      const { roomId, userId, username, text } = payload

      const message = {
        id: crypto.randomUUID(),
        userId,
        username,
        text,
        sentAt: new Date().toISOString(),
      }

      // Broadcast to everyone in room including sender
      io.to(roomId).emit('new-message', { message })
    })

    // ── disconnect ────────────────────────────────────────────────────────────
    socket.on('disconnecting', async () => {
      for (const roomId of socket.rooms) {
        if (roomId === socket.id) continue

        const userId = socket.data.userId as string | undefined
        if (userId) {
          const state = await getRoom(roomId)
          if (state) {
            delete state.members[userId]
            await setRoom(roomId, state)
          }
          socket.to(roomId).emit('user-left', { userId })
        }
      }
    })
  })

  return io
}
