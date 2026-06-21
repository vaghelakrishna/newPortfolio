import React from 'react';
import { motion } from 'framer-motion';
import meImg from '../assets/me.png';

const Sticky = ({ children, color = '#FFF9C4', rotate = 0 }) => (
  <div style={{
    backgroundColor: color,
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    lineHeight: 1.35,
    color: '#1a1a1a',
    padding: '14px 16px',
    minWidth: 148,
    maxWidth: 185,
    boxShadow: '3px 5px 16px rgba(0,0,0,0.22)',
    transform: `rotate(${rotate}deg)`,
    whiteSpace: 'pre-line',
  }}>
    {children}
  </div>
);

const D = ({ style, children }) => (
  <motion.div
    drag
    dragMomentum={false}
    dragElastic={0}
    whileDrag={{ scale: 1.07, zIndex: 100 }}
    style={{ position: 'absolute', cursor: 'grab', zIndex: 20, ...style }}
  >
    {children}
  </motion.div>
);

export default function HeroBoard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#E8501A', userSelect: 'none' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Archivo+Black&display=swap');`}</style>

      {/* CENTER TITLE — not draggable */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
        <p style={{ fontFamily: 'Caveat,cursive', color: 'rgba(255,255,255,0.88)', fontSize: 22, margin: '0 0 4px' }}>Hey! I'm Krishna</p>
        <h1 style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 'clamp(58px,9vw,110px)', color: 'white', lineHeight: 1, textAlign: 'center', textTransform: 'uppercase', margin: 0 }}>
          UI/UX<br />DESIGNER
        </h1>
        <p style={{ fontFamily: 'Caveat,cursive', color: 'rgba(255,255,255,0.82)', fontSize: 19, marginTop: 18, textAlign: 'center', maxWidth: 400, lineHeight: 1.5 }}>
          Currently designing for <b>startups & products</b><br />
          Previously worked at <b>Kattalyx</b>
        </p>
      </div>

      {/* Sticky: top-left */}
      <D style={{ top: '15%', left: '4%' }}>
        <Sticky rotate={-2}>{'Why does the\ndev build\nlook...different? :)'}</Sticky>
      </D>

      {/* Sticky: bottom-left */}
      <D style={{ top: '58%', left: '3%' }}>
        <Sticky rotate={1.5}>{'I pick fonts like\npeople pick\nbaby names.'}</Sticky>
      </D>

      {/* Sticky: top-right */}
      <D style={{ top: '10%', right: '5%' }}>
        <Sticky rotate={-1}>{'Color palettes >\ntherapy\nsometimes'}</Sticky>
      </D>

      {/* Sticky: bottom-right */}
      <D style={{ top: '60%', right: '4%' }}>
        <Sticky rotate={2} color="#FFE082">{'Yes, you can\nmove\neverything! ✦'}</Sticky>
      </D>

      {/* Sticky: bottom-center */}
      <D style={{ top: '65%', left: '52%' }}>
        <Sticky rotate={1} color="#FFE082">{"Talked to devs.\nCan't do this :("}</Sticky>
      </D>

      {/* Handwritten note top */}
      <D style={{ top: '8%', left: '33%' }}>
        <div style={{ fontFamily: 'Caveat,cursive', color: '#1a1a2e', fontSize: 19, maxWidth: 160, lineHeight: 1.3 }}>
          building products<br />for 2+ years
          <svg viewBox="0 0 90 45" width="90" height="45" style={{ display: 'block' }}>
            <path d="M10,8 Q45,40 80,20" stroke="#1a1a2e" strokeWidth="2.5" fill="none" />
            <polygon points="77,14 84,22 72,24" fill="#1a1a2e" />
          </svg>
        </div>
      </D>

      {/* Handwritten note right */}
      <D style={{ top: '40%', right: '8%' }}>
        <div style={{ fontFamily: 'Caveat,cursive', color: 'rgba(255,255,255,0.9)', fontSize: 17, maxWidth: 170, lineHeight: 1.4 }}>
          designing things<br />people actually use
          <svg viewBox="0 0 80 35" width="80" height="35" style={{ display: 'block' }}>
            <path d="M70,6 Q40,28 8,18" stroke="rgba(255,255,255,0.85)" strokeWidth="2" fill="none" />
            <polygon points="10,12 5,20 16,20" fill="rgba(255,255,255,0.85)" />
          </svg>
        </div>
      </D>

      {/* Polaroid photo */}
      <D style={{ top: '58%', left: '42%' }}>
        <div style={{ background: 'white', padding: '8px 8px 28px 8px', boxShadow: '4px 6px 22px rgba(0,0,0,0.28)', transform: 'rotate(-2deg)', width: 124 }}>
          <img src={meImg} alt="Krishna" style={{ width: '100%', height: 116, objectFit: 'cover', display: 'block' }} />
        </div>
      </D>

    </div>
  );
}
