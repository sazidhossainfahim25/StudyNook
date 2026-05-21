'use server';

'use server';

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(NewRoom),
  });

  return await res.json();
};