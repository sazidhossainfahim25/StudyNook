// This file contains functions to fetch booking data from api

import { headers } from 'next/headers';
import { auth } from '../auth';

export const fetchBookings = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};
// This function fetches a single booking id
export const fetchBookingById = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};
