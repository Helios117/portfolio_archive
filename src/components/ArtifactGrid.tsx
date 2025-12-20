'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content, { Project } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';

interface ArtifactCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  isDark: boolean;
}

function ArtifactCard({ project, index, onClick, isDark }: ArtifactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Stone slab container */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          rotateX: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-sm"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Main card body */}
        <div 
          className={`relative p-4 sm:p-6 transition-colors duration-500
            ${isDark 
              ? 'bg-gradient-to-br from-[#1f1d1a] via-[#171512] to-[#0f0e0c]' 
              : 'bg-gradient-to-br from-white via-[#fdfcfa] to-[#f8f7f4] border border-stone-200'}`}
          style={{
            boxShadow: isHovered 
              ? isDark 
                ? '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 40px rgba(212, 175, 55, 0.1)' 
                : '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 30px rgba(212, 175, 55, 0.1)'
              : isDark
                ? '0 10px 30px -10px rgba(0,0,0,0.5)'
                : '0 4px 20px -8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Marble texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold border */}
          <div 
            className={`
              absolute inset-0 border transition-all duration-500 rounded-sm
              ${isHovered ? 'border-gold-500/40' : 'border-gold-500/10'}
            `}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/30 rounded-tl-sm" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-500/30 rounded-tr-sm" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-500/30 rounded-bl-sm" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/30 rounded-br-sm" />

          {/* ARTIFACT badge - shown on all projects */}
          <div className="absolute -top-px -right-px">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500 blur-sm opacity-50" />
              <div className="relative bg-gradient-to-r from-gold-600 to-gold-400 px-3 py-1 text-xs font-cinzel tracking-widest text-[#0a0908]">
                ARTIFACT
              </div>
            </div>
          </div>

          {/* Image placeholder / artifact illustration - theme aware */}
          <div className={`relative aspect-[16/10] mb-6 overflow-hidden rounded-sm transition-colors duration-500
            ${isDark ? 'bg-[#0a0908]' : 'bg-gradient-to-br from-[#e8e2d9] to-[#d9d0c3]'}`}>
            {/* Decorative frame */}
            <div className={`absolute inset-2 border rounded-sm z-10 pointer-events-none
              ${isDark ? 'border-gold-500/20' : 'border-amber-600/30'}`} />
            
            {/* Engraved pattern background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    ${isDark ? 'rgba(212, 175, 55, 0.03)' : 'rgba(139, 90, 43, 0.08)'} 10px,
                    ${isDark ? 'rgba(212, 175, 55, 0.03)' : 'rgba(139, 90, 43, 0.08)'} 20px
                  )
                `,
              }}
            />

            {/* Project number / artifact ID */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className={`font-cinzel text-6xl font-bold transition-colors duration-500
                ${isDark ? 'text-gold-500/20' : 'text-amber-700/30'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent
                ${isDark ? 'from-gold-500/10' : 'from-amber-600/15'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Title - like engraved text */}
            <h3 
              className={`font-cinzel text-xl mb-3 tracking-wide transition-colors duration-500
                ${isDark ? 'text-white' : 'text-stone-800'}`}
              style={{
                textShadow: isHovered 
                  ? '0 0 30px rgba(212, 175, 55, 0.4)' 
                  : 'none',
              }}
            >
              {project.title}
            </h3>

            {/* Decorative divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
              <div className="w-2 h-2 rotate-45 border border-gold-500/40" />
              <div className="h-px flex-1 bg-gradient-to-l from-gold-500/40 to-transparent" />
            </div>

            {/* Description */}
            <p className={`font-cormorant text-lg leading-relaxed mb-4 transition-colors duration-500
              ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs font-medium tracking-wider uppercase rounded-sm
                    transition-colors duration-500
                    ${isDark 
                      ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30' 
                      : 'bg-amber-100 text-amber-700 border border-amber-300'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover reveal - "Inspect Artifact" bar at bottom - doesn't block content */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 flex items-center justify-center py-4 bg-gradient-to-t
              ${isDark 
                ? 'from-[#0a0908] via-[#0a0908]/95 to-transparent' 
                : 'from-white via-white/95 to-transparent'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 border-2 rounded-full flex items-center justify-center
                ${isDark ? 'border-gold-500' : 'border-amber-600'}`}>
                <svg className={`w-4 h-4 ${isDark ? 'text-gold-500' : 'text-amber-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className={`font-cinzel tracking-[0.2em] text-sm
                ${isDark ? 'text-gold-500' : 'text-amber-600'}`}>
                INSPECT ARTIFACT
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom shadow for depth */}
        <div 
          className={`
            absolute -bottom-4 left-4 right-4 h-4 bg-black/30 blur-lg rounded-full
            transition-all duration-500
            ${isHovered ? 'opacity-60 scale-110' : 'opacity-40 scale-100'}
          `}
        />
      </motion.div>
    </motion.article>
  );
}

// Scroll/Modal component for viewing artifact details
function ArtifactScroll({ 
  project, 
  onClose,
  isDark 
}: { 
  project: Project; 
  onClose: () => void;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md
        ${isDark ? 'bg-[#0a0908]/95' : 'bg-stone-100/95'}`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-auto"
      >
        {/* Scroll paper effect - Theme aware */}
        <div className={`relative p-4 sm:p-6 md:p-8 rounded-sm border transition-colors duration-500
          ${isDark 
            ? 'bg-linear-to-b from-[#1f1d1a] via-[#171512] to-[#0f0e0c] border-gold-500/20' 
            : 'bg-linear-to-b from-white via-[#fdfcfa] to-[#f8f7f4] border-amber-300'}`}>
          {/* Marble texture */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none rounded-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative border */}
          <div className={`absolute inset-4 border-2 rounded-sm pointer-events-none
            ${isDark ? 'border-gold-500/20' : 'border-amber-300/50'}`} />
          <div className={`absolute inset-6 border rounded-sm pointer-events-none
            ${isDark ? 'border-gold-500/10' : 'border-amber-200/50'}`} />

          {/* Corner ornaments */}
          {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 left-4 -rotate-90', 'bottom-4 right-4 rotate-180'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8`}>
              <svg viewBox="0 0 32 32" className={`w-full h-full ${isDark ? 'text-gold-600/60' : 'text-amber-600/60'}`}>
                <path d="M0 0 L8 0 L8 2 L2 2 L2 8 L0 8 Z" fill="currentColor" />
                <path d="M4 4 L12 4 L12 6 L6 6 L6 12 L4 12 Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          ))}

          {/* Close button - styled to match theme */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className={`absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center
              rounded-sm shadow-lg transition-all duration-300 group
              ${isDark 
                ? 'bg-gradient-to-br from-[#1a1814] to-[#0f0e0c] border border-gold-500/30 hover:border-gold-500/60 hover:shadow-gold-500/20' 
                : 'bg-gradient-to-br from-white to-stone-100 border border-amber-300 hover:border-amber-500 hover:shadow-amber-500/20'}`}
          >
            {/* Inner glow effect */}
            <div className={`absolute inset-0.5 bg-gradient-to-br to-transparent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity
              ${isDark ? 'from-gold-500/5' : 'from-amber-500/10'}`} />
            {/* X icon */}
            <svg 
              className={`w-5 h-5 transition-colors relative z-10
                ${isDark ? 'text-gold-500/70 group-hover:text-gold-400' : 'text-amber-600/70 group-hover:text-amber-600'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {/* Corner accents */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors
              ${isDark ? 'border-gold-500/40 group-hover:border-gold-500/70' : 'border-amber-400/40 group-hover:border-amber-500/70'}`} />
            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors
              ${isDark ? 'border-gold-500/40 group-hover:border-gold-500/70' : 'border-amber-400/40 group-hover:border-amber-500/70'}`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors
              ${isDark ? 'border-gold-500/40 group-hover:border-gold-500/70' : 'border-amber-400/40 group-hover:border-amber-500/70'}`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors
              ${isDark ? 'border-gold-500/40 group-hover:border-gold-500/70' : 'border-amber-400/40 group-hover:border-amber-500/70'}`} />
          </button>

          {/* Content */}
          <div className="relative">
            {/* Title */}
            <h2 className={`font-cinzel text-xl sm:text-2xl md:text-3xl mb-2 tracking-wide
              ${isDark ? 'text-gold-400' : 'text-amber-700'}`}>
              {project.title}
            </h2>

            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`h-0.5 flex-1 bg-linear-to-r to-transparent
                ${isDark ? 'from-gold-500' : 'from-amber-500'}`} />
              <div className="flex gap-1">
                <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? 'bg-gold-500' : 'bg-amber-500'}`} />
                <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? 'bg-gold-500/60' : 'bg-amber-500/60'}`} />
                <div className={`w-1.5 h-1.5 rotate-45 ${isDark ? 'bg-gold-500/30' : 'bg-amber-500/30'}`} />
              </div>
              <div className={`h-0.5 flex-1 bg-linear-to-l to-transparent
                ${isDark ? 'from-gold-500' : 'from-amber-500'}`} />
            </div>

            {/* Description */}
            <p className={`font-cormorant text-base sm:text-lg md:text-xl leading-relaxed mb-6
              ${isDark ? 'text-stone-200' : 'text-stone-700'}`}>
              {project.longDescription || project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium tracking-wider rounded-sm
                    ${isDark 
                      ? 'bg-gold-500/10 text-gold-400 border border-gold-500/30' 
                      : 'bg-amber-100 text-amber-700 border border-amber-300'}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gold-600 text-[#0a0908]
                    font-cinzel text-xs sm:text-sm tracking-widest hover:bg-gold-500 transition-colors rounded-sm"
                >
                  <span>VIEW LIVE</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border-2 border-gold-500 text-gold-400
                    font-cinzel text-xs sm:text-sm tracking-widest hover:bg-gold-500/10 transition-colors rounded-sm"
                >
                  <span>SOURCE</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Scroll ends decoration - Gold themed */}
        <div className="absolute -left-3 top-0 bottom-0 w-6 bg-linear-to-r from-gold-700 via-gold-500 to-gold-700 rounded-l-full shadow-lg" />
        <div className="absolute -right-3 top-0 bottom-0 w-6 bg-linear-to-r from-gold-700 via-gold-500 to-gold-700 rounded-r-full shadow-lg" />
      </motion.div>
    </motion.div>
  );
}

interface ArtifactGridProps {
  className?: string;
}

export default function ArtifactGrid({ className = '' }: ArtifactGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <section id="projects" className={`relative py-16 sm:py-24 md:py-32 ${className}`}>
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className={`font-cinzel text-3xl sm:text-4xl md:text-5xl mb-4 tracking-wide transition-colors duration-500
              ${isDark ? 'text-white' : 'text-stone-800'}`}>
              The Artifacts
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
              <div className="w-3 h-3 rotate-45 border-2 border-gold-500/50" />
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <p className={`font-cormorant text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 sm:px-0 transition-colors duration-500
              ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              A curated collection of digital creations, each forged with passion and purpose
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {content.projects.map((project, index) => (
              <ArtifactCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ArtifactScroll
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </>
  );
}
