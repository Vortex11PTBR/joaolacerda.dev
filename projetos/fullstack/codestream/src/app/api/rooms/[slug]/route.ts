import { NextRequest, NextResponse } from 'next/server'
import { roomsStore } from '@/lib/rooms-store'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const room = roomsStore.get(params.slug)
  if (!room) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ room })
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { lineCount } = await req.json()
    roomsStore.touch(params.slug, lineCount)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  roomsStore.delete(params.slug)
  return NextResponse.json({ ok: true })
}
