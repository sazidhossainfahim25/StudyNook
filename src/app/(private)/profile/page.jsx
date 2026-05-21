'use client';
import React, { useState, useRef } from 'react';
import { FiUser, FiLock, FiCamera, FiSave } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  // Using refs to capture form values only on submit
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Capturing values from refs directly on submit
    const nameValue = nameRef.current.value;
    const imageValue = imageRef.current.value;

    try {
      const { error } = await authClient.updateUser({
        name: nameValue,
        image: imageValue,
      });

      if (error) throw error;

      toast.success('Profile updated successfully!');
      refetch(); // Refresh session data
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="text-center py-20 text-slate-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Profile Settings</h1>

      <form onSubmit={handleUpdate}>
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center gap-6">
          <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-indigo-100 dark:border-slate-700">
            {user?.image ? (
              <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FiUser size={40} className="text-slate-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Form Fields using Refs */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <input
                ref={nameRef}
                defaultValue={user?.name}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Profile Image URL
              </label>
              <input
                ref={imageRef}
                defaultValue={user?.image}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline flex items-center gap-2"
            >
              <FiLock size={16} /> Change Password
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 disabled:bg-slate-400"
            >
              {loading ? (
                'Saving...'
              ) : (
                <>
                  <FiSave size={16} /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
