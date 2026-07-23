import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error' | 'cart';
  message: string;
  itemData?: {
    name: string;
    price: string;
    image?: string;
    quantity?: number;
    slug?: string;
  };
}

export function showToast(
  message: string,
  type: 'success' | 'info' | 'error' | 'cart' = 'success',
  itemData?: ToastMessage['itemData']
) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('techmate-toast', {
      detail: { id: Date.now().toString() + Math.random().toString(), message, type, itemData },
    });
    window.dispatchEvent(event);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      const newToast = customEvent.detail;
      setToasts((prev) => [newToast, ...prev].slice(0, 3)); // Keep max 3 toasts

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    };

    window.addEventListener('techmate-toast', handleToast);
    return () => window.removeEventListener('techmate-toast', handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[999] flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none font-sans">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-2xl p-4 shadow-2xl border backdrop-blur-xl transition-all duration-500 animate-slide-in transform translate-y-0 text-white text-xs ${
            toast.type === 'cart' || toast.type === 'success'
              ? 'bg-slate-900/95 border-cyan-400/80 shadow-cyan-500/20'
              : toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/80 shadow-red-500/20'
              : 'bg-indigo-950/95 border-indigo-500/80 shadow-indigo-500/20'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2 font-black text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] uppercase tracking-wider">
                {toast.type === 'cart' ? '🛒 Added To Cart!' : '⚡ TechMate Notice'}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white text-sm font-bold transition px-1"
            >
              ✕
            </button>
          </div>

          {/* Product Notification Detail */}
          {toast.itemData ? (
            <div className="py-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 text-2xl">
                {toast.itemData.image ? (
                  <img
                    src={toast.itemData.image}
                    alt={toast.itemData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  '📦'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-xs truncate leading-snug">
                  {toast.itemData.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-cyan-400 font-black">${toast.itemData.price}</span>
                  <span className="text-[10px] text-slate-400 font-semibold bg-slate-800 px-1.5 py-0.2 rounded">
                    Qty: {toast.itemData.quantity || 1}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-2 text-slate-200 leading-relaxed">{toast.message}</p>
          )}

          {/* Interactive CTAs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/cart"
              onClick={() => removeToast(toast.id)}
              className="flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 py-2 text-center text-[11px] font-bold transition border border-slate-700"
            >
              🛒 View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => removeToast(toast.id)}
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-[1.02] text-slate-950 py-2 text-center text-[11px] font-black transition shadow-md uppercase tracking-wider"
            >
              ⚡ Checkout
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
