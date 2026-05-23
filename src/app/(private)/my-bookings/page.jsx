'use client';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Failed');
      }

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    fetchBookings();
  }, []);

  const processCancellation = async (id, roomId) => {
    setCancelingId(id);
    const loadingToast = toast.loading('Processing cancellation...');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId }),
        credentials: 'include',
      });

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to cancel booking');
    } finally {
      setCancelingId(null);
    }
  };

  const cancelBooking = (id, roomId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="font-semibold text-slate-800 dark:text-slate-900 text-sm">
            Are you sure you want to cancel this booking?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                processCancellation(id, roomId);
              }}
              className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen">
      <Toaster position="top-center" toastOptions={{ className: 'mt-20' }} />

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
          My Bookings {bookings.length}
        </h2>
        <p className="text-slate-500 mt-1">Manage your reserved study rooms here.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed dark:border-slate-800">
          <p className="text-slate-400 font-medium">You have no bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const bookingDate = new Date(b.date);
            const isFuture = bookingDate > new Date();
            const isConfirmed = b.status === 'confirmed';

            return (
              <div
                key={b._id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1 w-full mb-4 md:mb-0">
                  <h3 className="font-bold text-lg dark:text-white text-slate-800">{b.roomName}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Booking Date:{' '}
                    <span className="font-semibold">{bookingDate.toLocaleDateString()}</span>
                  </p>
                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {isConfirmed && isFuture && (
                  <button
                    onClick={() => cancelBooking(b._id, b.roomId)}
                    disabled={cancelingId === b._id}
                    className="w-full md:w-auto bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                  >
                    {cancelingId === b._id ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
