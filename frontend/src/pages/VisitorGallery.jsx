import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Shuffle, ChevronDown } from "lucide-react";
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
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative h-[280px] rounded-[20px] overflow-hidden text-white cursor-pointer"
      style={{ backgroundColor: themes[card.theme] || themes.blue }}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Doodle drawing */}
      {card.doodle && (
        <img
          src={card.doodle}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-80"
        />
      )}

      {/* Card content */}
      <div className="relative z-20 p-6 h-full flex flex-col justify-between">
        <div>
          <h2 className="font-serif text-[28px] leading-tight">Megan's World</h2>

          <div className="mt-5">
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

export default function VisitorGallery() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [statsOpen, setStatsOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("visitorCards")) || [];
    setCards(saved);
  }, []);

  const shuffleCards = () => setCards(prev => [...prev].sort(() => Math.random() - 0.5));

  const colorCounts = cards.reduce((acc, c) => { acc[c.theme] = (acc[c.theme] || 0) + 1; return acc; }, {});
  const mostUsedColor = Object.keys(colorCounts).length > 0
    ? Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b)
    : "None";

  return (
    <div className="min-h-screen bg-[#efede8] px-6 md:px-12 xl:px-16 pt-12 pb-24 font-mono">

      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-4">
        <div className="flex items-baseline gap-5 flex-wrap">
          <h1 className="font-serif text-[52px] md:text-[64px] leading-none text-[#232323] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Visitor Gallery
          </h1>
          <span className="text-[11px] tracking-[4px] uppercase text-[#8a8a80] mt-2">
            Add a doodle to join the gallery
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0 mt-3">
          <button
            onClick={() => navigate("/visitor-pass")}
            className="bg-[#e8e3d9] hover:bg-[#ddd5c5] transition-all rounded-md px-5 py-3 flex items-center gap-2 text-[11px] tracking-[3px] text-[#7c786f] uppercase border border-[#d4cfc5]"
          >
            EDIT MY CARD <Pencil size={14} />
          </button>
          <button
            onClick={shuffleCards}
            className="bg-[#e8e3d9] hover:bg-[#ddd5c5] transition-all rounded-md px-5 py-3 flex items-center gap-2 text-[11px] tracking-[3px] text-[#7c786f] uppercase border border-[#d4cfc5]"
          >
            SHUFFLE <Shuffle size={14} />
          </button>
        </div>
      </div>

      {/* Orange dot */}
      <div className="flex justify-center mb-4">
        <div className="w-3 h-3 rounded-full bg-[#CC7A35]" />
      </div>

      {/* Stats bar */}
      <div className="mb-8">
        <button
          onClick={() => setStatsOpen(!statsOpen)}
          className="w-full bg-[#e8e3d9] border border-[#d4cfc5] rounded-md px-5 py-4 flex justify-between items-center text-[11px] tracking-[4px] text-[#7c786f] uppercase"
        >
          <span>Stats for nerds</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${statsOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {statsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#e8e3d9]/60 border border-t-0 border-[#d4cfc5] rounded-b-md p-6">
                <div className="grid md:grid-cols-3 gap-6 text-[#666]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Total Visitors</p>
                    <h3 className="text-3xl mt-2 font-serif">{cards.length}</h3>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Most Used Color</p>
                    <h3 className="text-3xl mt-2 font-serif capitalize">{mostUsedColor}</h3>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">Latest Visitor</p>
                    <h3 className="text-3xl mt-2 font-serif">{cards[0]?.name || "None"}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {cards.length === 0 && (
        <div className="mt-24 text-center">
          <h2 className="text-2xl text-[#888] tracking-widest">NO VISITOR CARDS YET.</h2>
          <p className="mt-3 text-[#aaa] text-sm tracking-widest">CREATE YOUR FIRST VISITOR PASS.</p>
          <button
            onClick={() => navigate("/visitor-pass")}
            className="mt-6 bg-[#1f1f1f] text-white px-8 py-3 rounded-xl text-xs tracking-[3px] hover:opacity-80 transition"
          >
            CREATE CARD →
          </button>
        </div>
      )}

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map(card => <VisitorCard key={card.id} card={card} />)}
      </div>
    </div>
  );
}
