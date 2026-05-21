'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoCloseSharp, IoMenuOutline } from 'react-icons/io5';

export default function Navbar() {
  const router = useRouter();
  const userDate = authClient.useSession();
  const user = userDate.data?.user;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // States to track image loading errors for desktop and mobile
  const [imgErrorDesktop, setImgErrorDesktop] = useState(false);
  const [imgErrorMobile, setImgErrorMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Reset image error states when user session changes
  useEffect(() => {
    setImgErrorDesktop(false);
    setImgErrorMobile(false);
  }, [user]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  const userImage = user?.image || user?.avatar || null;
  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400 uppercase"
            >
              StudyNook
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600 dark:text-slate-300">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Home
            </Link>
            <Link
              href="/rooms"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Rooms
            </Link>
            {user && (
              <>
                <Link
                  href="/add-room"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Add Room
                </Link>
                <Link
                  href="/my-listings"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  My Bookings
                </Link>
      
              </>
            )}
          </div>

          {/* RIGHT SIDE DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {!user && mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
              >
                {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </button>
            )}

            {!user ? (
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Link
                  href="/login"
                  className="px-3 py-2 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-full p-1 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow transition"
                >
                  {/* User Profile Image with Fallback */}
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-indigo-500 shrink-0">
                    {userImage && !imgErrorDesktop ? (
                      <Image
                        src={userImage}
                        alt={user.name || 'User Avatar'}
                        fill
                        sizes="36px"
                        className="object-cover"
                        onError={() => setImgErrorDesktop(true)}
                      />
                    ) : (
                      <span>{userInitials}</span>
                    )}
                  </div>

                  <div className="hidden lg:block text-left px-1">
                    <p className="text-xs font-bold text-gray-700 dark:text-slate-200 line-clamp-1 max-w-[120px]">
                      {user.name}
                    </p>
                  </div>

                  <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-medium pr-1">
                    <IoIosArrowDropdownCircle
                      className={`transition-transform text-[16px] duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-700/50">
                      <p className="text-xs text-gray-500 dark:text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2 text-sm">
                      {mounted && (
                        <button
                          onClick={toggleTheme}
                          className="flex w-full items-center justify-between px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        >
                          <span>Theme Mode</span>
                          {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
                        </button>
                      )}
                      <Link
                        href="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/my-listings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        My Listings
                      </Link>
                      <Link
                        href="/my-bookings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/add-room"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        Add Room
                      </Link>
                      <div className="border-t border-gray-100 dark:border-slate-700 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE TOGGLES */}
          <div className="flex md:hidden items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 dark:text-slate-300 transition"
              >
                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-2xl text-gray-600 dark:text-slate-300 hover:text-indigo-600 transition flex items-center justify-center"
            >
              {isMobileMenuOpen ? <IoCloseSharp /> : <IoMenuOutline />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className="md:hidden">
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        />
        <div
          className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[80vw] bg-white dark:bg-slate-950 border-r border-slate-200/60 dark:border-slate-800/60 p-5 shadow-2xl transition-transform duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-900">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              StudyNook
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-center"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>

          {user && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800/40">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border border-indigo-500 shrink-0">
                {userImage && !imgErrorMobile ? (
                  <Image
                    src={userImage}
                    alt={user.name || 'User Avatar'}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={() => setImgErrorMobile(true)}
                  />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  {user.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <div className="space-y-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            >
              Rooms
            </Link>
            {user && (
              <>
                <Link
                  href="/add-room"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  Add Room
                </Link>
                <Link
                  href="/my-listings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  My Bookings
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left rounded-xl px-3 py-2.5 font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all border-t border-slate-100 dark:border-slate-900 mt-4 pt-4"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
