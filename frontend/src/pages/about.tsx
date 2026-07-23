import type { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import ParticleCanvas from '../components/particle-canvas';

const About: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>About Us | TechMate Solution Store</title>
        <meta name="description" content="Learn about TechMate Solution Store Nepal, our mission, values, and 400+ genuine tech product catalog." />
      </Head>

      <ParticleCanvas />
      <Navigation />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-cyan-400/30 mb-3 inline-block">
              ABOUT TECHMATE SOLUTION STORE
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Building Nepal's Premier Tech Marketplace
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Empowering creators, developers, and tech enthusiasts across all 77 districts with genuine electronics, express shipping, and 1-year replacement warranty.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white">Our Mission</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                At TechMate Solution Store, we believe high-performance technology should be accessible to everyone across Nepal. We curate 400+ genuine tech products, including noise-canceling headphones, 4K webcams, RGB mechanical keyboards, and smart gadgets.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Every product shipped from TechMate Solution Store undergoes rigorous quality testing and comes backed by our official TechMate Care warranty.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-8 border border-indigo-950 shadow-2xl flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl mb-4 shadow-lg border border-indigo-700/50 bg-slate-950 flex items-center justify-center text-4xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-1">TechMate Solution Store Nepal</h3>
              <p className="text-xs text-cyan-400 font-semibold mb-4">Official Registered Marketplace</p>
              <div className="grid grid-cols-2 gap-4 text-xs w-full">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="font-black text-cyan-400 text-lg">400+</p>
                  <p className="text-slate-400 text-[10px]">Genuine Items</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <p className="font-black text-emerald-400 text-lg">77</p>
                  <p className="text-slate-400 text-[10px]">Nepal Districts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="bg-slate-900/50 border-y border-indigo-950 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-black text-white mb-12 text-center">Core Principles of TechMate Solution Store</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-2">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="text-base font-bold text-white">100% Genuine Guarantee</h3>
                <p className="text-xs text-slate-400">
                  We partner directly with leading tech manufacturers to ensure every item in TechMate Solution Store is 100% authentic.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-2">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="text-base font-bold text-white">Same-Day Kathmandu Shipping</h3>
                <p className="text-xs text-slate-400">
                  Dispatched within 2 hours inside Kathmandu Valley and delivered within 2-4 business days across all 77 districts.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 space-y-2">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="text-base font-bold text-white">eSewa & Khalti Payments</h3>
                <p className="text-xs text-slate-400">
                  Integrated with Nepal's leading digital wallets, mobile banking, Visa/Mastercard, and Cash on Delivery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
