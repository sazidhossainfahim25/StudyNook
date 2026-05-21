import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-70" />

      <div className="max-w-3xl relative z-10 space-y-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-black text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Empowering Academic Focus
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
          Find Your Perfect{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            Study Room
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Browse and book quiet, private study rooms in your library. List your own room, manage
          bookings seamlessly, and elevate your productivity.
        </p>
        <div className="pt-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 group"
          >
            Explore Rooms
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
