import { fetchRoomById } from '@/lib/rooms/data';
import UpdateRoomForm from '@/components/UpdateRoomForm';

export default async function UpdateRoomPage({ params }) {
  const { id } = await params;
  const room = await fetchRoomById(id);

  if (!room) {
    return <div className="text-center py-20 text-red-500">Room not found!</div>;
  }

  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
        Update: {room.name}
      </h1>
      <UpdateRoomForm room={room} />
    </div>
  );
}
