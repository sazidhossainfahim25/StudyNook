'use client';

import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UpdateRoomAction } from '@/lib/AddActions/updateAction';

export default function UpdateRoomForm({ room }) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    

    // Add the room ID to the form data for the update action
    formData.append('id', room._id);

    const result = await UpdateRoomAction(formData);

    if (result?.acknowledged) {
      toast.success('Room updated!');
      router.push('/rooms');
    } else {
      toast.error('Update failed!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200"
    >
      <Toaster />

      <div>
        <label className="block text-sm font-semibold">Room Name</label>
        <input
          name="name"
          defaultValue={room.name}
          className="w-full p-3 border rounded-xl"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold">Capacity</label>
          <input
            name="capacity"
            type="number"
            defaultValue={room.capacity}
            className="w-full p-3 border rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Price/hr</label>
          <input
            name="price"
            type="number"
            defaultValue={room.hourlyRate}
            className="w-full p-3 border rounded-xl"
          />
        </div>
      </div>

      <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl">
        Save Changes
      </button>
    </form>
  );
}
