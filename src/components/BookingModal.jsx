'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoCalendarOutline, IoTimeOutline, IoClose } from 'react-icons/io5';

export default function BookingModal({ room, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ date: '', startTime: '', endTime: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.date || !formData.startTime || !formData.endTime) {
      toast.error('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room._id,
          ...formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Room booked successfully!');
        onClose();
      } else {
        toast.error(data.message || 'Booking failed');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-6 rounded-2xl relative shadow-2xl border border-gray-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 text-2xl transition"
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Book: {room.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 px-3">
              <IoCalendarOutline className="text-gray-400 mr-2" />
              <input
                type="date"
                required
                className="w-full bg-transparent p-2.5 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          {/* Start Time Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Start Time
            </label>
            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 px-3">
              <IoTimeOutline className="text-gray-400 mr-2" />
              <input
                type="time"
                required
                className="w-full bg-transparent p-2.5 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500"
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
          </div>

          {/* End Time Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              End Time
            </label>
            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 px-3">
              <IoTimeOutline className="text-gray-400 mr-2" />
              <input
                type="time"
                required
                
                className="w-full bg-transparent p-2.5 outline-none text-gray-900 dark:text-white "
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-all active:scale-95 disabled:bg-slate-500"
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
