import React from 'react'
import Heros from '../asset/Heros.png';

function Hero() {

  return (
    <div>

    <section className="grid md:grid-cols-2 gap-6 px-10 py-24">
        <div className='mt-5'>
          <h1 className="text-5xl font-medium leading-snug mb-7">
            Transform Your Visions into Realities with Smart Data.
          </h1>
          <p className="text-gray-600 mb-7">
           GrowAI helps you make smarter decisions with clear, actionable insights powered by data and AI. We turn data, AI and advanced analytics into powerful tools that help businesses grow, innovate and stay ahead. Simple, intelligent and built for real impact.
          </p>
          <div className="flex gap-4">
            <button className="btn bg-black text-white px-6 rounded-3xl">Let's Talk</button>
            <button className="btn btn-outline btn-primary text-black px-6 rounded-3xl">Discover More</button>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={Heros} alt="illustration" className="w-3/4" />
        </div>
    </section>

      
    </div>
  )
}

export default Hero




// import React from "react";
// import { ArrowUpRight, ShieldCheck, Sparkles, PlayCircle } from "lucide-react";
// import Heros from "../asset/Heros.png";

// const stats = [
//   { label: "Curated datasets", value: "564K+" },
//   { label: "Enterprise teams", value: "2.3K" },
//   { label: "Data refresh", value: "Realtime" },
// ];

// function Hero() {
//   return (
//     <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
//       <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl">
//         <div className="absolute inset-0 opacity-60">
//           <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
//           <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" />
//         </div>

//         <div className="relative grid items-center gap-12 px-8 py-14 md:grid-cols-2">
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-100">
//               <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
//               AI-first data workspace
//             </div>

//             <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-6xl">
//               Transform raw data into production-grade intelligence.
//             </h1>
//             <p className="mt-5 text-lg text-white/70">
//               GrowAI unifies data sourcing, labeling, and governance so your teams can move from idea to insight without the busywork.
//             </p>

//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <button className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-slate-900 font-semibold shadow-lg shadow-emerald-400/40 transition hover:-translate-y-0.5 hover:shadow-xl">
//                 Start for free
//                 <ArrowUpRight size={18} />
//               </button>
//               <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-white hover:bg-white/10">
//                 <PlayCircle size={18} />
//                 Watch 90s demo
//               </button>
//             </div>

//             <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
//                 >
//                   <div className="text-sm text-white/60">{stat.label}</div>
//                   <div className="text-2xl font-semibold">{stat.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative">
//             <div className="absolute -top-10 -right-6 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl" />
//             <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
//               <div className="flex items-center justify-between px-6 pt-6 text-xs text-white/70">
//                 <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
//                   <ShieldCheck size={14} />
//                   SOC2-ready
//                 </span>
//                 <span className="inline-flex items-center gap-1">
//                   <Sparkles size={14} />
//                   Live sync
//                 </span>
//               </div>
//               <div className="p-6">
//                 <img
//                   src={Heros}
//                   alt="GrowAI illustration"
//                   className="w-full rounded-2xl object-cover shadow-lg shadow-emerald-500/10"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;