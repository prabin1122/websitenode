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

export default function CartAddedModal({
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

  if (!mounted || !isOpen || !item) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-cyan-400 rounded-3xl p-6 shadow-2xl shadow-cyan-500/30 text-white space-y-5 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold transition w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-xl shrink-0">
            ✓
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Product Added to Your Cart!</h3>
            <p className="text-xs text-cyan-400 font-medium">Your TechMate cart has been updated.</p>
          </div>
        </div>

        {/* Product Details Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 text-3xl">
            {item.imageUrl || item.image ? (
              <img src={item.imageUrl || item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              '📦'
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-base font-black text-cyan-400">${item.price}</span>
              <span className="text-xs text-slate-400 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Qty: {item.quantity || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Cart Summary Bar */}
        <div className="bg-indigo-950/80 border border-indigo-800 rounded-2xl p-3.5 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Cart Items</span>
            <span className="text-white font-black text-sm">{cartTotalCount} Items</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Subtotal</span>
            <span className="text-cyan-400 font-black text-base">${cartSubtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <Link
            href="/cart"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 hover:scale-[1.02] text-slate-950 font-black text-xs transition shadow-xl uppercase tracking-wider flex items-center justify-center gap-2 border border-cyan-400"
          >
            <span>🛒 VIEW CART & CHECKOUT ({cartTotalCount})</span>
          </Link>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition border border-slate-700"
          >
            🛍️ Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
