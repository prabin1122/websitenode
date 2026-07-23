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
import { getSiteCMS, SiteCMS } from '../data/cms';

const SKILLS = [
  { name: 'Next.js & React 18', level: 98, category: 'Frontend', icon: '⚛️' },
  { name: 'TypeScript & JavaScript', level: 95, category: 'Languages', icon: '📘' },
  { name: 'Node.js & Express API', level: 92, category: 'Backend', icon: '🟢' },
  { name: 'Prisma & PostgreSQL', level: 90, category: 'Database', icon: '🐘' },
  { name: 'Tailwind CSS & Animations', level: 96, category: 'UI/UX', icon: '🎨' },
  { name: 'eSewa / Khalti Payment SDKs', level: 94, category: 'Fintech', icon: '💳' },
  { name: 'Nepal Express Courier APIs', level: 91, category: 'Logistics', icon: '🚚' },
  { name: 'WebSockets & Real-Time Data', level: 88, category: 'Realtime', icon: '⚡' },
];

const MILESTONES = [
  {
    year: '2020',
    title: 'First Full-Stack E-Commerce API',
    desc: 'Engineered RESTful Node.js payment backend for local merchant inventory management.',
    icon: '💻',
  },
  {
    year: '2022',
    title: 'Scaled Platform To 10,000 Active Users',
    desc: 'Architected distributed PostgreSQL database clusters with Redis caching.',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'Founded Karki Store Tech Marketplace',
    desc: 'Launched premier Nepal tech marketplace featuring 400+ authentic items & 77-district postal dispatch.',
    icon: '🏬',
  },
  {
    year: '2026',
    title: 'Integrated AI Logistics & 60 FPS Engine',
    desc: 'Pioneered 60 FPS real-time fulfillment map, AI recommendation drone, and CMS architecture.',
    icon: '🤖',
  },
];

const PortfolioPage: NextPage = () => {
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'logistics'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    setCms(getSiteCMS());
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cms.portfolioEmail || 'karki@karkistore.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>{cms.portfolioName} — Founder & Principal Software Engineer Portfolio | Karki Store</title>
        <meta name="description" content="Official personal portfolio of Karki — Founder & Lead Engineer of Karki Store Nepal. Explore full-stack Next.js applications, 77-district logistics SDKs, and interactive tech projects." />
      </Head>

      {/* Interactive Background Canvas */}
      <ParticleCanvas />
      <Navigation />

      <main className="flex-1 relative z-10 mx-auto max-w-7xl px-4 py-8 space-y-16">
        
        {/* SECTION 1: ANIMATED HIMALAYAN KATHMANDU TECH LANDSCAPE & HERO AVATAR */}
        <section className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 border border-indigo-800/80 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3.5 py-1.5 text-xs font-black text-cyan-300 border border-cyan-400/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>FOUNDER & PRINCIPAL SOFTWARE ENGINEER</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">{cms.portfolioName}</span> 👨‍💻
            </h1>

            <p className="text-base text-slate-300 font-normal leading-relaxed">
              {cms.portfolioBio}
            </p>

            {/* Quick Interactive Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-black">
              <button
                onClick={handleCopyEmail}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-3.5 hover:scale-105 transition shadow-2xl uppercase tracking-wider border border-cyan-400/30 flex items-center gap-2"
              >
                <span>{copiedEmail ? '✓ Copied Email!' : '✉️ Contact Founder'}</span>
              </button>

              <a
                href={cms.portfolioGithub}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 px-6 py-3.5 border border-slate-700 transition flex items-center gap-2"
              >
                <span>🐙 GitHub Profile</span>
              </a>

              <a
                href={cms.portfolioLinkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-indigo-950 hover:bg-indigo-900 text-cyan-300 px-6 py-3.5 border border-indigo-800 transition flex items-center gap-2"
              >
                <span>💼 LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ANIMATED HIMALAYAN KATHMANDU LANDSCAPE SVG VECTOR */}
          <div className="relative z-10 w-full max-w-md aspect-square rounded-3xl bg-slate-950/90 border border-indigo-900/60 p-6 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
            <svg width="100%" height="100%" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 200 L70 110 L130 200 Z" fill="#1e293b" />
              <path d="M70 110 L90 140 L50 140 Z" fill="#f8fafc" opacity="0.9" />
              <path d="M100 200 L180 80 L260 200 Z" fill="#334155" />
              <path d="M180 80 L205 125 L155 125 Z" fill="#ffffff" opacity="0.9" />
              <path d="M220 200 L280 130 L320 200 Z" fill="#1e293b" />

              <g className="animate-pulse">
                <ellipse cx="60" cy="50" rx="30" ry="12" fill="#38bdf8" opacity="0.3" />
                <ellipse cx="240" cy="65" rx="35" ry="14" fill="#6366f1" opacity="0.3" />
              </g>

              <rect x="40" y="170" width="30" height="30" fill="#090d16" />
              <rect x="80" y="150" width="40" height="50" fill="#0f172a" />
              <rect x="130" y="160" width="35" height="40" fill="#090d16" />
              <rect x="175" y="145" width="45" height="55" fill="#0f172a" />
              <rect x="230" y="165" width="40" height="35" fill="#090d16" />

              <rect x="70" y="210" width="180" height="8" rx="3" fill="#6366f1" />
              <rect x="90" y="175" width="55" height="32" rx="4" fill="#06b6d4" stroke="#38bdf8" strokeWidth="2" className="animate-pulse" />
              <rect x="155" y="175" width="55" height="32" rx="4" fill="#6366f1" stroke="#818cf8" strokeWidth="2" className="animate-pulse" />

              <circle cx="160" cy="195" r="8" fill="#06b6d4" />
              <path d="M160 203 V220" stroke="#06b6d4" strokeWidth="4" />
              <line x1="160" y1="208" x2="140" y2="212" stroke="#6366f1" strokeWidth="3" />
              <line x1="160" y1="208" x2="180" y2="212" stroke="#6366f1" strokeWidth="3" />

              <rect x="90" y="235" width="140" height="24" rx="12" fill="#0284c7" />
              <text x="160" y="251" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                🏔️ Kathmandu Tech Hub
              </text>
            </svg>
          </div>
        </section>

        {/* DYNAMIC ANIMATED HIMALAYAN KATHMANDU LANDSCAPE SECTION */}
        <section className="space-y-4">
          <LandscapeAnimation />
        </section>

        {/* SECTION 2: 60 FPS CONTINUOUS HUMAN WALKING JOURNEY & AI DRONE */}
        <section className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
              SECTION 02 • HUMAN MOTION PHYSICS
            </span>
            <h2 className="text-3xl font-black text-white">60 FPS Human Walking Stride Engine</h2>
            <p className="text-xs text-slate-400">
              Interactive 60 FPS sub-pixel human motion physics simulation showcasing customer Aarav walking through store entry, picking products, paying via eSewa, and unboxing.
            </p>
          </div>

          <HumanWalkingJourney />
        </section>

        {/* SECTION 3: ANIMATED 3D TECH SKILLS MATRIX */}
        <section className="space-y-6 bg-slate-900/90 p-8 rounded-3xl border border-indigo-950 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
                SECTION 03 • ENGINEERING CAPABILITIES
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Full-Stack Tech Skills Matrix</h2>
            </div>
            <span className="bg-indigo-950 text-cyan-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-indigo-800">
              8 Core Tech Domains
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((skill, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-950 p-5 border border-slate-800 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 space-y-3 group">
                <div className="flex justify-between items-center">
                  <span className="text-3xl">{skill.icon}</span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                    {skill.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition">{skill.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{skill.level}% Proficiency</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-1000 group-hover:scale-x-105"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: LIVE INTERACTIVE TERMINAL & CODE IDE SIMULATION */}
        <section className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
              SECTION 04 • LIVE WORKSTATION TERMINAL
            </span>
            <h2 className="text-3xl font-black text-white">Interactive Engineering Terminal</h2>
            <p className="text-xs text-slate-400">
              Real-time terminal execution log displaying Karki Store build pipeline, Next.js page synthesis, and database migration.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-950 border border-indigo-950 p-6 shadow-2xl font-mono text-xs text-slate-300 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-[11px] ml-2">bash — karki@kathmandu-server: ~/karki-store</span>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Next.js 14.2 • Node v20.11.0
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] leading-relaxed">
              <p className="text-cyan-400 font-bold">$ npx create-karki-store --marketplace --products=400 --district-delivery=77</p>
              <p className="text-slate-400">✔ Initializing Royal Indigo & Electric Cyan glassmorphic design system...</p>
              <p className="text-slate-400">✔ Seeding 400+ genuine tech products into local storage & PostgreSQL schemas...</p>
              <p className="text-emerald-400">✔ Integrated eSewa & Khalti merchant digital wallet payment gateways.</p>
              <p className="text-emerald-400">✔ Compiled 60 FPS Human Motion Physics Engine & Real-time Delivery Map.</p>
              <p className="text-amber-400 font-bold">🚀 Server listening on http://localhost:3000 (Ready in 420ms)</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: ANIMATED CUSTOMER SHOPPING & DELIVERY THEATER */}
        <section className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
              SECTION 05 • CUSTOMER SCENE THEATER
            </span>
            <h2 className="text-3xl font-black text-white">Customer Aarav & Rider Bikash Movie</h2>
            <p className="text-xs text-slate-400">
              Watch step-by-step scene theater of customer Aarav buying headphones and rider Bikash delivering across Nepal.
            </p>
          </div>

          <CharacterMovieTheater />
        </section>

        {/* SECTION 6: ANIMATED CYBERPUNK KATHMANDU CITYSCAPE & LOGISTICS */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
                SECTION 06 • NEPAL LOGISTICS INFRASTRUCTURE
              </span>
              <h2 className="text-2xl font-black text-white">77-District Express Cityscape</h2>
            </div>
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-400/30">
              24-Hour Dispatch Active
            </span>
          </div>

          <div className="relative h-48 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-end px-4 py-2">
            <div className="absolute inset-0 flex items-end justify-around opacity-30 pointer-events-none">
              <rect x="20" y="60" width="50" height="140" fill="#3b82f6" />
              <rect x="90" y="40" width="70" height="160" fill="#6366f1" />
              <rect x="180" y="80" width="60" height="120" fill="#06b6d4" />
              <rect x="260" y="30" width="80" height="170" fill="#3b82f6" />
            </div>

            <div className="relative z-10 w-full flex items-center justify-between">
              <div className="bg-cyan-950/90 text-cyan-300 text-xs font-mono px-3 py-1 rounded-xl border border-cyan-800 flex items-center gap-2 animate-bounce">
                <span>🛵 Delivery Motorcycle #KTM-882</span>
                <span className="text-emerald-400 font-bold">En Route to Pokhara</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FOUNDER ENGINEERING MILESTONES TIMELINE */}
        <section className="space-y-6 bg-slate-900/90 p-8 rounded-3xl border border-indigo-950 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
              SECTION 07 • CAREER TIMELINE
            </span>
            <h2 className="text-3xl font-black text-white">Engineering Milestones</h2>
            <p className="text-xs text-slate-400">
              Key technical breakthroughs from early REST API development to building Karki Store Nepal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 pt-4">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-950 p-6 border border-slate-800 hover:border-cyan-400 transition-all duration-300 hover:scale-105 space-y-3 group">
                <span className="text-3xl">{m.icon}</span>
                <span className="bg-indigo-950 text-cyan-400 text-xs font-mono font-black px-2.5 py-0.5 rounded-full border border-indigo-800 block w-fit">
                  {m.year}
                </span>
                <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: INTERACTIVE PORTFOLIO PROJECTS SHOWCASE GRID */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
                SECTION 08 • FEATURED WORKS
              </span>
              <h2 className="text-3xl font-black text-white mt-1">Featured Software Projects</h2>
            </div>

            <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl transition ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('fullstack')}
                className={`px-4 py-2 rounded-xl transition ${activeTab === 'fullstack' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                Full-Stack
              </button>
              <button
                onClick={() => setActiveTab('logistics')}
                className={`px-4 py-2 rounded-xl transition ${activeTab === 'logistics' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'}`}
              >
                Logistics & Fintech
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(cms.portfolioProjects || []).map((proj, idx) => (
              <div key={idx} className="rounded-3xl bg-slate-900/90 p-6 border border-indigo-950 shadow-2xl flex flex-col justify-between space-y-4 backdrop-blur-md hover:border-cyan-400/80 transition duration-300 group">
                <div className="space-y-3">
                  <span className="bg-indigo-950 text-cyan-300 text-[10px] font-black px-3 py-1 rounded-full border border-indigo-800 uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="bg-slate-950 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={proj.link}
                    className="block w-full text-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-2.5 text-white text-xs font-extrabold hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg uppercase tracking-wider"
                  >
                    View Project Demo →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: ANIMATED LIVE SYSTEM ARCHITECTURE & TRAFFIC METER */}
        <section className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block">
              SECTION 09 • REAL-TIME METRICS
            </span>
            <h2 className="text-3xl font-black text-white">Live System Performance & Telemetry</h2>
            <p className="text-xs text-slate-400">
              Live server node metrics monitoring database latency, API throughput, and fulfillment status.
            </p>
          </div>

          <LiveFulfillmentMap />
        </section>

        {/* SECTION 10: INTERACTIVE FOUNDER CONTACT & HOLOGRAPHIC MESSAGE HUB */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-8 md:p-12 border border-indigo-800 shadow-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase border border-cyan-400/30">
              SECTION 10 • CONNECT WITH FOUNDER
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">Let's Build Extraordinary Tech Together</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have an ambitious e-commerce project, enterprise Next.js application, or fintech integration requirement? Get in touch directly with founder Karki.
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleCopyEmail}
                className="rounded-2xl bg-slate-950 p-4 border border-slate-800 hover:border-cyan-400 transition text-center space-y-1 group"
              >
                <div className="text-2xl">✉️</div>
                <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition">Email Founder</p>
                <p className="text-[11px] text-slate-500 font-mono">{cms.portfolioEmail}</p>
              </button>

              <a
                href={cms.portfolioLinkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-slate-950 p-4 border border-slate-800 hover:border-cyan-400 transition text-center space-y-1 group"
              >
                <div className="text-2xl">💼</div>
                <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition">LinkedIn Direct</p>
                <p className="text-[11px] text-slate-500 font-mono">Connect Professional</p>
              </a>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/shop"
                className="inline-block rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 px-8 py-3.5 text-xs font-black text-white hover:scale-105 transition shadow-2xl uppercase tracking-wider border border-cyan-400/30"
              >
                Explore 400 Products Marketplace →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
