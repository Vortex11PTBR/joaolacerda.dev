import { NextRequest, NextResponse } from 'next/server'
import { roomsStore } from '@/lib/rooms-store'

export async function GET() {
  return NextResponse.json({ rooms: roomsStore.getAll() })
}

export async function POST(req: NextRequest) {
  try {
    const { name, language = 'typescript' } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: 'name required' }, { status: 400 })
    const room = roomsStore.create(name.trim(), language)
    return NextResponse.json({ room }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
