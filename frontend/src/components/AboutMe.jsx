import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignLeft, List } from "lucide-react";

const storyParagraphs = [
  {
    full: `It all started in 2011 when my dad brought home a Samsung Galaxy S2. I was just a curious kid, spending hours exploring the Play Store, downloading random apps just to see how they looked and felt. I didn't know the words for it back then, but I was falling in love with product design.`,
    highlight: `I was falling in love with product design.`,
  },
  {
    full: `Before screens took over, I was obsessed with cars and photography (for a very long time, I actually wanted to be an automobile designer). I loved how a car looked fast even when standing still, or how a photo could freeze a feeling forever. That love for aesthetics and mechanics never really left—it just shifted from engines to interfaces.`,
    highlight: `That love for aesthetics and mechanics never really left—it just shifted from engines to interfaces.`,
  },
  {
    full: `During the lockdown, I finally connected the dots. I realized that building digital products combined everything I loved: how things work, how they look, and how they make people feel. Now at CRED, previously at District by Zomato, I get to do exactly that every day. And it just began.`,
    highlight: `how things work, how they look, and how they make people feel.`,
  },
];

export default function AboutSection() {
  const [mode, setMode] = useState("story");

  const tabs = [
    { id: "story", label: "Story", icon: <AlignLeft size={15} /> },
    { id: "tldr", label: "TL;DR", icon: <List size={15} /> },
  ];

  return (
    <section className="w-full min-h-screen flex items-center bg-[#FAFAF8] text-[#111] py-16 px-6 sm:px-10 lg:px-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Big Editorial Heading & Toggle */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-black">
              A little <br /> about me
            </h2>

            {/* Toggle Switch */}
            <div className="inline-flex items-center gap-1 bg-[#ECECE9] p-1.5 rounded-full border border-black/5 shadow-inner">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${mode === tab.id
                      ? "bg-white text-black shadow-sm"
                      : "text-neutral-500 hover:text-black"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Editorial Content */}
          <div className="lg:col-span-7 relative p-6 sm:p-10 lg:p-12">

            {/* Top-Right Decorative Bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neutral-400 pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* STORY MODE */}
              {mode === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {storyParagraphs.map((item, index) => (
                    <p
                      key={index}
                      className="text-lg sm:text-xl lg:text-[1.28rem] leading-[1.75] font-light text-neutral-800"
                    >
                      {item.full}
                    </p>
                  ))}
                </motion.div>
              )}

              {/* TL;DR MODE */}
              {mode === "tldr" && (
                <motion.div
                  key="tldr"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {storyParagraphs.map((item, index) => {
                    const parts = item.full.split(item.highlight);
                    return (
                      <p
                        key={index}
                        className="text-lg sm:text-xl lg:text-[1.28rem] leading-[1.75] font-light"
                      >
                        <span className="text-neutral-300 transition-colors duration-300">
                          {parts[0]}
                        </span>
                        <span className="text-black font-semibold underline decoration-neutral-300 underline-offset-4 decoration-2">
                          {item.highlight}
                        </span>
                        <span className="text-neutral-300 transition-colors duration-300">
                          {parts[1]}
                        </span>
                      </p>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Handwritten Signature Tagline */}
            <div className="mt-10 pt-4">
              <span className="font-serif italic text-base sm:text-lg text-neutral-600 tracking-wide">
                i design for humans, craft is just my playground.
              </span>
            </div>

            {/* Bottom-Left Decorative Bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neutral-400 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}