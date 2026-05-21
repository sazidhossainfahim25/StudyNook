'use client';

import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UpdateRoomAction } from '@/lib/AddActions/updateAction';

export default function UpdateRoomForm({ room }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append('id', room._id);

    try {
      const result = await UpdateRoomAction(formData);

      if (result?.acknowledged) {
        toast.success('Room updated successfully!');
        router.push('/rooms');
      } else {
        toast.error('Failed to update room.');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
    >
      <Toaster position="top-center" toastOptions={{ className: 'mt-20' }} />

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Edit Room Information
      </h2>

      <div>
        <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
          Room Name
        </label>
        <input
          name="name"
          defaultValue={room.name}
          className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Capacity
          </label>
          <input
            name="capacity"
            type="number"
            defaultValue={room.capacity}
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Price/hr
          </label>
          <input
            name="price"
            type="number"
            defaultValue={room.hourlyRate}
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-70"
      >
        {loading ? 'Saving Changes...' : 'Save Changes'}
      </button>
    </form>
  );
}
