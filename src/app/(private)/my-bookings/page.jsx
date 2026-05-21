'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const cancelBooking = async (id, roomId) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId }),
    });
    toast.success('Booking cancelled');
    
  };

  return (
    <div className="max-w-6xl mx-auto">
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="border p-4 flex justify-between">
            <div>
              <h3>{b.roomName}</h3>
              <span className={b.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}>
                {b.status}
              </span>
            </div>
            {b.status === 'confirmed' && new Date(b.date) > new Date() && (
              <button
                onClick={() => cancelBooking(b._id, b.roomId)}
                className="bg-red-500 text-white px-4"
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
