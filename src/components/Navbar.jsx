"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null
);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
    isMobileMenuOpen && setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Main Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-black text-indigo-600 tracking-tight"
            >
              StudyNook<span className="text-slate-800">.</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-600">
              <Link href="/" className="hover:text-indigo-600 transition">
                Home
              </Link>
              <Link href="/rooms" className="hover:text-indigo-600 transition">
                Rooms
              </Link>

              {user && (
                <>
                  <Link
                    href="/add-room"
                    className="hover:text-indigo-600 transition"
                  >
                    Add Room
                  </Link>
                  <Link
                    href="/my-listings"
                    className="hover:text-indigo-600 transition"
                  >
                    My Listings
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="hover:text-indigo-600 transition"
                  >
                    My Bookings
                  </Link>
                </>
              )}
            </div>
          </div>

        {/* Auth / Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3 text-sm font-semibold">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-full p-1"
                >
                  <img
                    src={user.avatar}
                    alt="a"
                    className="w-8 h-8 rounded-full object-cover border border-indigo-200"
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400">▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 text-sm animate-in fade-in slide-in-from-top-5 duration-150">
                    <div className="px-4 py-2 border-b border-gray-50 font-medium text-gray-500 text-xs">
                      Signed in as <br />
                      <span className="text-gray-900 font-semibold">
                        {user.email}
                      </span>
                    </div>
                    <Link
                      href="/my-listings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      My Listings
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/add-room"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      Add Room
                    </Link>
                    <hr className="border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none text-2xl"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 text-sm font-semibold text-gray-600 shadow-inner">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-indigo-600"
          >
            Rooms
          </Link>

          {user ? (
            <>
              <Link
                href="/add-room"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-indigo-600 border-t border-gray-50 pt-2"
              >
                Add Room
              </Link>
              <Link
                href="/my-listings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-indigo-600"
              >
                My Listings
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-indigo-600"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-red-600 border-t border-gray-100 font-bold mt-2"
              >
                Logout ({user.name})
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-gray-700 bg-gray-50 py-2 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center bg-indigo-600 text-white py-2 rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
