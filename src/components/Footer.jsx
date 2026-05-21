'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const userSession = authClient.useSession();
  const user = userSession.data?.user;

  return (
    // Main Footer Container
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* ================= COLUMN 1: BRAND LOGO & ABOUT ================= */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-black text-white tracking-tight flex items-center gap-1 uppercase"
            >
              <span className="text-indigo-500">Study</span>Nook
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              University library study room booking platform. Reserve your quiet space, collaborate
              efficiently, and maximize your productivity.
            </p>
          </div>

          {/* ================= COLUMN 2: QUICK NAVIGATION (RE-DESIGNED) ================= */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-indigo-500">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {/* Public Links */}
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                  Rooms
                </Link>
              </li>

              {/* Logged In Links */}
              {user && (
                <>
                  <li>
                    <Link
                      href="/add-room"
                      className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                      Add Room
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-listings"
                      className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                      My Listings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-bookings"
                      className="group flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                      My Bookings
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ================= COLUMN 3: CONTACT INFORMATION ================= */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-indigo-500">
              Contact Support
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li>
                <span className="block text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                  Email
                </span>
                <a
                  href="mailto:support@studynook.com"
                  className="text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  support@studynook.com
                </a>
              </li>
              <li>
                <span className="block text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                  Phone
                </span>
                <a
                  href="tel:+1234567890"
                  className="text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="block text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                  Location
                </span>
                <span className="text-slate-300">Central Library, 3rd Floor</span>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: SOCIAL MEDIA ICONS ================= */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-indigo-500">
              Follow Our Updates
            </h4>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:-translate-y-1 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>

              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white hover:border-black hover:-translate-y-1 transition-all duration-300"
                aria-label="X"
              >
                <FaXTwitter size={16} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-1 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:-translate-y-1 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR: COPYRIGHT & LEGAL ================= */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudyNook. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
