// src/pages/VisitorGallery.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Shuffle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VisitorGallery() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [statsOpen, setStatsOpen] = useState(false);

  const themes = {
    blue: "#1594A8",
    green: "#238C48",
    pink: "#BE5B83",
    orange: "#CC7A35",
  };

  useEffect(() => {
    const savedCards =
      JSON.parse(
        localStorage.getItem("visitorCards")
      ) || [];

    setCards(savedCards);
  }, []);

  const shuffleCards = () => {
    setCards((prev) =>
      [...prev].sort(
        () => Math.random() - 0.5
      )
    );
  };

  const latestVisitor =
    cards.length > 0
      ? cards[0].name
      : "None";

  const colorCounts = cards.reduce(
    (acc, card) => {
      acc[card.theme] =
        (acc[card.theme] || 0) + 1;
      return acc;
    },
    {}
  );

  const mostUsedColor =
    Object.keys(colorCounts).length > 0
      ? Object.keys(colorCounts).reduce(
        (a, b) =>
          colorCounts[a] >
            colorCounts[b]
            ? a
            : b
      )
      : "None";

  return (
    <div className="min-h-screen bg-[#efede8] px-6 md:px-12 xl:px-16 pt-16 pb-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
        <div>
          <h1 className="font-serif text-[56px] md:text-[72px] leading-none text-[#232323]">
            Visitor Gallery
          </h1>

          <p className="mt-8 text-[18px] md:text-[22px] tracking-[4px] uppercase text-[#68707b]">
            Add a doodle to join the gallery
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() =>
              navigate("/visitor-pass")
            }
            className="bg-[#e7decd] hover:bg-[#ddd3c1] transition-all rounded-md px-5 py-3 flex items-center gap-3 text-[18px] tracking-[3px] text-[#7c786f]"
          >
            EDIT MY CARD
            <Pencil size={22} />
          </button>

          <button
            onClick={shuffleCards}
            className="bg-[#e7decd] hover:bg-[#ddd3c1] transition-all rounded-md px-5 py-3 flex items-center gap-3 text-[18px] tracking-[3px] text-[#7c786f]"
          >
            SHUFFLE
            <Shuffle size={22} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-14">
        <button
          onClick={() =>
            setStatsOpen(!statsOpen)
          }
          className="w-full bg-[#e7decd] rounded-md px-5 py-4 flex justify-between items-center text-[18px] md:text-[20px] tracking-[4px] text-[#7c786f]"
        >
          <span>STATS FOR NERDS</span>

          {statsOpen ? (
            <ChevronUp size={22} />
          ) : (
            <ChevronDown size={22} />
          )}
        </button>

        <AnimatePresence>
          {statsOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="overflow-hidden"
            >
              <div className="bg-[#e7decd]/50 rounded-b-md p-6 text-[#666] mt-1">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm uppercase opacity-70">
                      Total Visitors
                    </p>
                    <h3 className="text-3xl mt-2">
                      {cards.length}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm uppercase opacity-70">
                      Most Used Color
                    </p>
                    <h3 className="text-3xl mt-2 capitalize">
                      {mostUsedColor}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm uppercase opacity-70">
                      Latest Visitor
                    </p>
                    <h3 className="text-3xl mt-2">
                      {latestVisitor}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {cards.length === 0 && (
        <div className="mt-24 text-center">
          <h2 className="text-3xl text-[#666]">
            No visitor cards yet.
          </h2>

          <p className="mt-3 text-[#888]">
            Create your first visitor pass.
          </p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.2,
            }}
            className="relative h-[265px] rounded-[28px] overflow-hidden text-white"
            style={{
              backgroundColor:
                themes[card.theme] ||
                themes.blue,
            }}
          >
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,.9) 1.5px, transparent 1.5px)",
                backgroundSize:
                  "12px 12px",
              }}
            />

            {/* Doodle */}
            {card.doodle && (
              <img
                src={card.doodle}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
              />
            )}

            {/* Content */}
            <div className="relative z-20 p-7 h-full">
              <h2 className="font-serif text-[34px]">
                Megan's World
              </h2>

              <div className="mt-7">
                <p className="text-white/60 text-xs tracking-[2px]">
                  VISITOR
                </p>

                <h3 className="mt-2 text-[18px] tracking-[2px] uppercase">
                  {card.name}
                </h3>
              </div>

              <div className="mt-5">
                <p className="text-white/60 text-xs tracking-[2px]">
                  ISSUED ON
                </p>

                <p className="mt-2 text-[18px] tracking-[2px]">
                  {card.date}
                </p>
              </div>

              <div className="absolute bottom-8 left-7 right-7 flex items-center justify-between">
                <p className="text-white/45 text-sm">
                  NO. {String(card.id).slice(-4)}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    X
                  </span>

                  <div className="w-[120px] border-b border-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}