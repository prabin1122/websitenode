import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { getSiteCMS, SiteCMS } from '../data/cms';

const FAQPage: NextPage = () => {
  const [cms, setCms] = useState<SiteCMS>(getSiteCMS());
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    setCms(getSiteCMS());
  }, []);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>{cms.faqTitle} | TechMate Solution Store Help Center</title>
        <meta name="description" content="Frequently Asked Questions about TechMate Solution Store orders, shipping, and warranty." />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-cyan-400/30 mb-3 inline-block">
              CUSTOMER SUPPORT
            </span>
            <h1 className="text-4xl font-black text-white">{cms.faqTitle}</h1>
            <p className="text-sm text-slate-300 mt-1">{cms.faqSubtitle}</p>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="space-y-4">
            {(cms.faqList || []).map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="rounded-2xl bg-slate-900 border border-indigo-950 overflow-hidden shadow-lg transition">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-white hover:text-cyan-400 transition"
                  >
                    <span>{faq.question}</span>
                    <span className="text-xl font-mono text-cyan-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
