import React from 'react';

// Hero Cyber Technology Graphic
export function TechHeroIllustration() {
  return (
    <svg width="280" height="280" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[280px]">
      <circle cx="120" cy="120" r="100" stroke="#4f46e5" strokeWidth="2" opacity="0.3" strokeDasharray="8 8" className="animate-spin-slow" />
      <circle cx="120" cy="120" r="75" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
      
      {/* Outer Orbit Nodes */}
      <circle cx="120" cy="20" r="6" fill="#06b6d4" />
      <circle cx="220" cy="120" r="6" fill="#6366f1" />
      <circle cx="120" cy="220" r="6" fill="#3b82f6" />
      <circle cx="20" cy="120" r="6" fill="#f59e0b" />

      {/* Cyber Headphone Vector */}
      <path d="M70 120 C70 85 90 60 120 60 C150 60 170 85 170 120" stroke="#06b6d4" strokeWidth="8" strokeLinecap="round" />
      <rect x="55" y="110" width="25" height="40" rx="8" fill="#4f46e5" stroke="#06b6d4" strokeWidth="2" />
      <rect x="160" y="110" width="25" height="40" rx="8" fill="#4f46e5" stroke="#06b6d4" strokeWidth="2" />
      
      {/* Audio Glow Lines */}
      <line x1="95" y1="130" x2="145" y2="130" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
      <line x1="105" y1="120" x2="135" y2="120" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="140" x2="140" y2="140" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Nepal Express Shipping Illustration
export function NepalExpressShippingIllustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="30" width="55" height="35" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
      <path d="M65 40 L85 40 L92 55 L92 65 L65 65 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
      <circle cx="30" cy="68" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="78" cy="68" r="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="30" cy="68" r="4" fill="#06b6d4" />
      <circle cx="78" cy="68" r="4" fill="#06b6d4" />
      <path d="M5 25 H25 M2 35 H15 M8 45 H20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// TechMate Warranty Shield
export function TechMateWarrantyShieldIllustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L85 25 V50 C85 70 50 90 50 90 C50 90 15 70 15 50 V25 L50 10 Z" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
      <path d="M35 50 L45 60 L65 38" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Payment Security Vector
export function PaymentSecurityIllustration() {
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="25" width="70" height="50" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
      <line x1="15" y1="40" x2="85" y2="40" stroke="#6366f1" strokeWidth="4" />
      <rect x="25" y="52" width="15" height="12" rx="2" fill="#f59e0b" />
      <circle cx="70" cy="58" r="6" fill="#06b6d4" />
      <circle cx="62" cy="58" r="6" fill="#10b981" opacity="0.8" />
    </svg>
  );
}

// Code Terminal Vector for Portfolio
export function CodeTerminalIllustration() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="170" height="130" rx="10" fill="#020617" stroke="#334155" strokeWidth="2" />
      <path d="M5 28 H175" stroke="#334155" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="4" fill="#ef4444" />
      <circle cx="32" cy="16" r="4" fill="#f59e0b" />
      <circle cx="44" cy="16" r="4" fill="#10b981" />
      
      <text x="20" y="50" fill="#06b6d4" fontFamily="monospace" fontSize="11" fontWeight="bold">const techmate = new TechMateStore();</text>
      <text x="20" y="70" fill="#6366f1" fontFamily="monospace" fontSize="11">techmate.deploy({'{ catalog: 400 }'});</text>
      <text x="20" y="90" fill="#10b981" fontFamily="monospace" fontSize="11">✓ Status: 100% Online</text>
      <text x="20" y="110" fill="#f59e0b" fontFamily="monospace" fontSize="11">🚀 Delivery: 77 Districts</text>
    </svg>
  );
}
