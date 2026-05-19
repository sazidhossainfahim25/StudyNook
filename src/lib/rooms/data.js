export const fetchRooms = async () => {
  // Implementation for fetching rooms
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
  const data = await res.json();
  return data;
};
