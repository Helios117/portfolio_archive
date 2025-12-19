'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import content, { NavLink } from '@/data/content';

interface MarbleNavProps {
  className?: string;
}

function NavTablet({ 
  link, 
  index, 
  isActive,
  onClick 
}: { 
  link: NavLink; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      initial={{ opacity: 0, y: -50, rotateX: -30 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        rotateY: isHovered ? 8 : 0,
        z: isActive ? 30 : isHovered ? 20 : 0,
        scale: isActive ? 1.05 : isHovered ? 1.02 : 1,
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Marble tablet background */}
      <div 
        className={`
          relative px-6 py-3 rounded-sm overflow-hidden
          transition-all duration-500 ease-out
          ${isActive 
            ? 'bg-gradient-to-br from-[#f5f5f0] via-[#e8e4dc] to-[#d9d5cd]' 
            : 'bg-gradient-to-br from-[#2a2825] via-[#1f1d1a] to-[#15140f]'
          }
        `}
        style={{
          boxShadow: isActive 
            ? '0 10px 40px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : isHovered 
              ? '0 8px 30px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          transform: `translateZ(${isActive ? 20 : isHovered ? 10 : 0}px)`,
        }}
      >
        {/* Marble texture overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold border glow on hover/active */}
        <div 
          className={`
            absolute inset-0 rounded-sm border transition-all duration-500
            ${isActive 
              ? 'border-gold-500/60' 
              : isHovered 
                ? 'border-gold-500/30' 
                : 'border-gold-500/10'
            }
          `}
        />

        {/* Inner highlight */}
        <div 
          className={`
            absolute inset-0.5 rounded-sm border transition-all duration-500
            ${isActive 
              ? 'border-white/20' 
              : 'border-white/5'
            }
          `}
        />

        {/* Text */}
        <span 
          className={`
            relative z-10 font-cinzel text-sm tracking-[0.3em] uppercase
            transition-all duration-500
            ${isActive 
              ? 'text-[#1a1814] font-semibold' 
              : 'text-stone-400 group-hover:text-gold-400'
            }
          `}
          style={{
            textShadow: isActive 
              ? 'none' 
              : isHovered 
                ? '0 0 20px rgba(212, 175, 55, 0.5)' 
                : 'none',
          }}
        >
          {link.label}
        </span>

        {/* Gold glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ 
            x: isHovered ? '100%' : '-100%',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Floating shadow */}
      <div 
        className={`
          absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-2 
          bg-black/40 blur-md rounded-full
          transition-all duration-500
          ${isActive || isHovered ? 'opacity-60 scale-110' : 'opacity-30 scale-100'}
        `}
      />
    </motion.a>
  );
}

export default function MarbleNav({ className = '' }: MarbleNavProps) {
  const [activeId, setActiveId] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      {/* Gradient overlay for blending with scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#0a0908]/80 to-transparent pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Greek key pattern / logo mark */}
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
                {/* Stylized Greek meander/key pattern */}
                <path
                  d="M5 5 L35 5 L35 15 L15 15 L15 25 L35 25 L35 35 L5 35 L5 25 L25 25 L25 15 L5 15 Z"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="font-cinzel text-xl tracking-wider text-stone-200">
              Archive
            </span>
          </motion.div>

          {/* Navigation tablets */}
          <div className="flex items-center gap-2">
            {content.nav.map((link, index) => (
              <NavTablet
                key={link.id}
                link={link}
                index={index}
                isActive={activeId === link.id}
                onClick={() => setActiveId(link.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
