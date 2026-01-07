'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full shadow-lg border transition-colors duration-300
            ${isDark 
              ? 'bg-[#0a0908] border-gold-500/50 text-gold-500 hover:bg-gold-500/20' 
              : 'bg-[#fffdf8] border-amber-400 text-amber-600 hover:bg-amber-50'}`}
          aria-label="Scroll to top"
        >
          {/* Rune/Arrow Icon */}
          <svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
          
          {/* Rotating glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full opacity-30 pointer-events-none
              ${isDark ? 'bg-gold-500 blur-md' : 'bg-amber-400 blur-md'}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
