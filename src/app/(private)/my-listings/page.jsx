'use client';

import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function MyListingsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const { data:tokenData } = await authClient.token();
            // console.log(tokenData)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-rooms`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  // ডিলিট কনফার্মেশন টোস্ট
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="font-semibold text-slate-800 text-sm">Are you sure to delete this room?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performDelete(id);
              }}
              className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-200 text-slate-800 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: 'top-center', className: 'mt-20' }
    );
  };

  // একচুয়াল ডিলিট লজিক
  const performDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        setRooms((prev) => prev.filter((room) => room._id !== id));
        toast.success('Room deleted successfully!');
      } else {
        toast.error('Failed to delete room');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  return (
    <section className="py-10 px-4 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Toast এর পজিশন সেন্টার করা হয়েছে */}
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-8">My Listings</h2>

        {rooms.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <p className="text-slate-500 dark:text-slate-400">You have no listings yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-200">
                    Room Name
                  </th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-200">Floor</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-200">Price/hr</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-200 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="p-4 dark:text-slate-300 font-medium">{room.name}</td>
                    <td className="p-4 dark:text-slate-300">{room.floor}</td>
                    <td className="p-4 dark:text-slate-300">${room.price}</td>
                    <td className="p-4 flex justify-center gap-4">
                      <button
                        onClick={() => router.push(`/update-room/${room._id}`)}
                        className="text-indigo-600 hover:text-indigo-800 transition-transform hover:scale-110"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
