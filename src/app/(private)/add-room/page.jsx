'use client';

import { AddRoomAction } from '@/lib/AddActions/actions';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddRoomForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const loadingToast = toast.loading('Adding your room...');

    try {
      const result = await AddRoomAction(formData);
      if (result?.acknowledged) {
        toast.dismiss(loadingToast);
        toast.success('Room listed successfully!');
        e.target.reset();
        router.push('/rooms');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Toaster position="top-right" />

      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            List a New Room
          </h2>
          <p className="text-slate-500 mt-2">Fill in the details to publish your study space.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Room Name & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Room Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Enter room name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                required
                placeholder="Enter image URL"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Floor, Capacity, Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Floor', 'Capacity', 'Price/hr'].map((label, i) => (
              <div key={label} className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {label}
                </label>
                <input
                  name={label.split('/')[0].toLowerCase()}
                  type={i === 0 ? 'text' : 'number'}
                  required
                  placeholder={i === 0 ? 'Enter floor' : `Enter ${label.toLowerCase()}`}
                  className="w-full px-4 py-3 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="3"
              placeholder="Tell us about the features..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {['WiFi', 'Projector', 'Whiteboard', 'AC', 'Coffee'].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Submit Room'}
          </button>
        </form>
      </div>
    </section>
  );
}
