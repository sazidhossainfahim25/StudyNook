import { fetchRoomById } from '@/lib/rooms/data';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Layers, Users, Sparkles, BookmarkCheck, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const room = await fetchRoomById(resolvedParams.id);
  return {
    title: room ? `${room.name} – StudyNook` : 'Room Details',
  };
}

const RoomDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  const room = await fetchRoomById(resolvedParams.id);

  if (!room) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const isLoggedIn = !!token;
  const isOwner = false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all mb-4 text-xs font-bold uppercase tracking-widest group"
        >
          <IoChevronBackOutline className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Rooms
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-100/80">
          <div className="md:col-span-6 relative overflow-hidden bg-slate-900 min-h-[300px] md:min-h-full">
            <img
              src={
                room.image ||
                'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=cover'
              }
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="md:col-span-6 flex flex-col p-6 lg:p-8 justify-between bg-white space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 stroke-[3]" /> Premium Workspace
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-lg">
                  <BookmarkCheck className="w-3.5 h-3.5 text-orange-500" /> Booked:{' '}
                  {room.bookingCount || 0} times
                </span>
              </div>

              <h1 className="text-xl lg:text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
                {room.name || 'Study Space'}
              </h1>

              <div className="py-4 border-y border-slate-100 space-y-3">
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                  {room.description ||
                    'Focus and collaborate in this premium, high-productivity space designed for modern academic excellence.'}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-950 tracking-tighter">
                    ${room.hourlyRate || room.price || 0}
                  </span>
                  <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">
                    / Hour
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-100/50">
                  <Layers className="w-4 h-4 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-slate-800 font-black text-xs">{room.floor || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-slate-50/60 rounded-xl border border-slate-100/50">
                  <Users className="w-4 h-4 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                      Capacity
                    </p>
                    <p className="text-slate-800 font-black text-xs">
                      {room.capacity ? `${room.capacity} People` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Included Amenities
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(room.amenities) && room.amenities.length > 0 ? (
                    room.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-md"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Standard utilities included</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {isOwner && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Link
                    href={`/rooms/${room._id}/edit`}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl transition text-xs uppercase tracking-wider border border-amber-200/60"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Space
                  </Link>
                  <button className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl transition text-xs uppercase tracking-wider border border-rose-200/60">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              )}

              {isLoggedIn ? (
                <Link
                  href={`/rooms/${room._id}/book`}
                  className="w-full py-3 bg-black hover:bg-orange-600 text-white text-center font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-[10px] block shadow-sm"
                >
                  Book This Space
                </Link>
              ) : (
                <Link
                  href={`/login?callbackUrl=/rooms/${room._id}`}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-center font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-[10px] block shadow-sm"
                >
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
