# 🖊️ CodeStream — Real-Time Collaborative Code Editor

> Code together. Monaco Editor meets Socket.io for live, multi-user coding sessions.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io)
![Monaco](https://img.shields.io/badge/Monaco_Editor-VS_Code_engine-007ACC?logo=visual-studio-code)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **Real-time collaboration** — Multiple cursors with user avatars and colors
- **Monaco Editor** — Full VS Code editing experience in the browser
- **20+ languages** — JavaScript, TypeScript, Python, Go, Rust, Java, C++, and more
- **Code execution** — Run code in a sandbox via Judge0 API, see output inline
- **Live chat** — Sidebar chat while coding together
- **Shareable rooms** — Unique URLs for each session, join with one click
- **Session snapshots** — Save and restore code snapshots

---

## 🏗️ Architecture

```
Browser A                     Browser B
    │    Monaco + Socket.io       │
    └──────────── WebSocket ──────┘
                     │
              Socket.io Server
              (custom Node.js)
                     │
              ┌──────┴──────┐
          Redis Pub/Sub   PostgreSQL
          (room state)    (snapshots)
                     │
               Judge0 API
             (code execution)
```

---

## 🧰 Tech Stack

| Component       | Technology              | Reason                                   |
|-----------------|-------------------------|------------------------------------------|
| Framework       | Next.js 14              | App Router + custom Socket.io server     |
| Language        | TypeScript (strict)     | Type-safe events and payloads            |
| Editor          | Monaco Editor           | VS Code engine, syntax highlight, LSP    |
| Real-time       | Socket.io               | Rooms, namespaces, auto-reconnect        |
| State sync      | Redis                   | Room state, presence, pub/sub            |
| Database        | PostgreSQL + Prisma     | Rooms, snapshots, chat history           |
| Auth            | Clerk                   | Optional auth, anonymous guests allowed  |
| Code execution  | Judge0 API              | Sandboxed execution, 20+ languages       |
| UI              | shadcn/ui + Tailwind    | Split-pane layout, dark theme            |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Vortex11PTBR/codestream.git
cd codestream
npm install
cp .env.example .env.local
docker compose up -d
npx prisma migrate dev
npm run dev   # starts Next.js + Socket.io server together
```

---

## 🔑 Environment Variables

| Variable                    | Description                          |
|-----------------------------|--------------------------------------|
| `DATABASE_URL`              | PostgreSQL connection string         |
| `REDIS_URL`                 | Redis connection string              |
| `CLERK_SECRET_KEY`          | Clerk secret key (optional auth)     |
| `JUDGE0_API_KEY`            | RapidAPI key for Judge0 execution    |
| `JUDGE0_API_URL`            | Judge0 base URL                      |

---

## 📡 Socket.io Events

| Event            | Direction       | Payload                               |
|------------------|-----------------|---------------------------------------|
| `join-room`      | Client → Server | `{ roomId, user }`                    |
| `code-change`    | Client → Server | `{ roomId, value, changes }`          |
| `cursor-move`    | Client → Server | `{ roomId, position, selection }`     |
| `send-message`   | Client → Server | `{ roomId, text }`                    |
| `room-state`     | Server → Client | `{ code, language, members }`         |
| `user-joined`    | Server → Client | `{ user }`                            |
| `user-left`      | Server → Client | `{ userId }`                          |
| `cursor-updated` | Server → Client | `{ userId, position, selection }`     |
| `new-message`    | Server → Client | `{ message }`                         |

---

## 🚢 Deploy

- **Frontend + API** → Vercel  
- **Socket.io server** → Railway (WebSocket support needed)  
- **Database** → Neon  
- **Redis** → Upstash  

> Note: Vercel doesn't support persistent WebSocket connections. Deploy the Socket.io server separately on Railway or Fly.io.

---

MIT © João Pedro Lacerda
