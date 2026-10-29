import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kattalyxLogo from "../assets/kattalyx_logo.png";
import curioSvg from "../assets/curio.svg";

const experiences = [
  {
    id: 1,
    company: "Kattalyx Labs",
    role: "Full-Stack Web Developer",
    type: "Job",
    duration: "Jan 2026 – Present",
    location: "Remote",
    logoSrc: kattalyxLogo,
    logoAlt: "Kattalyx Labs Logo",
    desc: "Developed full-stack web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver scalable solutions.",
  },
  {
    id: 2,
    company: "Curio.ai",
    role: "Frontend Developer",
    type: "Internship",
    duration: "July 2025 – October 2025",
    location: "Remote",
    logoSrc: curioSvg,
    logoAlt: "Curio.ai Logo",
    desc: "Designed and delivered end-to-end digital products for startups and indie makers — from landing pages to full app flows.",
  },
  {
    id: 3,
    company: "GemBank",
    role: "Frontend Developer",
    type: "Internship",
    duration: "2025 – 2025",
    location: "On-site",
    logoIcon: "💎",
    logoAlt: "GemBank Logo",
    desc: "Built multiple full-stack projects using React, Node.js and MongoDB. Focused on real-world problem solving and clean UI implementation.",
  },
];

const WorkRow = ({ item, index, isLast }) => {
  const serialNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative pl-8 sm:pl-10 pb-12 ${!isLast ? "border-l-2 border-[#E5E0D8]" : ""}`}
    >
      {/* Timeline Indicator Dot */}
      <div className="absolute -left-[9px] top-1.5 flex items-center justify-center">
        <span className="w-4 h-4 rounded-full bg-[#FAF9F6] border-2 border-[#E25C1D] shadow-sm flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E25C1D]" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Header Row: Left (Role & Company) vs Right (Duration, Type, Location, Serial No) */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

          {/* Left Side: Role (Top) & Company (Directly below Role) */}
          <div className="flex flex-col">
            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2B2A27] leading-snug">
              {item.role}
            </h4>

            <div className="flex items-center gap-2 mt-1">
              {item.logoSrc ? (
                <img
                  src={item.logoSrc}
                  alt={item.logoAlt || item.company}
                  className="w-5 h-5 object-contain rounded shrink-0"
                />
              ) : item.logoIcon ? (
                <span className="w-5 h-5 rounded bg-white/70 border border-[#DBD6C9] flex items-center justify-center text-xs shrink-0">
                  {item.logoIcon}
                </span>
              ) : null}
              <span className="text-base font-bold text-[#E25C1D] tracking-tight">
                {item.company}
              </span>
            </div>
          </div>

          {/* Right Side: Meta Info */}
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 sm:gap-1 text-right shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#968F7F]">
                NO. {serialNumber}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7667] bg-[#EFECE3] px-2.5 py-0.5 rounded-full border border-[#DBD6C9]">
                {item.type}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#7C7667]">
              <span>{item.duration}</span>
              <span className="text-[#968F7F]">•</span>
              <span className="font-sans">{item.location}</span>
            </div>
          </div>

        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#635F55] leading-relaxed max-w-3xl mt-1 font-normal">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function WorkSection() {
  const [filter] = useState("All");

  const filtered = experiences.filter((e) => filter === "All" || e.type === filter);

  return (
    <section
      id="work"
      className="w-full bg-[#FAF9F6] py-24 px-6 md:px-12 relative overflow-hidden select-none font-sans"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
      `}</style>

      {/* Subtle dotted background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "radial-gradient(#E5E0D8 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="mb-2 flex w-fit items-center gap-1.5 text-[#E25C1D]">
            <span className="w-2 h-2 rounded-full bg-[#E25C1D] inline-block" />
            <p className="uppercase text-xs font-bold tracking-widest font-mono">
              Experience &amp; Career
            </p>
          </div>

          <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2D2D2D] leading-[1.15] uppercase">
            Where I've{" "}
            <span className="font-cursive text-[#E25C1D] normal-case text-4xl md:text-[54px] ml-1">
              worked &amp; grown.
            </span>
          </h2>
        </div>

        {/* Vertical Timeline List */}
        <div className="ml-2 sm:ml-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <WorkRow
                key={item.id}
                item={item}
                index={index}
                isLast={index === filtered.length - 1}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}