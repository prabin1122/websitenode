import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const RECENT_PURCHASES = [
  { name: 'Suman K.', city: 'Kathmandu', item: 'Sony WH-1000XM5 Headphones', price: '$299', time: '2 mins ago', icon: '🎧' },
  { name: 'Pooja R.', city: 'Pokhara', item: 'Logitech Mechanical Keyboard', price: '$119', time: '5 mins ago', icon: '⌨️' },
  { name: 'Bikash T.', city: 'Chitwan', item: '4K Ultra HD Pro Webcam', price: '$89', time: '8 mins ago', icon: '📷' },
  { name: 'Sneha S.', city: 'Biratnagar', item: 'Anker 100W USB-C Charger', price: '$49', time: '12 mins ago', icon: '⚡' },
  { name: 'Aayush M.', city: 'Lalitpur', item: 'Curved RGB Gaming Monitor', price: '$349', time: '15 mins ago', icon: '🖥️' },
  { name: 'Rohan D.', city: 'Butwal', item: 'Noise-Cancelling Earbuds', price: '$79', time: '18 mins ago', icon: '🎵' },
];

export default function LivePurchaseTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial popup delay
    const timer = setTimeout(() => setVisible(true), 3000);

    // Interval to cycle purchase notifications
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setVisible(true);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const current = RECENT_PURCHASES[currentIndex];

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm animate-bounce-short">
      <div className="rounded-2xl bg-slate-900/95 border border-cyan-500/50 p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs text-white">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl flex-shrink-0 border border-cyan-500/30">
          {current.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-black text-white text-[11px] truncate">{current.name} in {current.city}</span>
            <span className="text-[10px] text-emerald-400 font-bold ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Verified Order
            </span>
          </div>
          <p className="text-[11px] text-slate-300 truncate mt-0.5">Purchased <strong className="text-cyan-400">{current.item}</strong></p>
          <p className="text-[10px] text-slate-400 mt-0.5">{current.time} • <span className="text-amber-400 font-bold">{current.price}</span></p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-500 hover:text-white font-bold p-1 text-sm leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
