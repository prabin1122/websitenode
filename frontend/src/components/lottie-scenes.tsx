import React from 'react';

// People Buying & Shopping Lottie-style Vector Scene
export function PeopleBuyingLottieScene() {
  return (
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[260px]">
      <rect x="10" y="30" width="240" height="140" rx="16" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
      <circle cx="50" cy="80" r="16" fill="#06b6d4" />
      <path d="M50 100 C35 100 25 120 25 135 H75 C75 120 65 100 50 100 Z" fill="#06b6d4" opacity="0.8" />

      {/* Floating Shopping Cart */}
      <rect x="110" y="55" width="120" height="75" rx="12" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="125" y="80" fill="#ffffff" fontFamily="sans-serif" fontSize="12" fontWeight="bold">Cart: 2 Items</text>
      <text x="125" y="100" fill="#10b981" fontFamily="sans-serif" fontSize="11" fontWeight="bold">eSewa Paid ✓</text>

      {/* Floating Sparkles & Pulse */}
      <circle cx="210" cy="40" r="8" fill="#f59e0b" className="animate-ping" />
      <circle cx="30" cy="40" r="5" fill="#06b6d4" />
    </svg>
  );
}

// Product Delivery & Parcel Shipping Scene
export function PackageDeliveryLottieScene() {
  return (
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[260px]">
      {/* Road Track */}
      <line x1="10" y1="160" x2="250" y2="160" stroke="#334155" strokeWidth="4" strokeDasharray="10 10" />

      {/* Delivery Vehicle */}
      <rect x="40" y="80" width="130" height="70" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
      <path d="M170 100 L210 100 L225 125 L225 150 L170 150 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
      
      {/* Wheels */}
      <circle cx="80" cy="155" r="16" fill="#020617" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="190" cy="155" r="16" fill="#020617" stroke="#06b6d4" strokeWidth="3" />
      <circle cx="80" cy="155" r="6" fill="#06b6d4" />
      <circle cx="190" cy="155" r="6" fill="#06b6d4" />

      {/* Karki Delivery Box */}
      <rect x="70" y="100" width="40" height="30" rx="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M70 115 H110 M90 100 V130" stroke="#000000" opacity="0.4" strokeWidth="1.5" />

      {/* Dispatch Signal */}
      <text x="50" y="60" fill="#10b981" fontFamily="sans-serif" fontSize="11" fontWeight="bold">🚀 Nepal Dispatch: 24h</text>
    </svg>
  );
}

// Customer Unboxing & Satisfaction Scene
export function CustomerSatisfactionLottieScene() {
  return (
    <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[260px]">
      <rect x="30" y="30" width="200" height="140" rx="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
      
      {/* Unboxing Parcel */}
      <rect x="80" y="70" width="100" height="70" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
      <path d="M80 70 L130 50 L180 70 L130 90 Z" fill="#d97706" />

      {/* 5-Star Rating */}
      <text x="85" y="160" fill="#f59e0b" fontSize="16">⭐⭐⭐⭐⭐</text>
    </svg>
  );
}
