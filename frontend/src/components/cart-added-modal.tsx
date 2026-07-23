import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { CartItem } from '../context/cart';

interface CartAddedModalProps {
  item: CartItem | null;
  isOpen: boolean;
  onClose: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
}

export default function CartNotificationBanner({
  item,
  isOpen,
  onClose,
  cartTotalCount,
  cartSubtotal,
}: CartAddedModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto hide after 4.5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, item, onClose]);

  if (!mounted || !isOpen || !item) return null;

  const bannerContent = (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999] w-[92%] max-w-lg pointer-events-auto font-sans">
      <div className="rounded-2xl bg-slate-900/95 border-2 border-cyan-400 p-4 shadow-2xl shadow-cyan-500/20 text-white backdrop-blur-xl flex items-center justify-between gap-3 animate-slide-down">
        
        {/* Left: Checkmark & Product Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 text-xl">
            {item.imageUrl || item.image ? (
              <img src={item.imageUrl || item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              '🛒'
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Cart Updated!</span>
            </div>
            <p className="text-xs font-bold text-white truncate">{item.name}</p>
            <p className="text-[11px] text-slate-400">
              Subtotal: <span className="text-cyan-300 font-extrabold">${cartSubtotal.toFixed(2)}</span> ({cartTotalCount} items)
            </p>
          </div>
        </div>

        {/* Right: View Cart & Close */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/cart"
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 px-3.5 py-2 text-slate-950 font-black text-xs transition shadow-md uppercase tracking-wider flex items-center gap-1"
          >
            <span>View Cart 🛒</span>
          </Link>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-bold p-1 transition"
          >
            ✕
          </button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(bannerContent, document.body);
}
