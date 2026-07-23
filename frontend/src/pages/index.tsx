import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
import {
  TechHeroIllustration,
  NepalExpressShippingIllustration,
  KarkiWarrantyShieldIllustration,
  PaymentSecurityIllustration,
} from '../components/svg-illustrations';
import { showToast } from '../components/toast';
import { useCart } from '../context/cart';
import { INITIAL_400_PRODUCTS, Product } from '../data/products';
import { getSiteCMS, SiteCMS } from '../data/cms';

const KARKI_CATEGORIES = [
  { name: 'Audio & Sound', icon: '🎧', count: '70 Items' },
  { name: 'Cameras & Tech', icon: '📷', count: '50 Items' },
  { name: 'Keyboards & Mice', icon: '⌨️', count: '70 Items' },
  { name: 'Hubs & Power', icon: '🔌', count: '60 Items' },
  { name: 'Monitors & Displays', icon: '🖥️', count: '50 Items' },
  { name: 'Smartwatches', icon: '⌚', count: '50 Items' },
  { name: 'Accessories & Gadgets', icon: '💡', count: '50 Items' },
];

const KARKI_BRANDS = [
  { name: 'Sony Audio', badge: '100% Genuine', logo: '🎧' },
  { name: 'Logitech Gear', badge: 'Karki Official', logo: '⌨️' },
  { name: 'Anker Power', badge: '1-Yr Warranty', logo: '⚡' },
  { name: 'Samsung Tech', badge: 'Free Delivery', logo: '📱' },
];

const Home: NextPage = () => {
  const [productList, setProductList] = useState<Product[]>(INITIAL_400_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('Audio & Sound');
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const { addItem } = useCart();

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

  const flashItems = productList.slice(0, 4).map((item, idx) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    originalPrice: (parseFloat(item.price) * 1.3).toFixed(2),
    discount: `-${20 + (idx * 3)}%`,
    soldPercent: 70 + (idx * 6),
    image: item.imageUrl || item.image || '',
  }));

  const handleFlashQuickAdd = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      slug: item.id,
    });
    showToast(`⚡ Added "${item.name}" to your Karki Store cart!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>{cms.heroTitle} | Karki Store Tech Marketplace</title>
        <meta name="description" content="Shop 400+ genuine tech products, audio gear, mechanical keyboards, and 4K webcams at Karki Store Nepal." />
      </Head>

      {/* Interactive Background Canvas */}
      <ParticleCanvas />
      <LivePurchaseTicker />

      <Navigation />

      <main className="flex-1 relative z-10 space-y-6">
        {/* Hero Showcase */}
        <section className="mx-auto max-w-7xl px-4 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left Category Sidebar */}
            <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl shadow-2xl border border-indigo-950 p-3 hidden lg:block backdrop-blur-md">
              <p className="text-xs font-black text-cyan-400 uppercase tracking-wider px-3 py-2 border-b border-slate-800 flex justify-between items-center">
                <span>Categories</span>
                <span className="bg-indigo-900 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-bold">400 Items</span>
              </p>
              <ul className="space-y-1 mt-2">
                {KARKI_CATEGORIES.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                        activeCategory === cat.name
                          ? 'bg-indigo-900/80 text-cyan-400 border border-indigo-700/50 shadow-md'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Hero Showcase */}
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white p-8 md:p-12 shadow-2xl relative overflow-hidden border border-indigo-800/60 flex flex-col md:flex-row justify-between items-center gap-6 group min-h-[340px]">
                <div className="relative z-10 space-y-4 max-w-md">
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-cyan-400/30 inline-flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    KARKI STORE OFFICIAL LAUNCH
                  </span>

                  <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
                    {cms.heroTitle}
                  </h1>

                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {cms.heroSubtitle}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 px-8 py-3.5 font-black text-white transition-all duration-500 text-xs shadow-2xl tracking-wider uppercase border border-cyan-400/30 hover:scale-105"
                    >
                      <span>{cms.heroCtaText}</span>
                    </Link>
                  </div>
                </div>

                <div className="relative z-10 hidden sm:block">
                  <TechHeroIllustration />
                </div>
              </div>

              {/* Right Interactive Widgets */}
              <div className="space-y-4">
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-indigo-950 shadow-xl space-y-2 backdrop-blur-md hover:border-cyan-500/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl border border-cyan-500/20">
                      🚚
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Nepalwide Express</p>
                      <p className="text-xs text-slate-400">Free delivery on orders $50+</p>
                    </div>
                  </div>
                  <Link href="/warranty" className="block w-full text-center rounded-xl bg-indigo-950 text-cyan-400 py-2 font-bold text-xs hover:bg-indigo-900 transition border border-indigo-800">
                    Claim Shipping Voucher
                  </Link>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-indigo-950 shadow-xl space-y-2 backdrop-blur-md hover:border-amber-500/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/20">
                      🛡️
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Karki Care Warranty</p>
                      <p className="text-xs text-slate-400">100% Authentic Guarantee</p>
                    </div>
                  </div>
                  <Link href="/warranty" className="block w-full text-center rounded-xl bg-amber-950/60 text-amber-400 py-2 font-bold text-xs hover:bg-amber-900/60 transition border border-amber-800/50">
                    Learn Protection Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏔️ DYNAMIC ANIMATED HIMALAYAN KATHMANDU LANDSCAPE SECTION */}
        <section className="mx-auto max-w-7xl px-4 py-2">
          <LandscapeAnimation />
        </section>

        {/* 🏃‍♂️ CONTINUOUS HUMAN WALKING ANIMATION TRACK */}
        <section className="mx-auto max-w-7xl px-4 py-2">
          <HumanWalkingJourney />
        </section>

        {/* 🎬 ANIMATED CHARACTER MOVIE THEATER */}
        <section className="mx-auto max-w-7xl px-4 py-2">
          <CharacterMovieTheater />
        </section>

        {/* ⚡ REAL-TIME CUSTOMER ORDER & DELIVERY MAP */}
        <section className="mx-auto max-w-7xl px-4 py-2">
          <LiveFulfillmentMap />
        </section>

        {/* 📊 Customer Trust Metrics Bar */}
        <section className="mx-auto max-w-7xl px-4 py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/90 rounded-2xl p-6 border border-indigo-950 shadow-xl text-center backdrop-blur-md">
            <div>
              <p className="text-2xl font-black text-cyan-400">50,000+</p>
              <p className="text-xs text-slate-400 mt-0.5">Happy Tech Buyers in Nepal</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-400">400+</p>
              <p className="text-xs text-slate-400 mt-0.5">Active Tech Catalog Items</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">77 Districts</p>
              <p className="text-xs text-slate-400 mt-0.5">Express Postal Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">99.8%</p>
              <p className="text-xs text-slate-400 mt-0.5">On-Time Fulfillment Rate</p>
            </div>
          </div>
        </section>

        {/* 🛍️ Live Nepal Order & Express Delivery Journey */}
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">
              AUTOMATED FULFILLMENT PIPELINE
            </span>
            <h2 className="text-3xl font-black text-white">How Orders Travel From Kathmandu To Your Door</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-4 backdrop-blur-md hover:border-cyan-400/60 transition duration-300">
              <PeopleBuyingLottieScene />
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-3 py-1 rounded-full border border-cyan-400/30">
                STEP 1 • DIGITAL ORDER
              </span>
              <h3 className="text-lg font-black text-white">Customers Buy Online</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose from 400+ genuine tech products and checkout instantly using eSewa, Khalti, IME Pay, or Cash on Delivery.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-4 backdrop-blur-md hover:border-amber-400/60 transition duration-300">
              <PackageDeliveryLottieScene />
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full border border-amber-400/30">
                STEP 2 • EXPRESS DISPATCH
              </span>
              <h3 className="text-lg font-black text-white">Express Courier Logistics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Orders are packed at our Kathmandu hub and dispatched within 24 hours to all 77 Nepal districts with live SMS tracking.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-4 backdrop-blur-md hover:border-emerald-400/60 transition duration-300">
              <CustomerSatisfactionLottieScene />
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-400/30">
                STEP 3 • UNBOXING & WARRANTY
              </span>
              <h3 className="text-lg font-black text-white">Happy Delivery & Karki Care</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enjoy 100% genuine tech backed by 1-year Karki Care replacement warranty and dedicated 24/7 helpline support.
              </p>
            </div>
          </div>
        </section>

        {/* 🔥 Karki Flash Sale Section */}
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="bg-slate-900/90 rounded-3xl p-6 shadow-2xl border border-indigo-950 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-amber-400 flex items-center gap-2">
                  <span className="animate-bounce">⚡</span> Karki Flash Sale
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  <span>Ending in:</span>
                  <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono font-black">05</span>:
                  <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono font-black">18</span>:
                  <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono font-black">42</span>
                </div>
              </div>
              <Link href="/shop" className="text-xs font-bold text-cyan-400 border border-cyan-500/40 px-4 py-2 rounded-xl hover:bg-cyan-500/10 transition">
                VIEW ALL DEALS →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {flashItems.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-4 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 space-y-2 group">
                  <div className="aspect-square bg-slate-900 rounded-xl flex items-center justify-center text-5xl relative overflow-hidden border border-slate-800">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      '📦'
                    )}
                    <span className="absolute top-2 right-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md">
                      {item.discount}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-xs truncate group-hover:text-cyan-400 transition">{item.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-cyan-400">${item.price}</span>
                    <span className="text-xs text-slate-500 line-through">${item.originalPrice}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-cyan-500 h-full rounded-full" style={{ width: `${item.soldPercent}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.soldPercent}% Claimed</p>
                  </div>

                  <button
                    onClick={() => handleFlashQuickAdd(item)}
                    className="w-full rounded-xl bg-indigo-600 py-2.5 text-white text-xs font-bold hover:bg-indigo-500 transition shadow-md uppercase tracking-wider"
                  >
                    + Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🌟 Why Choose Karki Store Nepal? */}
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="text-center mb-8">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">NEPAL'S PREMIER TECH STORE</span>
            <h2 className="text-3xl font-black text-white">Why Shop At Karki Store?</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-3 backdrop-blur-md hover:border-cyan-400/60 transition">
              <NepalExpressShippingIllustration />
              <h3 className="text-lg font-black text-white">77-District Express Shipping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fast courier dispatch to Kathmandu, Pokhara, Biratnagar, Chitwan, and all 77 districts with live SMS tracking.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-3 backdrop-blur-md hover:border-amber-400/60 transition">
              <KarkiWarrantyShieldIllustration />
              <h3 className="text-lg font-black text-white">100% Genuine & Karki Warranty</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every product comes with official manufacturer serial numbers and 1-year Karki Care replacement guarantee.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col items-center text-center space-y-3 backdrop-blur-md hover:border-indigo-400/60 transition">
              <PaymentSecurityIllustration />
              <h3 className="text-lg font-black text-white">Local Digital Wallet Payments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamless instant checkout with eSewa, Khalti, IME Pay, Cash on Delivery (COD), and Visa/Mastercard.
              </p>
            </div>
          </div>
        </section>

        {/* 🏬 KarkiMall */}
        <section className="mx-auto max-w-7xl px-4 py-4">
          <div className="bg-slate-900/90 rounded-3xl p-6 shadow-2xl border border-indigo-950 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-white">KarkiMall</h2>
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">100% Genuine</span>
              </div>
              <Link href="/shop" className="text-xs font-bold text-cyan-400 hover:underline">
                View Brand Stores →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {KARKI_BRANDS.map((brand, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center hover:border-cyan-400/60 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-2">{brand.logo}</div>
                  <h3 className="font-bold text-white text-sm mb-1">{brand.name}</h3>
                  <span className="inline-block bg-indigo-950 text-cyan-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-800">
                    {brand.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🎯 "Just For You" Interactive Grid */}
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Just For You</h2>
              <p className="text-xs text-slate-400">Curated tech selection from Karki Store's 400 active products</p>
            </div>
            <Link
              href="/shop"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-5 py-2.5 text-xs font-extrabold hover:from-indigo-500 hover:to-cyan-500 transition shadow-md uppercase tracking-wider"
            >
              Shop 400 Products →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productList.slice(0, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center pb-8">
            <Link
              href="/shop"
              className="inline-block rounded-xl border border-indigo-600 bg-indigo-950 text-cyan-400 px-8 py-3.5 text-xs font-extrabold hover:bg-indigo-900 transition shadow-2xl uppercase tracking-wider"
            >
              BROWSE ALL 400 ITEMS IN KARKI STORE →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
