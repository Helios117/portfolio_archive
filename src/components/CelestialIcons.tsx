import React from 'react';

export function EarthIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="oceanGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#4B8BBE" />
          <stop offset="100%" stopColor="#1a4d7c" />
        </radialGradient>
        <filter id="atmosphereGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="sphereClip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      
      {/* Atmosphere Halo */}
      <circle cx="50" cy="50" r="49" fill="#87CEEB" opacity="0.3" filter="url(#atmosphereGlow)" />
      
      {/* Base Ocean Sphere */}
      <circle cx="50" cy="50" r="48" fill="url(#oceanGradient)" stroke="#87CEEB" strokeWidth="1" strokeOpacity="0.5" />
      
      {/* Continents Group - Clipped to sphere */}
      <g clipPath="url(#sphereClip)">
        {/* Americas approximation */}
        <path d="M25 20 
                 Q 30 15 35 18 
                 T 40 25 
                 Q 35 35 30 40 
                 T 28 55 
                 Q 35 65 40 75 
                 T 35 85 
                 Q 25 80 20 65 
                 T 15 40 
                 Q 18 30 25 20 Z" 
              fill="#4CAF50" stroke="#388E3C" strokeWidth="0.5" />
              
        {/* Europe/Africa approximation */}
        <path d="M55 15 
                 Q 65 10 75 15 
                 T 80 25 
                 Q 75 35 65 40 
                 T 60 55 
                 Q 65 65 70 70 
                 T 65 80 
                 Q 55 75 50 60 
                 T 50 35 
                 Q 52 25 55 15 Z" 
              fill="#4CAF50" stroke="#388E3C" strokeWidth="0.5" />
              
        {/* Asia/Australia approximation - visible on edge */}
        <path d="M85 20 Q 95 25 98 40 L 98 10 L 80 10 Z" fill="#4CAF50" opacity="0.8" />
        
        {/* Cloud Layers - Subtle white swirls */}
        <path d="M10 40 Q 30 35 50 45 T 90 40" fill="none" stroke="white" strokeWidth="3" opacity="0.4" strokeLinecap="round" filter="url(#atmosphereGlow)" />
        <path d="M20 65 Q 40 60 60 70 T 80 65" fill="none" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" filter="url(#atmosphereGlow)" />
        <path d="M60 25 Q 70 20 80 25" fill="none" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
      </g>

      {/* Shadow for 3D effect */}
      <circle cx="50" cy="50" r="48" fill="url(#shadowGradient)" style={{ mixBlendMode: 'multiply' }} opacity="0.4" />
      
      <defs>
        <radialGradient id="shadowGradient" cx="0.7" cy="0.7" r="0.8">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGradient" cx="0.4" cy="0.4" r="0.9">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#9ca3af" />
        </radialGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Base Moon Sphere */}
      <circle cx="50" cy="50" r="48" fill="url(#moonGradient)" stroke="#d1d5db" strokeWidth="1" />
      
      {/* Craters - darker recessed areas */}
      <g opacity="0.7">
        <circle cx="35" cy="35" r="8" fill="#6b7280" opacity="0.5" />
        <path d="M35 35 m-7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.3" />
        
        <circle cx="65" cy="60" r="12" fill="#6b7280" opacity="0.4" />
        <path d="M65 60 m-11 0 a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0" fill="none" stroke="#4b5563" strokeWidth="0.5" opacity="0.3" />
        
        <circle cx="75" cy="30" r="5" fill="#6b7280" opacity="0.3" />
        <circle cx="30" cy="70" r="10" fill="#6b7280" opacity="0.5" />
        <circle cx="55" cy="45" r="4" fill="#6b7280" opacity="0.2" />
      </g>

      {/* Shadow for 3D phase effect */}
      <path d="M50 2 A 48 48 0 0 1 50 98 A 40 48 0 0 0 50 2" fill="black" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}
