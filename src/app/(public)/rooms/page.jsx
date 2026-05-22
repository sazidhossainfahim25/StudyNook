import { Layers, Users, Search, Filter, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchRooms } from '@/lib/rooms/data';

export const metadata = { title: 'StudyNook – Available Rooms' };
export const dynamic = 'force-dynamic';

export default async function AllRoomsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search ?? '';
  const amenitiesParam = resolvedParams?.amenities ?? '';

  const selectedAmenities = amenitiesParam
    ? amenitiesParam
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  // ডেটা ফেচ করা এবং নিশ্চিত করা যে এটি একটি অ্যারে
  const rawData = await fetchRooms();
  const allRooms = Array.isArray(rawData) ? rawData : [];

  // Amenities ফিল্টার করার জন্য ইউনিক লিস্ট তৈরি (নিরাপদ উপায়)
  const allAmenitiesSet = new Set();
  allRooms.forEach((room) => {
    if (room?.amenities && Array.isArray(room.amenities)) {
      room.amenities.forEach((a) => allAmenitiesSet.add(a));
    }
  });
  const dynamicAmenities = Array.from(allAmenitiesSet);

  // ফিল্টারিং লজিক
  const rooms = allRooms.filter((room) => {
    if (!room) return false;
    const matchesSearch = room.name?.toLowerCase().includes(search.toLowerCase());
    const roomAmenities = Array.isArray(room.amenities) ? room.amenities.map((a) => a.trim()) : [];
    const matchesAmenities =
      selectedAmenities.length === 0
        ? true
        : selectedAmenities.every((amenity) => roomAmenities.includes(amenity));
    return matchesSearch && matchesAmenities;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Available <span className="text-indigo-600">Study Rooms</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Find and book the perfect space for your productivity.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 mb-12 max-w-4xl mx-auto">
        <form method="GET" action="/rooms" className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by room name..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </form>

        <div className="relative group">
          <button className="w-full md:w-auto px-6 py-3.5 flex items-center justify-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all">
            <Filter className="w-4 h-4" />
            Filters {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}
          </button>

          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl hidden group-hover:block z-50 p-4">
            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Select Amenities</p>
            {dynamicAmenities.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);
              const updated = isSelected
                ? selectedAmenities.filter((a) => a !== amenity)
                : [...selectedAmenities, amenity];
              const query = new URLSearchParams();
              if (search) query.set('search', search);
              if (updated.length) query.set('amenities', updated.join(','));

              return (
                <Link
                  key={amenity}
                  href={`/rooms?${query.toString()}`}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300"
                >
                  {amenity} {isSelected && <X className="w-4 h-4 text-indigo-600" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-400 font-medium">No rooms found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={room.image || '/images/img.jpeg'}
                  alt={room.name || 'Room Image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  {room.name}
                </h3>
                <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Layers size={16} /> Floor {room.floor}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={16} /> {room.capacity} seats
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1">
                  {room.description?.slice(0, 80)}...
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {room.amenities?.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ${room.hourlyRate}
                    <span className="text-sm font-normal text-slate-400">/hr</span>
                  </span>
                  <Link
                    href={`/rooms/${room._id}`}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
