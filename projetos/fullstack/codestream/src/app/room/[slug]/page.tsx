import { notFound } from 'next/navigation'
import { roomsStore } from '@/lib/rooms-store'
import EditorShell from './editor-shell'

export default function RoomPage({ params }: { params: { slug: string } }) {
  const room = roomsStore.get(params.slug)
  if (!room) notFound()
  return <EditorShell room={room} />
}
