export const fetchRooms = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

// This function fetches a single room by its ID
export const fetchRoomById = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    return null;
  }
};
