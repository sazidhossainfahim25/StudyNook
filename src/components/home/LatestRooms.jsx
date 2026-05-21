import Link from 'next/link';

export default function LatestRooms({ rooms }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">
          Fresh Listings
        </span>
        <h2 className="text-2xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
          Newly Added Spaces
        </h2>
        <div className="h-1 w-12 bg-orange-600 mx-auto rounded-full" />
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 font-medium">
            No study rooms available at the moment. Check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div>
                <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white font-black text-xs px-3 py-1.5 rounded-xl tracking-tight">
                    ${room.hourlyRate || room.price}/hr
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{room.floor || 'Main Floor'}</span>
                      <span>•</span>
                      <span>Cap: {room.capacity} People</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {room.name}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {room.amenities?.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-bold bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities?.length > 3 && (
                      <span className="text-[9px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-md border border-orange-100">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/rooms/${room._id}`}
                  className="w-full py-3 bg-slate-950 hover:bg-orange-600 text-white text-center font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-[10px] block shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
