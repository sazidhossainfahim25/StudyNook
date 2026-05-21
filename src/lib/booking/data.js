// This file contains functions to fetch booking data from the API
export const fetchBookings = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};
// This function fetches a single booking by its ID
export const fetchBookingById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};
