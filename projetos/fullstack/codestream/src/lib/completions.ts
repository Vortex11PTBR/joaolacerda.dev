/* ── Monaco snippet/completion providers for all languages ───────────────
   Call registerCompletions(monaco) once inside onMount.               */

type Monaco = typeof import('monaco-editor')
type Range  = import('monaco-editor').IRange

let _registered = false

// ── helper ────────────────────────────────────────────────────────────────
function snip(
  label: string, insert: string, doc: string,
  monaco: Monaco, range: Range,
  detail = 'snippet',
): import('monaco-editor').languages.CompletionItem {
  return {
    label, detail, documentation: doc,
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: insert,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range, sortText: '!' + label,
  }
}

function kw(
  label: string, insert: string,
  monaco: Monaco, range: Range,
): import('monaco-editor').languages.CompletionItem {
  return {
    label,
    kind: monaco.languages.CompletionItemKind.Keyword,
    insertText: insert,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range,
  }
}

function provider(
  defs: (monaco: Monaco, range: Range) => import('monaco-editor').languages.CompletionItem[]
) {
  return (monaco: Monaco) =>
    monaco.languages.registerCompletionItemProvider(
      // placeholder — replaced per language
      '__LANG__',
      {
        provideCompletionItems(model, position) {
          const word = model.getWordUntilPosition(position)
          const range: Range = {
            startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
            startColumn: word.startColumn,        endColumn: word.endColumn,
          }
          return { suggestions: defs(monaco, range) }
        },
      }
    )
}

// ── Python ────────────────────────────────────────────────────────────────
const PYTHON = [
  ['main',    'if __name__ == \'__main__\':\n\t${1:main()}', 'Entry point guard'],
  ['def',     'def ${1:name}(${2:args}):\n\t"""${3:Docstring}."""\n\t${4:pass}', 'Function definition'],
  ['class',   'class ${1:Name}:\n\tdef __init__(self${2:, args}):\n\t\t${3:pass}', 'Class definition'],
  ['for',     'for ${1:item} in ${2:iterable}:\n\t${3:pass}', 'For loop'],
  ['while',   'while ${1:condition}:\n\t${2:pass}', 'While loop'],
  ['if',      'if ${1:condition}:\n\t${2:pass}', 'If statement'],
  ['elif',    'elif ${1:condition}:\n\t${2:pass}', 'Elif branch'],
  ['try',     'try:\n\t${1:pass}\nexcept ${2:Exception} as e:\n\t${3:pass}', 'Try/except'],
  ['with',    'with ${1:expr} as ${2:f}:\n\t${3:pass}', 'Context manager'],
  ['print',   'print(${1:value})', 'Print to stdout'],
  ['fprint',  'print(f"${1:value}")', 'F-string print'],
  ['import',  'import ${1:module}', 'Import module'],
  ['from',    'from ${1:module} import ${2:name}', 'From import'],
  ['lambda',  'lambda ${1:args}: ${2:expr}', 'Lambda function'],
  ['listc',   '[${1:expr} for ${2:item} in ${3:iterable}]', 'List comprehension'],
  ['dictc',   '{${1:k}: ${2:v} for ${3:k}, ${4:v} in ${5:iterable}.items()}', 'Dict comprehension'],
  ['np',      'import numpy as np', 'NumPy import'],
  ['pd',      'import pandas as pd', 'Pandas import'],
  ['plt',     'import matplotlib.pyplot as plt', 'Matplotlib import'],
  ['requests','import requests', 'Requests import'],
  ['dataclass','from dataclasses import dataclass\n\n@dataclass\nclass ${1:Name}:\n\t${2:field}: ${3:type}', 'Dataclass'],
  ['asyncdef','async def ${1:name}(${2:args}):\n\t${3:pass}', 'Async function'],
  ['await',   'await ${1:expr}', 'Await expression'],
  ['property','@property\ndef ${1:name}(self):\n\treturn self._${1:name}', 'Property decorator'],
  ['enumerate','for ${1:i}, ${2:item} in enumerate(${3:iterable}):\n\t${4:pass}', 'Enumerate loop'],
  ['zip',     'for ${1:a}, ${2:b} in zip(${3:list1}, ${4:list2}):\n\t${5:pass}', 'Zip loop'],
]

// ── Rust ──────────────────────────────────────────────────────────────────
const RUST = [
  ['main',    'fn main() {\n\t${1}\n}', 'Main function'],
  ['fn',      'fn ${1:name}(${2:args}) -> ${3:ReturnType} {\n\t${4}\n}', 'Function'],
  ['let',     'let ${1:name} = ${2:value};', 'Let binding'],
  ['letmut',  'let mut ${1:name} = ${2:value};', 'Mutable binding'],
  ['println', 'println!("${1}", ${2});', 'Print macro'],
  ['eprintln','eprintln!("${1}", ${2});', 'Error print macro'],
  ['struct',  'struct ${1:Name} {\n\t${2:field}: ${3:Type},\n}', 'Struct'],
  ['enum',    'enum ${1:Name} {\n\t${2:Variant},\n}', 'Enum'],
  ['impl',    'impl ${1:Type} {\n\t${2}\n}', 'Impl block'],
  ['match',   'match ${1:expr} {\n\t${2:pattern} => ${3:result},\n\t_ => ${4},\n}', 'Match expression'],
  ['for',     'for ${1:item} in ${2:iter} {\n\t${3}\n}', 'For loop'],
  ['while',   'while ${1:condition} {\n\t${2}\n}', 'While loop'],
  ['if',      'if ${1:condition} {\n\t${2}\n}', 'If'],
  ['iferr',   'if let Err(e) = ${1:result} {\n\t${2}\n}', 'If Err'],
  ['ifsome',  'if let Some(${1:v}) = ${2:option} {\n\t${3}\n}', 'If Some'],
  ['use',     'use ${1:path};', 'Use statement'],
  ['pub',     'pub ${1}', 'Public item'],
  ['vec',     'vec![${1}]', 'Vec macro'],
  ['Vec',     'Vec<${1:T}>', 'Vec type'],
  ['HashMap', 'HashMap::new()', 'HashMap'],
  ['Result',  'Result<${1:T}, ${2:E}>', 'Result type'],
  ['Option',  'Option<${1:T}>', 'Option type'],
  ['unwrap',  '.unwrap()', 'Unwrap'],
  ['expect',  '.expect("${1:msg}")', 'Expect'],
  ['derive',  '#[derive(${1:Debug, Clone})]', 'Derive macro'],
  ['async',   'async fn ${1:name}(${2:args}) -> ${3:ReturnType} {\n\t${4}\n}', 'Async function'],
  ['await',   '.await', 'Await'],
  ['trait',   'trait ${1:Name} {\n\t${2}\n}', 'Trait definition'],
  ['closure', '|${1:args}| {\n\t${2}\n}', 'Closure'],
]

// ── Go ────────────────────────────────────────────────────────────────────
const GO = [
  ['main',    'func main() {\n\t${1}\n}', 'Main function'],
  ['func',    'func ${1:name}(${2:args}) ${3:returnType} {\n\t${4}\n}', 'Function'],
  ['fmt',     'fmt.Println(${1})', 'fmt.Println'],
  ['fmtf',    'fmt.Printf("${1}\\n", ${2})', 'fmt.Printf'],
  ['err',     'if err != nil {\n\t${1:return err}\n}', 'Error check'],
  ['errf',    'if err != nil {\n\treturn fmt.Errorf("${1}: %w", err)\n}', 'Error wrap'],
  ['for',     'for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t${3}\n}', 'For loop'],
  ['range',   'for ${1:i}, ${2:v} := range ${3:slice} {\n\t${4}\n}', 'Range loop'],
  ['if',      'if ${1:condition} {\n\t${2}\n}', 'If statement'],
  ['struct',  'type ${1:Name} struct {\n\t${2:Field} ${3:Type}\n}', 'Struct'],
  ['iface',   'type ${1:Name} interface {\n\t${2:Method}() ${3:ReturnType}\n}', 'Interface'],
  ['go',      'go func() {\n\t${1}\n}()', 'Goroutine'],
  ['chan',     'make(chan ${1:Type}, ${2:buffer})', 'Channel'],
  ['select',  'select {\ncase ${1:v} := <-${2:ch}:\n\t${3}\ndefault:\n\t${4}\n}', 'Select'],
  ['defer',   'defer ${1:func}()', 'Defer'],
  ['map',     'make(map[${1:Key}]${2:Value})', 'Map'],
  ['slice',   '[]${1:Type}{${2}}', 'Slice literal'],
  ['append',  'append(${1:slice}, ${2:elem})', 'Append'],
  [':=',      '${1:name} := ${2:value}', 'Short var decl'],
  ['import',  'import (\n\t"${1}"\n)', 'Import block'],
  ['log',     'log.Println(${1})', 'Log'],
  ['http',    'http.HandleFunc("/${1:path}", func(w http.ResponseWriter, r *http.Request) {\n\t${2}\n})', 'HTTP handler'],
  ['json',    'json.NewEncoder(w).Encode(${1:v})', 'JSON encode'],
  ['wg',      'var wg sync.WaitGroup\nwg.Add(${1:1})\ngo func() {\n\tdefer wg.Done()\n\t${2}\n}()\nwg.Wait()', 'WaitGroup'],
]

// ── SQL ───────────────────────────────────────────────────────────────────
const SQL = [
  ['sel',     'SELECT ${1:*}\nFROM ${2:table}', 'SELECT'],
  ['selw',    'SELECT ${1:*}\nFROM ${2:table}\nWHERE ${3:condition}', 'SELECT WHERE'],
  ['join',    'JOIN ${1:table} ON ${2:condition}', 'JOIN'],
  ['ljoin',   'LEFT JOIN ${1:table} ON ${2:condition}', 'LEFT JOIN'],
  ['group',   'GROUP BY ${1:column}', 'GROUP BY'],
  ['order',   'ORDER BY ${1:column} ${2:DESC}', 'ORDER BY'],
  ['having',  'HAVING ${1:condition}', 'HAVING'],
  ['cte',     'WITH ${1:cte_name} AS (\n\t${2:SELECT ...}\n)\nSELECT * FROM ${1:cte_name}', 'CTE'],
  ['insert',  'INSERT INTO ${1:table} (${2:columns})\nVALUES (${3:values})', 'INSERT'],
  ['update',  'UPDATE ${1:table}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition}', 'UPDATE'],
  ['delete',  'DELETE FROM ${1:table}\nWHERE ${1:condition}', 'DELETE'],
  ['create',  'CREATE TABLE ${1:name} (\n\tid INTEGER PRIMARY KEY,\n\t${2:column} ${3:TEXT}\n)', 'CREATE TABLE'],
  ['index',   'CREATE INDEX idx_${1:name} ON ${2:table}(${3:column})', 'CREATE INDEX'],
  ['count',   'COUNT(${1:*})', 'COUNT'],
  ['sum',     'SUM(${1:column})', 'SUM'],
  ['avg',     'AVG(${1:column})', 'AVG'],
  ['coalesce','COALESCE(${1:column}, ${2:default})', 'COALESCE'],
  ['case',    'CASE\n\tWHEN ${1:condition} THEN ${2:result}\n\tELSE ${3:default}\nEND', 'CASE WHEN'],
  ['sub',     '(SELECT ${1:column} FROM ${2:table} WHERE ${3:condition})', 'Subquery'],
  ['window',  '${1:SUM}(${2:column}) OVER (PARTITION BY ${3:column} ORDER BY ${4:column})', 'Window function'],
  ['exist',   'EXISTS (SELECT 1 FROM ${1:table} WHERE ${2:condition})', 'EXISTS'],
]

// ── C++ ───────────────────────────────────────────────────────────────────
const CPP = [
  ['main',    '#include <iostream>\nusing namespace std;\n\nint main() {\n\t${1}\n\treturn 0;\n}', 'Main function'],
  ['include', '#include <${1:iostream}>', 'Include'],
  ['cout',    'cout << ${1} << endl;', 'cout'],
  ['cin',     'cin >> ${1};', 'cin'],
  ['for',     'for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${3}\n}', 'For loop'],
  ['foreach', 'for (auto& ${1:item} : ${2:container}) {\n\t${3}\n}', 'Range for'],
  ['while',   'while (${1:condition}) {\n\t${2}\n}', 'While'],
  ['if',      'if (${1:condition}) {\n\t${2}\n}', 'If'],
  ['class',   'class ${1:Name} {\npublic:\n\t${2:Name}();\nprivate:\n\t${3}\n};', 'Class'],
  ['struct',  'struct ${1:Name} {\n\t${2:type} ${3:field};\n};', 'Struct'],
  ['vector',  'vector<${1:int}> ${2:v}', 'Vector'],
  ['map',     'map<${1:K}, ${2:V}> ${3:m}', 'Map'],
  ['sort',    'sort(${1:v}.begin(), ${1:v}.end());', 'Sort'],
  ['lambda',  '[${1:capture}](${2:args}) {\n\t${3}\n}', 'Lambda'],
  ['ptr',     '${1:Type}* ${2:ptr} = ${3:nullptr};', 'Pointer'],
  ['template','template<typename ${1:T}>\n${2}', 'Template'],
  ['auto',    'auto ${1:name} = ${2:value};', 'Auto'],
  ['ns',      'namespace ${1:name} {\n${2}\n}', 'Namespace'],
  ['unique',  'std::make_unique<${1:Type}>(${2})', 'unique_ptr'],
  ['shared',  'std::make_shared<${1:Type}>(${2})', 'shared_ptr'],
]

// ── Java ──────────────────────────────────────────────────────────────────
const JAVA = [
  ['main',    'public static void main(String[] args) {\n\t${1}\n}', 'Main method'],
  ['sout',    'System.out.println(${1});', 'println'],
  ['soutf',   'System.out.printf("${1}%n", ${2});', 'printf'],
  ['class',   'public class ${1:Name} {\n\tpublic ${1:Name}() {\n\t\t${2}\n\t}\n}', 'Class'],
  ['iface',   'public interface ${1:Name} {\n\t${2}\n}', 'Interface'],
  ['for',     'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}', 'For loop'],
  ['foreach', 'for (${1:Type} ${2:item} : ${3:collection}) {\n\t${4}\n}', 'Foreach'],
  ['while',   'while (${1:condition}) {\n\t${2}\n}', 'While'],
  ['if',      'if (${1:condition}) {\n\t${2}\n}', 'If'],
  ['try',     'try {\n\t${1}\n} catch (${2:Exception} e) {\n\t${3}\n}', 'Try/catch'],
  ['ArrayList','List<${1:Type}> ${2:list} = new ArrayList<>();', 'ArrayList'],
  ['HashMap', 'Map<${1:K}, ${2:V}> ${3:map} = new HashMap<>();', 'HashMap'],
  ['lambda',  '(${1:args}) -> ${2:expr}', 'Lambda'],
  ['stream',  '${1:collection}.stream()\n\t.filter(${2:pred})\n\t.collect(Collectors.toList())', 'Stream'],
  ['optl',    'Optional<${1:Type}>', 'Optional'],
  ['record',  'record ${1:Name}(${2:Type field}) {}', 'Record'],
  ['switch',  'switch (${1:expr}) {\n\tcase ${2:val}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${4}\n}', 'Switch'],
  ['abstract','public abstract ${1:void} ${2:method}(${3:args});', 'Abstract method'],
]

// ── Bash ──────────────────────────────────────────────────────────────────
const BASH = [
  ['main',    '#!/usr/bin/env bash\nset -euo pipefail\n\nmain() {\n\t${1}\n}\n\nmain "$@"', 'Main with strict mode'],
  ['if',      'if [[ ${1:condition} ]]; then\n\t${2}\nfi', 'If'],
  ['ifelse',  'if [[ ${1:condition} ]]; then\n\t${2}\nelse\n\t${3}\nfi', 'If/else'],
  ['for',     'for ${1:item} in ${2:list}; do\n\t${3}\ndone', 'For loop'],
  ['while',   'while ${1:condition}; do\n\t${2}\ndone', 'While loop'],
  ['func',    '${1:name}() {\n\t${2}\n}', 'Function'],
  ['case',    'case "${1:var}" in\n\t${2:pattern})\n\t\t${3}\n\t\t;;\n\t*)\n\t\t${4}\n\t\t;;\nesac', 'Case'],
  ['read',    'read -r -p "${1:Prompt: }" ${2:var}', 'Read input'],
  ['echo',    'echo "${1:message}"', 'Echo'],
  ['check',   'command -v ${1:cmd} &>/dev/null || { echo "${1:cmd} not found"; exit 1; }', 'Check command'],
  ['trap',    'trap \'${1:cleanup}\' EXIT ERR', 'Trap'],
  ['arr',     '${1:arr}=(${2:elem1} ${3:elem2})', 'Array'],
  ['arrfor',  'for ${1:item} in "${${2:arr}[@]}"; do\n\t${3}\ndone', 'Array loop'],
  ['substr',  '"${${1:var}:${2:offset}:${3:length}}"', 'Substring'],
  ['default', '${1:var}="${${1:var}:-${2:default}}"', 'Default value'],
  ['log',     'echo "[$(date +%T)] ${1:message}"', 'Log with timestamp'],
]

// ── TypeScript extras (Monaco already has great TS support) ───────────────
const TS_EXTRA = [
  ['intf',    'interface ${1:Name} {\n\t${2:prop}: ${3:type}\n}', 'Interface'],
  ['type',    'type ${1:Name} = ${2:definition}', 'Type alias'],
  ['enum',    'enum ${1:Name} {\n\t${2:Member} = ${3:value},\n}', 'Enum'],
  ['class',   'class ${1:Name} {\n\tconstructor(${2:args}) {\n\t\t${3}\n\t}\n}', 'Class'],
  ['async',   'async function ${1:name}(${2:args}): Promise<${3:void}> {\n\t${4}\n}', 'Async function'],
  ['fetch',   'const res = await fetch(\'${1:url}\')\nconst data = await res.json()', 'Fetch'],
  ['useState','const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState<${2:Type}>(${3:initial})', 'useState'],
  ['useEffect','useEffect(() => {\n\t${1}\n\treturn () => { ${2} }\n}, [${3}])', 'useEffect'],
  ['useRef',  'const ${1:ref} = useRef<${2:Type}>(${3:null})', 'useRef'],
  ['try',     'try {\n\t${1}\n} catch (err) {\n\tconsole.error(err)\n\t${2}\n}', 'Try/catch'],
  ['zod',     'const ${1:Schema} = z.object({\n\t${2:field}: z.string(),\n})\ntype ${1:Schema} = z.infer<typeof ${1:Schema}>', 'Zod schema'],
  ['route',   'export async function ${1:GET}(req: Request) {\n\t${2}\n}', 'Route handler'],
  ['prisma',  'const ${1:result} = await prisma.${2:model}.${3:findMany}({\n\twhere: { ${4} },\n})', 'Prisma query'],
]

// ── Register all ──────────────────────────────────────────────────────────
export function registerCompletions(monaco: Monaco) {
  if (_registered) return
  _registered = true

  const LANG_DEFS: [string, typeof PYTHON][] = [
    ['python',     PYTHON],
    ['rust',       RUST],
    ['go',         GO],
    ['sql',        SQL],
    ['cpp',        CPP],
    ['java',       JAVA],
    ['shell',      BASH],
    ['typescript', TS_EXTRA],
  ]

  for (const [langId, snippets] of LANG_DEFS) {
    monaco.languages.registerCompletionItemProvider(langId, {
      provideCompletionItems(model, position) {
        const word  = model.getWordUntilPosition(position)
        const range: Range = {
          startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
          startColumn: word.startColumn,        endColumn: word.endColumn,
        }
        return {
          suggestions: snippets.map(([label, insert, doc]) =>
            snip(label, insert, doc, monaco, range)
          ),
        }
      },
    })
  }

  // TypeScript compiler options for best IntelliSense
  // Cast needed: CDN Monaco types mark `languages.typescript` as deprecated but it's fully available at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ts = (monaco.languages as any).typescript
  if (ts) {
    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      module: ts.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      allowJs: true,
      strict: true,
      jsx: ts.JsxEmit.React,
    })
    ts.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    })
  }
}
