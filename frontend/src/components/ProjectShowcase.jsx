import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Assets
import craftoriaImg from '../assets/carovii.png';
import fleboImg from '../assets/canvaelements.png';
import sugraImg from '../assets/kattalyx.webp';
import leaveVideo from '../assets/leave.webm';

const projects = [
  {
    id: 'craftoria',
    image: craftoriaImg,
    video: leaveVideo,
    link: '/project/craftoria',
    details: {
      brand: 'Craftoria, Open Source',
      year: '2026',
      projectsCount: 'Full Stack App',
      role: 'Full Stack Developer',
      skills: 'React, Typesense, MongoDB, Cloudinary',
    },
  },
  {
    id: 'flebo',
    image: fleboImg,
    video: leaveVideo,
    link: '/project/flebo',
    details: {
      brand: 'Flebo, HealthTech',
      year: '2026',
      projectsCount: '3 Portals',
      role: 'Lead UX & Frontend',
      skills: 'Design System, Claude, Figma, Prototyping',
    },
  },
  {
    id: 'sugra-jewels',
    image: sugraImg,
    video: leaveVideo,
    link: '/project/sugra-jewels',
    details: {
      brand: 'Sugra Jewels, E-Commerce',
      year: '2026',
      projectsCount: 'Production Store',
      role: 'Full Stack Engineer',
      skills: 'React, Node, Cloudinary, Tailwind',
    },
  },
];

export default function ProjectShowcase() {
  return (
    <section className="w-full min-h-screen bg-[#F7F7F4] py-16 px-4 sm:px-6 flex flex-col items-center justify-center font-sans">

      {/* Section Header */}
      <div className="w-full max-w-4xl mb-10 flex flex-col items-start">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-1">
          Featured Works
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Selected Projects
        </h2>
      </div>

      {/* Cards List */}
      <div className="w-full max-w-4xl space-y-12">
        {projects.map((project) => (
          <ArcCornerCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
}

function ArcCornerCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] p-3 sm:p-4 flex items-center justify-center select-none"
    >
      {/* --- 1. EXACT CURVED RADIAL ARCS (Image 8 ke according) --- */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'
          }`}
      >
        {/* Top-Left Arc */}
        <svg className="absolute top-0 left-0 w-12 h-12 overflow-visible" viewBox="0 0 48 48">
          <path
            d="M 12 44 A 32 32 0 0 1 44 12"
            fill="none"
            stroke="#999999"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Top-Right Arc */}
        <svg className="absolute top-0 right-0 w-12 h-12 overflow-visible" viewBox="0 0 48 48">
          <path
            d="M 4 12 A 32 32 0 0 1 36 44"
            fill="none"
            stroke="#999999"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Bottom-Left Arc */}
        <svg className="absolute bottom-0 left-0 w-12 h-12 overflow-visible" viewBox="0 0 48 48">
          <path
            d="M 12 4 A 32 32 0 0 0 44 36"
            fill="none"
            stroke="#999999"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Bottom-Right Arc */}
        <svg className="absolute bottom-0 right-0 w-12 h-12 overflow-visible" viewBox="0 0 48 48">
          <path
            d="M 4 36 A 32 32 0 0 0 36 4"
            fill="none"
            stroke="#999999"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

          
      </div>

      {/* --- 2. MAIN CARD: Hover par expand hokar arcs ki boundary tak jaata hai --- */}
      <motion.a
        ref={cardRef}
        href={project.link}
        onMouseMove={handleMouseMove}
        animate={{
          scale: isHovered ? 1.025 : 0.98,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative w-full h-full rounded-[26px] bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col justify-end cursor-none border border-black/5"
      >
        {/* Poster Image */}
        <img
          src={project.image}
          alt={project.details.brand}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${isHovered ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Full Card Video */}
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        />

        {/* Subtle Video Tint */}
        <div
          className={`absolute inset-0 bg-black/10 pointer-events-none transition-opacity duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Custom Follow-Cursor */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: mousePos.x + 10,
                y: mousePos.y + 10,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.1,
              }}
              className="absolute top-0 left-0 z-50 pointer-events-none flex items-center gap-1.5 bg-[#111111] text-white px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-neutral-800"
            >
              <span className="text-xs">👆</span>
              <span className="text-[11px] font-semibold whitespace-nowrap tracking-tight">Click to Open</span>
              <ArrowUpRight size={11} className="stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Details Bar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-30 bg-white/85 backdrop-blur-md border-t border-black/10 py-2.5 px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-5 gap-3 text-[11px] pointer-events-none w-full shadow-sm"
            >
              <div>
                <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">Brand</p>
                <p className="text-neutral-900 font-semibold truncate mt-0.5">{project.details.brand}</p>
              </div>
              <div>
                <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">Year of Projects</p>
                <p className="text-neutral-900 font-semibold truncate mt-0.5">{project.details.year}</p>
              </div>
              <div>
                <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">No. of Projects</p>
                <p className="text-neutral-900 font-semibold truncate mt-0.5">{project.details.projectsCount}</p>
              </div>
              <div>
                <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">Role</p>
                <p className="text-neutral-900 font-semibold truncate mt-0.5">{project.details.role}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-neutral-500 uppercase tracking-wider text-[9px] font-bold">Skills</p>
                <p className="text-neutral-700 font-medium truncate mt-0.5">{project.details.skills}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}