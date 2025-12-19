'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content, { Project } from '@/data/content';

interface ArtifactCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ArtifactCard({ project, index, onClick }: ArtifactCardProps) {
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
          className="relative bg-gradient-to-br from-[#1f1d1a] via-[#171512] to-[#0f0e0c] p-6"
          style={{
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 40px rgba(212, 175, 55, 0.1)' 
              : '0 10px 30px -10px rgba(0,0,0,0.5)',
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

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute -top-px -right-px">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500 blur-sm opacity-50" />
                <div className="relative bg-gradient-to-r from-gold-600 to-gold-400 px-3 py-1 text-xs font-cinzel tracking-widest text-[#0a0908]">
                  ARTIFACT
                </div>
              </div>
            </div>
          )}

          {/* Image placeholder / artifact illustration */}
          <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-sm bg-[#0a0908]">
            {/* Decorative frame */}
            <div className="absolute inset-2 border border-gold-500/20 rounded-sm z-10 pointer-events-none" />
            
            {/* Engraved pattern background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(212, 175, 55, 0.03) 10px,
                    rgba(212, 175, 55, 0.03) 20px
                  )
                `,
              }}
            />

            {/* Project number / artifact ID */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="font-cinzel text-6xl font-bold text-gold-500/20">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Title - like engraved text */}
            <h3 
              className="font-cinzel text-xl text-stone-100 mb-3 tracking-wide"
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
            <p className="font-cormorant text-stone-400 text-lg leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium tracking-wider uppercase
                    bg-gold-500/10 text-gold-500/70 border border-gold-500/20 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover reveal - "Inspect Artifact" text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#0a0908]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 border-2 border-gold-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="font-cinzel text-gold-500 tracking-[0.3em] text-sm">
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
  onClose 
}: { 
  project: Project; 
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0908]/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-auto"
      >
        {/* Scroll paper effect */}
        <div className="relative bg-gradient-to-b from-[#f5f0e6] via-[#ebe5d8] to-[#e0d9c8] p-8 rounded-sm">
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-50 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative border */}
          <div className="absolute inset-4 border-2 border-[#8B7355]/30 rounded-sm pointer-events-none" />
          <div className="absolute inset-6 border border-[#8B7355]/20 rounded-sm pointer-events-none" />

          {/* Corner ornaments */}
          {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 left-4 -rotate-90', 'bottom-4 right-4 rotate-180'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8`}>
              <svg viewBox="0 0 32 32" className="w-full h-full text-[#8B7355]/40">
                <path d="M0 0 L8 0 L8 2 L2 2 L2 8 L0 8 Z" fill="currentColor" />
                <path d="M4 4 L12 4 L12 6 L6 6 L6 12 L4 12 Z" fill="currentColor" opacity="0.5" />
              </svg>
            </div>
          ))}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center
              bg-[#8B7355]/10 hover:bg-[#8B7355]/20 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-[#5D4E37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="relative">
            {/* Title */}
            <h2 className="font-cinzel text-3xl text-[#3D3225] mb-2 tracking-wide">
              {project.title}
            </h2>

            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-[#8B7355] to-transparent" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#8B7355] rotate-45" />
                <div className="w-1.5 h-1.5 bg-[#8B7355]/60 rotate-45" />
                <div className="w-1.5 h-1.5 bg-[#8B7355]/30 rotate-45" />
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-[#8B7355] to-transparent" />
            </div>

            {/* Description */}
            <p className="font-cormorant text-xl text-[#4A4035] leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium tracking-wider
                    bg-[#8B7355]/10 text-[#5D4E37] border border-[#8B7355]/30 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#3D3225] text-[#f5f0e6]
                    font-cinzel text-sm tracking-widest hover:bg-[#5D4E37] transition-colors rounded-sm"
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
                  className="flex items-center gap-2 px-6 py-3 border-2 border-[#3D3225] text-[#3D3225]
                    font-cinzel text-sm tracking-widest hover:bg-[#3D3225] hover:text-[#f5f0e6] transition-colors rounded-sm"
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

        {/* Scroll ends decoration */}
        <div className="absolute -left-3 top-0 bottom-0 w-6 bg-gradient-to-r from-[#8B7355] via-[#a08b6d] to-[#8B7355] rounded-l-full" />
        <div className="absolute -right-3 top-0 bottom-0 w-6 bg-gradient-to-r from-[#8B7355] via-[#a08b6d] to-[#8B7355] rounded-r-full" />
      </motion.div>
    </motion.div>
  );
}

interface ArtifactGridProps {
  className?: string;
}

export default function ArtifactGrid({ className = '' }: ArtifactGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className={`relative py-32 ${className}`}>
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-cinzel text-4xl md:text-5xl text-stone-100 mb-4 tracking-wide">
              The Artifacts
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
              <div className="w-3 h-3 rotate-45 border-2 border-gold-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <p className="font-cormorant text-xl text-stone-400 max-w-2xl mx-auto">
              A curated collection of digital creations, each forged with passion and purpose
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projects.map((project, index) => (
              <ArtifactCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
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
          />
        )}
      </AnimatePresence>
    </>
  );
}
