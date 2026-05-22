import { fetchRoomById } from '@/lib/rooms/data';
import { notFound } from 'next/navigation';
import RoomClient from './RoomClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const room = await fetchRoomById(params.id);

  return {
    title: room ? `${room.name} – StudyNook` : 'Room Details',
  };
}

export default async function Page({ params }) {
  const { id } = await params; 
 

  const room = await fetchRoomById(id);

  if (!room) return notFound();

  return <RoomClient room={room} isLoggedIn={false} isOwner={false} />;
}
