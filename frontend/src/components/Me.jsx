import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// react-icons packages fully utilized
import { FaStar } from 'react-icons/fa';
import { BiHappyBeaming, BiCheckDouble } from 'react-icons/bi';
import { FiMapPin, FiClock, FiDownload } from 'react-icons/fi';
import { ImAttachment } from 'react-icons/im';
import { FcFolder } from 'react-icons/fc';

export default function InteractiveHero() {
  const constraintsRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={constraintsRef}
      className="relative w-full min-h-screen bg-[#F9F6F0] overflow-hidden p-0 select-none cursor-none group"
      style={{
        backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Google Font Stylesheet for Handdrawn Feel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* ========================================================
          CUSTOM CURSOR
          ======================================================== */}
      <div
        className="fixed pointer-events-none z-50 hidden group-hover:flex items-center justify-center bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-200/80 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-10px, -50%)',
        }}
      >
        <span className="text-[10px] font-bold text-gray-500 tracking-wider mr-2 uppercase font-sans-clean">
          Scroll Down
        </span>
        <div className="w-2.5 h-2.5 bg-[#E05C1A] rotate-45 rounded-[1px]" />
      </div>

      {/* ========================================================
          FIXED TOP NAVIGATION BAR
          ======================================================== */}


      {/* ========================================================
          1. MAIN ID CARD IMAGE (Exactly Centered & Focal Point)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[310px] md:w-[330px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.14)] z-30 cursor-grab active:cursor-grabbing"
      >
        <img
          src="/src/assets/krishna-id.png" 
          alt="Krishna ID Card"
          className="w-full h-auto object-contain pointer-events-none"
        />
      </motion.div>

      {/* ========================================================
          2. DRAGGABLE: MY CURRENT TO DO LIST (Top Left - Compact)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.04 }}
        className="absolute top-[23vh] left-[calc(50%-340px)] w-[210px] z-20 rotate-[-3deg] cursor-grab active:cursor-grabbing"
      >
        <div className="mb-1 text-[15px] font-bold text-[#E25C1D] font-cursive flex items-center gap-1">
          <FaStar size={11} className="text-[#E25C1D]" /> My current to do list
        </div>
        <div className="relative bg-[#FFFDF9] rounded-md shadow-lg border border-gray-200/50 p-3.5 pt-5 min-h-[150px]">
          {/* Note book binder visual */}
          <div className="absolute top-0 left-3.5 h-full w-[1px] bg-red-200/50" />
          <div className="absolute top-0 left-1 h-full w-2 flex flex-col justify-around py-3 items-center opacity-30">
            {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-gray-600 rounded-full" />)}
          </div>
          
          <div className="flex flex-col gap-2 text-[9.5px] font-semibold text-gray-700 pl-2 font-sans-clean leading-tight">
            {[
              "Deploy Blubeez feature updates",
              "Map user flows for upcoming sprint features",
              "Work on community garden",
              "Finish up case studies - portfolio"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <BiCheckDouble size={12} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="line-through opacity-40 select-none">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          3. DRAGGABLE: WHAT DO I WORK ON? (Mac Window - Bottom Left - Compact)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.04 }}
        className="absolute bottom-[16vh] left-[calc(50%-360px)] w-[230px] z-10 rotate-[2deg] cursor-grab active:cursor-grabbing"
      >
        <div className="mb-1 text-[15px] font-bold text-[#E25C1D] font-cursive flex items-center gap-1">
          <BiHappyBeaming size={13} /> What do i work on?
        </div>
        <div className="bg-white rounded-md shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="bg-gray-50 px-2.5 py-1.5 flex items-center gap-1 border-b border-gray-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]"></span>
            <span className="text-[8.5px] text-gray-400 font-mono mx-auto pr-5">Krishna's work</span>
          </div>
          <div className="p-2.5 grid grid-cols-3 gap-1.5 text-center text-[8.5px] font-bold text-gray-600 bg-[#F9F9F9] font-sans-clean">
            {[
              { name: 'Visual design' },
              { name: 'Design Systems' },
              { name: 'Website design' },
              { name: 'Branding' },
              { name: 'UI & UX' }
            ].map((folder) => (
              <div key={folder.name} className="flex flex-col items-center gap-1 p-1 rounded hover:bg-black/[0.02] transition-colors">
                <FcFolder size={20} />
                <span className="truncate w-full text-[7.5px] leading-tight text-gray-500">{folder.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          4. DRAGGABLE: WHERE AM I FROM? (Stamp - Top Right - Compact)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.04 }}
        className="absolute top-[22vh] right-[calc(50%-310px)] w-[140px] z-10 rotate-[3deg] cursor-grab active:cursor-grabbing"
      >
        <div className="mb-1 text-[15px] font-bold text-[#E25C1D] font-cursive flex items-center gap-1">
          Where am i from? <FiMapPin size={11} />
        </div>
        <div className="bg-[#FAFDFB] border-[3px] border-dashed border-[#2E5A44] rounded-sm p-2.5 shadow-md text-[#2E5A44] font-mono flex flex-col justify-between min-h-[115px]">
          <div className="text-[7.5px] font-bold flex justify-between opacity-80 border-b border-[#2E5A44]/20 pb-1">
            <span>JUN 4</span>
            <span>18:07:42</span>
          </div>
          <div className="my-auto py-1 flex justify-center text-lg opacity-15">✴</div>
          <div className="font-sans-clean">
            <span className="text-[8px] block font-bold opacity-60 uppercase tracking-widest">India</span>
            <span className="text-sm font-extrabold tracking-tight block text-[#1B3B2B] -mt-0.5">Gujarat</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          5. DRAGGABLE: EXPERIENCE NOTES (Bottom Right - Compact)
          ======================================================== */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.04 }}
        className="absolute bottom-[18vh] right-[calc(50%-320px)] w-[200px] z-20 rotate-[-2deg] cursor-grab active:cursor-grabbing"
      >
        <div className="mb-1 text-[15px] font-bold text-[#E25C1D] font-cursive flex items-center gap-1">
          Since when? <FiClock size={11} />
        </div>
        <div className="bg-[#FFFCEB] rounded-sm shadow-xl border border-amber-200/50 p-3.5 pt-4 min-h-[100px] relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-gray-400 opacity-60">
            <ImAttachment size={12} className="text-zinc-500/80 transform rotate-12" />
          </div>
          <div className="flex flex-col justify-start text-left font-sans-clean">
            <h3 className="text-xl font-extrabold text-[#E25C1D] tracking-tight">3+ Years</h3>
            <p className="text-[9px] text-gray-500 font-semibold mt-1 leading-relaxed tracking-wide">
              Consumer, fintech, Conversational AI, ed tech
            </p>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          6. FIXED DOWNLOAD RESUME BUTTON (Bottom Center)
          ======================================================== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40">
        <button className="px-5 py-2.5 border border-[#E25C1D]/30 bg-[#FFFDF9] text-[#E25C1D] rounded-full text-[10px] font-bold shadow-md hover:bg-[#E25C1D] hover:text-white hover:border-[#E25C1D] transition-all duration-200 uppercase tracking-widest active:scale-95 flex items-center gap-1.5 font-sans-clean">
          Download Resume <FiDownload size={11} />
        </button>
      </div>

    </div>
  );
}