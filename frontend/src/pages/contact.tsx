import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Head>
        <title>Contact Us | TechMate Solution Store</title>
        <meta name="description" content="Get in touch with TechMate Solution Store Nepal customer care team." />
      </Head>

      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-b border-indigo-950 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full uppercase border border-cyan-400/30 mb-3 inline-block">
              TECHMATE SOLUTION HELPLINE
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Customer Care & Support</h1>
            <p className="text-slate-300 text-sm max-w-xl">We are here 24/7 to assist you with order status, technical guidance, and TechMate warranty support.</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-indigo-950">
              <h2 className="text-2xl font-black text-white mb-6">Send us a Message</h2>
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-bold">
                  ✓ Thank you! Your message has been sent to TechMate Solution Store customer care team.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@domain.com"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Order Inquiry / Product Question"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Message Detail</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="How can TechMate Solution Store help you?"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3.5 text-white font-bold hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg text-xs uppercase tracking-wider"
                >
                  Send Message to TechMate Solution Store →
                </button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 flex items-start gap-4">
                <div className="text-3xl p-2 bg-indigo-950 rounded-xl border border-indigo-800">📧</div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Email Support</h3>
                  <p className="text-xs text-cyan-400 font-semibold">support@techmate.com.np</p>
                  <p className="text-xs text-slate-400 mt-0.5">sales@techmate.com.np</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 flex items-start gap-4">
                <div className="text-3xl p-2 bg-indigo-950 rounded-xl border border-indigo-800">📱</div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Customer Helpline</h3>
                  <p className="text-xs text-amber-400 font-bold">+977 1-4000000 / +977 9800000000</p>
                  <p className="text-xs text-slate-400 mt-0.5">Available 24 hours a day, 7 days a week</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 flex items-start gap-4">
                <div className="text-3xl p-2 bg-indigo-950 rounded-xl border border-indigo-800">📍</div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Headquarters Address</h3>
                  <p className="text-xs text-slate-300 font-medium">TechMate Tower, New Road</p>
                  <p className="text-xs text-slate-400">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 flex items-start gap-4">
                <div className="text-3xl p-2 bg-indigo-950 rounded-xl border border-indigo-800">🕒</div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Store Hours</h3>
                  <p className="text-xs text-slate-300">Sunday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="text-xs text-slate-400">Saturday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
