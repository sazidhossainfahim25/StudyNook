'use server';
import { headers } from 'next/headers';
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';

export const UpdateRoomAction = async (formData) => {
  const id = formData.get('id');
  const data = Object.fromEntries(formData);

  const updatedRoom = {
    name: data.name,
    capacity: parseInt(data.capacity),
    hourlyRate: parseInt(data.price),
    description: data.description,
    amenities: formData.getAll('amenities'),
  };
  
 const { token } = await auth.api.getToken({
   headers: await headers(),
 });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-room/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedRoom),
  });

  const result = await res.json();

  if (result.acknowledged) {
    revalidatePath('/rooms');
  }

  return result;
};
