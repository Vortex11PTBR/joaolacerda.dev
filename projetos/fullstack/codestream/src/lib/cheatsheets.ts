// ── Static cheat sheet data for all 9 languages ───────────────────────────
// Lazy-loaded — zero cost until the panel is opened.

export interface CheatItem {
  title: string
  code?: string
  desc?: string
  table?: [string, string][]
}
export interface CheatSection {
  cat: string
  items: CheatItem[]
}
export type LangCheatSheets = Record<string, CheatSection[]>

const DATA: LangCheatSheets = {

// ══════════════════════════════════════════════════════════════════════════
// PYTHON
// ══════════════════════════════════════════════════════════════════════════
python: [
  { cat: 'Getting Started', items: [
    { title: 'Hello World', code: 'print("Hello, World!")' },
    { title: 'Variables', code: 'age = 18\nname = "John"\npi = 3.14\nactive = True' },
    { title: 'f-Strings', code: 'name = "Alice"\nprint(f"Hello, {name}!")\nprint(f"{2 + 2 = }")  # => 2 + 2 = 4' },
    { title: 'Type Hints', code: 'def greet(name: str) -> str:\n    return f"Hi {name}"\n\nfrom typing import Optional\ndef find(x: Optional[int] = None) -> list[int]:\n    return []' },
    { title: 'Multiple Assignment', code: 'a, b, c = 1, 2, 3\nfirst, *rest = [1, 2, 3, 4]\nx = y = 0' },
    { title: 'Arithmetic', code: '10 + 3   # 13\n10 - 3   # 7\n10 * 3   # 30\n10 / 3   # 3.333 (float)\n10 // 3  # 3 (floor div)\n10 % 3   # 1 (modulo)\n2 ** 10  # 1024 (power)' },
  ]},
  { cat: 'Strings', items: [
    { title: 'String Methods', code: 's = "Hello, World!"\ns.upper()         # "HELLO, WORLD!"\ns.lower()         # "hello, world!"\ns.strip()         # removes whitespace\ns.replace("H","J")# "Jello, World!"\ns.split(", ")     # ["Hello", "World!"]\n", ".join(["a","b"]) # "a, b"' },
    { title: 'Slicing', code: 's = "Python"\ns[0]    # P\ns[-1]   # n\ns[1:4]  # yth\ns[:3]   # Pyt\ns[3:]   # hon\ns[::-1] # nohtyP (reversed)' },
    { title: 'String Formatting', code: '# f-string (recommended)\nf"pi = {3.14159:.2f}"   # "pi = 3.14"\nf"{1000000:,}"           # "1,000,000"\nf"{"left":<10}"          # "left      "\nf"{"right":>10}"         # "     right"\n\n# format()\n"{:.2%}".format(0.256)  # "25.60%"' },
    { title: 'Multiline & Raw', code: 'multi = """\nLine 1\nLine 2\n"""\nraw = r"C:\\Users\\name"  # no escape\nbytes_str = b"hello"     # bytes' },
    { title: 'String Checks', code: '"hello".startswith("he") # True\n"hello".endswith("lo")   # True\n"42".isdigit()            # True\n"abc".isalpha()           # True\n"hi" in "hi there"        # True' },
  ]},
  { cat: 'Lists', items: [
    { title: 'List Basics', code: 'lst = [1, 2, 3]\nlst.append(4)      # [1,2,3,4]\nlst.insert(0, 0)   # [0,1,2,3,4]\nlst.pop()          # returns 4\nlst.pop(0)         # returns 0\nlst.remove(2)      # removes first 2\nlst.sort()         # in-place sort\nlst.reverse()      # in-place reverse\nlen(lst)           # length' },
    { title: 'List Comprehensions', code: 'squares = [x**2 for x in range(10)]\nevens   = [x for x in range(20) if x % 2 == 0]\nmatrix  = [[i*j for j in range(3)] for i in range(3)]\n\n# Flatten\nflat = [x for row in matrix for x in row]' },
    { title: 'Useful Operations', code: 'sorted([3,1,2])           # [1,2,3]\nsorted(lst, key=len)     # sort by length\nsum([1,2,3])             # 6\nmin([3,1,2]), max(...)   # 1, 3\nlist(filter(lambda x: x>0, lst))\nlist(map(lambda x: x*2, lst))\nlist(zip([1,2],[3,4]))   # [(1,3),(2,4)]' },
    { title: 'Slicing Lists', code: 'lst = [0,1,2,3,4,5]\nlst[2:4]   # [2,3]\nlst[:3]    # [0,1,2]\nlst[::2]   # [0,2,4] (every 2nd)\nlst[::-1]  # [5,4,3,2,1,0] reversed\nlst[1:4:2] # [1,3]' },
  ]},
  { cat: 'Dictionaries & Sets', items: [
    { title: 'Dict Basics', code: 'd = {"name": "Alice", "age": 30}\nd["city"] = "NY"          # add\nd.get("missing", "N/A")   # safe get\nd.keys()                  # dict_keys\nd.values()                # dict_values\nd.items()                 # dict_items\nd.pop("age")              # remove & return\n"name" in d              # True' },
    { title: 'Dict Comprehension', code: 'squares = {x: x**2 for x in range(5)}\nfiltered = {k:v for k,v in d.items() if v > 0}\ninverted = {v:k for k,v in d.items()}' },
    { title: 'Sets', code: 's1 = {1, 2, 3}\ns2 = {3, 4, 5}\ns1 | s2   # union     {1,2,3,4,5}\ns1 & s2   # intersect {3}\ns1 - s2   # diff      {1,2}\ns1 ^ s2   # sym diff  {1,2,4,5}\ns1.add(6)\ns1.discard(1)  # no error if missing' },
    { title: 'defaultdict & Counter', code: 'from collections import defaultdict, Counter\n\nd = defaultdict(list)\nd["a"].append(1)  # no KeyError\n\nc = Counter("banana")\n# Counter({"a":3,"n":2,"b":1})\nc.most_common(2)  # top 2' },
  ]},
  { cat: 'Functions', items: [
    { title: 'Function Basics', code: 'def add(a: int, b: int = 0) -> int:\n    """Adds two numbers."""\n    return a + b\n\n# *args and **kwargs\ndef variadic(*args, **kwargs):\n    print(args, kwargs)\n\nvariadic(1, 2, key="value")' },
    { title: 'Lambda & Higher-Order', code: 'square = lambda x: x ** 2\n\n# map / filter / reduce\nfrom functools import reduce\ndoubled = list(map(lambda x: x*2, [1,2,3]))\npos     = list(filter(lambda x: x>0, [-1,2,-3]))\ntotal   = reduce(lambda a,b: a+b, [1,2,3,4])' },
    { title: 'Decorators', code: 'import functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        import time\n        t = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__}: {time.time()-t:.3f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow(): ...' },
    { title: 'Generators', code: 'def fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nfib = fibonacci()\nprint(next(fib))  # 0\nprint(next(fib))  # 1\n\n# Generator expression\nsq = (x**2 for x in range(10))' },
  ]},
  { cat: 'Classes & OOP', items: [
    { title: 'Class Definition', code: 'class Animal:\n    species = "Unknown"  # class var\n\n    def __init__(self, name: str):\n        self.name = name  # instance var\n\n    def speak(self) -> str:\n        return f"{self.name} speaks"\n\n    @classmethod\n    def create(cls, name): return cls(name)\n\n    @staticmethod\n    def info(): return "I am an animal"\n\n    def __repr__(self): return f"Animal({self.name!r})"' },
    { title: 'Inheritance', code: 'class Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\n    def speak(self) -> str:  # override\n        return f"{self.name} barks"\n\nd = Dog("Rex", "Lab")\nisinstance(d, Animal)  # True' },
    { title: 'Dataclasses', code: 'from dataclasses import dataclass, field\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n    tags: list = field(default_factory=list)\n\n    def distance(self) -> float:\n        return (self.x**2 + self.y**2) ** 0.5\n\np = Point(3.0, 4.0)\np.distance()  # 5.0' },
    { title: 'Dunder Methods', code: 'class Vector:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __add__(self, o):  return Vector(self.x+o.x, self.y+o.y)\n    def __mul__(self, s):  return Vector(self.x*s, self.y*s)\n    def __len__(self):     return 2\n    def __repr__(self):   return f"Vector({self.x}, {self.y})"' },
  ]},
  { cat: 'Error Handling', items: [
    { title: 'Try / Except', code: 'try:\n    x = int("abc")\nexcept ValueError as e:\n    print(f"Error: {e}")\nexcept (TypeError, KeyError):\n    print("multiple types")\nelse:\n    print("no error")\nfinally:\n    print("always runs")' },
    { title: 'Custom Exceptions', code: 'class AppError(Exception):\n    def __init__(self, msg, code=500):\n        super().__init__(msg)\n        self.code = code\n\nraise AppError("not found", 404)' },
    { title: 'Context Managers', code: 'class ManagedFile:\n    def __init__(self, path):\n        self.path = path\n    def __enter__(self):\n        self.f = open(self.path)\n        return self.f\n    def __exit__(self, *args):\n        self.f.close()\n\nwith ManagedFile("data.txt") as f:\n    content = f.read()' },
  ]},
  { cat: 'Advanced', items: [
    { title: 'Async / Await', code: 'import asyncio\n\nasync def fetch(url: str) -> str:\n    await asyncio.sleep(1)  # simulate I/O\n    return f"data from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("url1"),\n        fetch("url2"),\n    )\n    print(results)\n\nasyncio.run(main())' },
    { title: 'Type Aliases & Protocol', code: 'from typing import TypeAlias, Protocol\n\nVector: TypeAlias = list[float]\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\nclass Circle:\n    def draw(self): print("○")  # satisfies Protocol' },
    { title: 'itertools', code: 'import itertools\n\nitertools.chain([1,2],[3,4])     # 1,2,3,4\nitertools.product("AB", repeat=2)# AA,AB,BA,BB\nitertools.combinations([1,2,3],2)# (1,2),(1,3),(2,3)\nitertools.permutations([1,2,3],2)\nitertools.groupby(sorted_data, key=lambda x: x["group"])' },
    { title: 'Pathlib & JSON', code: 'from pathlib import Path\nimport json\n\np = Path("data") / "config.json"\np.mkdir(parents=True, exist_ok=True)\np.write_text(json.dumps({"k":"v"}))\ndata = json.loads(p.read_text())' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// TYPESCRIPT
// ══════════════════════════════════════════════════════════════════════════
typescript: [
  { cat: 'Getting Started', items: [
    { title: 'Basic Types', code: 'let name: string = "Alice"\nlet age: number = 30\nlet active: boolean = true\nlet nothing: null = null\nlet undef: undefined = undefined\nlet any: any = "anything"\nlet unknown: unknown = 42' },
    { title: 'Arrays & Tuples', code: 'let nums: number[] = [1, 2, 3]\nlet strs: Array<string> = ["a"]\nlet tuple: [string, number] = ["Alice", 30]\nlet readonly: readonly number[] = [1,2,3]' },
    { title: 'Union & Intersection', code: 'type ID = string | number\ntype Nullable<T> = T | null\n\ntype A = { name: string }\ntype B = { age: number }\ntype AB = A & B  // must have both' },
    { title: 'Literal Types', code: 'type Dir = "north" | "south" | "east" | "west"\ntype Status = 200 | 404 | 500\ntype Bool = true | false\n\nfunction move(dir: Dir): void { }' },
    { title: 'Enums', code: 'enum Direction { Up, Down, Left, Right }\nDirection.Up  // 0\n\nconst enum Color { Red = "RED", Blue = "BLUE" }\n// const enum is inlined at compile time' },
  ]},
  { cat: 'Interfaces & Types', items: [
    { title: 'Interface', code: 'interface User {\n  readonly id: number\n  name: string\n  email?: string  // optional\n  greet(): string\n}\n\ninterface Admin extends User {\n  permissions: string[]\n}' },
    { title: 'Type vs Interface', code: '// Interface — extendable, for objects\ninterface Dog { bark(): void }\ninterface Dog { fetch(): void }  // merges!\n\n// Type — flexible, for unions/aliases\ntype Cat = { meow(): void } | null' },
    { title: 'Index Signatures', code: 'interface Dict {\n  [key: string]: unknown\n}\n\ninterface TypedDict {\n  [key: string]: number\n  length: number  // must match value type\n}' },
    { title: 'Mapped Types', code: 'type Optional<T> = { [K in keyof T]?: T[K] }\ntype Readonly<T> = { readonly [K in keyof T]: T[K] }\ntype Nullable<T> = { [K in keyof T]: T[K] | null }\n\n// Built-in: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>' },
  ]},
  { cat: 'Functions', items: [
    { title: 'Function Types', code: 'function add(a: number, b: number): number {\n  return a + b\n}\n\nconst greet = (name: string): string => `Hi ${name}`\n\ntype BinaryFn = (a: number, b: number) => number\n\n// Optional & default params\nfunction log(msg: string, level = "info", ctx?: string) {}' },
    { title: 'Overloads', code: 'function format(val: string): string\nfunction format(val: number): string\nfunction format(val: string | number): string {\n  return String(val)\n}' },
    { title: 'Generics', code: 'function identity<T>(arg: T): T { return arg }\n\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0]\n}\n\nconst pair = <A, B>(a: A, b: B): [A, B] => [a, b]' },
  ]},
  { cat: 'Generics & Utility', items: [
    { title: 'Generic Constraints', code: 'function getLen<T extends { length: number }>(x: T): number {\n  return x.length\n}\n\nfunction prop<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key]\n}' },
    { title: 'Utility Types', code: 'type P = Partial<User>       // all optional\ntype R = Required<User>      // all required\ntype RO = Readonly<User>     // all readonly\ntype Pick1 = Pick<User, "id"|"name">\ntype Omit1 = Omit<User, "email">\ntype Record1 = Record<string, number>\ntype Exclude1 = Exclude<"a"|"b"|"c", "a">\ntype Extract1 = Extract<string|number, string>\ntype NonNull = NonNullable<string|null>\ntype Ret = ReturnType<typeof greet>\ntype Param = Parameters<typeof add>[0]' },
    { title: 'Conditional Types', code: 'type IsArray<T> = T extends any[] ? true : false\ntype Unwrap<T> = T extends Promise<infer U> ? U : T\ntype Flatten<T> = T extends (infer I)[] ? I : T\n\n// Unwrap<Promise<string>> => string' },
    { title: 'Template Literal Types', code: 'type EventName = "click" | "focus"\ntype Handler = `on${Capitalize<EventName>}`\n// "onClick" | "onFocus"\n\ntype Getter<T extends string> = `get${Capitalize<T>}`' },
  ]},
  { cat: 'Classes', items: [
    { title: 'Class', code: 'class Animal {\n  readonly id: number\n  #secret = "hidden"  // private field\n\n  constructor(\n    public name: string,\n    protected age: number\n  ) {\n    this.id = Math.random()\n  }\n\n  get info(): string { return `${this.name}:${this.age}` }\n  set info(v: string) { this.name = v.split(":")[0] }\n\n  static create(name: string) { return new Animal(name, 0) }\n}' },
    { title: 'Implements & Extends', code: 'interface Serializable {\n  serialize(): string\n}\n\nclass Dog extends Animal implements Serializable {\n  constructor(name: string, public breed: string) {\n    super(name, 0)\n  }\n  serialize() { return JSON.stringify(this) }\n}' },
    { title: 'Abstract Classes', code: 'abstract class Shape {\n  abstract area(): number\n  abstract perimeter(): number\n  describe(): string {\n    return `area=${this.area()}`\n  }\n}\n\nclass Circle extends Shape {\n  constructor(public r: number) { super() }\n  area() { return Math.PI * this.r ** 2 }\n  perimeter() { return 2 * Math.PI * this.r }\n}' },
  ]},
  { cat: 'Async & Patterns', items: [
    { title: 'Async / Await', code: 'async function fetchUser(id: number): Promise<User> {\n  const res = await fetch(`/api/users/${id}`)\n  if (!res.ok) throw new Error(`HTTP ${res.status}`)\n  return res.json() as Promise<User>\n}\n\n// Parallel\nconst [a, b] = await Promise.all([fetchUser(1), fetchUser(2)])' },
    { title: 'Type Guards', code: 'function isString(x: unknown): x is string {\n  return typeof x === "string"\n}\n\nfunction isUser(x: unknown): x is User {\n  return typeof x === "object" && x !== null && "id" in x\n}\n\n// Discriminated union\ntype Result<T> = { ok: true; data: T } | { ok: false; error: string }' },
    { title: 'Decorators (experimental)', code: '// tsconfig: "experimentalDecorators": true\nfunction Log(target: any, key: string, desc: PropertyDescriptor) {\n  const orig = desc.value\n  desc.value = function(...args: any[]) {\n    console.log(`${key}(${args})`)\n    return orig.apply(this, args)\n  }\n}\n\nclass Svc { @Log greet(name: string) { return `Hi ${name}` } }' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// JAVASCRIPT
// ══════════════════════════════════════════════════════════════════════════
javascript: [
  { cat: 'Getting Started', items: [
    { title: 'Variables', code: 'var old = 1   // function-scoped, hoisted\nlet mutable = 2  // block-scoped\nconst FIXED = 3  // block-scoped, no reassign\n\n// Destructuring\nconst [a, b, ...rest] = [1, 2, 3, 4]\nconst { name, age = 0 } = { name: "Alice" }' },
    { title: 'Data Types', code: 'typeof "hello"     // "string"\ntypeof 42          // "number"\ntypeof true        // "boolean"\ntypeof undefined   // "undefined"\ntypeof null        // "object" (quirk!)\ntypeof {}          // "object"\ntypeof []          // "object"\ntypeof function(){} // "function"\ntypeof Symbol()    // "symbol"\ntypeof 42n         // "bigint"' },
    { title: 'Template Literals', code: 'const name = "World"\n`Hello, ${name}!`\n`${2 + 2}`          // "4"\n`multi\nline`          // multiline\nString.raw`C:\\n`   // raw string' },
    { title: 'Spread & Rest', code: '// Spread\nconst a = [1, 2]\nconst b = [...a, 3, 4]  // [1,2,3,4]\nconst obj2 = { ...obj1, extra: true }\n\n// Rest\nfunction sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0)\n}' },
  ]},
  { cat: 'Arrays', items: [
    { title: 'Array Methods', code: 'const arr = [1, 2, 3, 4, 5]\narr.map(x => x * 2)       // [2,4,6,8,10]\narr.filter(x => x > 2)    // [3,4,5]\narr.reduce((s, x) => s+x, 0) // 15\narr.find(x => x > 3)      // 4\narr.findIndex(x => x > 3) // 3\narr.some(x => x > 4)      // true\narr.every(x => x > 0)     // true\narr.includes(3)           // true\narr.flat()                // flatten one level\narr.flatMap(x => [x, x*2])' },
    { title: 'Sorting & Searching', code: '[3,1,2].sort()               // [1,2,3] (string sort!)\n[3,1,2].sort((a,b) => a-b)   // numeric asc\n[3,1,2].sort((a,b) => b-a)   // numeric desc\n[{n:2},{n:1}].sort((a,b) => a.n-b.n)\n\n[1,2,3].indexOf(2)   // 1\n[1,2,3].lastIndexOf(2) // 1' },
    { title: 'Array Destructuring', code: 'const [first, second, ...rest] = [1,2,3,4,5]\nconst [a, , b] = [1, 2, 3]  // skip elements\nconst [x = 10] = []         // default value\n\n// Swap\nlet p = 1, q = 2\n;[p, q] = [q, p]' },
  ]},
  { cat: 'Objects', items: [
    { title: 'Object Methods', code: 'const obj = { a: 1, b: 2, c: 3 }\nObject.keys(obj)    // ["a","b","c"]\nObject.values(obj)  // [1,2,3]\nObject.entries(obj) // [["a",1],["b",2],["c",3]]\nObject.fromEntries([["a",1],["b",2]])\nObject.assign({}, obj, { d: 4 })\nObject.freeze(obj)  // immutable\nObject.create(proto)' },
    { title: 'Optional Chaining & Nullish', code: 'const user = null\nuser?.name          // undefined (no error)\nuser?.address?.city // undefined\nuser?.greet()       // undefined\n\nconst name = user?.name ?? "Guest"  // "Guest"\nuser?.name ||= "default"  // assign if falsy' },
    { title: 'Shorthand & Computed', code: 'const x = 1, y = 2\nconst point = { x, y }  // { x: 1, y: 2 }\n\nconst key = "dynamic"\nconst obj = { [key]: 42 }  // { dynamic: 42 }\n\nconst { a: renamed, b: other = 0 } = obj' },
  ]},
  { cat: 'Functions', items: [
    { title: 'Arrow Functions', code: '// Traditional\nfunction add(a, b) { return a + b }\n\n// Arrow\nconst add = (a, b) => a + b\nconst square = x => x * x\nconst getObj = () => ({ key: "val" })\n\n// this binding: arrow inherits from outer scope\nclass Timer {\n  count = 0\n  start() { setInterval(() => this.count++, 1000) }\n}' },
    { title: 'Closures', code: 'function counter() {\n  let count = 0\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    val: () => count,\n  }\n}\nconst c = counter()\nc.inc(); c.inc(); c.val() // 2' },
    { title: 'IIFE & Currying', code: '// IIFE\n(function() { console.log("runs immediately") })()\n\n// Currying\nconst curry = f => a => b => f(a, b)\nconst add = curry((a, b) => a + b)\nadd(1)(2)  // 3' },
  ]},
  { cat: 'Async & Promises', items: [
    { title: 'Promises', code: 'const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("done"), 1000)\n})\n\np.then(val => console.log(val))\n .catch(err => console.error(err))\n .finally(() => console.log("cleanup"))\n\nPromise.all([p1, p2])     // all resolve\nPromise.race([p1, p2])    // first settles\nPromise.allSettled([...]) // all settle\nPromise.any([...])        // first resolves' },
    { title: 'Async / Await', code: 'async function getUser(id) {\n  try {\n    const res = await fetch(`/api/${id}`)\n    if (!res.ok) throw new Error(res.statusText)\n    return await res.json()\n  } catch (e) {\n    console.error(e)\n  }\n}\n\n// Parallel\nconst [a, b] = await Promise.all([fetch(u1), fetch(u2)])' },
    { title: 'Generators & Iterators', code: 'function* range(start, end, step = 1) {\n  for (let i = start; i < end; i += step) yield i\n}\n\nfor (const n of range(0, 10, 2)) console.log(n)\n// 0 2 4 6 8\n\n// Custom iterator\nconst iterable = {\n  [Symbol.iterator]() {\n    let n = 0\n    return { next: () => ({ value: n++, done: n > 3 }) }\n  }\n}' },
  ]},
  { cat: 'Modern JS (ES6+)', items: [
    { title: 'Classes', code: 'class Animal {\n  #name  // private field\n  static count = 0\n\n  constructor(name) {\n    this.#name = name\n    Animal.count++\n  }\n\n  get name() { return this.#name }\n  speak() { return `${this.#name} speaks` }\n}\n\nclass Dog extends Animal {\n  bark() { return "Woof!" }\n}' },
    { title: 'Modules', code: '// export\nexport const PI = 3.14\nexport function add(a, b) { return a + b }\nexport default class App { }\n\n// import\nimport App, { PI, add } from "./module"\nimport * as utils from "./utils"\nimport { fn as alias } from "./mod"' },
    { title: 'WeakMap & Symbol', code: 'const sym = Symbol("desc")  // unique\nSymbol.for("shared")        // global registry\n\nconst wm = new WeakMap()    // keys are objects, GC-friendly\nwm.set(obj, metadata)\nwm.get(obj)\n\nconst ws = new WeakSet()\nws.add(element)' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// RUST
// ══════════════════════════════════════════════════════════════════════════
rust: [
  { cat: 'Getting Started', items: [
    { title: 'Hello World', code: 'fn main() {\n    println!("Hello, {}!", "world");\n    eprintln!("Error to stderr");\n    print!("no newline");\n}' },
    { title: 'Variables & Mutability', code: 'let x = 5;        // immutable\nlet mut y = 5;    // mutable\ny += 1;\nconst MAX: u32 = 100_000; // constant\n\nlet z = {\n    let a = 3;\n    a * a  // expression (no semicolon)\n}; // z = 9' },
    { title: 'Primitive Types', code: 'let i: i32 = -42;    // i8,i16,i32,i64,i128,isize\nlet u: u64 = 42;     // u8,u16,u32,u64,u128,usize\nlet f: f64 = 3.14;   // f32, f64\nlet b: bool = true;\nlet c: char = \'🦀\';\nlet t: (i32, f64, char) = (1, 2.0, \'a\');\nlet arr: [i32; 5] = [1, 2, 3, 4, 5];\nlet zeros = [0; 10]; // 10 zeros' },
    { title: 'Shadowing', code: 'let x = 5;\nlet x = x + 1;    // shadow x\n{\n    let x = x * 2;  // shadow in block\n    println!("{x}"); // 12\n}\nprintln!("{x}");     // 6\n\n// Can change type!\nlet spaces = "   ";\nlet spaces = spaces.len(); // now usize' },
  ]},
  { cat: 'Ownership & Borrowing', items: [
    { title: 'Ownership Rules', code: '// 1. Each value has exactly one owner\n// 2. When owner goes out of scope, value is dropped\n// 3. There can only be one owner at a time\n\nlet s1 = String::from("hello");\nlet s2 = s1;  // s1 MOVED to s2\n// println!("{s1}");  // Error! s1 invalid\n\nlet s3 = s2.clone(); // explicit deep copy' },
    { title: 'Borrowing', code: 'fn len(s: &String) -> usize {  // immutable ref\n    s.len()\n}\n\nfn append(s: &mut String) {   // mutable ref\n    s.push_str(" world")\n}\n\nlet mut s = String::from("hello");\nprintln!("{}", len(&s));  // borrow\nappend(&mut s);           // mut borrow' },
    { title: 'Lifetimes', code: '// Explicit lifetime annotations\nfn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nstruct Important<\'a> {\n    part: &\'a str,  // ref lives at least as long as struct\n}' },
  ]},
  { cat: 'Functions & Closures', items: [
    { title: 'Functions', code: 'fn add(x: i32, y: i32) -> i32 {\n    x + y  // implicit return (no semicolon)\n}\n\nfn div(a: f64, b: f64) -> Option<f64> {\n    if b == 0.0 { None } else { Some(a / b) }\n}\n\n// Multiple return values via tuple\nfn min_max(v: &[i32]) -> (i32, i32) {\n    (*v.iter().min().unwrap(), *v.iter().max().unwrap())\n}' },
    { title: 'Closures', code: 'let double = |x: i32| x * 2;\nlet add = |x, y| x + y;  // types inferred\n\n// Capture by reference (default for non-Copy)\nlet msg = String::from("hi");\nlet print_msg = || println!("{msg}");\n\n// move closure (takes ownership)\nlet owned = move || println!("{msg}");' },
    { title: 'Iterators', code: 'let v = vec![1, 2, 3, 4, 5];\n\nv.iter().map(|x| x * 2).collect::<Vec<_>>()\nv.iter().filter(|&&x| x % 2 == 0).count()\nv.iter().sum::<i32>()  // 15\nv.iter().fold(0, |acc, x| acc + x)\nv.iter().enumerate()   // (index, value)\nv.iter().zip([6,7,8])  // pairs\nv.iter().flat_map(|x| [*x, x*10])' },
  ]},
  { cat: 'Structs & Enums', items: [
    { title: 'Structs', code: '#[derive(Debug, Clone, PartialEq)]\nstruct Point { x: f64, y: f64 }\n\nimpl Point {\n    fn new(x: f64, y: f64) -> Self { Self { x, y } }\n    fn distance(&self, other: &Point) -> f64 {\n        ((self.x-other.x).powi(2)+(self.y-other.y).powi(2)).sqrt()\n    }\n}\n\nlet p1 = Point::new(0.0, 0.0);\nlet p2 = Point { x: 3.0, ..p1 }; // struct update' },
    { title: 'Enums & Pattern Matching', code: '#[derive(Debug)]\nenum Shape {\n    Circle(f64),\n    Rect { w: f64, h: f64 },\n    Triangle(f64, f64, f64),\n}\n\nfn area(s: &Shape) -> f64 {\n    match s {\n        Shape::Circle(r)     => std::f64::consts::PI * r * r,\n        Shape::Rect { w, h } => w * h,\n        Shape::Triangle(a,b,c) => {\n            let s = (a+b+c)/2.0;\n            (s*(s-a)*(s-b)*(s-c)).sqrt()\n        }\n    }\n}' },
    { title: 'Option & Result', code: '// Option<T>\nlet some: Option<i32> = Some(42);\nlet none: Option<i32> = None;\nsome.unwrap()           // panics if None\nsome.unwrap_or(0)       // default\nsome.map(|x| x * 2)    // transform\nsome.and_then(|x| Some(x + 1))\n\n// Result<T, E>\nlet ok: Result<i32, String> = Ok(42);\nlet err: Result<i32, String> = Err("oops".into());\nok?  // propagate error (in fn returning Result)' },
  ]},
  { cat: 'Collections', items: [
    { title: 'Vec', code: 'let mut v: Vec<i32> = Vec::new();\nlet v = vec![1, 2, 3];         // macro\nv.push(4);\nv.pop();                        // Option<i32>\nv.len();\nv[0];                           // index (panics if OOB)\nv.get(0);                       // Option<&i32>\nv.extend([4, 5, 6]);\nv.retain(|&x| x % 2 == 0);     // filter in-place\nv.dedup();                      // remove consecutive dupes' },
    { title: 'HashMap', code: 'use std::collections::HashMap;\n\nlet mut scores: HashMap<String, i32> = HashMap::new();\nscores.insert("Alice".to_string(), 100);\nscores.entry("Bob".to_string()).or_insert(0);\n*scores.entry("Alice".to_string()).or_insert(0) += 10;\n\nfor (k, v) in &scores {\n    println!("{k}: {v}");\n}' },
  ]},
  { cat: 'Error Handling & Traits', items: [
    { title: 'Custom Errors', code: 'use std::fmt;\n\n#[derive(Debug)]\nenum AppError {\n    NotFound(String),\n    ParseError(std::num::ParseIntError),\n}\n\nimpl fmt::Display for AppError {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        match self {\n            AppError::NotFound(s) => write!(f, "not found: {s}"),\n            AppError::ParseError(e) => write!(f, "parse: {e}"),\n        }\n    }\n}\nimpl std::error::Error for AppError {}' },
    { title: 'Traits', code: 'trait Animal {\n    fn name(&self) -> &str;\n    fn speak(&self) -> String;\n    fn describe(&self) -> String {  // default impl\n        format!("{} says {}", self.name(), self.speak())\n    }\n}\n\nstruct Dog { name: String }\nimpl Animal for Dog {\n    fn name(&self) -> &str { &self.name }\n    fn speak(&self) -> String { "Woof!".into() }\n}\n\n// Trait objects (dynamic dispatch)\nfn make_sound(a: &dyn Animal) { println!("{}", a.speak()); }' },
    { title: 'Async (Tokio)', code: 'use tokio;\n\n#[tokio::main]\nasync fn main() {\n    let result = fetch_data("url").await;\n}\n\nasync fn fetch_data(url: &str) -> Result<String, Box<dyn std::error::Error>> {\n    let body = reqwest::get(url).await?.text().await?;\n    Ok(body)\n}' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// GO
// ══════════════════════════════════════════════════════════════════════════
go: [
  { cat: 'Getting Started', items: [
    { title: 'Hello World', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Printf("Pi is %.2f\\n", 3.14159)\n}' },
    { title: 'Variables', code: 'var x int = 10\nvar s string = "hello"\nvar b bool\n\n// Short declaration (inside functions)\ny := 42\nname := "Alice"\npi := 3.14\n\n// Multiple\na, b, c := 1, "two", true\n\nconst MaxSize = 100\nconst Pi = 3.14159' },
    { title: 'Types', code: 'bool\nstring\nint  int8  int16  int32  int64\nuint uint8 uint16 uint32 uint64 uintptr\nbyte  // alias uint8\nrune  // alias int32 (Unicode)\nfloat32 float64\ncomplex64 complex128' },
    { title: 'Zero Values', table: [
      ['int / float', '0'],['bool','false'],['string',`""`],['pointer','nil'],['slice/map','nil'],
    ]},
  ]},
  { cat: 'Functions', items: [
    { title: 'Function Basics', code: 'func add(x, y int) int {\n    return x + y\n}\n\n// Multiple return values\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 { return 0, fmt.Errorf("division by zero") }\n    return a / b, nil\n}\n\n// Named returns\nfunc minMax(arr []int) (min, max int) {\n    min, max = arr[0], arr[0]\n    for _, v := range arr {\n        if v < min { min = v }\n        if v > max { max = v }\n    }\n    return\n}' },
    { title: 'Variadic & Closures', code: 'func sum(nums ...int) int {\n    total := 0\n    for _, n := range nums { total += n }\n    return total\n}\nsum(1, 2, 3)       // 6\nsum([]int{4,5}...) // spread\n\n// Closures\nfunc counter() func() int {\n    n := 0\n    return func() int {\n        n++\n        return n\n    }\n}' },
    { title: 'Defer, Panic, Recover', code: 'func safeDiv(a, b int) (result int, err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf("recovered: %v", r)\n        }\n    }()\n    return a / b, nil\n}\n\n// Defer runs LIFO when function exits\nfunc cleanup() {\n    defer fmt.Println("third")\n    defer fmt.Println("second")\n    fmt.Println("first")\n}' },
  ]},
  { cat: 'Structs & Interfaces', items: [
    { title: 'Structs', code: 'type Point struct {\n    X, Y float64\n}\n\nfunc (p Point) Distance() float64 {\n    return math.Sqrt(p.X*p.X + p.Y*p.Y)\n}\n\nfunc (p *Point) Scale(factor float64) {\n    p.X *= factor\n    p.Y *= factor\n}\n\np := Point{X: 3, Y: 4}\np.Distance()  // 5\np.Scale(2)\n\n// Embedding\ntype ColorPoint struct {\n    Point\n    Color string\n}' },
    { title: 'Interfaces', code: 'type Stringer interface {\n    String() string\n}\n\ntype Animal interface {\n    Name() string\n    Speak() string\n}\n\ntype Dog struct{ name string }\nfunc (d Dog) Name() string  { return d.name }\nfunc (d Dog) Speak() string { return "Woof!" }\n\n// Empty interface\nvar any interface{} = "anything"\nv, ok := any.(string)  // type assertion\n\nswitch v := any.(type) {\ncase string: fmt.Println(v)\ncase int: fmt.Println(v * 2)\n}' },
  ]},
  { cat: 'Collections', items: [
    { title: 'Slices', code: 'var s []int                   // nil slice\ns = make([]int, 5)           // len=5, cap=5\ns = make([]int, 0, 10)       // len=0, cap=10\ns = []int{1, 2, 3}\ns = append(s, 4, 5)\ns2 := s[1:3]                 // [2, 3] (shared memory!)\ncopy(dst, src)\nlen(s); cap(s)\n\n// 2D\nmatrix := make([][]int, 3)\nfor i := range matrix { matrix[i] = make([]int, 3) }' },
    { title: 'Maps', code: 'var m map[string]int            // nil map\nm = make(map[string]int)\nm = map[string]int{"a": 1}\n\nm["key"] = 42\nval := m["key"]              // 0 if missing\nval, ok := m["key"]          // ok = false if missing\ndelete(m, "key")\n\nfor k, v := range m {\n    fmt.Println(k, v)\n}' },
  ]},
  { cat: 'Goroutines & Channels', items: [
    { title: 'Goroutines', code: 'go func() {\n    fmt.Println("runs concurrently")\n}()\n\nvar wg sync.WaitGroup\nfor i := 0; i < 5; i++ {\n    wg.Add(1)\n    go func(id int) {\n        defer wg.Done()\n        fmt.Printf("worker %d\\n", id)\n    }(i)\n}\nwg.Wait()' },
    { title: 'Channels', code: 'ch := make(chan int)       // unbuffered\nch := make(chan int, 10)   // buffered\n\ngo func() { ch <- 42 }()  // send\nv := <-ch                 // receive\n\n// Select\nselect {\ncase msg := <-ch1: fmt.Println(msg)\ncase ch2 <- 99:\ncase <-time.After(1 * time.Second):\n    fmt.Println("timeout")\n}' },
    { title: 'Mutex & Once', code: 'import "sync"\n\ntype SafeCounter struct {\n    mu sync.Mutex\n    v  map[string]int\n}\n\nfunc (c *SafeCounter) Inc(key string) {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    c.v[key]++\n}\n\nvar once sync.Once\nonce.Do(func() { /* runs exactly once */ })' },
  ]},
  { cat: 'Error Handling', items: [
    { title: 'Errors', code: 'import "errors"\n\nvar ErrNotFound = errors.New("not found")\n\n// Custom error type\ntype AppError struct {\n    Code    int\n    Message string\n}\nfunc (e *AppError) Error() string {\n    return fmt.Sprintf("[%d] %s", e.Code, e.Message)\n}\n\n// errors.Is / errors.As\nerrors.Is(err, ErrNotFound)\nvar appErr *AppError\nerrors.As(err, &appErr)' },
    { title: 'Error Wrapping', code: 'err := doSomething()\nif err != nil {\n    return fmt.Errorf("context: %w", err)  // wrap\n}\n\n// Unwrap\noriginal := errors.Unwrap(wrappedErr)' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// C++
// ══════════════════════════════════════════════════════════════════════════
cpp: [
  { cat: 'Getting Started', items: [
    { title: 'Hello World', code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    cerr << "Error" << endl;\n    return 0;\n}' },
    { title: 'Variables & Types', code: 'int i = 42;\ndouble d = 3.14;\nfloat f = 3.14f;\nbool b = true;\nchar c = \'A\';\nauto x = 42;     // type deduced\nconst int MAX = 100;\nconstexpr int SIZE = 256;  // compile-time\n\n// C++11 uniform init\nint arr[] {1, 2, 3};\nvector<int> v {1, 2, 3};' },
    { title: 'Strings', code: '#include <string>\n\nstring s = "Hello";\ns += " World";\ns.length();  s.size();\ns.substr(0, 5);       // "Hello"\ns.find("World");      // position\ns.replace(0, 5, "Hi");\ns.empty();\n\n// String stream\n#include <sstream>\nostringstream oss;\noss << "pi=" << 3.14;\noss.str();  // "pi=3.14"' },
  ]},
  { cat: 'Control Flow', items: [
    { title: 'Loops', code: '// range-based for (C++11)\nfor (const auto& item : container) {}\nfor (auto [key, val] : map) {}  // structured binding\n\n// traditional\nfor (int i = 0; i < n; ++i) {}\nwhile (cond) {}\ndo { } while (cond);' },
    { title: 'Modern Switch', code: '// C++17 init statement\nswitch (auto x = getValue(); x) {\n    case 1: break;\n    case 2: [[fallthrough]];\n    case 3: break;\n    default: break;\n}\n\n// if init\nif (auto it = m.find(k); it != m.end()) {\n    use(it->second);\n}' },
  ]},
  { cat: 'Functions', items: [
    { title: 'Functions & Overloading', code: 'int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\n// Default args\nvoid log(string msg, int level = 0);\n\n// Inline\ninline int square(int x) { return x * x; }' },
    { title: 'Lambdas', code: '// [capture](params) -> return { body }\nauto sq = [](int x) { return x * x; };\nauto add = [](int a, int b) -> int { return a + b; };\n\nint factor = 2;\nauto mul = [factor](int x) { return x * factor; }; // capture by value\nauto inc = [&factor](int x) { factor++; return x; }; // by ref\n\n// Generic lambda (C++14)\nauto print = [](auto x) { cout << x; };' },
    { title: 'Templates', code: 'template<typename T>\nT max(T a, T b) { return a > b ? a : b; }\n\ntemplate<typename T, int N>\nstruct Array { T data[N]; };\n\n// Variadic template (C++11)\ntemplate<typename... Args>\nvoid print(Args... args) {\n    (cout << ... << args) << endl;  // fold expression C++17\n}' },
  ]},
  { cat: 'Classes & OOP', items: [
    { title: 'Class', code: 'class Shape {\npublic:\n    Shape(double x, double y) : x_(x), y_(y) {}\n    virtual ~Shape() = default;\n    virtual double area() const = 0;     // pure virtual\n    virtual string name() const { return "Shape"; }\nprivate:\n    double x_, y_;\nprotected:\n    double x() const { return x_; }\n};\n\nclass Circle : public Shape {\npublic:\n    Circle(double r) : Shape(0,0), r_(r) {}\n    double area() const override { return M_PI * r_ * r_; }\nprivate: double r_;\n};' },
    { title: 'Rule of Five', code: 'class Buffer {\n    int* data; size_t size;\npublic:\n    Buffer(size_t n) : data(new int[n]), size(n) {}\n    ~Buffer() { delete[] data; }        // destructor\n    Buffer(const Buffer& o) { /* copy ctor */ }\n    Buffer& operator=(const Buffer& o) { /* copy assign */ return *this; }\n    Buffer(Buffer&& o) noexcept : data(o.data), size(o.size) {\n        o.data = nullptr; }             // move ctor\n    Buffer& operator=(Buffer&& o) noexcept { /* move assign */ return *this; }\n};' },
  ]},
  { cat: 'STL & Modern C++', items: [
    { title: 'Containers', code: '#include <vector>\n#include <map>\n#include <unordered_map>\n#include <set>\n#include <queue>\n#include <stack>\n\nvector<int> v = {1,2,3};\nmap<string,int> m;       // ordered\nunordered_map<string,int> um; // O(1) avg\nset<int> s;\npriority_queue<int> pq;  // max heap\nqueue<int> q;\nstack<int> stk;' },
    { title: 'Algorithms', code: '#include <algorithm>\n#include <numeric>\n\nvector<int> v = {3,1,4,1,5,9};\nsort(v.begin(), v.end());\nreverse(v.begin(), v.end());\nauto it = find(v.begin(), v.end(), 4);\ncount(v.begin(), v.end(), 1);       // 2\naccumulate(v.begin(), v.end(), 0);  // sum\ntransform(v.begin(), v.end(), v.begin(), [](int x) { return x*2; });\nstd::ranges::sort(v);               // C++20' },
    { title: 'Smart Pointers', code: '#include <memory>\n\nauto up = make_unique<Circle>(5.0); // exclusive ownership\nauto sp = make_shared<Circle>(5.0); // shared ownership\nweak_ptr<Circle> wp = sp;           // non-owning\n\nup->area();  sp->area();\n\n// Move unique_ptr\nauto up2 = move(up);  // up is now null' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// JAVA
// ══════════════════════════════════════════════════════════════════════════
java: [
  { cat: 'Getting Started', items: [
    { title: 'Hello World', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.printf("Pi = %.2f%n", Math.PI);\n    }\n}' },
    { title: 'Variables & Types', code: 'int i = 42;\ndouble d = 3.14;\nboolean b = true;\nchar c = \'A\';\nString s = "hello";  // object\nvar x = 42;  // type inference (Java 10+)\n\n// Wrappers\nInteger boxed = 42;\nint unboxed = boxed;  // auto-unboxing\n\nfinal int CONST = 100;  // can\'t reassign' },
    { title: 'Strings', code: 'String s = "Hello World";\ns.length();\ns.toUpperCase(); s.toLowerCase();\ns.trim(); s.strip();  // strip handles Unicode\ns.substring(0, 5);\ns.contains("World");\ns.replace("World", "Java");\ns.split(" ");\nString.join("-", "a", "b", "c");\n\n// String.format\nString.format("Name: %s, Age: %d", name, age);\n\n// StringBuilder (mutable)\nvar sb = new StringBuilder();\nsb.append("a").append("b").toString();' },
  ]},
  { cat: 'Collections', items: [
    { title: 'List', code: 'import java.util.*;\n\nList<String> list = new ArrayList<>();\nlist.add("a"); list.add("b");\nlist.get(0);          // "a"\nlist.set(0, "x");     // update\nlist.remove(0);       // by index\nlist.remove("b");     // by value\nlist.size();\nlist.contains("a");\nCollections.sort(list);\n\n// Immutable\nList<String> fixed = List.of("a", "b", "c");\n\n// LinkedList as deque\nDeque<Integer> dq = new LinkedList<>();\ndq.push(1); dq.pop();' },
    { title: 'Map', code: 'Map<String, Integer> map = new HashMap<>();\nmap.put("a", 1);\nmap.get("a");           // 1\nmap.getOrDefault("z", 0);\nmap.containsKey("a");\nmap.remove("a");\nmap.putIfAbsent("b", 2);\nmap.merge("a", 1, Integer::sum); // add to existing\n\nfor (Map.Entry<String,Integer> e : map.entrySet()) {\n    System.out.println(e.getKey() + "=" + e.getValue());\n}\n\n// Ordered\nMap<String,Integer> sorted = new TreeMap<>(map);' },
    { title: 'Set & Queue', code: 'Set<Integer> set = new HashSet<>();\nset.add(1); set.add(2); set.add(1); // {1,2}\nset.contains(1);\nset.remove(1);\n\nSet<Integer> linkedSet = new LinkedHashSet<>(); // insertion order\nSet<Integer> sortedSet = new TreeSet<>();        // sorted\n\nQueue<Integer> q = new LinkedList<>();\nq.offer(1); q.offer(2);  // enqueue\nq.poll();                 // dequeue, null if empty\nq.peek();                 // head, null if empty' },
  ]},
  { cat: 'OOP', items: [
    { title: 'Class & Inheritance', code: 'public class Animal {\n    private final String name;\n\n    public Animal(String name) { this.name = name; }\n    public String getName() { return name; }\n    public String speak() { return name + " speaks"; }\n\n    @Override public String toString() {\n        return "Animal(" + name + ")";\n    }\n}\n\npublic class Dog extends Animal {\n    public Dog(String name) { super(name); }\n    @Override public String speak() { return getName() + " barks"; }\n}' },
    { title: 'Interfaces & Abstract', code: 'interface Drawable {\n    void draw();\n    default String describe() { return "I am drawable"; }\n    static Drawable noOp() { return () -> {}; }\n}\n\ninterface Resizable { void resize(double factor); }\n\nabstract class Shape implements Drawable, Resizable {\n    protected double x, y;\n    abstract double area();\n}' },
    { title: 'Records (Java 16+)', code: '// Immutable data classes\npublic record Point(double x, double y) {\n    // Compact constructor\n    Point {\n        if (x < 0 || y < 0) throw new IllegalArgumentException();\n    }\n\n    public double distance() {\n        return Math.sqrt(x * x + y * y);\n    }\n}\n\nPoint p = new Point(3, 4);\np.x(); p.y(); p.distance();' },
  ]},
  { cat: 'Streams & Functional', items: [
    { title: 'Streams', code: 'import java.util.stream.*;\n\nList<Integer> nums = List.of(1,2,3,4,5);\n\nnums.stream()\n    .filter(x -> x % 2 == 0)\n    .map(x -> x * x)\n    .collect(Collectors.toList());\n\nnums.stream().reduce(0, Integer::sum);\nnums.stream().mapToInt(Integer::intValue).average();\nnums.stream().sorted().distinct().limit(3).toList();\n\n// Grouping\nMap<Boolean,List<Integer>> grouped =\n    nums.stream().collect(Collectors.partitioningBy(x -> x%2==0));\n\n// Parallel\nnums.parallelStream().map(x -> heavyWork(x)).toList();' },
    { title: 'Optional', code: 'Optional<String> opt = Optional.of("hello");\nOptional<String> empty = Optional.empty();\nOptional<String> nullable = Optional.ofNullable(null);\n\nopt.isPresent();           // true\nopt.get();                 // "hello" (throws if empty)\nopt.orElse("default");\nopt.orElseGet(() -> compute());\nopt.orElseThrow();\nopt.map(String::toUpperCase);\nopt.filter(s -> s.length() > 3);\nopt.ifPresent(System.out::println);' },
    { title: 'Functional Interfaces', code: 'import java.util.function.*;\n\nFunction<String, Integer> len = String::length;\nPredicate<String> notEmpty = s -> !s.isEmpty();\nConsumer<String> print = System.out::println;\nSupplier<String> hello = () -> "hello";\nBiFunction<Integer, Integer, Integer> add = Integer::sum;\n\nUnaryOperator<String> upper = String::toUpperCase;\nBinaryOperator<Integer> max = Integer::max;' },
  ]},
  { cat: 'Modern Java', items: [
    { title: 'Pattern Matching (21+)', code: '// instanceof pattern\nif (obj instanceof String s && s.length() > 5) {\n    System.out.println(s.toUpperCase());\n}\n\n// Switch expressions\nint result = switch (day) {\n    case MONDAY, FRIDAY -> 6;\n    case TUESDAY        -> 7;\n    default -> {\n        int d = day.toString().length();\n        yield d;\n    }\n};' },
    { title: 'Sealed Classes (17+)', code: 'sealed interface Shape permits Circle, Rectangle, Triangle {}\n\nrecord Circle(double radius) implements Shape {}\nrecord Rectangle(double w, double h) implements Shape {}\nrecord Triangle(double base, double height) implements Shape {}\n\ndouble area(Shape s) {\n    return switch (s) {\n        case Circle c      -> Math.PI * c.radius() * c.radius();\n        case Rectangle r   -> r.w() * r.h();\n        case Triangle t    -> 0.5 * t.base() * t.height();\n    };\n}' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// BASH
// ══════════════════════════════════════════════════════════════════════════
bash: [
  { cat: 'Getting Started', items: [
    { title: 'Script Header', code: '#!/usr/bin/env bash\nset -euo pipefail  # exit on error, unbound var, pipe fail\nIFS=$\'\\n\\t\'       # safer word splitting\n\n# Execute: bash script.sh\n# Make executable: chmod +x script.sh && ./script.sh' },
    { title: 'Variables', code: 'NAME="John"           # no spaces around =\necho "$NAME"          # always quote vars\necho "${NAME}!"       # explicit boundary\nreadonly CONST="immutable"\nunset NAME            # delete variable\n\n# Command substitution\nDATE=$(date +%Y-%m-%d)\nUSER=$(whoami)' },
    { title: 'Special Variables', table: [
      ['$0','Script name'],['$1..$9','Arguments 1-9'],['$#','Arg count'],['$@','All args (as array)'],
      ['$*','All args (as string)'],['$?','Last exit code'],['$$','PID of shell'],['$!','PID of last background job'],
      ['$_','Last argument of previous command'],
    ]},
    { title: 'Input / Output', code: 'read -r name          # read into $name\nread -rp "Name: " name # with prompt\nread -rs password     # silent (for passwords)\nread -ra arr          # read into array\n\necho "stdout"\necho "stderr" >&2\nprintf "%-10s %5d\\n" "item" 42\n\n# Redirect\ncmd > file    # stdout to file (overwrite)\ncmd >> file   # append\ncmd 2> err    # stderr to file\ncmd &> all    # both to file\ncmd < file    # read stdin from file' },
  ]},
  { cat: 'Strings & Parameters', items: [
    { title: 'String Operations', code: 's="Hello World"\n${#s}           # length: 11\n${s:6}          # "World"\n${s:0:5}        # "Hello"\n${s/ /,}        # "Hello,World" (first)\n${s// /,}       # replace all spaces\n${s,,}          # lowercase\n${s^^}          # UPPERCASE\n${s^}           # First char uppercase' },
    { title: 'Parameter Expansion', table: [
      ['${v:-default}','Value or default if unset/empty'],
      ['${v:=default}','Set and return default if unset'],
      ['${v:+other}','Other if set, else empty'],
      ['${v:?msg}','Error with msg if unset'],
      ['${v#prefix}','Remove shortest prefix'],
      ['${v##prefix}','Remove longest prefix'],
      ['${v%suffix}','Remove shortest suffix'],
      ['${v%%suffix}','Remove longest suffix'],
      ['${v/old/new}','Replace first match'],
      ['${v//old/new}','Replace all matches'],
    ]},
  ]},
  { cat: 'Arrays', items: [
    { title: 'Array Basics', code: 'arr=(apple banana cherry)\narr+=(date)           # append\narr[1]="blueberry"    # update\n\n${arr[0]}             # first element\n${arr[-1]}            # last element\n${arr[@]}             # all elements\n${#arr[@]}            # length\n${arr[@]:1:2}         # slice (start, length)\n${!arr[@]}            # all indices\n\nunset arr[1]          # remove element' },
    { title: 'Associative Arrays', code: 'declare -A map\nmap[key]="value"\nmap=([a]=1 [b]=2)\n\n${map[key]}           # get value\n${!map[@]}            # all keys\n${map[@]}             # all values\n\nfor k in "${!map[@]}"; do\n    echo "$k=${map[$k]}"\ndone' },
  ]},
  { cat: 'Control Flow', items: [
    { title: 'Conditions', code: '# [[ ]] is safer (Bash-specific)\nif [[ -z "$s" ]]; then echo "empty"; fi\nif [[ -n "$s" ]]; then echo "not empty"; fi\nif [[ "$a" == "$b" ]]; then ...; fi\nif [[ $n -gt 10 ]]; then ...; fi\nif [[ -f "file" ]]; then ...; fi\nif [[ -d "dir" ]]; then ...; fi\nif [[ -e "path" ]]; then ...; fi\n\n# Compound\n[[ cond1 && cond2 ]]\n[[ cond1 || cond2 ]]\n[[ ! cond ]]' },
    { title: 'File Test Operators', table: [
      ['-e file','exists'],  ['-f file','regular file'],  ['-d dir','directory'],
      ['-r file','readable'],['-w file','writable'],  ['-x file','executable'],
      ['-s file','non-empty'],  ['-L file','symlink'],  ['f1 -nt f2','newer than'],
    ]},
    { title: 'Loops', code: '# for in list\nfor item in a b c; do echo "$item"; done\nfor i in {1..10}; do echo $i; done\nfor i in {0..20..2}; do ...; done  # step\n\n# C-style\nfor ((i=0; i<10; i++)); do ...; done\n\n# while\nwhile IFS= read -r line; do\n    echo "$line"\ndone < file.txt\n\n# until\nuntil [[ condition ]]; do ...; done\n\nbreak; continue' },
  ]},
  { cat: 'Functions', items: [
    { title: 'Function Definition', code: 'greet() {\n    local name="${1:-World}"   # local var, default\n    echo "Hello, $name!"\n    return 0                   # exit code\n}\n\n# Call\ngreet "Alice"\nresult=$(greet "Bob")  # capture output\n\n# Function as value\nmy_func=greet\n"$my_func" "Carol"' },
    { title: 'Error Handling', code: 'set -e  # exit on error\n\ncommand || { echo "failed" >&2; exit 1; }\n\n# Trap\ntrap cleanup EXIT\ntrap \'echo "Error on line $LINENO"\' ERR\n\ncleanup() {\n    rm -f /tmp/myfile\n    echo "cleaned up"\n}\n\n# Check exit code\nif ! command; then\n    echo "command failed" >&2\n    exit 1\nfi' },
  ]},
],

// ══════════════════════════════════════════════════════════════════════════
// SQL
// ══════════════════════════════════════════════════════════════════════════
sql: [
  { cat: 'Getting Started', items: [
    { title: 'SELECT Basics', code: 'SELECT * FROM users;\nSELECT id, name, email FROM users;\nSELECT name AS username, age FROM users;\nSELECT DISTINCT country FROM users;\nSELECT * FROM users LIMIT 10;\nSELECT * FROM users LIMIT 10 OFFSET 20;' },
    { title: 'WHERE Conditions', code: 'SELECT * FROM users WHERE age > 18;\nSELECT * FROM users WHERE name = \'Alice\';\nSELECT * FROM users WHERE age BETWEEN 18 AND 30;\nSELECT * FROM users WHERE name IN (\'Alice\', \'Bob\');\nSELECT * FROM users WHERE name LIKE \'A%\';\nSELECT * FROM users WHERE email IS NOT NULL;\n\n-- Compound\nSELECT * FROM users WHERE age > 18 AND active = true;\nSELECT * FROM users WHERE city = \'NY\' OR city = \'LA\';' },
    { title: 'ORDER & LIMIT', code: 'SELECT * FROM products ORDER BY price DESC;\nSELECT * FROM products ORDER BY category, price ASC;\n\n-- Pagination\nSELECT * FROM items\nORDER BY created_at DESC\nLIMIT 20 OFFSET 40;  -- page 3 (0-indexed)\n\n-- NULLS handling\nSELECT * FROM t ORDER BY val NULLS LAST;' },
  ]},
  { cat: 'JOINs', items: [
    { title: 'JOIN Types', code: '-- INNER JOIN (only matching rows)\nSELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;\n\n-- LEFT JOIN (all left, matching right or NULL)\nSELECT u.name, COUNT(o.id) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name;\n\n-- FULL OUTER JOIN\nSELECT * FROM a FULL OUTER JOIN b ON a.id = b.a_id;\n\n-- CROSS JOIN (cartesian product)\nSELECT * FROM colors CROSS JOIN sizes;' },
    { title: 'Multiple JOINs', code: 'SELECT\n  u.name,\n  p.title    AS product,\n  o.total,\n  c.name     AS category\nFROM orders o\nJOIN users    u ON o.user_id    = u.id\nJOIN products p ON o.product_id = p.id\nJOIN categories c ON p.cat_id  = c.id\nWHERE o.status = \'completed\'\nORDER BY o.created_at DESC;' },
    { title: 'Self & Anti JOIN', code: '-- Self JOIN (e.g. manager-employee)\nSELECT e.name, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id;\n\n-- Anti JOIN (rows with no match)\nSELECT * FROM users u\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o WHERE o.user_id = u.id\n);' },
  ]},
  { cat: 'Aggregation', items: [
    { title: 'Aggregate Functions', code: 'SELECT COUNT(*) FROM users;\nSELECT COUNT(DISTINCT country) FROM users;\nSELECT SUM(total), AVG(total), MIN(total), MAX(total)\nFROM orders;\n\nSELECT\n  status,\n  COUNT(*)          AS cnt,\n  SUM(total)        AS revenue,\n  AVG(total)        AS avg_order,\n  ROUND(AVG(total), 2) AS avg_rounded\nFROM orders\nGROUP BY status\nHAVING COUNT(*) > 5\nORDER BY revenue DESC;' },
    { title: 'GROUP BY & HAVING', code: '-- Users with more than 2 orders\nSELECT user_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY user_id\nHAVING COUNT(*) > 2;\n\n-- Monthly revenue\nSELECT\n  DATE_TRUNC(\'month\', created_at) AS month,\n  SUM(total) AS revenue\nFROM orders\nGROUP BY 1\nORDER BY 1;' },
    { title: 'CASE WHEN', code: 'SELECT\n  name,\n  total,\n  CASE\n    WHEN total > 500 THEN \'premium\'\n    WHEN total > 100 THEN \'regular\'\n    ELSE \'small\'\n  END AS tier,\n  COALESCE(notes, \'N/A\') AS notes\nFROM orders;' },
  ]},
  { cat: 'Window Functions', items: [
    { title: 'OVER & PARTITION', code: 'SELECT\n  name,\n  salary,\n  department,\n  AVG(salary) OVER (PARTITION BY department) AS dept_avg,\n  salary - AVG(salary) OVER (PARTITION BY department) AS diff\nFROM employees;' },
    { title: 'Ranking Functions', code: 'SELECT\n  name,\n  salary,\n  ROW_NUMBER() OVER (ORDER BY salary DESC)   AS row_num,\n  RANK()       OVER (ORDER BY salary DESC)   AS rank,\n  DENSE_RANK() OVER (ORDER BY salary DESC)   AS dense_rank,\n  NTILE(4)     OVER (ORDER BY salary DESC)   AS quartile\nFROM employees;' },
    { title: 'LAG / LEAD', code: 'SELECT\n  month,\n  revenue,\n  LAG(revenue) OVER (ORDER BY month)  AS prev_month,\n  LEAD(revenue) OVER (ORDER BY month) AS next_month,\n  revenue - LAG(revenue) OVER (ORDER BY month) AS growth,\n  SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) AS running_total\nFROM monthly_sales;' },
  ]},
  { cat: 'CTEs & Subqueries', items: [
    { title: 'CTEs (WITH)', code: '-- Simple CTE\nWITH active_users AS (\n  SELECT * FROM users WHERE active = true\n),\nhigh_spenders AS (\n  SELECT user_id FROM orders GROUP BY user_id HAVING SUM(total) > 1000\n)\nSELECT u.name, u.email\nFROM active_users u\nJOIN high_spenders h ON u.id = h.user_id;' },
    { title: 'Recursive CTE', code: '-- Fibonacci\nWITH RECURSIVE fib(n, a, b) AS (\n  SELECT 0, 0, 1\n  UNION ALL\n  SELECT n+1, b, a+b FROM fib WHERE n < 10\n)\nSELECT n, a FROM fib;\n\n-- Org hierarchy\nWITH RECURSIVE org AS (\n  SELECT id, name, manager_id, 0 AS level FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, o.level+1\n  FROM employees e JOIN org o ON e.manager_id = o.id\n)\nSELECT * FROM org ORDER BY level;' },
    { title: 'Subqueries', code: '-- Scalar subquery\nSELECT name, salary,\n       (SELECT AVG(salary) FROM employees) AS company_avg\nFROM employees;\n\n-- IN subquery\nSELECT * FROM products\nWHERE id IN (SELECT product_id FROM order_items WHERE qty > 10);\n\n-- Correlated subquery\nSELECT * FROM employees e\nWHERE salary > (\n  SELECT AVG(salary) FROM employees WHERE department = e.department\n);' },
  ]},
  { cat: 'DDL & DML', items: [
    { title: 'CREATE TABLE', code: 'CREATE TABLE users (\n  id         SERIAL PRIMARY KEY,\n  email      TEXT NOT NULL UNIQUE,\n  name       TEXT NOT NULL,\n  age        INTEGER CHECK (age >= 0),\n  active     BOOLEAN DEFAULT true,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);' },
    { title: 'INSERT / UPDATE / DELETE', code: 'INSERT INTO users (email, name) VALUES (\'a@b.com\', \'Alice\');\nINSERT INTO users (email, name) VALUES\n  (\'b@b.com\', \'Bob\'),\n  (\'c@b.com\', \'Carol\');\n\n-- Upsert\nINSERT INTO users (email, name) VALUES (\'a@b.com\', \'Alice\')\nON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;\n\nUPDATE users SET active = false WHERE last_login < NOW() - INTERVAL \'90 days\';\n\nDELETE FROM sessions WHERE expired_at < NOW();\n\n-- RETURNING (PostgreSQL)\nINSERT INTO users (name) VALUES (\'Dave\') RETURNING id, created_at;' },
  ]},
],

} // end DATA

export default DATA
