import { headers } from 'next/headers';
import { auth } from '../auth';

export const fetchRooms = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

// This function fetches a single room by its ID
export const fetchRoomById = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  // console.log(token);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    return null;
  }
};
