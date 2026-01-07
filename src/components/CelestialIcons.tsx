import React from 'react';

export function EarthIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#4B8BBE" stroke="currentColor" strokeWidth="2" />
      {/* Land masses */}
      <path d="M30 30 Q 40 10 60 25 T 80 40 Q 90 50 85 70 T 60 85 Q 40 90 25 75 T 20 50 Q 15 35 30 30" fill="#2E5A35" opacity="0.8" />
      <path d="M60 15 Q 70 10 75 20 T 70 30 Q 60 35 55 25 T 60 15" fill="#2E5A35" opacity="0.8" />
      {/* Atmosphere glow */}
      <circle cx="50" cy="50" r="48" stroke="url(#earthGlow)" strokeWidth="2" opacity="0.5" />
      <defs>
        <radialGradient id="earthGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(50)">
          <stop stopColor="white" stopOpacity="0"/>
          <stop offset="0.8" stopColor="#87CEEB" stopOpacity="0.2"/>
          <stop offset="1" stopColor="#4B8BBE" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#D1D5DB" stroke="currentColor" strokeWidth="2" />
      {/* Craters */}
      <circle cx="35" cy="35" r="8" fill="#9CA3AF" opacity="0.6" />
      <circle cx="65" cy="60" r="12" fill="#9CA3AF" opacity="0.5" />
      <circle cx="75" cy="30" r="5" fill="#9CA3AF" opacity="0.4" />
      <circle cx="30" cy="70" r="10" fill="#9CA3AF" opacity="0.6" />
      {/* Shadow */}
      <path d="M50 2 A 48 48 0 0 1 50 98 A 40 48 0 0 0 50 2" fill="black" opacity="0.2" />
      <defs>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
        </filter>
      </defs>
    </svg>
  );
}
