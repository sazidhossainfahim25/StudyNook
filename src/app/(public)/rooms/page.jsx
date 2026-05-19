import { fetchRooms } from "@/lib/rooms/data";
const AllRoomPage = async () => {
  const rooms = await fetchRooms();
  // console.log(rooms); // Log the fetched rooms data

  return (
    <div>
      <h2 className="text-2xl font-bold">All Rooms {rooms.length}</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <div>{room.description}</div>
            <div>{room.floor}</div>
            <div>{room.capacity}</div>
            <div>{room.hourlyRate}</div>
            <div>{room.amenities}</div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllRoomPage
