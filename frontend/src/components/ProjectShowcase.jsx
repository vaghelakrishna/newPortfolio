import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import croviiImg from '../assets/carovii.webp';
import canvaelementsImg from '../assets/canvaelements.webp';

const projects = [
  {
    id: 'carovii',
    title: 'Carovii',
    subtitle: 'Multi-Slide Social Carousel Studio & Slicer',
    category: 'Full Stack & Web App',
    image: croviiImg,
    link: '/project/carovii',
  },
  {
    id: 'canvaelements',
    title: 'Canva Elements',
    subtitle: 'Design System & Curated Asset Discovery Tool',
    category: 'Lead UX & Frontend',
    image: canvaelementsImg,
    link: '/project/canvaelements',
  },
];

export default function ProjectShowcase() {
  return (
    <section className="w-full bg-[#FAF9F6] py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center font-sans">
      {/* Section Header */}
      <div className="w-full max-w-5xl mb-12 flex flex-col items-start">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E25C1D] font-bold mb-1">
          Featured Works
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1F1E1D] tracking-tight">
          Selected Projects
        </h2>
      </div>

      {/* Cards List */}
      <div className="w-full max-w-5xl space-y-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col select-none group">
      {/* 1. Project Mockup Card (Hover scale, click to open project) */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ scale: isHovered ? 1.018 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] cursor-pointer"
      >
        <Link to={project.link} className="absolute inset-0 block">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Floating Subtle Click Button on Hover */}
          <div
            className={`absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20 flex items-center gap-1.5 bg-white/95 text-neutral-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-neutral-200/80 backdrop-blur-md transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <span>View Project</span>
            <ArrowUpRight size={13} className="stroke-[2.5]" />
          </div>
        </Link>
      </motion.div>

      {/* 2. Details Row Underneath the Image (Simple & matching user's reference) */}
      <Link
        to={project.link}
        className="mt-4 sm:mt-5 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left transition-opacity"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#1F1E1D] group-hover:text-[#E25C1D] transition-colors duration-200">
          {project.title}{' '}
          <span className="text-neutral-400 font-normal mx-1 sm:mx-1.5">—</span>{' '}
          <span className="font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
            {project.subtitle}
          </span>
        </h3>

        <div className="self-start sm:self-auto">
          <span className="inline-block text-xs sm:text-[13px] font-medium text-neutral-600 border border-neutral-300/80 rounded-full px-4 py-1.5 bg-white/70 shadow-2xs backdrop-blur-xs whitespace-nowrap">
            {project.category}
          </span>
        </div>
      </Link>
    </div>
  );
}
