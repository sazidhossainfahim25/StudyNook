
import Features from '@/components/home/Features';
import LatestRooms from '@/components/home/LatestRooms';
import Testimonials from '@/components/home/Testimonials';
import React from 'react';
import HeroBanner from '@/components/home/HeroBanner';

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
    <div >
      <HeroBanner />
      <Features />
      {/* <LatestRooms  /> */}
      <LatestRooms rooms={rooms} />
      <Testimonials />
    </div>
  );
}
