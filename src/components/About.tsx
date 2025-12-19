'use client';

import { motion } from 'framer-motion';
import content from '@/data/content';

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl" />
        
        {/* Greek pattern border - left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 opacity-20">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                rgba(212, 175, 55, 0.3) 20px,
                rgba(212, 175, 55, 0.3) 22px
              )`,
            }}
          />
        </div>
        
        {/* Greek pattern border - right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 opacity-20">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 20px,
                rgba(212, 175, 55, 0.3) 20px,
                rgba(212, 175, 55, 0.3) 22px
              )`,
            }}
          />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-stone-100 mb-4 tracking-wide">
            {content.about.heading}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
            <div className="w-3 h-3 rotate-45 border-2 border-gold-500/50" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
        </motion.div>

        {/* Stone tablet container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Tablet background */}
          <div className="relative bg-gradient-to-br from-[#1a1816] via-[#141210] to-[#0d0c0a] p-8 md:p-12 rounded-sm">
            {/* Marble texture overlay */}
            <div 
              className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none rounded-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Border */}
            <div className="absolute inset-0 border border-gold-500/20 rounded-sm" />
            <div className="absolute inset-2 border border-gold-500/10 rounded-sm" />

            {/* Corner decorations */}
            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 left-0 -rotate-90', 'bottom-0 right-0 rotate-180'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-12 h-12`}>
                <svg viewBox="0 0 48 48" className="w-full h-full text-gold-500/30">
                  <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" fill="currentColor" />
                  <path d="M0 0 L8 0 L8 4 L4 4 L4 8 L0 8 Z" fill="currentColor" opacity="0.5" />
                </svg>
              </div>
            ))}

            {/* Content */}
            <div className="relative space-y-6">
              {content.about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="font-cormorant text-lg md:text-xl text-stone-300 leading-relaxed"
                >
                  {index === 0 && (
                    <span className="float-left font-cinzel text-5xl text-gold-500 mr-3 mt-1 leading-none">
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </motion.p>
              ))}
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 my-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="font-cinzel text-lg text-gold-500 tracking-widest mb-8 text-center">
                SACRED ARTS
              </h3>
              <div className="space-y-6">
                {content.about.skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.1 }}
                  >
                    <h4 className="font-cinzel text-sm text-amber-400/80 tracking-wider mb-3 text-center uppercase">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.7 + categoryIndex * 0.1 + skillIndex * 0.03 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-sm
                            font-cinzel text-xs tracking-wider text-stone-300
                            hover:bg-gold-500/20 hover:border-gold-500/40 transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom shadow */}
          <div className="absolute -bottom-4 left-8 right-8 h-8 bg-black/40 blur-xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
