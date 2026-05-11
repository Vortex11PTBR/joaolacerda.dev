import { NextRequest, NextResponse } from 'next/server'

// Allow Rust/Go/Java to compile (they take 30-50s)
export const maxDuration = 60

const WANDBOX = 'https://wandbox.org/api/compile.json'

const COMPILER_MAP: Record<string, string> = {
  python:     'cpython-3.14.0',
  typescript: 'typescript-5.6.2',
  javascript: 'nodejs-20.17.0',
  rust:       'rust-1.82.0',
  go:         'go-1.23.2',
  cpp:        'gcc-head',
  java:       'openjdk-jdk-22+36',
  bash:       'bash',
  sql:        'cpython-3.14.0',
}

function buildSqlWrapper(userSql: string): string {
  const b64 = Buffer.from(userSql, 'utf-8').toString('base64')
  return `import sqlite3, sys, base64

conn = sqlite3.connect(':memory:')
cur  = conn.cursor()

cur.executescript("""
CREATE TABLE users  (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, total REAL, status TEXT, created_at TEXT);
INSERT INTO users  VALUES (1,'Alice','alice@dev.io',28),(2,'Bob','bob@dev.io',34),(3,'Carol','carol@dev.io',25);
INSERT INTO orders VALUES (1,1,99.90,'completed','2024-01-15'),(2,1,149.90,'completed','2024-02-01'),
                          (3,2,59.90,'pending','2024-02-10'),(4,3,299.90,'completed','2024-02-15');
""")
conn.commit()

user_sql = base64.b64decode('${b64}').decode()

for stmt in [s.strip() for s in user_sql.split(';') if s.strip()]:
    try:
        cur.execute(stmt)
        if stmt.upper().lstrip().startswith('SELECT'):
            rows = cur.fetchall()
            if cur.description:
                cols   = [d[0] for d in cur.description]
                strows = [[str(v) for v in row] for row in rows]
                widths = [max(len(c), max((len(r[i]) for r in strows), default=0)) for i,c in enumerate(cols)]
                print(' | '.join(c.ljust(widths[i]) for i,c in enumerate(cols)))
                print('-+-'.join('-'*w for w in widths))
                for row in strows:
                    print(' | '.join(row[i].ljust(widths[i]) for i in range(len(cols))))
                print(f'({len(rows)} row{"s" if len(rows)!=1 else ""})')
            else:
                print(f'OK')
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
`
}

export async function POST(req: NextRequest) {
  const start = Date.now()
  try {
    const { code, language = 'python' } = await req.json()
    if (!code?.trim()) return NextResponse.json({ error: 'No code provided' }, { status: 400 })

    const compiler = COMPILER_MAP[language]
    if (!compiler) return NextResponse.json({ error: `Unsupported: ${language}` }, { status: 400 })

    let content = language === 'sql' ? buildSqlWrapper(code) : code
    // Wandbox saves Java as prog.java — public class must be non-public
    if (language === 'java') content = content.replace(/\bpublic\s+class\b/g, 'class')

    const res = await fetch(WANDBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler, code: content }),
      signal: AbortSignal.timeout(55_000),
    })

    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      return NextResponse.json({ error: `Wandbox ${res.status}: ${txt.slice(0,120)}` }, { status: 502 })
    }

    const d = await res.json()

    const stdout   = d.program_output  ?? ''
    const stderr   = d.compiler_error  || d.program_error || ''
    const exitCode = parseInt(d.status ?? '0', 10)

    return NextResponse.json({
      stdout, stderr, exitCode,
      language, compiler,
      time: Date.now() - start,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
