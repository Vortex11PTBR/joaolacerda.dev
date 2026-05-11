'use client'

import { useState, useMemo } from 'react'
import DATA from '@/lib/cheatsheets'

interface Props {
  lang: string
  onClose: () => void
}

export default function CheatPanel({ lang, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})

  const sections = DATA[lang] ?? []

  const filtered = useMemo(() => {
    if (!search.trim()) return sections
    const q = search.toLowerCase()
    return sections
      .map(sec => ({
        ...sec,
        items: sec.items.filter(
          item =>
            item.title.toLowerCase().includes(q) ||
            item.code?.toLowerCase().includes(q) ||
            item.desc?.toLowerCase().includes(q) ||
            item.table?.some(([a, b]) => a.toLowerCase().includes(q) || b.toLowerCase().includes(q))
        ),
      }))
      .filter(sec => sec.items.length > 0)
  }, [sections, search])

  function toggleCat(cat: string) {
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  // default: first 2 categories open
  function isCatOpen(cat: string): boolean {
    const idx = sections.findIndex(s => s.cat === cat)
    return openCats[cat] !== undefined ? openCats[cat] : idx < 2
  }

  const langLabel = lang.charAt(0).toUpperCase() + lang.slice(1)

  return (
    <div style={{
      width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column',
      background: '#0f0f13', borderLeft: '1px solid #1e1e24', overflow: 'hidden',
    }}>
      {/* Panel Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', height: 52,
        borderBottom: '1px solid #1e1e24', flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="#7c3aed" strokeWidth="1.5"/>
          <path d="M4 4h6M4 7h4M4 10h5" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <span style={{ fontWeight: 600, fontSize: 12, color: '#cbd5e1', flex: 1, letterSpacing: '-0.1px' }}>
          {langLabel} Cheat Sheet
        </span>
        <button
          onClick={onClose}
          title="Close"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
            padding: '2px 4px', borderRadius: 4, lineHeight: 1, fontSize: 14,
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#94a3b8')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#475569')}
        >✕</button>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #1a1a1f', flexShrink: 0 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search…"
          style={{
            width: '100%', background: '#18181f', border: '1px solid #2a2a34',
            borderRadius: 6, padding: '5px 10px', color: '#e2e8f0',
            fontFamily: 'inherit', fontSize: 12, outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = '#7c3aed')}
          onBlur={e => (e.target.style.borderColor = '#2a2a34')}
        />
      </div>

      {/* Scrollable sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0 40px' }}>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#374151', fontSize: 12, marginTop: 24 }}>
            No results for &ldquo;{search}&rdquo;
          </p>
        )}
        {filtered.map(sec => (
          <div key={sec.cat} style={{ marginBottom: 2 }}>
            {/* Category header */}
            <button
              onClick={() => toggleCat(sec.cat)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, width: '100%',
                padding: '6px 12px', background: 'none', border: 'none',
                borderBottom: '1px solid #1a1a1f', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{
                fontSize: 9, color: '#475569', transform: isCatOpen(sec.cat) ? 'rotate(90deg)' : 'rotate(0)',
                transition: 'transform 0.15s', display: 'inline-block', lineHeight: 1,
              }}>▶</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {sec.cat}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: '#374151' }}>{sec.items.length}</span>
            </button>

            {/* Items */}
            {isCatOpen(sec.cat) && (
              <div>
                {sec.items.map((item, idx) => (
                  <CheatItem key={idx} item={item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .cheat-panel-root ::-webkit-scrollbar { width: 4px; }
        .cheat-panel-root ::-webkit-scrollbar-thumb { background: #2a2a34; border-radius: 2px; }
      `}</style>
    </div>
  )
}

// ── Single cheat item ──────────────────────────────────────────────────────
type CheatItemData = {
  title: string
  code?: string
  desc?: string
  table?: [string, string][]
}

function CheatItem({ item }: { item: CheatItemData }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    if (!item.code) return
    navigator.clipboard.writeText(item.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div style={{
      margin: '4px 8px', borderRadius: 6, background: '#14141a',
      border: '1px solid #1e1e28', overflow: 'hidden',
    }}>
      {/* Item title */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 10px', background: '#16161e',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{item.title}</span>
        {item.code && (
          <button
            onClick={copy}
            title="Copy"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: copied ? '#4ade80' : '#374151', fontSize: 10, padding: '1px 4px',
              borderRadius: 3, fontFamily: 'inherit', transition: 'color 0.15s',
            }}
            onMouseEnter={e => { if (!copied) (e.target as HTMLElement).style.color = '#94a3b8' }}
            onMouseLeave={e => { if (!copied) (e.target as HTMLElement).style.color = '#374151' }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
      </div>

      {/* Code block */}
      {item.code && (
        <pre style={{
          margin: 0, padding: '8px 10px', overflowX: 'auto',
          fontFamily: '"JetBrains Mono", "Fira Code", monospace', fontSize: 11, lineHeight: 1.65,
          color: '#c4cfd9', background: '#0e0e12', whiteSpace: 'pre',
        }}>
          <CodeHighlight code={item.code} />
        </pre>
      )}

      {/* Description */}
      {item.desc && (
        <p style={{ margin: '0', padding: '6px 10px', fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
          {item.desc}
        </p>
      )}

      {/* Table */}
      {item.table && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <tbody>
            {item.table.map(([a, b], i) => (
              <tr key={i} style={{ borderTop: i > 0 ? '1px solid #1a1a22' : 'none' }}>
                <td style={{
                  padding: '4px 10px', fontFamily: '"JetBrains Mono", monospace',
                  color: '#a78bfa', fontSize: 10.5, whiteSpace: 'nowrap', verticalAlign: 'top',
                }}>{a}</td>
                <td style={{ padding: '4px 10px 4px 4px', color: '#64748b', verticalAlign: 'top' }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ── Minimal syntax highlighter ────────────────────────────────────────────
// Tokenizes comments, strings, keywords, operators — pure CSS classes via spans.
// No /g flag — global flag makes RegExp.test() stateful (lastIndex persists between calls),
// which causes incorrect results when reusing the same regex instance across tokens.
const KW_PATTERN = /\b(const|let|var|function|return|if|else|elif|for|while|class|import|export|from|default|async|await|new|this|typeof|instanceof|void|null|undefined|true|false|extends|implements|interface|type|enum|abstract|readonly|static|super|yield|break|continue|switch|case|throw|try|catch|finally|delete|in|of|do|def|elif|with|except|raise|pass|lambda|and|or|not|is|True|False|None|self|cls|fn|mut|struct|impl|trait|use|pub|mod|match|loop|Ok|Err|Some|Self|where|dyn|move|func|range|defer|select|make|append|len|cap|nil|package|int|double|float|char|bool|auto|template|typename|namespace|using|virtual|override|nullptr|include|define|sizeof|inline|explicit|boolean|super|throws|sealed|permits|record|then|fi|done|until|esac|local|declare|echo|printf|read|source|trap|exit|SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|ON|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NOT|NULL|AND|OR|EXISTS|BETWEEN|LIKE|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|WHEN|THEN|END|WITH|UNION|ALL|OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|COALESCE|RECURSIVE)\b/i

function CodeHighlight({ code }: { code: string }) {
  // For simplicity, just colour-code with spans — no complex parser needed
  // We apply in order: comments → strings → keywords → numbers → rest
  const tokens = tokenize(code)
  return (
    <>
      {tokens.map((tok, i) => {
        let color = '#c4cfd9'
        if (tok.type === 'comment') color = '#4a5568'
        else if (tok.type === 'string') color = '#a3e635'
        else if (tok.type === 'keyword') color = '#c084fc'
        else if (tok.type === 'number') color = '#fb923c'
        else if (tok.type === 'operator') color = '#7dd3fc'
        else if (tok.type === 'function') color = '#67e8f9'
        return <span key={i} style={{ color }}>{tok.text}</span>
      })}
    </>
  )
}

type Token = { type: 'comment' | 'string' | 'keyword' | 'number' | 'operator' | 'function' | 'plain'; text: string }

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Line comment  # or //
    if ((code[i] === '#' && code[i - 1] !== '\\') ||
        (code[i] === '/' && code[i + 1] === '/')) {
      const end = code.indexOf('\n', i)
      const text = end === -1 ? code.slice(i) : code.slice(i, end)
      tokens.push({ type: 'comment', text })
      i += text.length
      continue
    }
    // Block comment /*...*/
    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2)
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 2)
      tokens.push({ type: 'comment', text })
      i += text.length
      continue
    }
    // String — triple quote
    if (code.slice(i, i + 3) === '"""' || code.slice(i, i + 3) === "'''") {
      const q = code.slice(i, i + 3)
      const end = code.indexOf(q, i + 3)
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 3)
      tokens.push({ type: 'string', text })
      i += text.length
      continue
    }
    // String — single/double
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]
      let j = i + 1
      while (j < code.length && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++
        j++
      }
      const text = code.slice(i, j + 1)
      tokens.push({ type: 'string', text })
      i += text.length
      continue
    }
    // Backtick template
    if (code[i] === '`') {
      const end = code.indexOf('`', i + 1)
      const text = end === -1 ? code.slice(i) : code.slice(i, end + 1)
      tokens.push({ type: 'string', text })
      i += text.length
      continue
    }
    // Number
    if (/[0-9]/.test(code[i]) || (code[i] === '.' && /[0-9]/.test(code[i + 1] ?? ''))) {
      let j = i
      while (j < code.length && /[0-9._xXaAbBcCdDeEfFuUlLnN]/.test(code[j])) j++
      tokens.push({ type: 'number', text: code.slice(i, j) })
      i = j
      continue
    }
    // Word — keyword or identifier
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
      const word = code.slice(i, j)
      const afterWord = code[j]
      const isKw = KW_PATTERN.test(word)
      const isFn = afterWord === '('
      tokens.push({ type: isKw ? 'keyword' : isFn ? 'function' : 'plain', text: word })
      i = j
      continue
    }
    // Operator
    if (/[=><!&|+\-*/%^~?:]/.test(code[i])) {
      tokens.push({ type: 'operator', text: code[i] })
      i++
      continue
    }
    // Anything else (whitespace, punctuation, newlines)
    tokens.push({ type: 'plain', text: code[i] })
    i++
  }

  return tokens
}
