import Link from 'next/link';

export default function LatestRooms({ rooms }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-violet-600 dark:text-violet-400 font-bold text-sm tracking-[0.2em] uppercase">
          Explore Recently Added
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Featured{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">
            Study Spaces
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-cyan-500 mx-auto rounded-full" />
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
          <p className="text-slate-500 font-medium">No study rooms available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 flex flex-col"
            >
              {/* Room Image */}
              <div className="h-60 w-full overflow-hidden relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                  ${room.hourlyRate || room.price}/hr
                </div>
              </div>

              {/* Room Details */}
              <div className="p-7 space-y-4 flex-grow">
                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>{room.floor || 'Main Floor'}</span>
                  <span>•</span>
                  <span>{room.capacity} Seats</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                  {room.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {room.amenities?.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-7 pt-0">
                <Link
                  href={`/rooms/${room._id}`}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-violet-600 dark:hover:bg-violet-500 transition-colors rounded-2xl font-bold text-sm uppercase tracking-widest text-center block"
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
