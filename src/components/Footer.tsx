'use client';

import { motion } from 'framer-motion';
import content from '@/data/content';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`relative py-8 sm:py-12 border-t transition-colors duration-500
      ${isDark ? 'border-gold-500/10' : 'border-gold-500/20'}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500
        ${isDark 
          ? 'bg-gradient-to-t from-[#0a0908] via-[#0d0c0a] to-transparent' 
          : 'bg-gradient-to-t from-[#f8f6f1] via-[#fffdf8] to-transparent'}`} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Greek meander pattern */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 200 20" className="w-48 h-5 text-gold-500/30">
            <pattern id="meander" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0 10 L5 10 L5 5 L15 5 L15 15 L5 15 L5 10 M20 10 L15 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="200" height="20" fill="url(#meander)" />
          </svg>
        </div>

        <div className="text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-8">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="footerGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
                {/* Sun circle */}
                <circle cx="20" cy="20" r="6" fill="url(#footerGoldGradient)" />
                {/* Sun rays */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180);
                  const x1 = 20 + Math.cos(angle) * 9;
                  const y1 = 20 + Math.sin(angle) * 9;
                  const x2 = 20 + Math.cos(angle) * 15;
                  const y2 = 20 + Math.sin(angle) * 15;
                  return (
                    <line 
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="url(#footerGoldGradient)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>
            <span className={`font-cinzel text-lg tracking-wider transition-colors duration-500
              ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
              Helios Archive
            </span>
          </motion.div>

          {/* Quote */}
          <p className={`font-cormorant italic text-sm sm:text-base mb-6 max-w-md mx-auto px-4 sm:px-0 transition-colors duration-500
            ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            &ldquo;Every artifact tells a story, every line of code a verse in the epic of creation.&rdquo;
          </p>

          {/* Copyright */}
          <p className={`font-cinzel text-xs tracking-widest transition-colors duration-500
            ${isDark ? 'text-gold-500/60' : 'text-gold-600/70'}`}>
            &copy; {currentYear} {content.meta.author}. Forged with passion.
          </p>

          {/* Built with badge */}
          <div className={`mt-6 flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors duration-500
            ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            <span>Built with</span>
            <span className={`${isDark ? 'text-gold-500' : 'text-gold-600'}`}>React</span>
            <span>•</span>
            <span className={`${isDark ? 'text-gold-500' : 'text-gold-600'}`}>Three.js</span>
            <span>•</span>
            <span className={`${isDark ? 'text-gold-500' : 'text-gold-600'}`}>Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
