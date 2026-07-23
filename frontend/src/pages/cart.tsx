import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/cart';
import { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const CartPage: NextPage = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>Your Shopping Cart | Karki Store</title>
      </Head>

      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-black text-white mb-8">Karki Store Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-white mb-2">Your Karki Store Cart is Empty</h2>
            <p className="text-xs text-slate-400 mb-6">Explore our 400+ genuine tech products to add items.</p>
            <Link href="/shop" className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md">
              Browse 400 Products →
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950">
                    <div className="aspect-square h-20 rounded-xl bg-slate-950 flex items-center justify-center text-3xl flex-shrink-0 border border-slate-800">
                      📦
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.slug}`} legacyBehavior>
                        <a className="text-base font-bold text-white hover:text-cyan-400 transition truncate block">
                          {item.name}
                        </a>
                      </Link>
                      <p className="text-xs font-semibold text-cyan-400 mt-1">${item.price}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-slate-300 hover:text-white font-bold"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-slate-300 hover:text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-400 hover:text-red-300 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-black text-cyan-400">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit">
              <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-4">
                <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Order Summary</h2>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Express Shipping:</span>
                    <span className="text-emerald-400 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Estimated Tax (10%):</span>
                    <span className="font-bold">${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-black text-white">
                    <span>Total Amount:</span>
                    <span className="text-cyan-400">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-center px-6 py-3.5 text-white font-bold text-xs hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg uppercase tracking-wider">
                  Proceed to Checkout →
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full rounded-xl border border-slate-700 px-6 py-2.5 text-slate-400 font-bold text-xs hover:bg-slate-800 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
