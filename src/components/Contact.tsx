'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import content from '@/data/content';
import { useTheme } from '@/context/ThemeContext';

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  leetcode: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSendMessage = () => {
    const subject = encodeURIComponent(`Message from ${formState.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`font-cinzel text-3xl sm:text-4xl md:text-5xl mb-4 tracking-wide transition-colors duration-500
            ${isDark ? 'text-white' : 'text-stone-800'}`}>
            {content.contact.heading}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
            <div className="w-3 h-3 rotate-45 border-2 border-gold-500/50" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <p className={`font-cormorant text-lg sm:text-xl italic transition-colors duration-500
            ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
            {content.contact.subheading}
          </p>
        </motion.div>

        {/* Contact form - styled as ancient scroll/parchment */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className={`relative p-4 sm:p-6 md:p-8 lg:p-12 rounded-sm transition-colors duration-500
            ${isDark 
              ? 'bg-gradient-to-br from-[#1a1816] via-[#141210] to-[#0d0c0a]' 
              : 'bg-gradient-to-br from-[#f5f3f0] via-[#ebe8e4] to-[#e0ddd8] shadow-lg'}`}>
            {/* Texture overlay */}
            <div 
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none rounded-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Border */}
            <div className="absolute inset-0 border border-gold-500/20 rounded-sm pointer-events-none" />

            {/* Corner decorations */}
            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 left-0 -rotate-90', 'bottom-0 right-0 rotate-180'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-12 h-12`}>
                <svg viewBox="0 0 48 48" className="w-full h-full text-gold-500/30">
                  <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" fill="currentColor" />
                </svg>
              </div>
            ))}

            <div className="relative space-y-6">
              {/* Name field */}
              <div>
                <label className={`block font-cinzel text-sm tracking-widest mb-2 transition-colors duration-500
                  ${isDark ? 'text-gold-500' : 'text-amber-700'}`}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-sm font-cormorant text-lg transition-all
                    focus:outline-none focus:ring-1
                    ${isDark 
                      ? 'bg-black/30 border border-gold-500/30 text-white placeholder-stone-500 focus:border-gold-500/60 focus:ring-gold-500/30' 
                      : 'bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:ring-amber-500/30'}`}
                  placeholder="Enter your name..."
                />
              </div>

              {/* Email field */}
              <div>
                <label className={`block font-cinzel text-sm tracking-widest mb-2 transition-colors duration-500
                  ${isDark ? 'text-gold-500' : 'text-amber-700'}`}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-sm font-cormorant text-lg transition-all
                    focus:outline-none focus:ring-1
                    ${isDark 
                      ? 'bg-black/30 border border-gold-500/30 text-white placeholder-stone-500 focus:border-gold-500/60 focus:ring-gold-500/30' 
                      : 'bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:ring-amber-500/30'}`}
                  placeholder="Enter your email..."
                />
              </div>

              {/* Message field */}
              <div>
                <label className={`block font-cinzel text-sm tracking-widest mb-2 transition-colors duration-500
                  ${isDark ? 'text-gold-500' : 'text-amber-700'}`}>
                  YOUR MESSAGE
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-sm font-cormorant text-lg transition-all resize-none
                    focus:outline-none focus:ring-1
                    ${isDark 
                      ? 'bg-black/30 border border-gold-500/30 text-white placeholder-stone-500 focus:border-gold-500/60 focus:ring-gold-500/30' 
                      : 'bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:border-amber-600 focus:ring-amber-500/30'}`}
                  placeholder="Speak your mind..."
                />
              </div>

              {/* Send Message button - opens mailto */}
              <motion.button
                type="button"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600
                  font-cinzel text-sm tracking-[0.3em] text-[#0a0908]
                  rounded-sm relative overflow-hidden group"
              >
                <span className="relative z-10">
                  SEND MESSAGE
                </span>
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <span className="font-cinzel text-xs tracking-widest text-gold-500/50">OR</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            </div>

            {/* Direct contact & social links */}
            <div className="text-center">
              <p className={`font-cormorant mb-4 transition-colors duration-500
                ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                Reach me directly at
              </p>
              <a
                href={`mailto:${content.contact.email}`}
                className={`font-cinzel text-lg transition-colors
                  ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-amber-700 hover:text-amber-600'}`}
              >
                {content.contact.email}
              </a>

              {/* Social links */}
              <div className="flex justify-center gap-4 mt-8">
                {content.contact.socialLinks.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300
                      ${isDark 
                        ? 'border border-gold-500/30 text-stone-400 hover:text-gold-500 hover:border-gold-500/60 hover:bg-gold-500/10' 
                        : 'border border-stone-300 text-stone-500 hover:text-amber-700 hover:border-amber-600 hover:bg-amber-50'}`}
                    title={social.platform}
                  >
                    {socialIcons[social.icon] || social.platform.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Shadow */}
          <div className={`absolute -bottom-4 left-8 right-8 h-8 blur-xl rounded-full transition-opacity duration-500
            ${isDark ? 'bg-black/40' : 'bg-stone-400/20'}`} />
        </motion.div>
      </div>
    </section>
  );
}
