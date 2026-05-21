'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';

export default function RoomClient({ room }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* CONTAINER */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-5">
        {/* IMAGE */}
        <img src={room.image} alt={room.name} className="w-full h-80 object-cover rounded-xl" />

        {/* TITLE */}
        <h1 className="text-3xl font-black text-slate-900">{room.name}</h1>

        {/* DESCRIPTION */}
        <p className="text-slate-600">{room.description}</p>

        {/* PRICE */}
        <p className="text-xl font-bold text-slate-900">${room.hourlyRate}/hr</p>

        {/* AMENITIES */}
        <div className="flex flex-wrap gap-2">
          {room.amenities?.map((a, i) => (
            <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 text-xs rounded-full">
              {a}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <div className="pt-4">
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-black hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <BookingModal room={room} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
