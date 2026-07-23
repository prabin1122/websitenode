import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getSiteCMS, SiteCMS } from '../data/cms';

const PrivacyPage: NextPage = () => {
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());

  useEffect(() => {
    setCms(getSiteCMS());
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>{cms.privacyTitle} | TechMate Solution Store</title>
        <meta name="description" content="TechMate Solution Store Nepal Privacy Policy and Customer Data Protection." />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-cyan-400/30 mb-3 inline-block">
              LEGAL & PRIVACY
            </span>
            <h1 className="text-4xl font-black text-white">{cms.privacyTitle}</h1>
            <p className="text-xs text-slate-400 mt-1">Last updated: 2026 • TechMate Solution Store Protection Guarantee</p>
          </div>
        </section>

        {/* Dynamic Content */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-indigo-950 whitespace-pre-line text-sm text-slate-300 leading-relaxed font-sans">
            {cms.privacyContent}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
