'use client'

import dynamic from 'next/dynamic'
import { loader } from '@monaco-editor/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { registerCompletions } from '@/lib/completions'

const CheatPanel = dynamic(() => import('@/components/cheat-panel'), { ssr: false })

// ── Load Monaco from CDN instead of webpack bundle (~4MB removed) ──────────
loader.config({
  paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs' },
})

// ── Code skeleton shown while Monaco initialises ───────────────────────────
function EditorSkeleton({ code }: { code: string }) {
  const lines = code.split('\n').slice(0, 22)
  return (
    <div style={{
      flex: 1, background: '#111114', overflow: 'hidden', padding: '16px 60px',
      fontFamily: '"JetBrains Mono", monospace', fontSize: 13.5, lineHeight: '22px',
      color: '#6b7280', userSelect: 'none',
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: 24 }}>
          <span style={{ minWidth: 24, textAlign: 'right', opacity: 0.3, fontSize: 12 }}>{i + 1}</span>
          <span style={{ opacity: 0.45, whiteSpace: 'pre' }}>{line || ' '}</span>
        </div>
      ))}
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.35 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #6b7280', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }}/>
        <span style={{ fontSize: 11 }}>Loading editor…</span>
      </div>
    </div>
  )
}

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ── Language config ────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: 'python',     label: 'Python',     mono: 'python',      ext: '.py',   color: '#3776ab' },
  { id: 'typescript', label: 'TypeScript', mono: 'typescript',  ext: '.ts',   color: '#3178c6' },
  { id: 'javascript', label: 'JavaScript', mono: 'javascript',  ext: '.js',   color: '#f7df1e' },
  { id: 'rust',       label: 'Rust',       mono: 'rust',        ext: '.rs',   color: '#f74c00' },
  { id: 'go',         label: 'Go',         mono: 'go',          ext: '.go',   color: '#00add8' },
  { id: 'cpp',        label: 'C++',        mono: 'cpp',         ext: '.cpp',  color: '#659ad2' },
  { id: 'java',       label: 'Java',       mono: 'java',        ext: '.java', color: '#f89820' },
  { id: 'bash',       label: 'Bash',       mono: 'shell',       ext: '.sh',   color: '#4eaa25' },
  { id: 'sql',        label: 'SQL',        mono: 'sql',         ext: '.sql',  color: '#e38c00' },
]

const STARTERS: Record<string, string> = {
  python: `def greet(name: str) -> str:
    return f"Hello, {name}!"

def main():
    names = ["Alice", "Bob", "Carol"]
    for name in names:
        print(greet(name))

if __name__ == '__main__':
    main()`,

  typescript: `interface User {
  id: number
  name: string
  email: string
}

function greet(user: User): string {
  return \`Hello, \${user.name}! Your email is \${user.email}.\`
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@dev.io' },
  { id: 2, name: 'Bob',   email: 'bob@dev.io'   },
]

users.forEach(u => console.log(greet(u)))`,

  javascript: `function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const results = Array.from({ length: 10 }, (_, i) => fibonacci(i))
console.log('Fibonacci sequence:', results.join(', '))`,

  rust: `fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Fibonacci sequence:");
    for i in 0..10 {
        println!("  fib({}) = {}", i, fibonacci(i));
    }
}`,

  go: `package main

import "fmt"

func fibonacci(n int) int {
\tif n <= 1 {
\t\treturn n
\t}
\treturn fibonacci(n-1) + fibonacci(n-2)
}

func main() {
\tfmt.Println("Fibonacci sequence:")
\tfor i := 0; i < 10; i++ {
\t\tfmt.Printf("  fib(%d) = %d\\n", i, fibonacci(i))
\t}
}`,

  cpp: `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Fibonacci sequence:" << endl;
    for (int i = 0; i < 10; i++) {
        cout << "  fib(" << i << ") = " << fibonacci(i) << endl;
    }
    return 0;
}`,

  java: `public class Main {
    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < 10; i++) {
            System.out.printf("  fib(%d) = %d%n", i, fibonacci(i));
        }
    }
}`,

  bash: `#!/usr/bin/env bash
set -euo pipefail

fibonacci() {
  local n=$1
  if (( n <= 1 )); then echo $n; return; fi
  local a=$(fibonacci $((n-1)))
  local b=$(fibonacci $((n-2)))
  echo $((a + b))
}

echo "Fibonacci sequence:"
for i in $(seq 0 9); do
  echo "  fib($i) = $(fibonacci $i)"
done`,

  sql: `-- Sample database: users + orders
SELECT
  u.name,
  COUNT(o.id)       AS total_orders,
  SUM(o.total)      AS revenue,
  AVG(o.total)      AS avg_order
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY revenue DESC;`,
}

const STORAGE_KEY = (lang: string) => `cs_code_${lang}`

function getCode(lang: string): string {
  if (typeof window === 'undefined') return STARTERS[lang] ?? ''
  return localStorage.getItem(STORAGE_KEY(lang)) ?? STARTERS[lang] ?? ''
}

function saveCode(lang: string, code: string) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY(lang), code)
}

// ── Debounce — fnRef keeps the callback stable so the returned fn never changes ──
function useDebounce<T extends (...a: never[]) => void>(fn: T, ms: number): T {
  const fnRef  = useRef(fn)
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Always call the latest fn without the returned callback changing identity
  useEffect(() => { fnRef.current = fn })
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => fnRef.current(...args), ms)
  }, [ms]) as T
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function CodeStreamPage() {
  const [lang,        setLang]        = useState('python')
  const [code,        setCode]        = useState(() => STARTERS['python'])
  const [editorReady, setEditorReady] = useState(false)
  const [output,      setOutput]      = useState<{ stdout: string; stderr: string; exitCode: number; time: number } | null>(null)
  const [running,     setRunning]     = useState(false)
  const [cursor,      setCursor]      = useState({ line: 1, col: 1 })
  const [outputH,     setOutputH]     = useState(220)
  const [dragging,    setDragging]    = useState(false)
  const [langOpen,    setLangOpen]    = useState(false)
  const [runError,    setRunError]    = useState<string | null>(null)
  const [cheatOpen,   setCheatOpen]   = useState(false)
  const dragRef       = useRef<number>(0)
  const containerRef  = useRef<HTMLDivElement>(null)
  const editorRef     = useRef<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null)
  const monacoRef     = useRef<typeof import('monaco-editor') | null>(null)
  // runCodeRef lets Monaco's addCommand always call the latest runCode without remounting
  const runCodeRef    = useRef<() => void>(() => {})
  // runningRef guards against double-execution without capturing running state in runCode closure
  const runningRef    = useRef(false)
  // abortRef lets us cancel in-flight requests on unmount or re-run
  const abortRef      = useRef<AbortController | null>(null)
  // langRef — always holds current lang without stale closures in callbacks
  const langRef       = useRef('python')
  // switchingRef — true while setValue() is called imperatively; suppresses the spurious onChange
  const switchingRef  = useRef(false)

  // Cleanup any in-flight request when the page unmounts
  useEffect(() => () => { abortRef.current?.abort() }, [])

  // Keep langRef in sync with state so callbacks never close over a stale lang
  useEffect(() => { langRef.current = lang }, [lang])

  const langCfg = LANGUAGES.find(l => l.id === lang) ?? LANGUAGES[0]
  const filename = `main${langCfg.ext}`

  // ── Persist on code change ────────────────────────────────────────────
  const persistCode = useDebounce((l: string, c: string) => saveCode(l, c), 800)

  const handleCodeChange = useCallback((v: string | undefined) => {
    // Ignore the echo that fires when switchLang calls editor.setValue() imperatively
    if (switchingRef.current) return
    const val = v ?? ''
    setCode(val)
    persistCode(langRef.current, val)   // langRef always has the current lang — no stale closure
  }, [persistCode])

  // ── Language switch — uses Monaco API, no remount ─────────────────────
  const switchLang = useCallback((newLang: string) => {
    if (newLang === langRef.current) { setLangOpen(false); return }
    saveCode(langRef.current, editorRef.current?.getValue() ?? '')
    const newCode = getCode(newLang)
    const newCfg  = LANGUAGES.find(l => l.id === newLang)!
    setLang(newLang)
    setCode(newCode)
    setOutput(null)
    setRunError(null)
    setLangOpen(false)

    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel()
      if (model) monacoRef.current.editor.setModelLanguage(model, newCfg.mono)
      // Guard: setValue fires onDidChangeModelContent synchronously — switchingRef suppresses it
      switchingRef.current = true
      editorRef.current.setValue(newCode)
      switchingRef.current = false
      editorRef.current.setScrollPosition({ scrollTop: 0, scrollLeft: 0 })
      editorRef.current.updateOptions({ tabSize: newLang === 'python' || newLang === 'bash' ? 4 : 2 })
    }
  }, [])                                // no deps — reads everything through refs

  // ── Keyboard shortcuts ─────────────────────────────────────────────────
  useEffect(() => {
    // runCodeRef is a stable ref — no deps needed; always calls latest runCode
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        runCodeRef.current()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // ── Drag handle ───────────────────────────────────────────────────────
  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragRef.current = e.clientY
    setDragging(true)
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent) => {
      const delta = dragRef.current - e.clientY
      dragRef.current = e.clientY
      setOutputH(h => Math.max(80, Math.min(h + delta, 600)))
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [dragging])

  // ── Run code ──────────────────────────────────────────────────────────
  const runCode = useCallback(async () => {
    if (runningRef.current) return      // guard via ref — no stale closure on `running` state
    runningRef.current = true
    abortRef.current?.abort()           // cancel any previous in-flight request
    const ctrl = new AbortController()
    abortRef.current = ctrl
    setRunning(true)
    setOutput(null)
    setRunError(null)
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: lang }),
        signal: ctrl.signal,
      })
      const data = await res.json()
      if (data.error) setRunError(data.error)
      else setOutput(data)
    } catch (e) {
      if (!ctrl.signal.aborted) setRunError(String(e))
    } finally {
      runningRef.current = false
      setRunning(false)
    }
  }, [lang, code])

  // Keep ref in sync so Monaco command + keyboard handler always call the latest version
  useEffect(() => { runCodeRef.current = runCode }, [runCode])

  // Re-layout Monaco when cheat panel opens/closes so it fills the new width
  useEffect(() => {
    // Small delay — CSS layout needs one frame to apply the new flex width
    const t = setTimeout(() => editorRef.current?.layout(), 50)
    return () => clearTimeout(t)
  }, [cheatOpen])

  // ── Monaco mount ──────────────────────────────────────────────────────
  function onMount(ed: import('monaco-editor').editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) {
    editorRef.current = ed
    monacoRef.current = monaco
    setEditorReady(true)

    // Custom theme — matches IDE palette, removes the jarring #1e1e1e vs #0d0d0f contrast
    monaco.editor.defineTheme('codestream-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background':                '#111114',
        'editorGutter.background':          '#111114',
        'editor.lineHighlightBackground':   '#1a1a1f',
        'editor.lineHighlightBorderColor':  '#1a1a1f00',
        'editorLineNumber.foreground':      '#3a3a4a',
        'editorLineNumber.activeForeground':'#6b7280',
        'editor.selectionBackground':       '#3d2b6e',
        'editor.inactiveSelectionBackground':'#2a2a3e',
        'editorIndentGuide.background1':    '#1e1e28',
        'editorIndentGuide.activeBackground1':'#2e2e3e',
        'scrollbarSlider.background':       '#2a2a3440',
        'scrollbarSlider.hoverBackground':  '#3a3a4860',
        'scrollbarSlider.activeBackground': '#4a4a5880',
      },
    })
    monaco.editor.setTheme('codestream-dark')

    // Defer snippet registration — doesn't block first paint
    const idle = (window as Window & { requestIdleCallback?: (fn: () => void) => void }).requestIdleCallback
    const schedule = idle ? idle.bind(window) : (fn: () => void) => setTimeout(fn, 200)
    schedule(() => registerCompletions(monaco))

    ed.updateOptions({
      wordBasedSuggestions: 'matchingDocuments',
      quickSuggestions: { other: true, comments: true, strings: true },
      snippetSuggestions: 'top',
      tabCompletion: 'on',
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      suggest: { preview: true, previewMode: 'prefix' },
    } as import('monaco-editor').editor.IEditorOptions)

    ed.onDidChangeCursorPosition(e => {
      setCursor({ line: e.position.lineNumber, col: e.position.column })
    })

    // Always call through ref so the command never captures a stale runCode closure
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runCodeRef.current())
  }

  // ── Memoised Monaco options — prevents re-applying the same object on every render ──
  const monacoOptions = useMemo(() => ({
    fontSize: 13.5,
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontLigatures: true,
    lineHeight: 22,
    padding: { top: 16, bottom: 16 },
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    renderLineHighlight: 'gutter' as const,
    smoothScrolling: true,
    cursorBlinking: 'smooth' as const,
    cursorSmoothCaretAnimation: 'on' as const,
    bracketPairColorization: { enabled: true },
    guides: { bracketPairs: 'active' as const },
    inlineSuggest: { enabled: true },
    tabSize: langCfg.id === 'python' || langCfg.id === 'bash' ? 4 : 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: 'full' as const,
    wordWrap: 'off' as const,
    renderWhitespace: 'selection' as const,
    showFoldingControls: 'always' as const,
    folding: true,
    scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    lineNumbers: 'on' as const,
    glyphMargin: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
  }), [langCfg.id])

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div
      className="ide-root"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0d0d0f', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}
    >
      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', height: 52,
        background: '#111114', borderBottom: '1px solid #1e1e24', flexShrink: 0, zIndex: 200,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#7c3aed"/>
            <path d="M6 8l4 3-4 3M12 14h4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', color: '#e2e8f0' }}>CodeStream</span>
        </div>

        {/* Breadcrumb / filename */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px',
          background: '#1a1a1f', border: '1px solid #2a2a34', borderRadius: 6,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#94a3b8',
        }}>
          <span style={{ color: langCfg.color, fontSize: 10 }}>●</span>
          {filename}
        </div>

        <div style={{ flex: 1 }} />

        {/* Ctrl+Enter hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#475569' }}>
          <kbd style={{ padding: '2px 5px', background: '#1e1e24', border: '1px solid #2a2a34', borderRadius: 3, fontFamily: 'monospace', fontSize: 10 }}>Ctrl</kbd>
          <span>+</span>
          <kbd style={{ padding: '2px 5px', background: '#1e1e24', border: '1px solid #2a2a34', borderRadius: 3, fontFamily: 'monospace', fontSize: 10 }}>Enter</kbd>
          <span style={{ marginLeft: 2 }}>to run</span>
        </div>

        {/* Cheat Sheet toggle */}
        <button
          onClick={() => setCheatOpen(o => !o)}
          title="Toggle Cheat Sheet"
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
            background: cheatOpen ? '#1e1430' : '#1a1a1f',
            border: `1px solid ${cheatOpen ? '#7c3aed' : '#2a2a34'}`,
            borderRadius: 6, color: cheatOpen ? '#a78bfa' : '#64748b',
            fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M3.5 4h6M3.5 6.5h4M3.5 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Cheat Sheet
        </button>

        {/* Language selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
              background: '#1a1a1f', border: '1px solid #2a2a34', borderRadius: 6,
              color: '#cbd5e1', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: langCfg.color, display: 'inline-block' }}/>
            {langCfg.label}
            <span style={{ fontSize: 9, opacity: 0.5, marginLeft: 2 }}>▼</span>
          </button>

          {langOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '110%', zIndex: 400,
              background: '#18181f', border: '1px solid #2a2a34', borderRadius: 8,
              padding: 6, minWidth: 140, boxShadow: '0 12px 40px rgba(0,0,0,.6)',
            }}>
              {LANGUAGES.map(l => (
                <button
                  key={l.id}
                  onClick={() => switchLang(l.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                    padding: '6px 10px', background: l.id === lang ? '#23232e' : 'transparent',
                    border: 'none', borderRadius: 5, color: l.id === lang ? '#e2e8f0' : '#94a3b8',
                    fontSize: 12, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, display: 'inline-block', flexShrink: 0 }}/>
                  {l.label}
                  <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, opacity: 0.4 }}>{l.ext}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Run button */}
        <button
          onClick={runCode}
          disabled={running}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
            background: running ? '#2d2d38' : '#7c3aed', border: 'none', borderRadius: 6,
            color: running ? '#6b7280' : '#fff', fontSize: 12, fontWeight: 600,
            cursor: running ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s', letterSpacing: '-0.1px',
          }}
        >
          {running ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="20" strokeDashoffset="10"/>
              </svg>
              Running…
            </>
          ) : (
            <>
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 0l10 6-10 6V0z"/>
              </svg>
              Run
            </>
          )}
        </button>
      </header>

      {/* ── Editor + Output + Cheat Panel ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

      {/* Left: Editor + Output */}
      <div ref={containerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

        {/* Monaco editor — always rendered, skeleton is an overlay */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <MonacoEditor
            language={langCfg.mono}
            value={code}
            onChange={handleCodeChange}
            onMount={onMount}
            theme="vs-dark"
            options={monacoOptions}
          />
          {/* Skeleton overlay — only shown before first mount */}
          {!editorReady && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: '#111114' }}>
              <EditorSkeleton code={code} />
            </div>
          )}
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={onDragStart}
          style={{
            height: 5, cursor: 'ns-resize', background: '#1a1a1f',
            borderTop: '1px solid #2a2a34', borderBottom: '1px solid #2a2a34',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#23232e')}
          onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1f')}
        >
          <div style={{ width: 28, height: 2, borderRadius: 2, background: '#3a3a48' }}/>
        </div>

        {/* Output panel */}
        <div style={{
          height: outputH, flexShrink: 0, background: '#0a0a0d',
          borderTop: '1px solid #1e1e24', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Output header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 32,
            borderBottom: '1px solid #1e1e24', flexShrink: 0,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Output</span>
            {output && (
              <>
                <span style={{
                  fontSize: 10, padding: '1px 6px', borderRadius: 10,
                  background: output.exitCode === 0 ? '#14532d' : '#450a0a',
                  color: output.exitCode === 0 ? '#4ade80' : '#f87171',
                }}>
                  exit {output.exitCode}
                </span>
                <span style={{ fontSize: 10, color: '#374151', marginLeft: 'auto' }}>{output.time}ms</span>
              </>
            )}
            {running && (
              <span style={{ fontSize: 10, color: '#a855f7', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a855f7', animation: 'pulse-dot 1s infinite' }}/>
                Executing…
              </span>
            )}
          </div>

          {/* Output content */}
          <div style={{
            flex: 1, overflow: 'auto', padding: '12px 16px',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 12.5, lineHeight: 1.7,
          }}>
            {!output && !runError && !running && (
              <div style={{ color: '#374151', fontStyle: 'italic', fontSize: 12 }}>
                Press <kbd style={{ padding: '1px 4px', background: '#1a1a1f', border: '1px solid #2a2a34', borderRadius: 3, fontSize: 10 }}>Ctrl+Enter</kbd> or click <strong style={{ color: '#7c3aed' }}>Run</strong> to execute your code.
                {lang === 'sql' && (
                  <div style={{ marginTop: 10, fontStyle: 'normal', color: '#374151', lineHeight: 1.8 }}>
                    <span style={{ color: '#4b5563' }}>Available tables:</span>
                    <br />
                    <code style={{ color: '#a78bfa', fontStyle: 'normal' }}>users</code>
                    <span style={{ color: '#374151' }}> — id, name, email, age</span>
                    <br />
                    <code style={{ color: '#a78bfa', fontStyle: 'normal' }}>orders</code>
                    <span style={{ color: '#374151' }}> — id, user_id, total, status, created_at</span>
                  </div>
                )}
              </div>
            )}
            {runError && (
              <div style={{ color: '#f87171', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                ✗ {runError}
              </div>
            )}
            {output && (
              <>
                {output.stdout && (
                  <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output.stdout}</pre>
                )}
                {output.stderr && (
                  <pre style={{ margin: '8px 0 0', color: '#f87171', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output.stderr}</pre>
                )}
                {!output.stdout && !output.stderr && (
                  <span style={{ color: '#4ade80', fontSize: 12 }}>✓ Process exited with code 0 (no output)</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>{/* end left column */}

      {/* Right: Cheat Panel */}
      {cheatOpen && (
        <CheatPanel lang={lang} onClose={() => setCheatOpen(false)} />
      )}

      </div>{/* end horizontal flex */}

      {/* ── Status bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', height: 24,
        background: '#111114', borderTop: '1px solid #1a1a1f', flexShrink: 0,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#475569', userSelect: 'none',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: langCfg.color }}/>
          {langCfg.label}
        </span>
        <span>Ln {cursor.line}, Col {cursor.col}</span>
        <span>Spaces: {langCfg.id === 'python' || langCfg.id === 'bash' ? 4 : 2}</span>
        <span>UTF-8</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: '#374151' }}>CodeStream — joaolacerda.dev</span>
      </div>

      {/* Click away to close lang dropdown — zIndex must be below header (200) */}
      {langOpen && (
        <div
          onClick={() => setLangOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.3} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a34; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3a48; }
      `}</style>
    </div>
  )
}
