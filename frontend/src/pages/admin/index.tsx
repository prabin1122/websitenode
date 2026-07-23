import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

const AdminLogin: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((email === 'admin@karkistore.com' || email === 'admin@shop.com') && (password === 'admin' || password === 'admin123')) {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try: admin@karkistore.com / admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 font-sans">
      <Head>
        <title>Admin Login | Karki Store Tech Marketplace</title>
      </Head>

      <div className="w-full max-w-md">
        <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 border border-indigo-950">
          <div className="flex flex-col items-center mb-6 text-center">
            <img src="/karki-logo.png" alt="Karki Store Logo" className="w-16 h-16 rounded-2xl mb-3 shadow-lg border border-indigo-700/50" />
            <h1 className="text-2xl font-black text-white">KARKI<span className="text-cyan-400">STORE</span></h1>
            <p className="text-xs text-indigo-300 font-semibold tracking-wider uppercase mt-0.5">Admin Management Portal</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-950 border border-red-800 text-red-300 rounded-xl text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@karkistore.com"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-cyan-400 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-3.5 text-white font-bold hover:from-indigo-500 hover:to-cyan-500 transition shadow-lg mt-4 uppercase tracking-wider text-xs"
            >
              Sign In to Admin Dashboard →
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-950 border border-indigo-950 rounded-2xl text-xs text-slate-400 space-y-1">
            <p className="font-bold text-cyan-400">Demo Login Credentials:</p>
            <p>Email: <code className="text-white font-mono">admin@karkistore.com</code></p>
            <p>Password: <code className="text-white font-mono">admin</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
