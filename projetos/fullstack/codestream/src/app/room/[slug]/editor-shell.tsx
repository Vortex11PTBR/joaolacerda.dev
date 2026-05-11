'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { editor } from 'monaco-editor'
import { io, Socket } from 'socket.io-client'
import { LANG_CONFIG, type LangKey } from '@/lib/lang'
import type { RoomMeta } from '@/lib/rooms-store'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ── Types ──────────────────────────────────────────────────────────────────
interface ChatMsg { userId: string; text: string; at: number }
interface Peer     { userId: string; color: string; initial: string }

// ── Helpers ────────────────────────────────────────────────────────────────
const COLORS = ['#F97316','#3B82F6','#A855F7','#22C55E','#EC4899','#14B8A6']
function getOrCreateUser() {
  if (typeof window === 'undefined') return { userId: 'anon', color: COLORS[0], initial: 'A' }
  let id = sessionStorage.getItem('cs_uid')
  if (!id) { id = 'dev' + Math.random().toString(36).slice(2, 6); sessionStorage.setItem('cs_uid', id) }
  const idx = [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length
  return { userId: id, color: COLORS[idx], initial: id.slice(0, 2).toUpperCase() }
}

const MONACO_THEME: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'F97316' },
    { token: 'string',  foreground: 'A8FF78' },
    { token: 'number',  foreground: 'BD93F9' },
  ],
  colors: {
    'editor.background':           '#0D1117',
    'editor.foreground':           '#E2E8F0',
    'editorLineNumber.foreground': '#30363D',
    'editorLineNumber.activeForeground': '#6E7681',
    'editor.lineHighlightBackground': '#161B22',
    'editorCursor.foreground':     '#F97316',
    'editor.selectionBackground':  '#F9731640',
    'editorGutter.background':     '#0D1117',
    'scrollbarSlider.background':  '#1F1F23AA',
  },
}

const STARTERS: Partial<Record<LangKey, string>> = {
  typescript: `import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { payload, signature } = await req.json()

  // Verify HMAC signature
  const secret = process.env.WEBHOOK_SECRET!
  if (!verifySignature(payload, signature, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Process webhook...
  return NextResponse.json({ ok: true })
}
`,
  python: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    value: float

@app.post("/items")
async def create_item(item: Item):
    if item.value < 0:
        raise HTTPException(400, "value must be >= 0")
    return {"id": "item_01", **item.dict()}
`,
  rust: `use std::collections::HashMap;

fn word_count(s: &str) -> HashMap<&str, usize> {
    let mut map = HashMap::new();
    for word in s.split_whitespace() {
        *map.entry(word).or_insert(0) += 1;
    }
    map
}

fn main() {
    let text = "the quick brown fox jumps over the lazy dog";
    let counts = word_count(text);
    let mut pairs: Vec<_> = counts.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1));
    for (word, count) in pairs.iter().take(5) {
        println!("{}: {}", word, count);
    }
}
`,
  sql: `-- Find top 10 users by revenue in last 30 days
SELECT
  u.id,
  u.email,
  COUNT(o.id)          AS order_count,
  SUM(o.total_cents)   AS total_revenue_cents,
  AVG(o.total_cents)   AS avg_order_cents
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
  AND o.status = 'completed'
GROUP BY u.id, u.email
ORDER BY total_revenue_cents DESC
LIMIT 10;
`,
}

// ── Component ──────────────────────────────────────────────────────────────
export default function EditorShell({ room }: { room: RoomMeta }) {
  const router   = useRouter()
  const me       = useRef(getOrCreateUser())
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const skipRef  = useRef(false)
  const sockRef  = useRef<Socket | null>(null)

  const [connected, setConnected] = useState(false)
  const [lang, setLang]           = useState<LangKey>(room.language as LangKey)
  const [peers, setPeers]         = useState<Peer[]>([])
  const [chat, setChat]           = useState<ChatMsg[]>([])
  const [chatInput, setChatInput] = useState('')
  const [tab, setTab]             = useState<'team'|'chat'>('team')
  const [output, setOutput]       = useState<string | null>(null)
  const [running, setRunning]     = useState(false)
  const [cursor, setCursor]       = useState({ line: 1, col: 1 })
  const [shared, setShared]       = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Socket connection
  useEffect(() => {
    const sock = io({ path: '/api/socket', transports: ['websocket'] })
    sockRef.current = sock

    sock.on('connect', () => {
      setConnected(true)
      sock.emit('join-room', { slug: room.slug, userId: me.current.userId })
    })
    sock.on('disconnect', () => setConnected(false))

    sock.on('room-state', ({ code, language, users }: { code: string; language: string; users: string[] }) => {
      if (code && editorRef.current) {
        skipRef.current = true
        editorRef.current.setValue(code)
        skipRef.current = false
      }
      if (language) setLang(language as LangKey)
      setPeers(users.filter((u: string) => u !== me.current.userId).map(makePeer))
    })

    sock.on('code-change', ({ code }: { code: string }) => {
      if (!editorRef.current) return
      skipRef.current = true
      const pos = editorRef.current.getPosition()
      editorRef.current.setValue(code)
      if (pos) editorRef.current.setPosition(pos)
      skipRef.current = false
    })

    sock.on('language-change', ({ language }: { language: string }) => setLang(language as LangKey))

    sock.on('user-joined', ({ userId }: { userId: string }) =>
      setPeers(p => p.some(x => x.userId === userId) ? p : [...p, makePeer(userId)]))

    sock.on('user-left', ({ userId }: { userId: string }) =>
      setPeers(p => p.filter(x => x.userId !== userId)))

    sock.on('chat-message', (msg: ChatMsg) => setChat(c => [...c, msg]))

    return () => { sock.disconnect() }
  }, [room.slug])

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat])

  function makePeer(userId: string): Peer {
    const idx = [...userId].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length
    return { userId, color: COLORS[idx], initial: userId.slice(0, 2).toUpperCase() }
  }

  const onEditorMount = useCallback((ed: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = ed
    monaco.editor.defineTheme('codestream-dark', MONACO_THEME)
    monaco.editor.setTheme('codestream-dark')
    const starter = STARTERS[lang] ?? `// ${LANG_CONFIG[lang]?.label ?? lang} — start coding\n`
    ed.setValue(starter)
    ed.onDidChangeCursorPosition(e => setCursor({ line: e.position.lineNumber, col: e.position.column }))
  }, [lang])

  function shareRoom() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShared(true)
      setTimeout(() => setShared(false), 2200)
    })
  }

  function onCodeChange(code: string | undefined) {
    if (skipRef.current || !code) return
    sockRef.current?.emit('code-change', { slug: room.slug, code })
  }

  function changeLang(next: LangKey) {
    setLang(next)
    sockRef.current?.emit('language-change', { slug: room.slug, language: next })
  }

  function sendChat() {
    const text = chatInput.trim()
    if (!text) return
    const msg: ChatMsg = { userId: me.current.userId, text, at: Date.now() }
    sockRef.current?.emit('send-message', { slug: room.slug, ...msg })
    setChat(c => [...c, msg])
    setChatInput('')
  }

  async function runCode() {
    const code = editorRef.current?.getValue() ?? ''
    setRunning(true); setOutput(null)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: lang }),
      })
      const d = await res.json()
      setOutput(d.output ?? d.error ?? 'No output')
    } catch {
      setOutput('Error reaching execution service')
    } finally {
      setRunning(false)
    }
  }

  const allUsers = [me.current, ...peers]
  const langCfg  = LANG_CONFIG[lang] ?? { label: lang, color: '#52525B', mono: lang }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#08080A', color: '#F4F4F5', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' }}>

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <header style={{ height: 50, minHeight: 50, borderBottom: '1px solid #16161C', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, background: '#08080A' }}>

        {/* Back + breadcrumb */}
        <button onClick={() => router.push('/')} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #222228', background: 'transparent', color: '#52525B', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, transition: 'color 120ms, border-color 120ms' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#A1A1AA'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#2C2C38' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#52525B'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#222228' }}
        >
          ← Back
        </button>
        <span style={{ color: '#2C2C38', fontSize: 13 }}>/</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 500, color: '#D4D4D8' }}>
          {room.name}
        </span>

        {/* Language selector */}
        <select
          value={lang}
          onChange={e => changeLang(e.target.value as LangKey)}
          style={{ padding: '4px 10px', borderRadius: 7, border: `1px solid ${langCfg.color}50`, background: `${langCfg.color}12`, color: langCfg.color, fontSize: 12, fontWeight: 500, cursor: 'pointer', outline: 'none', marginLeft: 4 }}
        >
          {(Object.entries(LANG_CONFIG) as [LangKey, typeof LANG_CONFIG[LangKey]][]).map(([k, v]) => (
            <option key={k} value={k} style={{ background: '#0E0E13', color: '#F4F4F5' }}>{v.label}</option>
          ))}
        </select>

        <div style={{ flex: 1 }} />

        {/* Connection */}
        <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, color: connected ? '#22C55E' : '#52525B' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: connected ? '#22C55E' : '#2C2C38', display: 'inline-block', animation: connected ? 'pulse-dot 2s infinite' : 'none', flexShrink: 0 }} />
          {connected ? 'live' : 'connecting'}
        </span>

        {/* Peer avatars */}
        <div style={{ display: 'flex' }}>
          {allUsers.map((u, i) => (
            <div key={u.userId} title={u.userId} style={{ width: 28, height: 28, borderRadius: '50%', background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, marginLeft: i > 0 ? -8 : 0, border: '2px solid #08080A', zIndex: allUsers.length - i, position: 'relative' }}>
              {u.initial}
            </div>
          ))}
        </div>

        {/* Share */}
        <button onClick={shareRoom} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #222228', background: shared ? '#0D1410' : 'transparent', color: shared ? '#22C55E' : '#71717A', fontSize: 12, cursor: 'pointer', transition: 'all 200ms', fontFamily: '"JetBrains Mono", monospace' }}>
          {shared ? '✓ Copied' : '⬡ Share'}
        </button>

        {/* Run */}
        <button onClick={runCode} disabled={running} style={{ padding: '6px 14px', borderRadius: 7, border: 'none', background: running ? '#1C1C22' : 'linear-gradient(135deg,#D97706,#EA580C)', color: running ? '#52525B' : '#fff', fontSize: 12, fontWeight: 600, cursor: running ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 5, letterSpacing: '-0.01em', boxShadow: running ? 'none' : '0 2px 12px rgba(234,88,12,0.3)' }}>
          {running ? '⟳ Running' : '▶ Run'}
        </button>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Monaco */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <MonacoEditor
              language={langCfg.mono}
              theme="codestream-dark"
              onChange={onCodeChange}
              onMount={onEditorMount}
              options={{
                fontSize: 14,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                wordWrap: 'off',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'line',
                smoothScrolling: true,
                cursorBlinking: 'phase',
                cursorSmoothCaretAnimation: 'on',
                tabSize: 2,
              }}
            />
          </div>

          {/* Output panel */}
          {output !== null && (
            <div style={{ maxHeight: 200, background: '#0D1117', borderTop: '1px solid #16161C', overflow: 'auto', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 16px', borderBottom: '1px solid #16161C', background: '#0A0F15' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Output</span>
                </div>
                <button onClick={() => setOutput(null)} style={{ background: 'none', border: 'none', color: '#3F3F46', cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1, transition: 'color 120ms' }} onMouseEnter={e => ((e.target as HTMLElement).style.color = '#71717A')} onMouseLeave={e => ((e.target as HTMLElement).style.color = '#3F3F46')}>×</button>
              </div>
              <pre style={{ margin: 0, padding: '12px 16px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#4ADE80', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{output}</pre>
            </div>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <div style={{ width: 256, borderLeft: '1px solid #16161C', display: 'flex', flexDirection: 'column', background: '#0A0A0F', flexShrink: 0 }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid #16161C' }}>
            {(['team', 'chat'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '11px 0', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #F97316' : '2px solid transparent', color: tab === t ? '#E4E4E7' : '#3F3F46', fontSize: 12, fontWeight: tab === t ? 600 : 400, cursor: 'pointer', textTransform: 'capitalize', transition: 'color 120ms', letterSpacing: '0.01em' }}>
                {t === 'chat' ? (
                  <span>Chat {chat.length > 0 && <span style={{ marginLeft: 4, fontSize: 10, background: '#F97316', color: '#fff', borderRadius: 10, padding: '1px 6px', fontWeight: 700 }}>{chat.length}</span>}</span>
                ) : 'Team'}
              </button>
            ))}
          </div>

          {/* Team tab */}
          {tab === 'team' && (
            <div style={{ flex: 1, overflow: 'auto', padding: '14px 12px' }}>
              <div style={{ fontSize: 10, color: '#3F3F46', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, fontFamily: '"JetBrains Mono", monospace', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
                {allUsers.length} online
              </div>
              {allUsers.map(u => (
                <div key={u.userId} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid #14141A' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, border: u.userId === me.current.userId ? `2px solid ${u.color}` : '2px solid transparent', boxSizing: 'border-box' }}>{u.initial}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: '#D4D4D8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.userId}</div>
                    <div style={{ fontSize: 10, color: u.userId === me.current.userId ? '#F97316' : '#3F3F46', marginTop: 1 }}>
                      {u.userId === me.current.userId ? '● you (owner)' : '● collaborator'}
                    </div>
                  </div>
                </div>
              ))}
              {peers.length === 0 && (
                <div style={{ marginTop: 24, padding: '14px', borderRadius: 8, background: '#0F0F16', border: '1px dashed #1C1C24', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#3F3F46', lineHeight: 1.6 }}>Share the URL to invite collaborators</div>
                  <button onClick={shareRoom} style={{ marginTop: 10, padding: '5px 12px', borderRadius: 6, border: '1px solid #1C1C24', background: 'transparent', color: '#52525B', fontSize: 11, cursor: 'pointer' }}>Copy link</button>
                </div>
              )}
            </div>
          )}

          {/* Chat tab */}
          {tab === 'chat' && (
            <>
              <div style={{ flex: 1, overflow: 'auto', padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chat.length === 0 && (
                  <div style={{ color: '#2C2C38', fontSize: 12, textAlign: 'center', marginTop: 48, lineHeight: 1.7 }}>
                    No messages yet.<br />Be the first to say something.
                  </div>
                )}
                {chat.map((m, i) => {
                  const isMe = m.userId === me.current.userId
                  const peer = makePeer(m.userId)
                  return (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexDirection: isMe ? 'row-reverse' : 'row' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: peer.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
                        {m.userId.slice(0, 2).toUpperCase()}
                      </div>
                      <div style={{ maxWidth: '75%' }}>
                        <div style={{ fontSize: 10, color: '#3F3F46', marginBottom: 3, textAlign: isMe ? 'right' : 'left' }}>{isMe ? 'you' : m.userId}</div>
                        <div style={{ fontSize: 13, color: '#D4D4D8', lineHeight: 1.45, wordBreak: 'break-word', background: isMe ? '#161620' : '#0F0F16', padding: '8px 10px', borderRadius: isMe ? '10px 10px 2px 10px' : '10px 10px 10px 2px', border: `1px solid ${isMe ? '#1E1E2A' : '#16161C'}` }}>{m.text}</div>
                      </div>
                    </div>
                  )
                })}
                <div ref={chatEndRef} />
              </div>
              <div style={{ borderTop: '1px solid #16161C', padding: '10px 12px', display: 'flex', gap: 7 }}>
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Message the room..."
                  style={{ flex: 1, padding: '8px 10px', background: '#0F0F16', border: '1px solid #1C1C24', borderRadius: 8, color: '#E4E4E7', fontSize: 12, outline: 'none' }}
                  onFocus={e => { e.target.style.borderColor = '#F97316' }}
                  onBlur={e => { e.target.style.borderColor = '#1C1C24' }}
                />
                <button onClick={sendChat} style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(135deg,#D97706,#EA580C)', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>→</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Status Bar (VSCode-style) ─────────────────────────────────────── */}
      <div style={{ height: 24, minHeight: 24, background: '#0D1117', borderTop: '1px solid #16161C', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 16, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#3F3F46', userSelect: 'none' }}>
        <span style={{ color: connected ? '#22C55E' : '#3F3F46', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: connected ? '#22C55E' : '#3F3F46', display: 'inline-block' }} />
          {connected ? 'Socket.io connected' : 'connecting'}
        </span>
        <span>CodeStream / {room.name}</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: langCfg.color }}>{langCfg.label}</span>
        <span>Ln {cursor.line}, Col {cursor.col}</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}
