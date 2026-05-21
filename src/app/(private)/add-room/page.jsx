'use client';

import { AddRoomAction } from '@/lib/AddActions/actions';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddRoomForm({}) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const loadingToast = toast.loading('Adding room...');

    try {
      const result = await AddRoomAction(formData);

      if (result.acknowledged) {
        toast.dismiss(loadingToast);
        toast.success('Room added successfully!');
        e.target.reset();
        router.push('/rooms');
      } else {
        throw new Error('Failed to add');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to add room.');
    }
  };

  return (
    <section className="py-10">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-8">
          List a New Study Room
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* নাম এবং ইমেজ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Room Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="enter room name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="enter image url"
              />
            </div>
          </div>

          {/* ফ্লোর, ক্যাপাসিটি এবং প্রাইস */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Floor
              </label>
              <input
                name="floor"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. 3rd Floor"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Capacity
              </label>
              <input
                name="capacity"
                type="number"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="enter capacity"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
                Price (per hour)
              </label>
              <input
                name="price"
                type="number"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="enter price"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write something about the room..."
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Amenities
            </label>
            <div className="flex flex-wrap gap-4">
              {['WiFi', 'Projector', 'Whiteboard', 'AC', 'Coffee Station'].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Add Room to Platform
          </button>
        </form>
      </div>
    </section>
  );
}
