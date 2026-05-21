import { Shield, Clock, Coffee } from 'lucide-react';
import Link from 'next/link'; // Next.js Link import করলাম

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
      <div className="text-center space-y-2">
        <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">
          Core Perks
        </span>
        <h2 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Designed For Peak Productivity
        </h2>
        <div className="h-1 w-12 bg-orange-600 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <Link
          href="/rooms"
          className="block bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4 text-center md:text-left"
        >
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mx-auto md:mx-0">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Zero Double‑Bookings
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
            Our advanced time-conflict detection system guarantees that your chosen slot is
            completely protected from overlaps.
          </p>
        </Link>

        {/* Feature 2 */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-center md:text-left">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mx-auto md:mx-0">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Instant Verification
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
            Skip traditional administrative long queues. Secure your private library room instantly
            with real-time slot selection.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-center md:text-left">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mx-auto md:mx-0">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Premium Utilities
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
            Filter spaces tailored to your needs—equipped with blazing fast Wi-Fi, writing boards,
            smart projectors, and air conditioning.
          </p>
        </div>
      </div>
    </section>
  );
}
