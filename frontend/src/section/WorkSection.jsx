import React, { useState, useEffect, useRef } from 'react';
import MacWorkWindow from '../components/MacWorkWindow';

export default function WorkSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;

      // Pure screen coordinates ko track karega trackpad view ke liye
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      // custom cursor layer activate karne ke liye default pointer hide kar diya
      className="relative w-full min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 overflow-hidden cursor-none select-none"
    >
      {/* ========================================================
          CUSTOM CURSOR 1: "OPEN" PILL CURSOR WITH ARROW
          ======================================================== */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9999] flex items-center gap-1"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(-10px, -10px)', // Cursor tip alignment fix
          }}
        >
          {/* Mac-style Default Arrow Pointer */}
          <svg className="w-4 h-4 text-gray-800 fill-current drop-shadow-sm -rotate-[15deg]" viewBox="0 0 24 24">
            <path d="M7 2l12 11.2-5.8.8 3.6 6.6-2.4 1.3-3.6-6.6-3.8 3.7z" />
          </svg>

          {/* "OPEN" Rounded Badge Pill */}
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md border border-gray-200/80 flex items-center justify-center">
            <span className="text-[10px] font-black text-gray-500 tracking-wider uppercase font-sans">
              Open
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          CENTERED MAC FINDER WINDOW CONTAINER
          ======================================================== */}
      <div className="w-full max-w-5xl z-10 flex items-center justify-center">
        <MacWorkWindow />
      </div>
    </div>
  );
}