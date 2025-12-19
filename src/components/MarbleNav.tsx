'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import content, { NavLink } from '@/data/content';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

interface MarbleNavProps {
  className?: string;
}

function NavTablet({ 
  link, 
  index, 
  isActive,
  onClick,
  isDark
}: { 
  link: NavLink; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
  isDark: boolean;
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
            ? isDark 
              ? 'bg-gradient-to-br from-[#f5f5f0] via-[#e8e4dc] to-[#d9d5cd]' 
              : 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-600'
            : isDark
              ? 'bg-gradient-to-br from-[#2a2825] via-[#1f1d1a] to-[#15140f]'
              : 'bg-gradient-to-br from-white via-[#fdfcfa] to-[#f8f6f2] border border-stone-200'
          }
        `}
        style={{
          boxShadow: isActive 
            ? '0 10px 40px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : isHovered 
              ? isDark 
                ? '0 8px 30px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 8px 30px rgba(180, 130, 40, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
              : isDark
                ? '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                : '0 2px 8px rgba(0,0,0,0.08)',
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
              ? isDark ? 'border-gold-500/60' : 'border-amber-300'
              : isHovered 
                ? isDark ? 'border-gold-500/30' : 'border-amber-400/50'
                : isDark ? 'border-gold-500/10' : 'border-transparent'
            }
          `}
        />

        {/* Inner highlight */}
        <div 
          className={`
            absolute inset-0.5 rounded-sm border transition-all duration-500
            ${isActive 
              ? isDark ? 'border-white/20' : 'border-white/40'
              : isDark ? 'border-white/5' : 'border-white/20'
            }
          `}
        />

        {/* Text */}
        <span 
          className={`
            relative z-10 font-cinzel text-sm tracking-[0.3em] uppercase
            transition-all duration-500
            ${isActive 
              ? isDark ? 'text-[#1a1814] font-semibold' : 'text-white font-semibold'
              : isDark 
                ? 'text-stone-300 group-hover:text-gold-400'
                : 'text-stone-700 group-hover:text-amber-700'
            }
          `}
          style={{
            textShadow: isActive 
              ? 'none' 
              : isHovered 
                ? isDark ? '0 0 20px rgba(212, 175, 55, 0.5)' : 'none'
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
  const { theme } = useTheme();

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      {/* Gradient overlay for blending with scene */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500
        ${theme === 'dark' 
          ? 'bg-linear-to-b from-[#0a0908] via-[#0a0908]/80 to-transparent' 
          : 'bg-linear-to-b from-[#fffdf8] via-[#fffdf8]/80 to-transparent'
        }`} 
      />
      
      <div className="relative max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            {/* Helios Sun Logo */}
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Sun circle */}
                <circle cx="20" cy="20" r="8" fill="url(#goldGradient)" filter="url(#glow)" />
                {/* Sun rays */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180);
                  const x1 = 20 + Math.cos(angle) * 11;
                  const y1 = 20 + Math.sin(angle) * 11;
                  const x2 = 20 + Math.cos(angle) * 17;
                  const y2 = 20 + Math.sin(angle) * 17;
                  return (
                    <line 
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="url(#goldGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>
            <span className={`font-cinzel text-xl tracking-wider transition-colors duration-500
              ${theme === 'dark' ? 'text-stone-200' : 'text-stone-800'}`}>
              Helios
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
                isDark={theme === 'dark'}
              />
            ))}
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="ml-4"
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
