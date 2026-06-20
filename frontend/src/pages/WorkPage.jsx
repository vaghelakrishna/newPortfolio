import React, { useState, useRef } from "react";
import { Eye } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const experiences = [
  {
    id: 1,
    company: "Kattalyx",
    role: "Product Design Intern",
    type: "Internship",
    duration: "Jan 2025 – Present",
    location: "Remote",
    logo: "/logos/kattalyx.png",
    bg: "bg-[#FFF2EB]",
    desc: "Leading end-to-end product design for B2B SaaS tools. Worked closely with founders to define UX strategy, design systems, and high-fidelity prototypes.",
    skills: ["Figma", "UX Research", "Design Systems"],
  },
  {
    id: 2,
    company: "Freelance",
    role: "UI/UX Designer",
    type: "Freelance",
    duration: "2024 – Present",
    location: "Remote",
    logo: null,
    bg: "bg-[#F0F5FF]",
    desc: "Designed and delivered end-to-end digital products for startups and indie makers — from landing pages to full app flows.",
    skills: ["Figma", "Branding", "Prototyping"],
  },
  {
    id: 3,
    company: "College Projects",
    role: "Full Stack Developer",
    type: "Academic",
    duration: "2023 – 2024",
    location: "On-site",
    logo: null,
    bg: "bg-[#FFFDE0]",
    desc: "Built multiple full-stack projects using React, Node.js and MongoDB. Focused on real-world problem solving and clean UI implementation.",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    company: "Open Source",
    role: "Contributor",
    type: "Open Source",
    duration: "2024",
    location: "Remote",
    logo: null,
    bg: "bg-gray-100",
    desc: "Contributed UI fixes and component improvements to open-source React projects on GitHub.",
    skills: ["React", "Tailwind", "GitHub"],
  },
];

const WorkCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const serialNumber = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-[#EFECE3] border border-[#DBD6C9] rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.012)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] relative flex flex-col sm:even:mt-20 overflow-hidden transition-all duration-500 ease-in-out max-h-[340px] hover:max-h-[600px]"
    >
      {/* Top Meta Row */}
      <div className="w-full flex items-center justify-between mb-4 px-1 flex-shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-[#F9F6F0] border border-[#DBD6C9] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)]" />
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#7C7667]">NO. {serialNumber}</span>
      </div>

      {/* Company Banner */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`w-full h-36 overflow-hidden rounded-2xl border border-black/[0.02] flex items-center justify-center relative flex-shrink-0 transition-colors duration-300 ${isHovered ? "cursor-none" : "cursor-pointer"} ${item.bg}`}
      >
        {item.logo ? (
          <img src={item.logo} alt={item.company} className="h-14 object-contain opacity-80" />
        ) : (
          <span className="text-4xl font-black tracking-tighter text-black/10 uppercase select-none">
            {item.company}
          </span>
        )}

        {isHovered && (
          <div
            className="absolute pointer-events-none z-30 flex items-center gap-1.5 bg-[#E25C1D] text-white px-4 py-2.5 rounded-full shadow-lg border border-orange-400/20 transition-transform duration-75 ease-out"
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: "translate(-50%, -50%)" }}
          >
            <Eye size={13} className="stroke-[3]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap">View Details</span>
          </div>
        )}
      </div>

      {/* Title & Badge */}
      <div className="mt-5 flex items-start justify-between flex-shrink-0 px-1">
        <div>
          <h4 className="text-xl font-extrabold tracking-tight text-[#2B2A27]">{item.role}</h4>
          <p className="text-sm text-[#7C7667] font-semibold mt-0.5">{item.company}</p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C7667] bg-[#E3DEC0]/40 px-2 py-0.5 rounded border border-[#DBD6C9]/40 mt-1 shrink-0">
          {item.type}
        </span>
      </div>

      {/* Hover Reveal */}
      <div
        className={`transition-all duration-500 ease-in-out px-1 overflow-hidden origin-top ${
          isHovered ? "opacity-100 mt-4 translate-y-0" : "opacity-0 max-h-0 pointer-events-none -translate-y-2"
        }`}
      >
        <p className="text-[13px] text-[#635F55] font-medium leading-relaxed">{item.desc}</p>

        <div className="w-full border-t border-dashed border-[#DBD6C9] my-4" />

        <div className="space-y-2.5 pb-2 text-[11px] font-medium text-[#635F55]">
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Duration</span>
            <span className="col-span-2 text-[#2B2A27] font-mono font-bold">{item.duration}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Location</span>
            <span className="col-span-2 text-[#2B2A27] font-bold">{item.location}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Skills</span>
            <div className="col-span-2 flex flex-wrap gap-1">
              {item.skills.map((s) => (
                <span key={s} className="bg-[#E3DEC0]/60 text-[#2B2A27] font-bold px-2 py-0.5 rounded text-[10px] border border-[#DBD6C9]/40">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Internship", "Freelance", "Academic", "Open Source"];

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

          <div className="mb-2 flex w-fit items-center gap-1.5 text-[#E25C1D]">
            <p className="uppercase text-xs font-bold tracking-widest font-sans-clean">Experience</p>
          </div>

          <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2D2D2D] w-full md:w-2/3 leading-[1.15] uppercase font-sans-clean mb-12">
            Where I've <span className="font-cursive text-[#E25C1D] normal-case text-4xl md:text-[54px] ml-1">worked &amp; grown.</span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex gap-2.5 w-full overflow-x-auto no-scrollbar sm:justify-end">
            {filters.map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`relative rounded-full px-6 py-2.5 text-xs font-bold tracking-wider transition-all duration-200 uppercase font-sans-clean border whitespace-nowrap
                  ${filter === label
                    ? "bg-[#E25C1D] text-white border-[#E25C1D] shadow-md shadow-orange-600/10"
                    : "bg-[#FFFDF9] text-gray-500 border-gray-200/80 hover:bg-white hover:text-black hover:border-gray-300"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-10 items-start">
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
