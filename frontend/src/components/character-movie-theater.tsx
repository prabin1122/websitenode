import React, { useState, useEffect } from 'react';

const MOVIE_SCENES = [
  {
    id: 1,
    title: '1. Customer Aarav Enters TechMate Solution Store',
    subtitle: 'Aarav opens TechMate Solution Store on his mobile phone and enters the tech marketplace.',
    characterAction: '🚶‍♂️ Aarav walking into digital store...',
    detail: 'Browsing 400+ genuine tech products in Kathmandu.',
    bg: 'from-slate-950 via-indigo-950 to-slate-900',
    color: '#06b6d4',
  },
  {
    id: 2,
    title: '2. Selecting Product & Adding To Cart',
    subtitle: 'Aarav inspects Sony Headphones, checks TechMate warranty seal, and taps Add to Cart.',
    characterAction: '🎧 Inspecting Sony Headphones & tapping + Add to Cart...',
    detail: 'Product added! Quantity: 1 • Discount: -25% applied.',
    bg: 'from-indigo-950 via-slate-900 to-purple-950',
    color: '#6366f1',
  },
  {
    id: 3,
    title: '3. Paying via eSewa Digital Wallet',
    subtitle: 'Aarav selects eSewa, enters security PIN, and completes instant digital payment.',
    characterAction: '📲 Tapping eSewa Wallet • Payment Approved ($299) ✓',
    detail: 'Invoice SMS dispatched to Aarav\'s phone.',
    bg: 'from-purple-950 via-slate-900 to-emerald-950',
    color: '#10b981',
  },
  {
    id: 4,
    title: '4. Warehouse Technician Packaging Item',
    subtitle: 'Technician scans barcode, applies TechMate Care warranty sticker, and seals package.',
    characterAction: '🏭 Barcode scanned #TM-992 • Box sealed with bubble wrap!',
    detail: 'Quality Assurance Verified • Ready for courier pickup.',
    bg: 'from-slate-950 via-indigo-950 to-amber-950',
    color: '#f59e0b',
  },
  {
    id: 5,
    title: '5. Courier Bikash On Delivery Motorcycle',
    subtitle: 'Rider Bikash speeds through Kathmandu on delivery motorcycle with sealed parcel box.',
    characterAction: '🛵 Bikash riding delivery motorcycle across Kathmandu...',
    detail: 'Live GPS route active • Estimated arrival: 15 mins.',
    bg: 'from-amber-950 via-slate-900 to-blue-950',
    color: '#3b82f6',
  },
  {
    id: 6,
    title: '6. Doorstep Handover & Happy Unboxing',
    subtitle: 'Bikash hands package to Aarav. Aarav unboxes genuine headphones with 5-star rating!',
    characterAction: '🎁 Doorstep handover complete! Aarav unboxes headphones ⭐⭐⭐⭐⭐',
    detail: 'Customer rating: 5.0/5.0 • 1-Year TechMate Warranty active.',
    bg: 'from-emerald-950 via-slate-900 to-cyan-950',
    color: '#10b981',
  },
];

export default function CharacterMovieTheater() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSceneIndex((prev) => (prev + 1) % MOVIE_SCENES.length);
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = MOVIE_SCENES[sceneIndex];

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-indigo-950 p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6 font-sans">
      {/* Theater Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase border border-cyan-400/30">
            🎬 ANIMATED CHARACTER MOVIE THEATER
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Watch Customer Aarav's Live Shopping Movie
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-4 py-2 text-xs transition shadow-lg uppercase tracking-wider flex items-center gap-2"
          >
            <span>{isPlaying ? '⏸ Pause Movie' : '▶ Play Movie'}</span>
          </button>
        </div>
      </div>

      {/* Main Animated Movie Screen */}
      <div className={`rounded-3xl bg-gradient-to-r ${current.bg} p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px] transition-all duration-700`}>
        {/* Scene Badge */}
        <div className="flex justify-between items-center relative z-10">
          <span className="bg-slate-950/80 text-cyan-400 font-mono text-xs px-3.5 py-1.5 rounded-full border border-slate-800 font-bold">
            SCENE {sceneIndex + 1} OF 6
          </span>
          <span className="text-xs text-emerald-400 font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ANIMATED CHARACTER MOTION
          </span>
        </div>

        {/* Scene Vector Stage */}
        <div className="grid md:grid-cols-2 gap-8 items-center py-6 relative z-10">
          {/* Animated Characters Vector Graphic */}
          <div className="flex justify-center items-center">
            <div className="relative w-56 h-56 rounded-3xl bg-slate-950/90 border border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-2xl group">
              {/* Character Avatars per scene */}
              {sceneIndex === 0 && (
                <div className="space-y-2 animate-bounce-slow">
                  <div className="text-6xl">🚶‍♂️📱</div>
                  <p className="text-xs font-black text-cyan-400">Aarav Entering Store</p>
                </div>
              )}
              {sceneIndex === 1 && (
                <div className="space-y-2 animate-bounce-slow">
                  <div className="text-6xl">🎧🛒</div>
                  <p className="text-xs font-black text-indigo-400">Selecting Sony Headphones</p>
                </div>
              )}
              {sceneIndex === 2 && (
                <div className="space-y-2 animate-bounce-slow">
                  <div className="text-6xl">💳⚡</div>
                  <p className="text-xs font-black text-emerald-400">eSewa Payment Complete</p>
                </div>
              )}
              {sceneIndex === 3 && (
                <div className="space-y-2 animate-bounce-slow">
                  <div className="text-6xl">📦🏷️</div>
                  <p className="text-xs font-black text-amber-400">Technician Sealing Package</p>
                </div>
              )}
              {sceneIndex === 4 && (
                <div className="space-y-2 animate-pulse">
                  <div className="text-6xl">🛵💨</div>
                  <p className="text-xs font-black text-blue-400">Courier Bikash Transporting</p>
                </div>
              )}
              {sceneIndex === 5 && (
                <div className="space-y-2 animate-bounce-slow">
                  <div className="text-6xl">🎁⭐</div>
                  <p className="text-xs font-black text-emerald-400">Handover & Happy Unboxing!</p>
                </div>
              )}
            </div>
          </div>

          {/* Scene Text & Action Dialogue */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">{current.title}</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{current.subtitle}</p>

            <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
              <p className="text-cyan-400 font-bold">{current.characterAction}</p>
              <p className="text-slate-400 text-[11px]">{current.detail}</p>
            </div>
          </div>
        </div>

        {/* Video Progress Bar */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 relative z-10">
          <div
            className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${((sceneIndex + 1) / MOVIE_SCENES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Movie Scene Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {MOVIE_SCENES.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => {
              setSceneIndex(idx);
              setIsPlaying(false);
            }}
            className={`p-3 rounded-2xl text-left text-xs font-bold transition-all ${
              sceneIndex === idx
                ? 'bg-cyan-500 text-slate-950 font-black shadow-xl scale-105'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <div className="text-base">{scene.characterAction.slice(0, 2)}</div>
            <p className="text-[10px] truncate mt-1">Scene {scene.id}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
