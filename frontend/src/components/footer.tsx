import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSiteCMS, SiteCMS } from '../data/cms';

export default function Footer() {
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());

  useEffect(() => {
    setCms(getSiteCMS());
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-indigo-950 text-slate-400 text-xs font-sans mt-auto relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center font-black text-xl text-slate-950">
                🤖
              </div>
              <span className="text-xl font-black text-white flex items-center gap-1">
                TechMate <span className="text-cyan-400">.</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nepal's premier TechMate marketplace hosting 400+ genuine electronics, audio gear, and accessories. Fast delivery across all 77 districts with eSewa & Khalti payment integration.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                ● 100% Genuine Guarantee
              </span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
                77 Districts Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Shopping Catalog</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-cyan-400 transition">All 400 Products</Link></li>
              <li><Link href="/shop?category=Audio" className="hover:text-cyan-400 transition">Audio & Sound</Link></li>
              <li><Link href="/shop?category=Keyboards" className="hover:text-cyan-400 transition">Mechanical Keyboards</Link></li>
              <li><Link href="/shop?category=Monitors" className="hover:text-cyan-400 transition">Monitors & Displays</Link></li>
              <li><Link href="/cart" className="hover:text-cyan-400 transition">Your Cart</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Customer Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/experience" className="text-amber-400 hover:text-amber-300 transition font-bold">🎬 Live Journey Simulator</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition">Help & FAQ</Link></li>
              <li><Link href="/returns" className="hover:text-cyan-400 transition">Return Policy</Link></li>
              <li><Link href="/warranty" className="hover:text-cyan-400 transition">TechMate Care Warranty</Link></li>
              <li><Link href="/terms" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Company & Founder */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Company & Founder</h4>
            <ul className="space-y-2">
              <li><Link href="/portfolio" className="text-cyan-400 hover:underline font-bold">👨‍💻 Founder Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition">About TechMate</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition">Contact Us</Link></li>
              <li><Link href="/admin/dashboard" className="text-slate-500 hover:text-slate-300 transition">Admin Dashboard</Link></li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>📍 {cms.officeAddress}</p>
              <p>📞 {cms.supportPhone}</p>
              <p>✉️ {cms.supportEmail}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TechMate Nepal. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-cyan-400 font-bold">eSewa • Khalti • IME Pay • COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
