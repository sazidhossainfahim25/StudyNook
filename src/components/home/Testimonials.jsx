import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative rounded-3xl max-w-7xl mx-auto shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-950 via-transparent to-transparent opacity-40" />

      <div className="relative z-10 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-orange-400 uppercase tracking-widest block">
            Success Stories
          </span>
          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight">
            Trusted By Dedicated Researchers
          </h2>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between space-y-6">
            <Quote className="w-8 h-8 text-orange-500 opacity-60 shrink-0" />
            <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed italic">
              "Securing a silent group study corner right before final exams used to be a nightmare.
              With StudyNook, our engineering cohort managed to secure slots consecutive mornings
              smoothly without any scheduling overlaps."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400 text-xs uppercase border border-slate-700">
                SM
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide">Sarah Mitchell</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Postgraduate Student
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between space-y-6">
            <Quote className="w-8 h-8 text-orange-500 opacity-60 shrink-0" />
            <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed italic">
              "As an owner of an allocated research space on the third floor, StudyNook allowed me
              to easily share the resource with other undergraduates during times when I am away for
              field research. The dashboard management is incredibly clean."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400 text-xs uppercase border border-slate-700">
                DR
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wide">David Reynolds</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Research Associate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
