import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kattalyxLogo from "../assets/kattalyx_logo.png";
import curioSvg from "../assets/curio.webp";

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
    duration: "July 2025 – Oct 2025",
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
    logoIcon: "",
    logoAlt: "GemBank Logo",
    desc: "Built multiple full-stack projects using React, Node.js and MongoDB. Focused on real-world problem solving and clean UI implementation.",
  },
];

export default function WorkSection() {
  const [filter, setFilter] = useState("All");

  const filtered = experiences.filter((e) => filter === "All" || e.type === filter);

  return (
    <section id="work" className="w-full bg-[#FAF9F6] text-[#111111] py-20 px-6 sm:px-12 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column (Sticky Heading & Pill Filter) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-start">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-black leading-[1.08]">
            Work &amp; <br />
            experience
          </h2>


        </div>

        {/* Right Column (Vertical Minimal List) */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`${index !== 0 ? "pt-12 border-t border-[#E5E2DA]" : ""}`}
              >
                {/* Header: Left Role & Company, Right Duration & Location */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight leading-snug">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      {item.logoSrc ? (
                        <img
                          src={item.logoSrc}
                          alt={item.logoAlt || item.company}
                          className="w-4 h-4 object-contain shrink-0 opacity-80"
                        />
                      ) : item.logoIcon ? (
                        <span className="text-sm shrink-0">{item.logoIcon}</span>
                      ) : null}
                      <span className="text-base text-[#55534E] font-medium">
                        {item.company}
                      </span>
                      <span className="text-xs text-[#9E9B93] bg-[#EAE8E3] px-2 py-0.5 rounded-full">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Right Meta Info */}
                  <div className="text-xs sm:text-sm text-[#777571] font-mono shrink-0 sm:text-right mt-1 sm:mt-0">
                    <div>{item.duration}</div>
                    <div className="text-[#9E9B93] font-sans text-xs">{item.location}</div>
                  </div>
                </div>

                {/* Description (Lightweight Editorial Font Style) */}
                <p className="mt-5 text-base sm:text-lg text-[#4A4843] leading-relaxed font-light tracking-normal">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}