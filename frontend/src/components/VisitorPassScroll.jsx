import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const themes = {
  blue: "#1594A8",
  green: "#238C48",
  pink: "#BE5B83",
  orange: "#CC7A35",
};

function VisitorCard({ card }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="relative flex-shrink-0 w-[390px] h-[250px] rounded-[28px] overflow-hidden text-white"
      style={{ backgroundColor: themes[card.theme] || themes.blue }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Doodle */}
      {card.doodle && (
        <img
          src={card.doodle}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-80"
        />
      )}

      {/* Content */}
      <div className="relative z-20 p-5 h-full flex flex-col justify-between">
        <div>
          <h2 className="font-serif text-[28px] leading-tight">Krishna's World</h2>
          <div className="mt-4">
            <p className="text-white/60 text-[10px] tracking-[2px] uppercase font-mono">Visitor</p>
            <h3 className="mt-1 text-[15px] tracking-[2px] uppercase font-mono font-bold">{card.name}</h3>
          </div>
          <div className="mt-4">
            <p className="text-white/60 text-[10px] tracking-[2px] uppercase font-mono">Issued On</p>
            <p className="mt-1 text-[15px] font-mono">{card.date}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-xs font-mono tracking-widest">NO. {String(card.id).slice(-4)}</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">X</span>
            <div className="w-28 border-b border-white/70" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VisitorPassScroll() {
  const [cards, setCards] = useState([]);
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("visitorCards")) || [];
    setCards(saved);
  }, []);

  const onMouseDown = (e) => {
    dragRef.current = { active: true, startX: e.clientX, scrollLeft: trackRef.current.scrollLeft };
    trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - dx;
  };

  const onMouseUp = () => {
    dragRef.current.active = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  if (cards.length === 0) return null;

  return (
    <section className="w-full bg-[#efede8] py-12 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 md:px-16 mb-8">
        <div>
          <p className="text-[10px] tracking-[4px] uppercase text-[#8a8a80] font-mono">From the gallery</p>
          <h2 className="text-2xl font-serif text-[#232323] mt-1">Visitor Passes</h2>
        </div>
        <button
          onClick={() => navigate("/visitor-gallery")}
          className="text-[10px] tracking-[3px] uppercase font-mono text-[#7c786f] hover:text-[#232323] transition-colors border-b border-[#7c786f]/40 hover:border-[#232323] pb-0.5"
        >
          View All →
        </button>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 px-8 md:px-16 overflow-x-auto scrollbar-hide select-none"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {cards.map(card => (
          <VisitorCard key={card.id} card={card} />
        ))}

        {/* CTA card at end */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/visitor-pass")}
          className="flex-shrink-0 w-[390px] h-[250px] rounded-[28px] border-2 border-dashed border-[#c4bfb5] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#232323] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#e8e3d9] flex items-center justify-center text-xl">+</div>
          <p className="text-[10px] tracking-[3px] uppercase font-mono text-[#8a8a80]">Add yours</p>
        </motion.div>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}
