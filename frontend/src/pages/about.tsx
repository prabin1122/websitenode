import type { NextPage } from 'next';
import Head from 'next/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const About: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>About Us | Karki Store Tech Marketplace</title>
        <meta name="description" content="Learn about Karki Store Nepal, our mission, values, and 400+ genuine tech product catalog." />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-cyan-400/30 mb-3 inline-block">
              ABOUT KARKI STORE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Nepal's Premier Tech Marketplace</h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Empowering creators, developers, and tech enthusiasts across Nepal with over 400+ genuine electronics.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                At Karki Store, we believe high-performance technology should be accessible to everyone across Nepal. We curate 400+ genuine tech products, including noise-canceling headphones, 4K webcams, RGB mechanical keyboards, and smart gadgets.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                Every product shipped from Karki Store undergoes rigorous quality testing and comes backed by our official Karki Care warranty.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-12 border border-indigo-950 flex flex-col items-center justify-center text-center shadow-xl">
              <img src="/karki-logo.png" alt="Karki Store Logo" className="w-24 h-24 rounded-2xl mb-4 shadow-lg border border-indigo-700/50" />
              <h3 className="text-2xl font-black text-white">KARKI<span className="text-cyan-400">STORE</span></h3>
              <p className="text-xs text-indigo-300 font-semibold tracking-wider uppercase mt-1">Official Tech Marketplace</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-900 border-t border-b border-indigo-950 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-black text-white mb-12 text-center">Core Principles of Karki Store</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-950 p-8 border border-slate-800">
                <div className="mb-4 text-4xl">⭐</div>
                <h3 className="text-lg font-bold text-white mb-2">100% Genuine Quality</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We partner directly with leading tech manufacturers to ensure every item in Karki Store is 100% authentic.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-8 border border-slate-800">
                <div className="mb-4 text-4xl">🚚</div>
                <h3 className="text-lg font-bold text-white mb-2">Nepalwide Express Delivery</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast and reliable shipping across all 77 districts with live tracking and door-to-door fulfillment.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950 p-8 border border-slate-800">
                <div className="mb-4 text-4xl">🤝</div>
                <h3 className="text-lg font-bold text-white mb-2">Customer-First Helpline</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our dedicated support team in Kathmandu is available 24/7 to assist with warranty claims and guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-4xl font-black text-cyan-400 mb-1">25K+</div>
              <p className="text-xs font-semibold text-slate-400">Happy Nepalese Customers</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-4xl font-black text-amber-400 mb-1">400+</div>
              <p className="text-xs font-semibold text-slate-400">Catalog Products</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-4xl font-black text-indigo-400 mb-1">77</div>
              <p className="text-xs font-semibold text-slate-400">Districts Delivered</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-4xl font-black text-emerald-400 mb-1">4.9★</div>
              <p className="text-xs font-semibold text-slate-400">Marketplace Rating</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
