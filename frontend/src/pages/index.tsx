import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import ProductCard from '../components/product-card';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import ParticleCanvas from '../components/particle-canvas';
import LivePurchaseTicker from '../components/live-purchase-ticker';
import LiveFulfillmentMap from '../components/live-fulfillment-map';
import CharacterMovieTheater from '../components/character-movie-theater';
import HumanWalkingJourney from '../components/human-walking-journey';
import LandscapeAnimation from '../components/landscape-animation';
import {
  PeopleBuyingLottieScene,
  PackageDeliveryLottieScene,
  CustomerSatisfactionLottieScene,
} from '../components/lottie-scenes';
import { showToast } from '../components/toast';
import { useCart } from '../context/cart';
import { INITIAL_400_PRODUCTS, Product } from '../data/products';
import { getSiteCMS, SiteCMS } from '../data/cms';

const TECHMATE_CATEGORIES = [
  { name: 'All Products', icon: '🛍️', count: '400 Items' },
  { name: 'Audio', icon: '🎧', count: '70 Items' },
  { name: 'Cameras', icon: '📷', count: '50 Items' },
  { name: 'Keyboards', icon: '⌨️', count: '70 Items' },
  { name: 'Hubs', icon: '🔌', count: '60 Items' },
  { name: 'Monitors', icon: '🖥️', count: '50 Items' },
  { name: 'Smartwatches', icon: '⌚', count: '50 Items' },
  { name: 'Gadgets', icon: '💡', count: '50 Items' },
];

const Home: NextPage = () => {
  const [productList, setProductList] = useState<Product[]>(INITIAL_400_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const { addItem } = useCart();
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false);

  useEffect(() => {
    setCms(getSiteCMS());
    const savedProducts = localStorage.getItem('custom_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length >= 50) {
          setProductList(parsed);
        } else {
          setProductList(INITIAL_400_PRODUCTS);
          localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
        }
      } catch (e) {
        setProductList(INITIAL_400_PRODUCTS);
        localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
      }
    } else {
      setProductList(INITIAL_400_PRODUCTS);
      localStorage.setItem('custom_products', JSON.stringify(INITIAL_400_PRODUCTS));
    }
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...productList];

    if (selectedCategory !== 'All Products') {
      result = result.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sortBy === 'low-high') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    return result;
  }, [productList, selectedCategory, searchQuery, sortBy]);

  const flashItems = productList.slice(0, 4);
  const trendingAudio = productList.filter((p) => p.category === 'Audio').slice(0, 4);
  const trendingKeyboards = productList.filter((p) => p.category === 'Keyboards').slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>TechMate Nepal | #1 E-Commerce Tech Marketplace (400+ Products)</title>
        <meta name="description" content="Shop 400+ genuine headphones, mechanical keyboards, 4K webcams & electronics in Nepal with eSewa & Khalti." />
      </Head>

      <ParticleCanvas />
      <LivePurchaseTicker />
      <Navigation />

      <main className="flex-1 relative z-10 space-y-10 py-6">

        {/* 🚀 TOP HERO BANNER: PRODUCT FOCUS */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left 8-Cols: Main Deal Showcase */}
            <div className="lg:col-span-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-800/80 p-8 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              
              <div className="space-y-4 max-w-xl relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-cyan-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    ⚡ MEGA TECH SALE 2026
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/40">
                    ● 400+ Items Available
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                  Supercharge Your Workspace With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">TechMate Genuine Tech</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Fast 24-hour delivery across Kathmandu Valley & 77 districts in Nepal. Official manufacturer serial warranty with eSewa & Khalti digital payments.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/shop"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:scale-105 px-8 py-3.5 font-black text-slate-950 text-xs transition shadow-2xl uppercase tracking-wider border border-cyan-400"
                  >
                    SHOP ALL 400 PRODUCTS NOW →
                  </Link>
                  <a
                    href="#flash-sale"
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 px-6 py-3.5 text-cyan-300 font-bold text-xs transition border border-slate-800"
                  >
                    ⚡ View Flash Deals
                  </a>
                </div>
              </div>

              {/* Decorative Subtle Grid */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Right 4-Cols: Daily Deal Featured Card */}
            <div className="lg:col-span-4 rounded-3xl bg-slate-900/90 border border-indigo-950 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  🔥 Deal of the Day
                </span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-red-500/30">
                  SAVE 30%
                </span>
              </div>

              {productList[0] && (
                <div className="space-y-3">
                  <div className="aspect-square bg-slate-950 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-800 relative group">
                    <img
                      src={productList[0].imageUrl || productList[0].image}
                      alt={productList[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-slate-950/90 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded border border-slate-800">
                      Stock: {productList[0].stock} Available
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-white text-sm truncate">{productList[0].name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{productList[0].description}</p>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-cyan-400">${productList[0].price}</span>
                      <span className="text-xs text-slate-500 line-through">${(parseFloat(productList[0].price) * 1.3).toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        addItem({
                          id: productList[0].id,
                          name: productList[0].name,
                          price: productList[0].price,
                          quantity: 1,
                          slug: productList[0].slug,
                        });
                        showToast(`⚡ Added "${productList[0].name}" to cart!`, 'success');
                      }}
                      className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-xs font-black transition shadow-lg"
                    >
                      + Quick Buy
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 🏷️ INTERACTIVE CATEGORY BAR & FILTER CONTROLS */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-indigo-950 shadow-xl backdrop-blur-md space-y-4">
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {TECHMATE_CATEGORIES.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedCategory === cat.name
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Instant Filter & Sort Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Filter 400 products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl bg-slate-950 text-slate-200 border border-slate-800 px-3.5 py-2 text-xs font-medium focus:border-cyan-400 outline-none w-full sm:w-48"
                />

                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="rounded-xl bg-slate-950 text-slate-200 border border-slate-800 px-3 py-2 text-xs font-bold focus:border-cyan-400 outline-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Top Rated ⭐</option>
                </select>
              </div>
            </div>

          </div>
        </section>

        {/* ⚡ FLASH DEALS SECTION */}
        <section id="flash-sale" className="mx-auto max-w-7xl px-4">
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-indigo-950 shadow-2xl backdrop-blur-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-amber-400 flex items-center gap-2">
                  <span className="animate-bounce">⚡</span> TechMate Flash Deals
                </h2>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                  Limited Nepal Stock
                </span>
              </div>
              <Link href="/shop" className="text-xs font-bold text-cyan-400 hover:underline">
                View All 400 Products →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {flashItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 🎧 CATEGORY SHOWCASE 1: AUDIO & SOUND */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white">🎧 Audio & Studio Gear</h2>
                <span className="bg-indigo-950 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-800">
                  70 Items
                </span>
              </div>
              <Link href="/shop?category=Audio" className="text-xs font-bold text-cyan-400 hover:underline">
                Explore Audio Catalog →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {trendingAudio.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ⌨️ CATEGORY SHOWCASE 2: MECHANICAL KEYBOARDS */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-white">⌨️ Mechanical Keyboards & Mice</h2>
                <span className="bg-indigo-950 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-800">
                  70 Items
                </span>
              </div>
              <Link href="/shop?category=Keyboards" className="text-xs font-bold text-cyan-400 hover:underline">
                Explore Keyboards →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {trendingKeyboards.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* 🎯 MAIN 400-PRODUCT MARKETPLACE GRID */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {selectedCategory === 'All Products' ? 'All 400 Products Marketplace' : `${selectedCategory} Catalog`}
                </h2>
                <p className="text-xs text-slate-400">
                  Showing {filteredProducts.length} items • Authentic quality guaranteed by TechMate Care
                </p>
              </div>
              <span className="text-xs font-bold text-cyan-400 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800">
                Page 1 of {Math.ceil(filteredProducts.length / 16)}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.slice(0, 20).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center pt-6">
              <Link
                href="/shop"
                className="inline-block rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 hover:scale-105 px-10 py-4 font-black text-white text-xs transition shadow-2xl uppercase tracking-wider border border-cyan-400/40"
              >
                BROWSE COMPLETE 400 PRODUCTS IN SHOP CATALOG →
              </Link>
            </div>
          </div>
        </section>

        {/* 🚚 WHY TECHMATE NEPAL (BENEFITS BAR) */}
        <section className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-indigo-950 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-3xl border border-cyan-500/20 shrink-0">
                🚚
              </div>
              <div>
                <h3 className="font-black text-white text-sm">77 Districts Delivery</h3>
                <p className="text-xs text-slate-400">Express courier dispatch from Kathmandu with live SMS tracking.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-3xl border border-amber-500/20 shrink-0">
                🛡️
              </div>
              <div>
                <h3 className="font-black text-white text-sm">TechMate Care Warranty</h3>
                <p className="text-xs text-slate-400">100% Genuine products with 1-Year replacement guarantee.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-3xl border border-indigo-500/20 shrink-0">
                💳
              </div>
              <div>
                <h3 className="font-black text-white text-sm">eSewa & Khalti Checkout</h3>
                <p className="text-xs text-slate-400">Instant digital wallet payment or Cash on Delivery across Nepal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🎬 BOTTOM SECTION: EXPANDABLE INTERACTIVE DEMO & ANIMATION HUB */}
        <section className="mx-auto max-w-7xl px-4 pt-6">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span>🎬 Interactive Tech Demos & Kathmandu Simulation</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Explore 60 FPS physics engines, Himalayan landscape, and live order tracking simulations.
                </p>
              </div>

              <button
                onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-cyan-400 font-bold text-xs transition border border-slate-700 whitespace-nowrap"
              >
                {showInteractiveDemo ? '▲ Hide Interactive Demos' : '▼ Expand Interactive Demos'}
              </button>
            </div>

            {showInteractiveDemo && (
              <div className="space-y-8 pt-6 border-t border-slate-800 text-left">
                <div>
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">1. Himalayan Kathmandu Landscape Simulation</h4>
                  <LandscapeAnimation />
                </div>

                <div>
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">2. 60 FPS Human Walking Track</h4>
                  <HumanWalkingJourney />
                </div>

                <div>
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">3. Character Movie Theater</h4>
                  <CharacterMovieTheater />
                </div>

                <div>
                  <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">4. Nepal Live Fulfillment Map</h4>
                  <LiveFulfillmentMap />
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
