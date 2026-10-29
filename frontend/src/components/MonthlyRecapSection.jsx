import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Assets
import mountainsImg from '../assets/recap/mountains.png';
import survivalImg from '../assets/recap/survival.png';
import chefImg from '../assets/recap/chef.png';
import pinkFolderImg from '../assets/recap/pink-folder.png';
import blueFolderImg from '../assets/recap/blue-folder.png';
import pouchImg from '../assets/recap/pouch.png';
import ramenImg from '../assets/recap/ramen.png';

export default function MonthlyRecapSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.35 });
  const [burstKey, setBurstKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Items configuration: desktop offsets vs mobile offsets
  const items = [
    {
      id: 'mountains',
      src: mountainsImg,
      label: 'mountains.jpg',
      alt: 'Mountain adventure',
      isPhoto: true,
      desktop: { x: -310, y: -230, rotate: -4, scale: 1 },
      mobile: { x: -130, y: -220, rotate: -4, scale: 0.72 },
      delay: 0.05,
    },
    {
      id: 'survival',
      src: survivalImg,
      label: 'survival.jpg',
      alt: 'Diet Coke survival trip',
      isPhoto: true,
      desktop: { x: 270, y: -250, rotate: 3, scale: 1 },
      mobile: { x: 125, y: -230, rotate: 3, scale: 0.72 },
      delay: 0.12,
    },
    {
      id: 'chef',
      src: chefImg,
      label: 'late night experiments +',
      alt: 'Pixel Chef mascot',
      isSticker: true,
      desktop: { x: -350, y: -20, rotate: -2, scale: 1.05 },
      mobile: { x: -145, y: -70, rotate: -2, scale: 0.75 },
      delay: 0.18,
    },
    {
      id: 'pinkFolder',
      src: pinkFolderImg,
      label: 'My Creative Dump. +',
      alt: 'Pink folder with anime eyes',
      isSticker: true,
      desktop: { x: 330, y: -40, rotate: 4, scale: 1.05 },
      mobile: { x: 140, y: -65, rotate: 4, scale: 0.75 },
      delay: 0.22,
    },
    {
      id: 'blueFolder',
      src: blueFolderImg,
      label: 'drafts +',
      alt: 'Blue folder with bunny',
      isSticker: true,
      desktop: { x: -280, y: 230, rotate: -5, scale: 1.05 },
      mobile: { x: -130, y: 175, rotate: -5, scale: 0.75 },
      delay: 0.28,
    },
    {
      id: 'pouch',
      src: pouchImg,
      label: '',
      alt: 'Aesthetic pouch and sticker bundle',
      isSticker: true,
      desktop: { x: 30, y: 260, rotate: 7, scale: 1.05 },
      mobile: { x: 10, y: 220, rotate: 7, scale: 0.78 },
      delay: 0.32,
    },
    {
      id: 'ramen',
      src: ramenImg,
      label: (
        <span>
          favourite <span className="font-cursive text-amber-700 text-sm">ramen</span>.jpg
        </span>
      ),
      alt: 'Ramen artwork',
      isPhoto: true,
      isRamen: true,
      desktop: { x: 320, y: 240, rotate: 3, scale: 1 },
      mobile: { x: 135, y: 180, rotate: 3, scale: 0.72 },
      delay: 0.38,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[750px] md:min-h-[880px] bg-[#FAF9F6] flex items-center justify-center overflow-hidden select-none py-24"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
      `}</style>

      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#DBD6C9 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* CENTER STAGE: Monthly Recap with Figma Selection Box */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Top handwritten script: side quests + */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-1 flex items-center gap-1.5"
        >
          <span className="font-cursive text-2xl md:text-3xl text-[#C779A6] tracking-wide font-bold">
            side quests
          </span>
          <span className="text-[#3F7552] text-xl font-bold font-sans">+</span>
        </motion.div>

        {/* Big Word: "monthly" */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-[#1F1E1D] tracking-tight lowercase leading-none"
        >
          monthly
        </motion.h3>

        {/* Big Word: "recap" with selection bounding box and 8 handles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-2 px-6 py-2 inline-block cursor-pointer group"
          onClick={() => setBurstKey((k) => k + 1)}
          title="Click to replay burst animation"
        >
          {/* Bounding Box Border */}
          <div className="absolute inset-0 border border-neutral-800 pointer-events-none" />

          {/* 8 Transform Handles */}
          {/* Corners */}
          <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />
          {/* Middle edges */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />
          <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-2.5 bg-white border border-neutral-800" />

          {/* Mouse pointer cursor attached to bottom right handle */}
          <div className="absolute -bottom-3 -right-6 pointer-events-none">
            <svg
              className="w-5 h-5 text-neutral-800 fill-neutral-800 drop-shadow-xs"
              viewBox="0 0 24 24"
            >
              <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.428v-20.549z" />
            </svg>
          </div>

          <h3 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#1F1E1D] tracking-tight lowercase leading-none">
            recap
          </h3>
        </motion.div>

        {/* Small hint label */}
        <p className="mt-4 text-[10px] font-mono text-neutral-400 uppercase tracking-widest opacity-70">
          (scroll to burst • drag items freely)
        </p>
      </div>

      {/* SURROUNDING SCATTERED ITEMS: Emerging/Bursting from the Center */}
      {items.map((item) => {
        const targetPos = isMobile ? item.mobile : item.desktop;

        return (
          <motion.div
            key={`${item.id}-${burstKey}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            className="absolute z-20 cursor-grab active:cursor-grabbing flex flex-col items-center"
            // Start from the exact center ("monthly recap")
            initial={{
              x: 0,
              y: 0,
              scale: 0.05,
              opacity: 0,
              rotate: 0,
            }}
            // Animate outwards when section is in view
            animate={
              isInView
                ? {
                    x: targetPos.x,
                    y: targetPos.y,
                    scale: targetPos.scale,
                    opacity: 1,
                    rotate: targetPos.rotate,
                  }
                : {
                    x: 0,
                    y: 0,
                    scale: 0.05,
                    opacity: 0,
                    rotate: 0,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 65,
              damping: 12,
              mass: 0.8,
              delay: item.delay,
            }}
            whileHover={{
              scale: (targetPos.scale || 1) * 1.08,
              rotate: 0,
              zIndex: 40,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: (targetPos.scale || 1) * 0.95 }}
          >
            {/* The Image Element */}
            <div
              className={`transition-all duration-300 ${
                item.isPhoto
                  ? 'bg-white p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-neutral-200/80 rounded-xs'
                  : 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]'
              } ${item.isRamen ? 'border-amber-700/30' : ''}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                className={`pointer-events-none select-none object-contain ${
                  item.id === 'mountains' || item.id === 'survival' || item.id === 'ramen'
                    ? 'w-36 sm:w-44 md:w-48 h-auto'
                    : item.id === 'chef'
                    ? 'w-32 sm:w-36 md:w-44 h-auto'
                    : item.id === 'pinkFolder' || item.id === 'blueFolder'
                    ? 'w-28 sm:w-32 md:w-36 h-auto'
                    : 'w-32 sm:w-36 md:w-40 h-auto'
                }`}
              />
            </div>

            {/* Label below the item */}
            {item.label && (
              <span className="mt-2 text-[11px] sm:text-xs font-mono font-medium text-[#4D4940] tracking-tight bg-white/75 px-2 py-0.5 rounded-full border border-neutral-200/50 shadow-2xs backdrop-blur-xs">
                {item.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}

