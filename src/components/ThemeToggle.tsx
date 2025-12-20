'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-14 h-14 rounded-full flex items-center justify-center
        border transition-all duration-300 overflow-hidden group
        ${isDark 
          ? 'bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-gold-500/30 hover:border-gold-500/50' 
          : 'bg-gradient-to-br from-amber-50 to-amber-100/80 border-amber-400/50 hover:border-amber-500'}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon with rotating rays for light mode */}
      <motion.div
        className={`absolute transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          rotate: isDark ? 0 : 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <defs>
            <linearGradient id="sunGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Sun circle */}
          <circle cx="20" cy="20" r="6" fill="url(#sunGoldGradient)" filter="url(#sunGlow)" />
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x1 = 20 + Math.cos(angle) * 9;
            const y1 = 20 + Math.sin(angle) * 9;
            const x2 = 20 + Math.cos(angle) * 14;
            const y2 = 20 + Math.sin(angle) * 14;
            return (
              <line 
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="url(#sunGoldGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Moon icon with stars */}
      <motion.div
        animate={{
          rotate: isDark ? 0 : -90,
          scale: isDark ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`absolute transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg
          className="w-6 h-6 text-gold-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </motion.div>

      {/* Stars for dark mode */}
      {isDark && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-300 rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${60 + i * 10}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}

      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300
        ${isDark ? 'bg-gold-500/0 group-hover:bg-gold-500/10' : 'bg-amber-500/0 group-hover:bg-amber-500/10'}`} />
    </motion.button>
  );
}
