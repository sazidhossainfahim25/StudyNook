'use server';

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-room/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRoom),
  });

  const result = await res.json();

  if (result.acknowledged) {
    revalidatePath('/rooms');
  }

  return result;
};
