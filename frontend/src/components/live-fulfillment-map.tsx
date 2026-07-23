import React, { useState, useEffect } from 'react';

export default function LiveFulfillmentMap() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [liveOrdersCount, setLiveOrdersCount] = useState<number>(42);

  useEffect(() => {
    // Simulate active live counter fluctuations
    const interval = setInterval(() => {
      setLiveOrdersCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-900/90 rounded-3xl p-8 border border-indigo-950 shadow-2xl backdrop-blur-md font-sans space-y-6">
      {/* Header with Live Pulsing Indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              LIVE NEPAL FULFILLMENT NETWORK
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Real-Time Customer Order & Delivery Activity</h2>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-xs font-bold text-white"><span className="text-cyan-400 font-mono text-sm">{liveOrdersCount}</span> Active Orders</p>
            <p className="text-[10px] text-slate-400">Processing right now across 77 districts</p>
          </div>
        </div>
      </div>

      {/* 3 Interactive Stages (Buying -> Delivery -> Receiving) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* STAGE 1: People Buying */}
        <div
          onMouseEnter={() => setActiveStage(1)}
          className={`rounded-2xl p-6 border transition-all duration-300 relative cursor-pointer group ${
            activeStage === 1
              ? 'bg-indigo-950/80 border-cyan-400 shadow-2xl scale-[1.02]'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold border border-cyan-400/30">
              🛒
            </span>
            <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              STAGE 1
            </span>
          </div>

          <h3 className="font-black text-white text-base mb-1 group-hover:text-cyan-400 transition">
            1. Customers Buying Online
          </h3>
          <p className="text-xs text-slate-300 mb-3">
            Real-time shopping cart additions and instant digital wallet checkout.
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>🇳🇵 Suman K. (Kathmandu)</span>
            </p>
            <p className="text-[10px] text-cyan-400 font-semibold">Bought Sony WH-1000XM5 • Paid via eSewa</p>
          </div>

          {/* Hover Explanation Overlay */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="text-cyan-300 font-bold">💡 Hover Details:</p>
            <p>• Bank-grade 256-bit payment encryption</p>
            <p>• Instant order SMS confirmation to customer phone</p>
          </div>
        </div>

        {/* STAGE 2: Package Delivery Transport */}
        <div
          onMouseEnter={() => setActiveStage(2)}
          className={`rounded-2xl p-6 border transition-all duration-300 relative cursor-pointer group ${
            activeStage === 2
              ? 'bg-indigo-950/80 border-amber-400 shadow-2xl scale-[1.02]'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold border border-amber-400/30">
              🚚
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              STAGE 2
            </span>
          </div>

          <h3 className="font-black text-white text-base mb-1 group-hover:text-amber-400 transition">
            2. Express Courier Delivery
          </h3>
          <p className="text-xs text-slate-300 mb-3">
            Express package dispatch from Kathmandu central hub to outer districts.
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>🇳🇵 Anish T. (Pokhara)</span>
            </p>
            <p className="text-[10px] text-amber-400 font-semibold">In Transit • Out for Delivery in Pokhara</p>
          </div>

          {/* Hover Explanation Overlay */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="text-amber-300 font-bold">💡 Hover Details:</p>
            <p>• 24-hour Kathmandu valley express dispatch</p>
            <p>• 2-4 days courier delivery to all 77 districts</p>
          </div>
        </div>

        {/* STAGE 3: Receiving Package & Unboxing */}
        <div
          onMouseEnter={() => setActiveStage(3)}
          className={`rounded-2xl p-6 border transition-all duration-300 relative cursor-pointer group ${
            activeStage === 3
              ? 'bg-indigo-950/80 border-emerald-400 shadow-2xl scale-[1.02]'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold border border-emerald-400/30">
              📦
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              STAGE 3
            </span>
          </div>

          <h3 className="font-black text-white text-base mb-1 group-hover:text-emerald-400 transition">
            3. Package Received & Unboxed
          </h3>
          <p className="text-xs text-slate-300 mb-3">
            Customer receives authentic sealed package with TechMate Care warranty.
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
            <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>🇳🇵 Pooja S. (Lalitpur)</span>
            </p>
            <p className="text-[10px] text-emerald-400 font-semibold">Delivered & Verified • Rated ⭐ 5/5</p>
          </div>

          {/* Hover Explanation Overlay */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="text-emerald-300 font-bold">💡 Hover Details:</p>
            <p>• 7-day money-back replacement guarantee</p>
            <p>• 1-year official TechMate Care warranty seal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
