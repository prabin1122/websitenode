import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import ParticleCanvas from '../components/particle-canvas';
import ClickRipple from '../components/click-ripple';
import HumanWalkingJourney from '../components/human-walking-journey';
import CharacterMovieTheater from '../components/character-movie-theater';

const CustomerExperiencePage: NextPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      <Head>
        <title>Human Walking Shopping Experience | Karki Store</title>
        <meta name="description" content="Watch continuous human walking animations as customer Aarav walks through Karki Store, selects items, pays via eSewa, and unboxes products." />
      </Head>

      <ParticleCanvas />
      <ClickRipple />
      <Navigation />

      <main className="flex-1 relative z-10 mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-cyan-400/30">
            🏃‍♂️ CONTINUOUS HUMAN WALKING SIMULATOR
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Watch Character Aarav Walk Through The Store
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Experience physical human walking motion as customer Aarav walks along the interactive track from storefront entry to eSewa payment and doorstep delivery.
          </p>
        </div>

        {/* Human Walking Journey */}
        <HumanWalkingJourney />

        {/* Character Movie Theater */}
        <CharacterMovieTheater />

        {/* CTA to Shop Catalog */}
        <div className="text-center space-y-4 bg-slate-900/90 p-8 rounded-3xl border border-indigo-950 backdrop-blur-md">
          <h3 className="text-2xl font-black text-white">Ready to Place Your Own Order?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Browse our 400+ genuine tech catalog and get express 24-hour delivery straight to your doorstep in Nepal.
          </p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-black">
            <Link
              href="/shop"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-3.5 hover:scale-105 transition shadow-2xl uppercase tracking-wider border border-cyan-400/30"
            >
              Shop 400 Products Now →
            </Link>
            <Link
              href="/cart"
              className="rounded-xl bg-slate-950 text-cyan-400 px-6 py-3.5 border border-slate-700 hover:bg-slate-800 transition"
            >
              View Your Cart 🛒
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerExperiencePage;
