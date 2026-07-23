import React, { useState, useEffect, useRef } from 'react';

const STATIONS = [
  {
    id: 1,
    title: '1. Cyber Storefront Entry',
    action: 'Aarav walks up as AI Storefront Scanner verifies identity & opens automatic doors.',
    gesture: '🤖 Karki AI Drone greets Aarav & projects holographic catalog',
    dialogue: '🤖 AI Drone: "Welcome Aarav! 400 Tech items in stock."',
    speech: '👋 Entering AI Smart Store...',
    icon: '🏬',
  },
  {
    id: 2,
    title: '2. AI Holographic Item Picking',
    action: 'Aarav reaches out to shelf. AI HUD highlights Sony WH-1000XM5 specs in 3D.',
    gesture: '🫱 Arm extends → AI HUD target locks → Item picked into cart!',
    dialogue: '🤖 AI Drone: "Verified 100% Genuine Sony Audio • Added to Cart!"',
    speech: '🎧 AI Target Lock & Pick...',
    icon: '🛍️',
  },
  {
    id: 3,
    title: '3. Holographic eSewa Wallet Beam',
    action: 'Aarav holds phone. Futuristic holographic green beam connects phone to checkout.',
    dialogue: '⚡ AI Gateway: "256-Bit Encrypted eSewa Payment Verified ($299) ✓"',
    speech: '📲 Holographic Pay Beam ✓',
    icon: '⚡',
  },
  {
    id: 4,
    title: '4. AI Robotic Packaging & Seal',
    action: 'Cyber robotic arm scans barcode with red laser & applies hologram Karki Care seal.',
    dialogue: '🏭 Robotic Arm: "Serial #KS-992 Hologram Warranty Sealed!"',
    speech: '🤖 Robotic Laser Seal...',
    icon: '🏭',
  },
  {
    id: 5,
    title: '5. Cyber Motorcycle Delivery',
    action: 'Rider Bikash speeds on cyber motorcycle with glowing neon wheels across Kathmandu.',
    dialogue: '🛵 GPS AI Engine: "Highway route clear • Arrival in 12 mins!"',
    speech: '⚡ Neon Motorcycle Transit...',
    icon: '🚚',
  },
  {
    id: 6,
    title: '6. Doorstep Handover & Sonic Headphones',
    action: 'Aarav unboxes item, puts on headphones with floating sonic equalizer AI waves!',
    dialogue: '🎵 AI Audio Engine: "3D Spatial Audio Active • Rated ⭐ 5/5 Stars!"',
    speech: '🎁 Unboxing & 3D Spatial Audio! 🎶',
    icon: '🎉',
  },
];

export default function HumanWalkingJourney() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isWalking, setIsWalking] = useState(true);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SILKY-SMOOTH 60 FPS requestAnimationFrame LOOP
  useEffect(() => {
    if (!mounted) return;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (isWalking) {
        timeRef.current += delta;
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + delta * 4.5; // ~22 sec full walk duration
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isWalking, mounted]);

  if (!mounted) {
    return (
      <div className="rounded-3xl bg-slate-900/95 border border-cyan-500/50 p-8 shadow-2xl backdrop-blur-md min-h-[300px] flex items-center justify-center text-cyan-400 font-mono text-xs">
        ⚡ Loading 60 FPS Human Motion Physics Engine...
      </div>
    );
  }

  // SAFE ARRAY BOUNDARY CLAMPING & FALLBACK
  const validProgress = Math.max(0, Math.min(100, isNaN(progress) ? 0 : progress));
  const currentStationIndex = Math.min(
    STATIONS.length - 1,
    Math.max(0, Math.floor((validProgress / 100) * STATIONS.length))
  );
  const currentStation = STATIONS[currentStationIndex] || STATIONS[0];

  // 60 FPS SUB-PIXEL SINE-WAVE PHYSICS CALCULATIONS
  const time = timeRef.current;
  const walkSpeed = 9; // gait frequency
  const leftLegAngle = Math.sin(time * walkSpeed) * 32; // -32 deg to +32 deg
  const rightLegAngle = -Math.sin(time * walkSpeed) * 32;
  const kneeFlex = Math.abs(Math.sin(time * walkSpeed)) * 18;
  const bodyBobbing = Math.abs(Math.sin(time * walkSpeed * 2)) * 4; // realistic torso bounce
  const armSwing = Math.cos(time * walkSpeed) * 26;
  const droneFloating = Math.sin(time * 3) * 6; // smooth drone floating height

  return (
    <div className="rounded-3xl bg-slate-900/95 border border-cyan-500/50 p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase border border-cyan-400/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            ⚡ 60 FPS SILKY-SMOOTH HUMAN PHYSICS ENGINE
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Ultra-Smooth Human Walking & AI Companion Theater
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWalking(!isWalking)}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 text-xs transition shadow-lg uppercase tracking-wider flex items-center gap-2"
          >
            <span>{isWalking ? '⏸ Pause Motion' : '▶ Play 60FPS Walk'}</span>
          </button>
        </div>
      </div>

      {/* CONTINUOUS WALKING & AI HUD STAGE */}
      <div className="relative rounded-3xl bg-slate-950 p-8 border border-slate-800 shadow-2xl min-h-[360px] flex flex-col justify-between overflow-hidden">
        {/* Futuristic Cyber Ambient Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Top Active Station Info Badge */}
        <div className="relative z-10 flex justify-between items-center">
          <span className="bg-slate-900/90 text-cyan-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            STATION {currentStation.id} OF 6 • {currentStation.title}
          </span>
          <span className="text-xs text-amber-400 font-mono font-bold bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
            60 FPS Track: {validProgress.toFixed(1)}%
          </span>
        </div>

        {/* TRACK SCENE WITH AI HOVERING DRONE & REALISTIC WALKING CHARACTER */}
        <div className="relative z-10 py-16">
          {/* Neon Track Line */}
          <div className="w-full bg-slate-900 h-4 rounded-full relative overflow-hidden border border-cyan-900/60 shadow-inner">
            <div
              className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 h-full rounded-full shadow-[0_0_15px_#06b6d4]"
              style={{ width: `${validProgress}%` }}
            />
          </div>

          {/* 6 Waypoint Station Nodes */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
            {STATIONS.map((st, idx) => {
              const isPassed = (validProgress / 100) * 6 >= idx;
              return (
                <div
                  key={st.id}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                    isPassed
                      ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white border-2 border-white scale-110 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {st.icon}
                </div>
              );
            })}
          </div>

          {/* MOVING HUMAN WALKING CHARACTER & HOVERING AI DRONE */}
          <div
            className="absolute top-0 -translate-y-24 flex flex-col items-center pointer-events-auto cursor-pointer"
            style={{
              left: `calc(${validProgress}% - 32px)`,
              transform: `translateY(${-bodyBobbing}px)`,
            }}
          >
            {/* HOVERING AI ASSISTANT DRONE WITH 60FPS SINE BOBBING */}
            <div
              className="relative flex flex-col items-center mb-1"
              style={{ transform: `translateY(${droneFloating}px)` }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 border border-white flex items-center justify-center shadow-[0_0_15px_#06b6d4] text-xs">
                🤖
              </div>
              <div className="bg-cyan-950/90 text-cyan-300 text-[9px] font-mono font-black px-2.5 py-0.5 rounded-md border border-cyan-500/40 shadow-lg mt-0.5">
                Karki AI Drone
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 text-[10px] font-black px-3 py-1 rounded-xl shadow-2xl mb-1.5 whitespace-nowrap border border-white">
              {currentStation.speech}
            </div>

            {/* SVG ULTRA-SMOOTH JOINTED WALKING CHARACTER */}
            <div className="relative w-16 h-20 flex items-center justify-center">
              <svg width="64" height="74" viewBox="0 0 64 74" fill="none">
                {/* AI HUD Target Reticle */}
                <circle cx="32" cy="14" r="12" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" opacity="0.6" />

                {/* Head & Hair */}
                <circle cx="32" cy="14" r="7" fill="#06b6d4" />
                <path d="M26 11 Q32 7 38 11" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

                {/* Torso */}
                <path d="M32 21 V42" stroke="#06b6d4" strokeWidth="4.5" strokeLinecap="round" />

                {/* DYNAMIC 60FPS FLUID ARM SWING / GESTURES */}
                {currentStationIndex === 0 && (
                  <>
                    <g transform={`rotate(${armSwing}, 32, 25)`}>
                      <line x1="32" y1="25" x2="18" y2="35" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                    <g transform={`rotate(${-armSwing}, 32, 25)`}>
                      <line x1="32" y1="25" x2="46" y2="22" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {currentStationIndex === 1 && (
                  <>
                    {/* Extended Arm Picking Item */}
                    <path d="M32 25 H52 V30" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                    <g transform={`rotate(${armSwing * 0.5}, 32, 25)`}>
                      <line x1="32" y1="25" x2="20" y2="35" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    {/* Glowing Item */}
                    <rect x="50" y="24" width="12" height="12" rx="3" fill="#f59e0b" className="shadow-[0_0_12px_#f59e0b]" />
                  </>
                )}

                {currentStationIndex === 2 && (
                  <>
                    {/* Hands Holding Phone */}
                    <line x1="32" y1="25" x2="24" y2="30" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                    <line x1="32" y1="25" x2="40" y2="30" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                    {/* Holographic Beam */}
                    <line x1="32" y1="30" x2="32" y2="60" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" className="animate-pulse" />
                  </>
                )}

                {currentStationIndex >= 3 && (
                  <>
                    <g transform={`rotate(${armSwing}, 32, 25)`}>
                      <line x1="32" y1="25" x2="20" y2="35" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                    <g transform={`rotate(${-armSwing}, 32, 25)`}>
                      <line x1="32" y1="25" x2="44" y2="35" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {/* 60FPS SILKY-SMOOTH JOINTED WALKING LEGS WITH KNEE FLEX & FOOT ROLL */}
                {/* Left Leg */}
                <g transform={`rotate(${leftLegAngle}, 32, 42)`}>
                  <line x1="32" y1="42" x2="32" y2="56" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                  {/* Knee Joint Flex */}
                  <line x1="32" y1="56" x2={32 + kneeFlex * 0.25} y2="68" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Foot Roll */}
                  <line x1={32 + kneeFlex * 0.25} y1="68" x2={39 + kneeFlex * 0.25} y2="68" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* Right Leg */}
                <g transform={`rotate(${rightLegAngle}, 32, 42)`}>
                  <line x1="32" y1="42" x2="32" y2="56" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                  {/* Knee Joint Flex */}
                  <line x1="32" y1="56" x2={32 - kneeFlex * 0.25} y2="68" stroke="#818cf8" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Foot Roll */}
                  <line x1={32 - kneeFlex * 0.25} y1="68" x2={39 - kneeFlex * 0.25} y2="68" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom AI Dialogue Box */}
        <div className="relative z-10 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-xs font-bold text-white">{currentStation.action}</p>
            <p className="text-xs font-mono text-cyan-400 mt-0.5">{currentStation.gesture}</p>
            <p className="text-[11px] font-mono text-emerald-400">{currentStation.dialogue}</p>
          </div>

          {/* Scrub Slider */}
          <div className="w-full sm:w-48 flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono">Scrub:</span>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={validProgress}
              onChange={(e) => {
                setProgress(parseFloat(e.target.value));
                setIsWalking(false);
              }}
              className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
