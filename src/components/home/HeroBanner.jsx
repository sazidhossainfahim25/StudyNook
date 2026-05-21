'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-semibold text-violet-600 dark:text-violet-300">
              Transform Your Productivity
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6">
            Find Your Perfect <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Study Room
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
            Experience a distraction-free environment. Browse premium library rooms, check real-time
            availability, and book your space in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/rooms"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:shadow-xl hover:shadow-violet-500/20 transition-all hover:-translate-y-1"
            >
              Explore Rooms{' '}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          
          </div>
        </motion.div>

        {/* Right Side: Enhanced Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:block"
        >
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="/images/img.jpeg"
              alt="Study Room"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
}
