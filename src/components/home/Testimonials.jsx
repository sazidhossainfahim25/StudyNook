'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'StudyNook is a game-changer for our research team.',
      name: 'Sarah M.',
      role: 'Postgrad',
      initials: 'SM',
    },
    {
      quote: 'The dashboard is incredibly clean and intuitive.',
      name: 'David R.',
      role: 'Researcher',
      initials: 'DR',
    },
    {
      quote: 'I never miss a slot anymore, thanks to the alerts.',
      name: 'Emily C.',
      role: 'Student',
      initials: 'EC',
    },
    {
      quote: 'Absolutely essential for our campus library work.',
      name: 'James K.',
      role: 'PhD Candidate',
      initials: 'JK',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto transition-colors duration-500">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-2">
        <span className="text-orange-600 dark:text-orange-400 font-bold text-sm tracking-[0.2em] uppercase">
          Success Stories
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Trusted By Researchers
        </h2>
      </div>

      {/* Swiper Slider Component */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12"
      >
        {testimonials.map((item, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            {/* Testimonial Card with Glassmorphism/Neutral theme */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 h-full flex flex-col space-y-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <Quote className="w-10 h-10 text-orange-500 opacity-50" />

              <p className="text-slate-600 dark:text-slate-300 italic flex-grow leading-relaxed">
                "{item.quote}"
              </p>

              {/* Profile section */}
              <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
