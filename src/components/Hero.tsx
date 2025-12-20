'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import content from '@/data/content';
import { useTheme } from '@/context/ThemeContext';

// Dynamic import for 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('./three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-background transition-colors">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold-500 font-cinzel text-lg tracking-widest">
          ENTERING THE ARCHIVE
        </p>
      </div>
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          {/* Decorative line above title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6"
          />

          {/* Title */}
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4">
            <span className="block text-gold-gradient drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
              {content.hero.title.split(' ')[0]}
            </span>
            <span className={`block text-xl sm:text-2xl md:text-4xl lg:text-5xl mt-2 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] transition-colors duration-500
              ${theme === 'dark' 
                ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                : 'text-[#1a1815]'}`}>
              {content.hero.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
            <div className="relative">
              <div className="w-4 h-4 rotate-45 border border-gold-500/50" />
              <div className="absolute inset-0 w-4 h-4 rotate-45 border border-gold-500/30 scale-150" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative max-w-2xl mx-auto"
          >
            {/* Gradient diffusion background for light mode */}
            {theme !== 'dark' && (
              <div 
                className="absolute -inset-x-16 -inset-y-8 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,253,248,0.95) 0%, rgba(255,253,248,0.7) 40%, rgba(255,253,248,0) 70%)' }}
              />
            )}
            <p className={`relative font-cormorant text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed italic transition-colors duration-500 px-4 sm:px-0
              ${theme === 'dark' 
                ? 'text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]' 
                : 'text-[#1a1815] drop-shadow-[0_0_20px_rgba(255,253,248,1)]'}`}
            >
              {content.hero.subtitle}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative flex flex-col items-center gap-3 group cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Gradient diffusion background for light mode */}
            {theme !== 'dark' && (
              <div 
                className="absolute -inset-x-10 -inset-y-6 rounded-full blur-xl"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,253,248,0.98) 0%, rgba(255,253,248,0.6) 50%, rgba(255,253,248,0) 80%)' }}
              />
            )}
            <span className={`relative font-cinzel text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] transition-colors
              ${theme === 'dark' 
                ? 'text-gold-500 group-hover:text-gold-400' 
                : 'text-[#1a1815] font-semibold group-hover:text-[#0d0a07] drop-shadow-[0_0_15px_rgba(255,253,248,1)]'}`}>
              {content.hero.scrollText}
            </span>
            <div className={`relative w-6 h-10 border-2 rounded-full p-1 transition-colors
              ${theme === 'dark' 
                ? 'border-gold-500/50 group-hover:border-gold-500' 
                : 'border-[#1a1815] group-hover:border-[#0d0a07]'}`}>
              <motion.div
                className={`w-1.5 h-1.5 rounded-full mx-auto
                  ${theme === 'dark' ? 'bg-gold-500' : 'bg-[#1a1815]'}`}
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade - smooth diffusion */}
      <div className={`absolute bottom-0 left-0 right-0 h-48 z-20 pointer-events-none transition-colors duration-500
        ${theme === 'dark' 
          ? 'bg-linear-to-t from-[#0a0908] via-[#0a0908]/60 to-transparent' 
          : 'bg-linear-to-t from-[#fffdf8] via-[#fffdf8]/40 to-transparent'
        }`} 
      />
    </section>
  );
}
