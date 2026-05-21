'use client';

import { Shield, Clock, Coffee } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Features() {
  // Animation settings for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      icon: Shield,
      title: 'Zero Double‑Bookings',
      desc: 'Our advanced time-conflict detection system guarantees that your chosen slot is completely protected from overlaps.',
      link: '/rooms',
    },
    {
      icon: Clock,
      title: 'Instant Verification',
      desc: 'Skip traditional administrative long queues. Secure your private library room instantly with real-time slot selection.',
      link: '#',
    },
    {
      icon: Coffee,
      title: 'Premium Utilities',
      desc: 'Filter spaces tailored to your needs—equipped with blazing fast Wi-Fi, writing boards, smart projectors, and AC.',
      link: '#',
    },
  ];

  return (
    <section className="px-6 py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-orange-600 dark:text-orange-400 font-bold text-sm tracking-[0.2em] uppercase">
          Core Perks
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Designed For Productivity
        </h2>
        <div className="h-1 w-20 bg-orange-600 mx-auto rounded-full" />
      </div>

      {/* Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Link
              href={feature.link}
              className="group block bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-500 space-y-4 text-center md:text-left h-full"
            >
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {feature.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
