import Link from 'next/link';
import { useCart } from '../context/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 shadow-2xl border-l border-indigo-950 text-slate-100 flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>🛒</span> TechMate Solution Store Cart
              <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                {items.reduce((sum, item) => sum + item.quantity, 0)} Items
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-xl p-1"
            >
              ✕
            </button>
          </div>

          {/* Drawer Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl">🛍️</div>
                <p className="text-sm font-bold text-slate-300">Your cart is empty</p>
                <p className="text-xs text-slate-500">Explore 400+ tech products in TechMate Solution Store</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center text-2xl flex-shrink-0 border border-slate-800">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                    <p className="text-xs font-black text-cyan-400 mt-0.5">${item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 font-bold text-white text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-red-400 hover:text-red-300 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>Subtotal Amount:</span>
                <span className="text-cyan-400 text-lg font-black">${total.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400">Shipping & taxes calculated at checkout</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 py-3 text-center text-xs font-bold text-slate-200 hover:bg-slate-900 transition"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-3 text-center text-xs font-bold text-white hover:from-indigo-500 hover:to-cyan-500 transition shadow-md uppercase tracking-wider"
                >
                  Checkout →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
