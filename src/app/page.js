import Hero from '@/components/HeroBanner';
import Features from '@/components/home/Features';
import LatestRooms from '@/components/home/LatestRooms';
import Testimonials from '@/components/home/Testimonials';
import React from 'react';

export const metadata = {
  title: 'StudyNook – Home',
};


async function getRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
    cache: 'no-store', 
  });
  return res.json();
}

export default async function Page() {

  const rooms = await getRooms();

  return (
    <div className="bg-slate-50 text-slate-950 min-h-screen space-y-24 pb-24">
      <Hero />
      <Features />
      {/* <LatestRooms  /> */}
      <LatestRooms rooms={rooms} />
      <Testimonials />
    </div>
  );
}
