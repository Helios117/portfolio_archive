'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-full flex items-center justify-center
        bg-gradient-to-br from-gold-500/20 to-gold-600/10
        border border-gold-500/30 hover:border-gold-500/50
        transition-all duration-300 overflow-hidden group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun rays animation for light mode */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-gold-500/40 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
            }}
            animate={{
              scale: isDark ? 0 : [1, 1.2, 1],
              opacity: isDark ? 0 : [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Sun icon */}
      <motion.div
        animate={{
          rotate: isDark ? 0 : 360,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`absolute transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        <svg
          className="w-6 h-6 text-gold-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path
            strokeLinecap="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      </motion.div>

      {/* Moon icon */}
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
      <div className="absolute inset-0 rounded-full bg-gold-500/0 group-hover:bg-gold-500/10 transition-all duration-300" />
    </motion.button>
  );
}
