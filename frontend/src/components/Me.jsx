import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import meImg from '../assets/me.png';

const DragItem = ({ children, className, style, constraintsRef }) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    dragElastic={0.08}
    whileDrag={{ scale: 1.05, zIndex: 50 }}
    className={`absolute cursor-grab active:cursor-grabbing select-none ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const StickyNote = ({ children, className, style, constraintsRef, color = '#FFF9C4' }) => (
  <DragItem constraintsRef={constraintsRef} className={className} style={style}>
    <div
      className="p-4 shadow-lg rounded-sm min-w-[140px] max-w-[180px]"
      style={{ backgroundColor: color, fontFamily: "'Caveat', cursive", fontSize: '18px', lineHeight: 1.3, color: '#1a1a1a' }}
    >
      {children}
    </div>
  </DragItem>
);

export default function Me() {
  const constraintsRef = useRef(null);

  return (
    <div
      ref={constraintsRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: '100vh', backgroundColor: '#E8501A' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Archivo+Black&display=swap');`}</style>

      {/* ── CENTER TITLE (fixed, not draggable) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <p className="text-white/80 text-sm tracking-widest mb-1" style={{ fontFamily: 'Caveat, cursive', fontSize: '20px' }}>
          Hey! I'm Krishna
        </p>
        <h1
          className="text-white text-center leading-none font-black uppercase"
          style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(64px, 10vw, 120px)', textShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
        >
          UI/UX<br />DESIGNER
        </h1>
        <p className="text-white/80 text-center mt-6 text-sm max-w-sm leading-relaxed" style={{ fontFamily: 'Caveat, cursive', fontSize: '18px' }}>
          Currently designing for <strong>startups & products</strong><br />
          Previously worked at <strong>Kattalyx</strong>
        </p>
      </div>

      {/* ── DRAGGABLE: Photo ── */}
      <DragItem
        constraintsRef={constraintsRef}
        className="z-20"
        style={{ bottom: '12%', left: '36%' }}
      >
        <div className="bg-white p-2 pb-6 shadow-xl rotate-[-2deg]" style={{ width: 130 }}>
          <img src={meImg} alt="Krishna" className="w-full object-cover" style={{ height: 130 }} />
        </div>
      </DragItem>

      {/* ── DRAGGABLE: Sticky 1 ── */}
      <StickyNote
        constraintsRef={constraintsRef}
        className="z-20"
        style={{ top: '18%', left: '5%' }}
        color="#FFF9C4"
      >
        Why does the<br />dev build<br />look...different? :)
      </StickyNote>

      {/* ── DRAGGABLE: Sticky 2 ── */}
      <StickyNote
        constraintsRef={constraintsRef}
        className="z-20 rotate-[2deg]"
        style={{ bottom: '18%', left: '4%' }}
        color="#FFF9C4"
      >
        I pick fonts like<br />people pick<br />baby names.
      </StickyNote>

      {/* ── DRAGGABLE: Sticky 3 ── */}
      <StickyNote
        constraintsRef={constraintsRef}
        className="z-20 rotate-[-1deg]"
        style={{ top: '14%', right: '5%' }}
        color="#FFF9C4"
      >
        Color<br />palettes {'>'}<br />therapy<br />sometimes
      </StickyNote>

      {/* ── DRAGGABLE: Sticky 4 ── */}
      <StickyNote
        constraintsRef={constraintsRef}
        className="z-20 rotate-[2deg]"
        style={{ bottom: '16%', right: '4%' }}
        color="#FFF9C4"
      >
        Yes, you can<br />move<br />everything! ✦
      </StickyNote>

      {/* ── DRAGGABLE: Handwritten note top ── */}
      <DragItem
        constraintsRef={constraintsRef}
        className="z-20"
        style={{ top: '12%', left: '30%' }}
      >
        <div style={{ fontFamily: 'Caveat, cursive', color: '#1a1a1a', fontSize: '18px', maxWidth: 160, lineHeight: 1.3 }}>
          building products<br />for 2+ years
          <svg viewBox="0 0 80 40" width="80" height="40" style={{ display: 'block', marginTop: 4 }}>
            <path d="M10,10 Q30,35 70,20" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <polygon points="68,15 75,22 62,24" fill="#1a1a1a" />
          </svg>
        </div>
      </DragItem>

      {/* ── DRAGGABLE: Sticky 5 bottom center ── */}
      <StickyNote
        constraintsRef={constraintsRef}
        className="z-20 rotate-[1deg]"
        style={{ bottom: '12%', left: '50%' }}
        color="#FFE082"
      >
        Talked to<br />devs. Can't<br />do this :&#40;
      </StickyNote>

      {/* ── DRAGGABLE: handwritten note right ── */}
      <DragItem
        constraintsRef={constraintsRef}
        className="z-20"
        style={{ bottom: '35%', right: '12%' }}
      >
        <div style={{ fontFamily: 'Caveat, cursive', color: 'white', fontSize: '16px', maxWidth: 160, lineHeight: 1.4, opacity: 0.9 }}>
          making things look<br />good since forever
          <svg viewBox="0 0 80 35" width="80" height="35" style={{ display: 'block' }}>
            <path d="M70,5 Q40,30 5,20" stroke="white" strokeWidth="2" fill="none" />
            <polygon points="8,15 3,23 14,22" fill="white" />
          </svg>
        </div>
      </DragItem>

    </div>
  );
}
