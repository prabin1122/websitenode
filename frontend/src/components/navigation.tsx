import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCart } from '../context/cart';
import { getSiteCMS, SiteCMS } from '../data/cms';

export default function Navigation() {
  const router = useRouter();
  const { items } = useCart();
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCms(getSiteCMS());
  }, []);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-indigo-950/80 backdrop-blur-md font-sans text-slate-100 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-slate-200 text-[11px] py-1.5 px-4 border-b border-indigo-900/50">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
              Notice
            </span>
            <span className="truncate">{cms.announcementText}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/experience" className="text-cyan-400 hover:underline flex items-center gap-1 font-bold">
              🎬 Live Journey Simulator
            </Link>
            <Link href="/portfolio" className="text-slate-300 hover:text-cyan-300 flex items-center gap-1">
              👨‍💻 Founder Portfolio
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-cyan-300">
              📞 {cms.supportPhone}
            </Link>
            <Link href="/admin/dashboard" className="text-slate-400 hover:text-white text-[11px] border border-slate-700 px-2 py-0.5 rounded">
              🔒 Admin CMS
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Strip */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform flex items-center justify-center font-black text-xl text-slate-950">
            🤖
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1">
              TechMate <span className="text-cyan-400">.</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-bold block leading-none">
              NEPAL TECH MARKETPLACE
            </span>
          </div>
        </Link>

        {/* Instant Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search 400+ genuine tech products, keyboards, audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow"
          >
            Search
          </button>
        </form>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-2xl bg-indigo-950 border border-indigo-800/80 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-indigo-900 hover:border-cyan-400 transition shadow-md"
          >
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="ml-1 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black px-2 py-0.5">
              {totalItemsCount}
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl bg-slate-900 p-2 text-slate-300 hover:text-white border border-slate-800"
          >
            🍔
          </button>
        </div>
      </div>

      {/* Secondary Menu Strip */}
      <div className="bg-slate-950 border-t border-slate-900 px-4 py-2 hidden md:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-xs font-bold text-slate-300">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-cyan-400 transition">
              🏠 Home
            </Link>
            <Link href="/shop" className="hover:text-cyan-400 transition flex items-center gap-1">
              <span>🛍️ Catalog</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-[9px] font-black px-1.5 py-0.5 rounded">400+</span>
            </Link>
            <Link href="/experience" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1">
              <span>🎬 Live Journey Simulator</span>
            </Link>
            <Link href="/portfolio" className="hover:text-cyan-400 transition">
              👨‍💻 Founder Portfolio
            </Link>
            <Link href="/about" className="hover:text-cyan-400 transition">
              ℹ️ About Us
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">
              📞 Contact
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>💳 eSewa & Khalti Accepted</span>
            <span>🚚 Express Delivery 77 Districts</span>
          </div>
        </div>
      </div>
    </header>
  );
}
