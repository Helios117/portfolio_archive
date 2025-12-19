'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import content from '@/data/content';

// Dynamic import for 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('./three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0908]">
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
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl tracking-wider mb-4">
            <span className="block text-gold-gradient">
              {content.hero.title.split(' ')[0]}
            </span>
            <span className="block text-stone-200 text-3xl md:text-4xl lg:text-5xl mt-2 tracking-[0.3em]">
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-cormorant text-xl md:text-2xl text-stone-400 max-w-2xl mx-auto leading-relaxed italic"
          >
            {content.hero.subtitle}
          </motion.p>
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
            className="flex flex-col items-center gap-3 group cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="font-cinzel text-xs tracking-[0.3em] text-gold-500/60 group-hover:text-gold-500 transition-colors">
              {content.hero.scrollText}
            </span>
            <div className="w-6 h-10 border-2 border-gold-500/30 rounded-full p-1 group-hover:border-gold-500/60 transition-colors">
              <motion.div
                className="w-1.5 h-1.5 bg-gold-500 rounded-full mx-auto"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0908] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
