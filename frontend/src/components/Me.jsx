import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function InteractiveHero() {
  const constraintsRef = useRef(null);

  // Custom cursor ke coordinates ke liye state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse movement track karne ke liye handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Agar aapka hero section page ke top par hai, toh e.clientX aur e.clientY perfectly kaam karenge
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={constraintsRef}
      // group aur cursor-none lagaya hai taaki original cursor gayab ho jaye aur custom cursor hover par dikhe
      className="relative w-full min-h-screen bg-[#F9F6F0] overflow-hidden p-8 select-none cursor-none group"
      style={{
        backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >

      {/* ========================================================
          CUSTOM CURSOR (Sirf isi section me dikhega)
          ======================================================== */}
      <div
        className="fixed pointer-events-none z-50 hidden group-hover:flex items-center justify-center bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-200/80 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-10px, -50%)', // Cursor se halka sa offset taaki readable rahe
        }}
      >
        <span className="text-[10px] font-bold text-gray-500 tracking-wider mr-2 uppercase">
          Scroll Down
        </span>
        {/* Chota orange diamond block */}
        <div className="w-2.5 h-2.5 bg-[#E05C1A] rotate-45 rounded-[1px]" />
      </div>

      {/* ========================================================
          1. STATIC LEFT ID CARD (Permanently fixed)
          ======================================================== */}
      <div
        className="absolute left-12 top-1/2 -translate-y-1/2 w-[340px] drop-shadow-2xl z-10 select-none"
      >
        <img
          src="/src/assets/krishna-id.png"
          alt="Krishna ID Card"
          className="w-full h-auto object-contain pointer-events-none"
        />
      </div>

      {/* ========================================================
          2. DRAGGABLE: MY CURRENT TO DO LIST (Middle Top)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        className="absolute top-12 left-[420px] w-[280px] z-20"
      >
        <span className="block mb-2 text-sm font-semibold text-gray-700">🔸 My current to do list</span>
        <div className="relative bg-white rounded-xl shadow-md border border-gray-200 p-6 pt-10 min-h-[200px]">
          <div className="flex flex-col gap-4 text-xs font-medium text-gray-700">
            <div className="flex items-start gap-2">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-orange-500 rounded" />
              <span>Deploy Blubeez feature updates</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-orange-500 rounded" />
              <span>Map user flows for upcoming sprint features</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-orange-500 rounded" />
              <span>Work on community garden</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-orange-500 rounded" />
              <span>Finish up case studies - portfolio</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          3. DRAGGABLE: WHAT DO I WORK ON? (Mac Window - Middle Bottom)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        className="absolute bottom-12 left-[420px] w-[340px] z-20"
      >
        <span className="block mb-2 text-sm font-semibold text-gray-700">😊 What do i work on?</span>
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-1.5 border-b border-gray-200">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
            <span className="w-3 h-3 rounded-full bg-[#27C93F]"></span>
            <span className="text-[11px] text-gray-400 mx-auto font-mono pr-10">krishna's work</span>
          </div>
          <div className="p-4 grid grid-cols-3 gap-4 text-center text-[11px] font-semibold text-gray-600 bg-[#F6F6F6] min-h-[160px]">
            {[
              { name: 'Visual design', color: 'text-sky-400' },
              { name: 'Design Systems', color: 'text-indigo-400' },
              { name: 'Website design', color: 'text-amber-400' },
              { name: 'Branding', color: 'text-emerald-400' },
              { name: 'UI & UX', color: 'text-purple-400' }
            ].map((folder) => (
              <div key={folder.name} className="flex flex-col items-center gap-1 p-1 rounded hover:bg-gray-200 transition-colors">
                <svg className={`w-10 h-10 ${folder.color}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className="leading-tight px-1">{folder.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          4. DRAGGABLE: WHERE AM I FROM? (Stamp - Top Right)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        className="absolute top-12 right-24 w-[180px] z-20"
      >
        <span className="block mb-2 text-sm font-semibold text-gray-700">Where am i from? ✨</span>
        <div className="bg-white border-4 border-dashed border-emerald-700 rounded-lg p-4 shadow-md text-emerald-800 font-mono flex flex-col justify-between min-h-[140px]">
          <div className="text-[10px] flex justify-between opacity-80 border-b border-emerald-200 pb-1">
            <span>Jun 4</span>
            <span>12:05:01</span>
          </div>
          <div className="mt-4">
            <span className="text-xs block font-sans opacity-70 uppercase tracking-wider">India</span>
            <span className="text-2xl font-bold tracking-tight block text-emerald-900">Bangalore</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          5. DRAGGABLE: EXPERIENCE NOTES (Bottom Right)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.05 }}
        className="absolute bottom-16 right-24 w-[280px] z-20"
      >
        <span className="block mb-2 text-sm font-semibold text-gray-700">Since when? 💡</span>
        <div className="bg-amber-50 rounded-lg shadow-lg border-t-4 border-amber-400 p-6 min-h-[150px] relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-6 bg-gray-400 rounded-md opacity-40 shadow-inner"></div>
          <div className="flex flex-col justify-start text-left">
            <h3 className="text-3xl font-extrabold text-orange-600 font-sans tracking-tight">3+ Years</h3>
            <p className="text-xs text-gray-600 font-semibold mt-3 leading-relaxed tracking-wide">
              Consumer, fintech, Conversational AI, ed tech
            </p>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          6. FIXED INTERACTIVE CALL TO ACTION (Bottom Center)
          ======================================================== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button className="px-6 py-2.5 border-2 border-orange-500 bg-white text-orange-600 rounded-lg text-sm font-bold shadow-md hover:bg-orange-600 hover:text-white transition-all uppercase tracking-wider active:scale-95">
          Download Resume ↓
        </button>
      </div>

    </div>
  );
}