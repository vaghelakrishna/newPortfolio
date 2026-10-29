import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import avatarImg from '../assets/cute-me.jpeg';
import workImg from '../assets/carovii.webp';
import flowerImg from '../assets/flower2Img.webp';

export default function ScrollRevealHero() {
  const containerRef = useRef(null);

  // Scroll tracking across sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll thresholds for Line 2 and Line 3
  const line2Progress = useTransform(scrollYProgress, [0.15, 0.50], [0, 1]);
  const line3Progress = useTransform(scrollYProgress, [0.50, 0.85], [0, 1]);

  // Pill scale animations
  const pill2Scale = useTransform(scrollYProgress, [0.1, 0.45], [0.88, 1]);
  const pill3Scale = useTransform(scrollYProgress, [0.45, 0.8], [0.88, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] bg-[#FAF9F6]">
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 select-none overflow-hidden">
        
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* 
          3-LINE STRICT LAYOUT CONTAINER
          Clean, balanced typography matching the reference screenshot.
        */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 font-serif leading-[1.15] tracking-tight">

          {/* ================= LINE 1 (INITIALLY HIGHLIGHTED SOLID BLACK) ================= */}
          <div className="w-full flex items-center justify-center flex-nowrap whitespace-nowrap gap-2 sm:gap-3.5 md:gap-4">
            
            {/* Pill 1: Avatar with Outer Spaced Border */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="relative p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-black/10 bg-white/80 shadow-xs flex-shrink-0 cursor-pointer"
            >
              <div className="w-9 h-7 sm:w-14 sm:h-11 md:w-18 md:h-19 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100">
                <img
                  src={avatarImg}
                  alt="Krishna Vaghela"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Line 1 Text - Solid Dark #1A1A1A Initially */}
            <div className="text-[1.3rem] xs:text-[1.6rem] sm:text-[2.2rem] md:text-[2.85rem] lg:text-[3.25rem] text-[#1A1A1A] font-normal tracking-tight">
              Hey, I'm Krishna.
            </div>
          </div>

          {/* ================= LINE 2 ================= */}
          <div className="w-full flex items-center justify-center flex-nowrap whitespace-nowrap gap-2 sm:gap-3.5 md:gap-4">
            
            {/* Line 2 Text */}
            <div className="text-[1.1rem] xs:text-[1.35rem] sm:text-[1.85rem] md:text-[2.4rem] lg:text-[2.75rem] text-[#222]">
              <RevealText text="I think, I design & I try to build" progress={line2Progress} />
            </div>

            {/* Pill 2: App Screen / Video Container */}
            <motion.div
              style={{ scale: pill2Scale }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="relative p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-black/10 bg-white/80 shadow-xs flex-shrink-0 cursor-pointer"
            >
              <div className="w-6 h-9 sm:w-9 sm:h-14 md:w-29 md:h-18 rounded-lg sm:rounded-xl overflow-hidden bg-[#FAF8F5] p-0.5 flex items-center justify-center border border-black/5">
                <img
                  src={workImg}
                  alt="Mobile UI"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </motion.div>
          </div>

          {/* ================= LINE 3 ================= */}
          <div className="w-full flex items-center justify-center flex-nowrap whitespace-nowrap gap-2 sm:gap-3.5 md:gap-4">
            
            {/* Pill 3: Star / Artwork Container */}
            <motion.div
              style={{ scale: pill3Scale }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="relative p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-black/10 bg-white/80 shadow-xs flex-shrink-0 cursor-pointer"
            >
              <div className="w-8 h-7 sm:w-12 sm:h-11 md:w-16 md:h-14 rounded-lg sm:rounded-xl overflow-hidden bg-[#FFF9F3] p-1.5 flex items-center justify-center border border-black/5">
                <img
                  src={flowerImg}
                  alt="Creative icon"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Line 3 Text */}
            <div className="text-[1.1rem] xs:text-[1.35rem] sm:text-[1.85rem] md:text-[2.4rem] lg:text-[2.75rem] text-[#222]">
              <RevealText text="My USP is getting things done." progress={line3Progress} />
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}

// Subcomponent: Character/Word Level Smooth Scroll Reveal
function RevealText({ text, progress }) {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-nowrap gap-x-[0.25em]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;

        return (
          <Word
            key={i}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
}

function Word({ word, progress, range }) {
  // Color transitions smoothly from faded (#C5C2BA) to sharp solid dark (#1A1A1A)
  const opacity = useTransform(progress, range, [0.32, 1]);
  const color = useTransform(progress, range, ["#C8C4B8", "#1E1C19"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-150"
    >
      {word}
    </motion.span>
  );
}
