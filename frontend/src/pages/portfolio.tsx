import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import ParticleCanvas from '../components/particle-canvas';
import HumanWalkingJourney from '../components/human-walking-journey';
import CharacterMovieTheater from '../components/character-movie-theater';
import LiveFulfillmentMap from '../components/live-fulfillment-map';
import LandscapeAnimation from '../components/landscape-animation';

const COMPANY_STATS = [
  { label: 'Registered Customers', value: '50,000+', icon: '👥', change: '+24% YoY' },
  { label: 'Active SKUs Catalog', value: '400+ SKUs', icon: '📦', change: '100% Verified' },
  { label: 'Nepal Postal Reach', value: '77 Districts', icon: '🇳🇵', change: '24hr Dispatch' },
  { label: 'Logistics SLA Rate', value: '99.8%', icon: '⚡', change: 'Guaranteed' },
];

const COMPANY_PILLARS = [
  {
    title: '100% Genuine Tech Quality',
    desc: 'Direct importer and authorized merchant partner for global tech leaders including Sony, Logitech, Anker, Samsung, and Keychron.',
    icon: '🛡️',
    color: 'from-cyan-500/20 to-indigo-500/20 border-cyan-500/30',
  },
  {
    title: 'Nationwide Logistics Pipeline',
    desc: 'Proprietary 77-district courier dispatch network with live SMS status tracking and same-day delivery across Kathmandu Valley.',
    icon: '🚚',
    color: 'from-indigo-500/20 to-cyan-500/20 border-indigo-500/30',
  },
  {
    title: 'Fintech Payment Integration',
    desc: 'Seamless real-time integration with eSewa, Khalti, IME Pay, Visa/Mastercard, and Cash on Delivery across Nepal.',
    icon: '💳',
    color: 'from-amber-500/20 to-red-500/20 border-amber-500/30',
  },
  {
    title: 'Enterprise TechMate Care SLA',
    desc: 'Official 1-year replacement warranty, dedicated corporate account managers, and 24/7 technical customer assistance.',
    icon: '🏢',
    color: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30',
  },
];

const TECH_ARCHITECTURE = [
  { name: 'Next.js 14 & React 18', category: 'Frontend Platform', desc: 'High-performance SSR e-commerce web platform.' },
  { name: 'TypeScript & Node.js', category: 'Backend Engine', desc: 'Microservices architecture with REST & GraphQL APIs.' },
  { name: 'PostgreSQL & Prisma', category: 'Data Infrastructure', desc: 'Enterprise relational database with ACID compliance.' },
  { name: 'Redis Caching & PubSub', category: 'In-Memory Layer', desc: 'Sub-millisecond inventory caching and session store.' },
  { name: 'Kubernetes & Docker', category: 'Cloud Infrastructure', desc: 'Containerized deployment with autoscaling.' },
  { name: 'eSewa & Khalti Merchant SDK', category: 'Fintech Gateway', desc: 'HMAC-secured instant wallet transaction verification.' },
];

const COMPANY_PRODUCTS = [
  {
    title: 'TechMate E-Commerce Engine',
    category: 'Consumer Digital Platform',
    desc: 'Nepal\'s premier electronics e-commerce platform hosting 400+ active items, dynamic pricing, and real-time inventory management.',
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    link: '/shop',
  },
  {
    title: '77-District Postal & Logistics SDK',
    category: 'Cloud Infrastructure',
    desc: 'Automated dispatch tracking pipeline linking Kathmandu central hub with regional postal couriers across all 77 districts.',
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'SMS API'],
    link: '/checkout',
  },
  {
    title: 'Fintech Wallet Payment Gateway',
    category: 'Payment Infrastructure',
    desc: 'Merchant SDK enabling one-click digital checkout via eSewa, Khalti, and IME Pay with instant payment reconciliation.',
    tech: ['TypeScript', 'REST API', 'Crypto HMAC', 'Express.js'],
    link: '/cart',
  },
  {
    title: 'TechMate Care Warranty Portal',
    category: 'Enterprise Service System',
    desc: 'Automated warranty registration and serial verification portal serving thousands of happy tech customers.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Email SDK'],
    link: '/warranty',
  },
];

const BRAND_PARTNERS = [
  { name: 'Sony Electronics', tier: 'Authorized Retailer', logo: '🎧' },
  { name: 'Logitech International', tier: 'Official Brand Partner', logo: '⌨️' },
  { name: 'Anker Innovations', tier: 'Direct Importer', logo: '⚡' },
  { name: 'Samsung Electronics', tier: 'Verified Distributor', logo: '📱' },
  { name: 'Keychron Keyboards', tier: 'Official Nepal Partner', logo: '⌨️' },
  { name: 'Sennheiser Audio', tier: 'Certified Reseller', logo: '🔊' },
];

const COMPANY_TIMELINE = [
  {
    year: '2020',
    title: 'Company Foundation',
    desc: 'TechMate Nepal Pvt. Ltd. established in Kathmandu with core focus on authentic electronics supply chain.',
    icon: '🏛️',
  },
  {
    year: '2022',
    title: 'eSewa & Khalti Integration',
    desc: 'Pioneered seamless digital wallet payments and expanded Kathmandu Valley same-day delivery.',
    icon: '💳',
  },
  {
    year: '2024',
    title: '77-District Postal Expansion',
    desc: 'Built proprietary automated courier dispatch pipeline serving all 77 districts of Nepal.',
    icon: '🚚',
  },
  {
    year: '2026',
    title: '400+ SKU Enterprise Marketplace',
    desc: 'Launched next-generation TechMate web platform featuring 60 FPS physics engines, custom CMS, and 400+ verified SKUs.',
    icon: '🚀',
  },
];

const CompanyPortfolioPage: NextPage = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('b2b@techmate.com.np');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>TechMate Nepal Pvt. Ltd. | Enterprise Company Portfolio & Tech Infrastructure</title>
        <meta name="description" content="Official corporate portfolio of TechMate Nepal Pvt. Ltd. — Nepal's leading e-commerce tech marketplace, logistics pipeline, and fintech infrastructure." />
      </Head>

      <ParticleCanvas />
      <Navigation />

      <main className="flex-1 relative z-10 mx-auto max-w-7xl px-4 py-8 space-y-16">
        
        {/* SECTION 1: CORPORATE HERO & HIMALAYAN OPERATIONS HUB */}
        <section className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 border border-indigo-800/80 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3.5 py-1.5 text-xs font-black text-cyan-300 border border-cyan-400/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>TECHMATE NEPAL PVT. LTD. • ENTERPRISE PORTFOLIO</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Building Nepal's Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-cyan-400">Tech Marketplace</span> 🏢
            </h1>

            <p className="text-base text-slate-300 font-normal leading-relaxed">
              TechMate Nepal Pvt. Ltd. is a premier technology enterprise headquartered in Kathmandu. We pioneer high-scale e-commerce infrastructure, 77-district postal logistics engines, and fintech wallet payment integrations serving over 50,000 customers.
            </p>

            {/* Corporate Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-black">
              <button
                onClick={handleCopyEmail}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-slate-950 px-6 py-3.5 hover:scale-105 transition shadow-2xl uppercase tracking-wider border border-cyan-400 flex items-center gap-2"
              >
                <span>🏢 B2B & Corporate Contact</span>
                <span className="bg-slate-950 text-cyan-400 px-2 py-0.5 rounded text-[10px]">
                  {copiedEmail ? 'Copied!' : 'Copy Email'}
                </span>
              </button>

              <Link
                href="/shop"
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 px-6 py-3.5 transition border border-slate-800 uppercase tracking-wider"
              >
                Browse 400 Product SKUs →
              </Link>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto text-center space-y-2">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-cyan-400 p-1 shadow-2xl mx-auto flex items-center justify-center font-black text-4xl text-slate-950">
              🤖
            </div>
            <p className="font-black text-white text-lg">TechMate Nepal</p>
            <p className="text-xs text-slate-400 font-mono">Reg. No: 609812345 • Govt. Authorized</p>
          </div>
        </section>

        {/* SECTION 2: ENTERPRISE TELEMETRY & SCALE METRICS */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">COMPANY SCALE & METRICS</span>
            <h2 className="text-3xl font-black text-white">Enterprise Operational Telemetry</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl text-center space-y-2 backdrop-blur-md hover:border-cyan-400/50 transition">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <p className="text-3xl font-black text-cyan-400">{stat.value}</p>
                <p className="text-xs font-bold text-white">{stat.label}</p>
                <span className="inline-block bg-indigo-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-indigo-800">
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DYNAMIC HIMALAYAN KATHMANDU DISPATCH CENTER */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">OPERATIONS HUB</span>
              <h2 className="text-2xl font-black text-white">Kathmandu Central Dispatch Center</h2>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              ● Live Kathmandu Hub Active
            </span>
          </div>

          <LandscapeAnimation />
        </section>

        {/* SECTION 4: CORPORATE MISSION & STRATEGIC PILLARS */}
        <section className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">STRATEGIC VISION</span>
            <h2 className="text-3xl font-black text-white">TechMate Corporate Pillars</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COMPANY_PILLARS.map((pillar, idx) => (
              <div key={idx} className={`rounded-3xl bg-slate-900/90 p-8 border shadow-2xl space-y-3 backdrop-blur-md bg-gradient-to-r ${pillar.color}`}>
                <div className="text-4xl">{pillar.icon}</div>
                <h3 className="text-xl font-black text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: ENTERPRISE TECH STACK & ARCHITECTURE */}
        <section className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">SOFTWARE ARCHITECTURE</span>
            <h2 className="text-3xl font-black text-white">Enterprise Infrastructure Stack</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {TECH_ARCHITECTURE.map((tech, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/90 p-5 border border-indigo-950 shadow-xl space-y-2 backdrop-blur-md hover:border-cyan-400 transition">
                <span className="bg-indigo-950 text-cyan-400 text-[10px] font-black px-2.5 py-0.5 rounded border border-indigo-800 uppercase">
                  {tech.category}
                </span>
                <h3 className="font-bold text-white text-sm">{tech.name}</h3>
                <p className="text-xs text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FLAGSHIP PRODUCTS & DIGITAL PLATFORMS */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">ENTERPRISE PORTFOLIO</span>
              <h2 className="text-3xl font-black text-white">Digital Systems & Products</h2>
            </div>
            <Link href="/shop" className="text-xs font-bold text-cyan-400 hover:underline">
              View Consumer Marketplace →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COMPANY_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="rounded-3xl bg-slate-900/90 p-8 border border-indigo-950 shadow-2xl space-y-4 backdrop-blur-md hover:border-cyan-400 transition">
                <div className="flex justify-between items-center">
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-3 py-1 rounded-full border border-cyan-400/30 uppercase">
                    {prod.category}
                  </span>
                  <Link href={prod.link} className="text-xs font-bold text-cyan-400 hover:underline">
                    Access System →
                  </Link>
                </div>

                <h3 className="text-xl font-black text-white">{prod.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{prod.desc}</p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                  {prod.tech.map((t, i) => (
                    <span key={i} className="bg-slate-950 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: OFFICIAL BRAND PARTNERSHIPS */}
        <section className="space-y-6">
          <div className="bg-slate-900/90 rounded-3xl p-8 border border-indigo-950 shadow-2xl backdrop-blur-md space-y-6">
            <div className="text-center">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">BRAND AUTHORIZATION</span>
              <h2 className="text-2xl font-black text-white">Official Brand Partnerships</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {BRAND_PARTNERS.map((brand, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-950 p-4 text-center border border-slate-800 space-y-2 hover:border-cyan-400/60 transition">
                  <div className="text-3xl">{brand.logo}</div>
                  <h3 className="font-bold text-white text-xs">{brand.name}</h3>
                  <span className="inline-block bg-indigo-950 text-cyan-300 text-[9px] font-semibold px-2 py-0.5 rounded border border-indigo-800">
                    {brand.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: REAL-TIME 60 FPS FULFILLMENT SIMULATION */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">LOGISTICS ENGINE</span>
            <h2 className="text-2xl font-black text-white">Real-Time Dispatch Tracking Physics</h2>
          </div>

          <HumanWalkingJourney />
        </section>

        {/* SECTION 9: CORPORATE GROWTH TIMELINE */}
        <section className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-1">COMPANY HISTORY</span>
            <h2 className="text-3xl font-black text-white">Corporate Growth Milestones</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {COMPANY_TIMELINE.map((m, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900/90 p-6 border border-indigo-950 shadow-xl space-y-2 backdrop-blur-md">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs font-black font-mono text-cyan-400 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                    {m.year}
                  </span>
                </div>
                <h3 className="font-bold text-white text-sm">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: CORPORATE B2B HEADQUARTERS & CONTACT */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-8 sm:p-12 border border-indigo-800/80 shadow-2xl text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              CORPORATE HEADQUARTERS & B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Partner With TechMate Nepal</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For bulk wholesale orders, corporate hardware procurement, and merchant API integrations, reach out to our corporate enterprise team in Kathmandu.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold pt-2">
            <div className="rounded-2xl bg-slate-950 px-6 py-4 border border-slate-800 text-left space-y-1">
              <p className="text-cyan-400 uppercase font-black text-[10px]">📍 Corporate Office</p>
              <p className="text-white">TechMate Tower, New Road, Kathmandu, Nepal</p>
            </div>

            <div className="rounded-2xl bg-slate-950 px-6 py-4 border border-slate-800 text-left space-y-1">
              <p className="text-cyan-400 uppercase font-black text-[10px]">✉️ B2B Email</p>
              <p className="text-white">b2b@techmate.com.np</p>
            </div>

            <div className="rounded-2xl bg-slate-950 px-6 py-4 border border-slate-800 text-left space-y-1">
              <p className="text-cyan-400 uppercase font-black text-[10px]">📞 Corporate Hotline</p>
              <p className="text-white">+977 1-4000000 / +977 9800000000</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CompanyPortfolioPage;
