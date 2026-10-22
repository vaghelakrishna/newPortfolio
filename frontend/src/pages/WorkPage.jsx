import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
    skills: ["React", "Node.js", "MongoDB", "Tailwind", "Figma", "Git", "REST APIs", "Mongoose"],
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
    skills: ["React.js", "Next.js", "Tailwind", "Figma", "Framer Motion", "JavaScript", "TypeScript"],
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
    skills: ["React", "Node.js", "MongoDB", "Tailwind", "Figma", "Git", "REST APIs", "Mongoose"],
  },
];

const WorkCard = ({ item, index }) => {
  const serialNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="w-full bg-[#EFECE3] border border-[#DBD6C9] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.012)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:border-[#C8C2B3] relative flex flex-col transition-all duration-300"
    >
      {/* Top Meta Row: Serial Number & Job Type Badge */}
      <div className="w-full flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F9F6F0] border border-[#DBD6C9] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)]" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#7C7667]">NO. {serialNumber}</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C7667] bg-[#E3DEC0]/50 px-2.5 py-1 rounded-full border border-[#DBD6C9]/60">
          {item.type}
        </span>
      </div>

      {/* Role Title */}
      <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2B2A27] leading-snug">
        {item.role}
      </h4>

      {/* Company Name with Small Logo Next to it */}
      <div className="mt-2.5 flex items-center gap-2.5">
        {item.logoSrc ? (
          <img
            src={item.logoSrc}
            alt={item.logoAlt || item.company}
            className="w-6 h-6 object-contain rounded-md shrink-0 shadow-xs"
          />
        ) : item.logoIcon ? (
          <span className="w-6 h-6 rounded-md bg-white/70 border border-[#DBD6C9]/60 flex items-center justify-center text-xs shrink-0 shadow-xs">
            {item.logoIcon}
          </span>
        ) : null}
        <span className="text-base font-bold text-[#4D4940] tracking-tight">{item.company}</span>
      </div>

      {/* Description */}
      <p className="text-[13px] sm:text-sm text-[#635F55] font-normal leading-relaxed mt-4">
        {item.desc}
      </p>

      {/* Dashed Separator */}
      <div className="w-full border-t border-dashed border-[#DBD6C9] my-5" />

      {/* Metadata Table */}
      <div className="space-y-2.5 text-[12px] font-medium text-[#635F55] mt-auto">
        <div className="grid grid-cols-3 items-center">
          <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Duration</span>
          <span className="col-span-2 text-[#2B2A27] font-mono font-semibold text-xs">{item.duration}</span>
        </div>
        <div className="grid grid-cols-3 items-center">
          <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Location</span>
          <span className="col-span-2 text-[#2B2A27] font-semibold text-xs">{item.location}</span>
        </div>
        <div className="grid grid-cols-3 items-start pt-1">
          <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px] pt-1">Skills</span>
          <div className="col-span-2 flex flex-wrap gap-1.5">
            {item.skills.map((s) => (
              <span
                key={s}
                className="bg-[#E3DEC0]/70 text-[#2B2A27] font-semibold px-2 py-0.5 rounded text-[11px] border border-[#DBD6C9]/50"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Job", "Internship"];

  const filtered = experiences.filter((e) => filter === "All" || e.type === filter);

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-[#F9F6F0] py-32 px-6 md:px-12 relative overflow-hidden select-none font-sans-clean">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
          .font-cursive { font-family: 'Caveat', cursive; }
          .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}</style>

        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ backgroundImage: "radial-gradient(#E5E0D8 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section Subtitle */}
          <div className="mb-2 flex w-fit items-center gap-1.5 text-[#E25C1D]">
            <p className="uppercase text-xs font-bold tracking-widest font-sans-clean">Experience</p>
          </div>

          {/* Section Main Title */}
          <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2D2D2D] w-full md:w-2/3 leading-[1.15] uppercase font-sans-clean mb-12">
            Where I've <span className="font-cursive text-[#E25C1D] normal-case text-4xl md:text-[54px] ml-1">worked &amp; grown.</span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex gap-2.5 w-full overflow-x-auto no-scrollbar sm:justify-end">
            {filters.map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`relative rounded-full px-6 py-2.5 text-xs font-bold tracking-wider transition-all duration-200 uppercase font-sans-clean border whitespace-nowrap cursor-pointer
                  ${filter === label
                    ? "bg-[#E25C1D] text-white border-[#E25C1D] shadow-md shadow-orange-600/10"
                    : "bg-[#FFFDF9] text-gray-500 border-gray-200/80 hover:bg-white hover:text-black hover:border-gray-300"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Work Cards Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
            {filtered.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
