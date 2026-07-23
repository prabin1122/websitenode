import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from '../context/cart';
import { useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const VALID_COUPONS: Record<string, { type: 'percent' | 'fixed'; amount: number }> = {
  SAVE10: { type: 'percent', amount: 10 },
  WELCOME20: { type: 'fixed', amount: 20 },
};

const CheckoutPage: NextPage = () => {
  const { items, total, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; type: 'percent' | 'fixed'; amount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    paymentMethod: 'esewa',
  });

  const [lastOrderId, setLastOrderId] = useState('');
  const [lastOrderTotal, setLastOrderTotal] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !completed) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Items in TechMate Solution Store Cart</h2>
          <p className="text-xs text-slate-400 mb-6">Select products from our 400+ tech catalog to proceed.</p>
          <Link href="/shop" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-md">
            Browse 400 Products →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate Shipping
  const shippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 25 : 0;

  // Calculate Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = (total * appliedCoupon.amount) / 100;
    } else {
      discountAmount = Math.min(total, appliedCoupon.amount);
    }
  }

  const subtotalAfterDiscount = Math.max(0, total - discountAmount);
  const tax = subtotalAfterDiscount * 0.1;
  const grandTotal = (subtotalAfterDiscount + tax + shippingCost).toFixed(2);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon({ code, ...VALID_COUPONS[code] });
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try "SAVE10" or "WELCOME20".');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'TECHMATE-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const order = {
      id: orderId,
      items: [...items],
      total: grandTotal,
      subtotal: total.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: tax.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      couponCode: appliedCoupon?.code || null,
      customer: formData,
      status: 'PENDING',
      date: new Date().toISOString(),
    };

    const savedOrders = localStorage.getItem('orders');
    const existingOrders = savedOrders ? JSON.parse(savedOrders) : [];
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

    setLastOrderId(orderId);
    setLastOrderTotal(grandTotal);
    setCompleted(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>Checkout | TechMate Solution Store</title>
      </Head>

      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-10">
        {completed ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900 p-8 shadow-2xl border border-indigo-950 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-500/30">
              ✓
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Order Confirmed!</h1>
              <p className="text-slate-400 text-xs mt-1">Thank you for shopping with TechMate Solution Store Nepal.</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs text-left">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-cyan-400">{lastOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Customer Name:</span>
                <span className="font-bold text-white">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Payment Method:</span>
                <span className="font-bold text-amber-400 uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Total Paid:</span>
                <span className="font-black text-lg text-cyan-400">${lastOrderTotal}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Link href="/shop" className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 font-bold text-white text-xs hover:from-indigo-500 hover:to-cyan-500 transition shadow-md">
                Continue Shopping →
              </Link>
              <Link href="/admin" className="rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-300 text-xs hover:bg-slate-800 transition">
                Manage Orders (Admin)
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-black text-white mb-8">TechMate Solution Store Checkout</h1>

            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
              {/* Shipping & Payment Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact & Shipping Address */}
                <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-4">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <span>📦</span> Shipping Information
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+977 9800000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-bold text-slate-300 block mb-1">Street Delivery Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Road, Kathmandu"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-3.5 py-2.5"
                    />
                  </div>
                </div>

                {/* Nepal Payment Options */}
                <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-4">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                    <span>💳</span> Select Payment Partner
                  </h2>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <label className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      formData.paymentMethod === 'esewa' ? 'bg-emerald-950/60 border-emerald-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="esewa"
                          checked={formData.paymentMethod === 'esewa'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="accent-emerald-500"
                        />
                        <span>🟢 eSewa Digital Wallet</span>
                      </div>
                    </label>

                    <label className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      formData.paymentMethod === 'khalti' ? 'bg-purple-950/60 border-purple-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="khalti"
                          checked={formData.paymentMethod === 'khalti'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="accent-purple-500"
                        />
                        <span>🟣 Khalti Digital Wallet</span>
                      </div>
                    </label>

                    <label className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      formData.paymentMethod === 'cod' ? 'bg-amber-950/60 border-amber-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="accent-amber-500"
                        />
                        <span>💵 Cash on Delivery (COD)</span>
                      </div>
                    </label>

                    <label className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      formData.paymentMethod === 'card' ? 'bg-indigo-950/60 border-indigo-500 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="accent-indigo-500"
                        />
                        <span>💳 Visa / Mastercard</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary & Coupon */}
              <div className="h-fit space-y-6">
                {/* Coupon Box */}
                <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-3">
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">Discount Coupon</h3>
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="e.g. SAVE10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 rounded-xl bg-slate-950 border border-slate-700 text-white px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-[11px] text-emerald-400 font-bold">
                      ✓ Coupon {appliedCoupon.code} applied!
                    </p>
                  )}
                </div>

                {/* Summary Table */}
                <div className="rounded-2xl bg-slate-900 p-6 shadow-xl border border-indigo-950 space-y-4">
                  <h3 className="font-bold text-white border-b border-slate-800 pb-3 text-sm">Summary ({items.length} Items)</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal:</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Discount:</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping:</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Tax (10%):</span>
                      <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-black text-white">
                      <span>Total:</span>
                      <span className="text-cyan-400">${grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-4 text-white font-black text-xs hover:from-indigo-500 hover:to-cyan-500 transition shadow-xl uppercase tracking-wider"
                  >
                    PLACE ORDER WITH TECHMATE SOLUTION STORE →
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
