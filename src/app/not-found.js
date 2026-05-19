"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center space-y-6">
      {/* বড় ৪MD টেক্সট ও ভিজ্যুয়াল ইফেক্ট */}
      <div className="space-y-2">
        <h1 className="text-8xl font-black text-indigo-600 tracking-tighter animate-bounce">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
          The study nook or library page you are looking for doesn't exist, has
          been removed, or is temporarily unavailable.
        </p>
      </div>

      {/* অ্যাকশন বাটন্স */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition text-sm"
        >
          ← Go Back
        </button>
        <Link
          href="/"
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-600/10 transition text-sm"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
}
