import { Layers, Users, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchRooms } from '@/lib/rooms/data';

export const metadata = {
  title: 'StudyNook – Available Rooms',
};

export const dynamic = 'force-dynamic';

export default async function AllRoomsPage({ searchParams }) {
  const resolvedParams = searchParams;

  const search = resolvedParams?.search || '';
  const amenitiesParam = resolvedParams?.amenities || '';

  const selectedAmenities = amenitiesParam
    ? amenitiesParam
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  const allRooms = (await fetchRooms()) || [];

  const allAmenitiesSet = new Set();

  allRooms.forEach((room) => {
    if (Array.isArray(room.amenities)) {
      room.amenities.forEach((a) => allAmenitiesSet.add(a));
    }
  });

  const dynamicAmenities = Array.from(allAmenitiesSet);

  const rooms = allRooms.filter((room) => {
    if (!room) return false;

    const roomName = room.name ? String(room.name).toLowerCase() : '';

    const matchesSearch = roomName.includes(search.toLowerCase());

    const roomAmenities = Array.isArray(room.amenities)
      ? room.amenities.map((a) => String(a).trim())
      : [];

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) => roomAmenities.includes(amenity));

    return matchesSearch && matchesAmenities;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
          Available <span className="text-orange-500">Study Rooms</span>
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Find and secure the ideal space for your academic needs.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
        <form method="GET" action="/rooms" className="relative md:col-span-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by room name..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />

          {selectedAmenities.length > 0 && (
            <input
              type="hidden"
              name="amenities"
              value={selectedAmenities.join(',')}
            />
          )}
        </form>

        <div className="relative group">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-orange-600 text-white rounded-xl font-bold hover:opacity-90 transition">
            <Filter className="w-4 h-4" />
            Filter Amenities
          </button>

          <div className="absolute right-0 mt-2 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 hidden group-hover:block z-50">
            {dynamicAmenities.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);

              const updatedAmenities = isSelected
                ? selectedAmenities.filter((a) => a !== amenity)
                : [...selectedAmenities, amenity];

              const queryParams = new URLSearchParams();

              if (search) queryParams.set('search', search);

              if (updatedAmenities.length > 0) {
                queryParams.set('amenities', updatedAmenities.join(','));
              }

              return (
                <Link
                  key={amenity}
                  href={`/rooms?${queryParams.toString()}`}
                  className="block p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-orange-500 transition"
                >
                  {isSelected ? '✓ ' : ''}
                  {amenity}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 font-bold">
            No rooms found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={room.image || '/images/img.jpeg'}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {room.name}
                  </h3>

                  <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-orange-500" />
                      {room.floor}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-orange-500" />
                      {room.capacity} People
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 flex-1">
                  {room.description?.slice(0, 100)}...
                </p>

                <div className="flex flex-wrap gap-2">
                  {room.amenities?.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600"
                    >
                      {item}
                    </span>
                  ))}

                  {room.amenities?.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ${room.hourlyRate}

                    <span className="text-sm font-medium text-slate-400">
                      /hr
                    </span>
                  </span>

                  <Link
                    href={`/rooms/${room._id}`}
                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition"
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