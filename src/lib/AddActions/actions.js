"use server";
import { headers } from 'next/headers';
import { auth } from '../auth';
export const AddRoomAction = async (formData) => {
  const data = Object.fromEntries(formData);

  const NewRoom = {
    name: data.name,
    image: data.image,
    floor: data.floor,
    capacity: parseInt(data.capacity),
    hourlyRate: parseInt(data.price),
    description: data.description,
    amenities: formData.getAll('amenities'),
    bookingCount: 0,
  };
 const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(NewRoom),
  });

  return await res.json();
};