import React, { useState, useEffect } from 'react';

export default function LandscapeAnimation() {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('sunset');
  const [speed, setSpeed] = useState<number>(1);

  // Background Sky Gradients per time of day
  const skyGradients = {
    day: 'from-sky-400 via-sky-200 to-indigo-100 text-slate-900',
    sunset: 'from-indigo-950 via-purple-900 to-amber-700 text-white',
    night: 'from-slate-950 via-slate-900 to-indigo-950 text-white',
  };

  return (
    <div className="rounded-3xl bg-slate-900/95 border border-cyan-500/50 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-4 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase border border-cyan-400/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            🏔️ ANIMATED HIMALAYAN KATHMANDU VALLEY LANDSCAPE
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Dynamic Mountain Landscape & Human Valley Motion
          </h2>
        </div>

        {/* Time of Day & Speed Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`px-3 py-1.5 rounded-lg transition ${timeOfDay === 'day' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              ☀️ Day
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`px-3 py-1.5 rounded-lg transition ${timeOfDay === 'sunset' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              🌆 Sunset
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`px-3 py-1.5 rounded-lg transition ${timeOfDay === 'night' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
            >
              🌙 Night
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Speed:</span>
            <button onClick={() => setSpeed(1)} className={`px-1.5 py-0.5 rounded ${speed === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}>1x</button>
            <button onClick={() => setSpeed(2)} className={`px-1.5 py-0.5 rounded ${speed === 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}>2x</button>
          </div>
        </div>
      </div>

      {/* LANDSCAPE SVG ANIMATION CANVAS */}
      <div className={`relative rounded-3xl bg-gradient-to-b ${skyGradients[timeOfDay]} p-4 overflow-hidden border border-slate-800 shadow-2xl min-h-[380px] transition-all duration-700`}>
        {/* Sun / Moon Orb */}
        {timeOfDay === 'day' && (
          <div className="absolute top-6 left-16 w-16 h-16 rounded-full bg-amber-300 shadow-[0_0_50px_#f59e0b] animate-pulse" />
        )}
        {timeOfDay === 'sunset' && (
          <div className="absolute top-12 left-1/3 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 shadow-[0_0_60px_#ef4444]" />
        )}
        {timeOfDay === 'night' && (
          <div className="absolute top-8 right-20 w-14 h-14 rounded-full bg-slate-100 shadow-[0_0_40px_#38bdf8] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-950 translate-x-2 -translate-y-1" />
          </div>
        )}

        {/* Animated Moving Clouds Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Cloud 1 */}
            <g className="animate-pulse">
              <path d="M-50 70 Q0 40 50 70 Q100 50 150 70 Q200 90 100 100 Z" fill="#ffffff" opacity={timeOfDay === 'night' ? '0.15' : '0.4'} />
            </g>
            {/* Cloud 2 */}
            <g className="animate-pulse" style={{ animationDelay: '1s' }}>
              <path d="M300 90 Q360 60 420 90 Q480 70 540 90 Q600 110 450 120 Z" fill="#ffffff" opacity={timeOfDay === 'night' ? '0.1' : '0.35'} />
            </g>
          </svg>
        </div>

        {/* Flying Drone / Bird Animation */}
        <div className="absolute top-14 left-10 w-full pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40 shadow-lg w-max animate-pulse">
            <span>🚁 Karki Delivery Drone #KT-99</span>
          </div>
        </div>

        {/* PARALLAX MOUNTAIN PEAKS & HIMALAYAN RANGE */}
        <div className="absolute bottom-0 inset-x-0 h-full pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none">
            {/* Far Background Peaks */}
            <path d="M0 400 L120 220 L240 400 Z" fill={timeOfDay === 'night' ? '#0f172a' : '#334155'} />
            <path d="M120 220 L150 260 L90 260 Z" fill="#ffffff" opacity="0.9" />

            <path d="M180 400 L350 140 L520 400 Z" fill={timeOfDay === 'night' ? '#1e293b' : '#475569'} />
            <path d="M350 140 L400 200 L300 200 Z" fill="#ffffff" opacity="0.95" /> {/* Mt. Everest Peak */}

            <path d="M460 400 L620 200 L780 400 Z" fill={timeOfDay === 'night' ? '#0f172a' : '#334155'} />
            <path d="M620 200 L655 245 L585 245 Z" fill="#ffffff" opacity="0.9" />

            <path d="M720 400 L880 180 L1000 400 Z" fill={timeOfDay === 'night' ? '#1e293b' : '#475569'} />

            {/* Midground Hills */}
            <path d="M0 400 Q250 280 500 400 Z" fill={timeOfDay === 'night' ? '#090d16' : '#1e293b'} />
            <path d="M450 400 Q750 290 1000 400 Z" fill={timeOfDay === 'night' ? '#090d16' : '#1e293b'} />

            {/* Kathmandu City Skyline Buildings */}
            <rect x="180" y="310" width="35" height="70" fill="#0284c7" opacity="0.8" />
            <rect x="230" y="280" width="45" height="100" fill="#4f46e5" opacity="0.8" />
            <rect x="290" y="320" width="40" height="60" fill="#0284c7" opacity="0.8" />

            {/* Foreground Winding Mountain Road Path */}
            <path d="M0 380 Q300 340 600 370 T1000 380 L1000 400 L0 400 Z" fill="#0f172a" />
            <path d="M0 385 Q300 345 600 375 T1000 385" stroke="#f59e0b" strokeWidth="3" strokeDasharray="12 8" />
          </svg>
        </div>

        {/* ANIMATED HUMANS WALKING & CYCLING ALONG THE ROAD */}
        <div className="absolute bottom-3 inset-x-0 px-6 flex justify-between items-center z-10 pointer-events-none">
          {/* Human Walker 1 */}
          <div className="flex items-center gap-2 bg-slate-950/90 text-cyan-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-cyan-800 shadow-xl animate-bounce-slow">
            <span>🚶‍♂️ Aarav Walking in Valley</span>
          </div>

          {/* Cyclist */}
          <div className="flex items-center gap-2 bg-indigo-950/90 text-indigo-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-indigo-800 shadow-xl">
            <span>🚴‍♂️ Bikash Cycling to Karki Store</span>
          </div>

          {/* Delivery Van */}
          <div className="flex items-center gap-2 bg-amber-950/90 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-amber-800 shadow-xl">
            <span>🚚 Express Delivery Logistics</span>
          </div>
        </div>

        {/* Floating AI Hub Label */}
        <div className="absolute top-4 right-4 z-10 bg-slate-950/90 text-cyan-400 text-xs font-mono font-bold px-4 py-2 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
          📍 Kathmandu Valley • 27.7172° N, 85.3240° E
        </div>
      </div>
    </div>
  );
}
