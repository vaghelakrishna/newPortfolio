
        // {/* Content */}
        // <div className="max-w-5xl">
        //   <p className="text-[32px] leading-[1.9] text-[#4D4D4D]">
        //     It all started in 2011 when my dad brought home a Samsung Galaxy
        //     S2. I was just a curious kid, spending hours exploring the Play
        //     Store, downloading random apps just to see how they looked and
        //     felt. I didn't know the words for it back then, but I was falling
        //     in love with <HighlightWord>product design</HighlightWord>.
        //   </p>

        //   <p className="mt-12 text-[32px] leading-[1.9] text-[#4D4D4D]">
        //     Before screens took over, I was obsessed with cars and
        //     photography. I loved how a car looked fast even when standing
        //     still, or how a photo could freeze a feeling forever.
        //   </p>

        //   <p className="mt-12 text-[32px] leading-[1.9] text-[#4D4D4D]">
        //     During the lockdown, I finally connected the dots. I realized that
        //     building digital products combined everything I loved.
        //     Now at <HighlightWord>CRED</HighlightWord>, previously at{" "}
        //     <HighlightWord>District by Zomato</HighlightWord>, I get to do
        //     exactly that every day.
        //   </p>
        // </div>
     



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlignLeft,
  List,
  CalendarDays,
} from "lucide-react";

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

const timeline = [
  {
    year: "2011",
    title: "First Android Phone",
    description: "Discovered the world of apps through Samsung Galaxy S2.",
  },
  {
    year: "2015",
    title: "Cars & Photography",
    description: "Obsessed with aesthetics, mechanics and visual storytelling.",
  },
  {
    year: "2020",
    title: "Found Product Design",
    description: "Connected creativity, technology and human psychology.",
  },
  {
    year: "2022",
    title: "Started Designing",
    description: "Worked on real products and interfaces.",
  },
  {
    year: "Today",
    title: "Building Experiences",
    description: "Designing systems that think before they act.",
  },
];

export default function AboutSection() {
  const [mode, setMode] = useState("story");

  const tabs = [
    {
      id: "story",
      label: "Story",
      icon: <AlignLeft size={16} />,
    },
    {
      id: "tldr",
      label: "TL;DR",
      icon: <List size={16} />,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: <CalendarDays size={16} />,
    },
  ];

  return (
    <section className="w-full bg-[#F7F7F4] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <span className="uppercase tracking-[0.2em] text-sm text-gray-500">
            About
          </span>

          <div className="flex items-center gap-1 bg-[#ECECEA] p-1 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm transition-all duration-300 ${mode === tab.id
                  ? "bg-white shadow-sm text-black"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* STORY MODE */}
          {mode === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10 max-w-6xl"
            >
              {storyParagraphs.map((item, index) => (
                <p
                  key={index}
                  className="text-xl md:text-[1rem] leading-[1.8] text-[#444]"
                >
                  {item.full}
                </p>
              ))}
            </motion.div>
          )}

          {/* TLDR MODE */}
          {mode === "tldr" && (
            <motion.div
              key="tldr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10 max-w-6xl"
            >
              {storyParagraphs.map((item, index) => {
                const fadedText = item.full.replace(
                  item.highlight,
                  ""
                );

                return (
                  <p
                    key={index}
                    className="text-xl md:text-[1rem] leading-[1.8]"
                  >
                    <span className="text-[#CFCFCF]">
                      {fadedText}
                    </span>{" "}
                    <span className="text-[#222] font-medium">
                      {item.highlight}
                    </span>
                  </p>
                );
              })}
            </motion.div>
          )}

          {/* TIMELINE MODE */}
          {mode === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl"
            >
              <div className="border-l-2 border-gray-200 ml-4">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-10 pb-12"
                  >
                    <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-black" />

                    <span className="text-sm text-gray-400">
                      {item.year}
                    </span>

                    <h3 className="text-xl font-semibold mt-1 text-[#222]">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}


const HighlightWord = ({ children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="bg-[#F7E89C] px-2 py-1 rounded border border-[#E5D77F]">
        {children}
      </span>

      {hovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 -top-10 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-lg"
        >
          You
        </motion.div>
      )}
    </span>
  );
};