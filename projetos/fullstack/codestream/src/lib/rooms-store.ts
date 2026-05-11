export interface RoomMeta {
  id: string
  slug: string
  name: string
  language: string
  isPublic: boolean
  lineCount: number
  createdAt: string
  updatedAt: string
}

const seed: RoomMeta[] = [
  { id: 'rm_x7k2p', slug: 'api-auth-review',     name: 'api-auth-review',     language: 'typescript', isPublic: true, lineCount: 182, createdAt: new Date(Date.now() - 120_000).toISOString(),    updatedAt: new Date(Date.now() - 120_000).toISOString()    },
  { id: 'rm_9q1nw', slug: 'algo-practice',        name: 'algo-practice',        language: 'python',     isPublic: true, lineCount: 74,  createdAt: new Date(Date.now() - 660_000).toISOString(),    updatedAt: new Date(Date.now() - 660_000).toISOString()    },
  { id: 'rm_3m8yj', slug: 'sql-query-debug',      name: 'sql-query-debug',      language: 'sql',        isPublic: true, lineCount: 31,  createdAt: new Date(Date.now() - 3_600_000).toISOString(),  updatedAt: new Date(Date.now() - 3_600_000).toISOString()  },
  { id: 'rm_5a0rt', slug: 'rust-ownership-demo',  name: 'rust-ownership-demo',  language: 'rust',       isPublic: true, lineCount: 67,  createdAt: new Date(Date.now() - 10_800_000).toISOString(), updatedAt: new Date(Date.now() - 10_800_000).toISOString() },
]

class RoomsStore {
  private map = new Map<string, RoomMeta>(seed.map(r => [r.slug, r]))

  getAll(): RoomMeta[] {
    return [...this.map.values()].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  }

  get(slug: string): RoomMeta | null {
    return this.map.get(slug) ?? null
  }

  create(name: string, language: string): RoomMeta {
    const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`
    const room: RoomMeta = {
      id:        'rm_' + Math.random().toString(36).slice(2, 7),
      slug, name, language, isPublic: true, lineCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.map.set(slug, room)
    return room
  }

  delete(slug: string) { this.map.delete(slug) }

  touch(slug: string, lineCount?: number) {
    const r = this.map.get(slug)
    if (!r) return
    r.updatedAt = new Date().toISOString()
    if (lineCount != null) r.lineCount = lineCount
  }
}

const g = globalThis as unknown as { __rs?: RoomsStore }
export const roomsStore = g.__rs ?? (g.__rs = new RoomsStore())
