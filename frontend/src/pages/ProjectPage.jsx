import React, { useState, useRef } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// प्रत्येक प्रोजेक्ट कार्ड के लिए अलग सब-कंपोनेंट
const ProjectCard = ({ item, index, onClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // सीरियल नंबर के लिए फ़ॉर्मेटिंग (e.g., 1 -> NO. 01)
  const serialNumber = String(index + 1).padStart(2, '0');

  return (
    /* 
      MAIN INTERACTIVE CARD CONTAINER 
      image_3314a6.png की तरह ही इसे एक सुंदर फोल्डर/शीट का लुक दिया गया है।
      होवर होने पर यह अपनी हाइट स्मूथली एडजस्ट करेगा (max-h-40 से max-h-[600px] ट्रांजिशन)
    */
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="w-full bg-[#EFECE3] border border-[#DBD6C9] rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.012)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] relative flex flex-col sm:even:mt-20 overflow-hidden transition-all duration-500 ease-in-out max-h-[380px] hover:max-h-[650px] cursor-pointer"
    >

      {/* Top Meta Details Row */}
      <div className="w-full flex items-center justify-between mb-4 px-1 flex-shrink-0">
        {/* Left Punch Hole Symbol */}
        <div className="w-3.5 h-3.5 rounded-full bg-[#F9F6F0] border border-[#DBD6C9] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)]" />
        {/* Right Serial Tag */}
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#7C7667]">NO. {serialNumber}</span>
      </div>

      {/* IMAGE HOVER ZONE & CUSTOM CURSOR */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`aspect-[3/2] w-full overflow-hidden rounded-2xl border border-black/[0.02] p-3 flex items-center justify-center relative flex-shrink-0 transition-colors duration-300 ${isHovered ? "cursor-none bg-black/[0.02]" : "cursor-pointer"
          } ${item.bg}`}
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover rounded-xl shadow-sm transition duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* CUSTOM "VIEW CASE STUDY" CURSOR */}
        {isHovered && (
          <div
            className="absolute pointer-events-none z-30 flex items-center gap-1.5 bg-[#E25C1D] text-white px-4 py-2.5 rounded-full shadow-lg border border-orange-400/20 transition-transform duration-75 ease-out"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Eye size={13} className="stroke-[3]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap">
              View Case Study
            </span>
          </div>
        )}
      </div>

      {/* TITLE AND BADGES */}
      <div className="mt-5 flex items-start justify-between flex-shrink-0 font-sans-clean px-1">
        <h4 className="text-xl font-extrabold tracking-tight text-[#2B2A27]">{item.title}</h4>
        <div className="flex gap-1.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C7667] bg-[#E3DEC0]/40 px-2 py-0.5 rounded border border-[#DBD6C9]/40">
            {item.category.split(" & ")[0]}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C7667] bg-[#E3DEC0]/40 px-2 py-0.5 rounded border border-[#DBD6C9]/40">
            Shipped
          </span>
        </div>
      </div>

      {/* ========================================================
          HIDDEN EXTRA DETAILS SECTION (Reveals smoothly on Hover)
          ======================================================== */}
      <div
        className={`transition-all duration-500 ease-in-out px-1 overflow-hidden origin-top ${isHovered ? "opacity-100 mt-4 translate-y-0" : "opacity-0 max-h-0 pointer-events-none -translate-y-2"
          }`}
      >
        {/* Short Description */}
        <p className="text-[13px] text-[#635F55] font-medium leading-relaxed">
          A high-fidelity premium digital product designed and engineered to deliver top-notch performance and absolute pixel-perfect user experience.
        </p>

        {/* Divider Dash Line */}
        <div className="w-full border-t border-dashed border-[#DBD6C9] my-4" />

        {/* Information Meta Table */}
        <div className="space-y-2.5 pb-2 text-[11px] font-medium text-[#635F55]">
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Role</span>
            <span className="col-span-2 text-[#2B2A27] font-bold">{item.category}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Team</span>
            <span className="col-span-2 text-[#2B2A27] font-bold">Independent / Solo</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-[#968F7F] font-bold tracking-wider uppercase text-[10px]">Timeframe</span>
            <span className="col-span-2 text-[#2B2A27] font-mono font-bold">{item.year} - Present</span>
          </div>
        </div>
      </div>

    </div>
  );
};

const ProjectPage = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const projects = [
    { id: "aora", title: "Aora", category: "Development", year: "2024", img: "/projects/aora.webp", bg: "bg-[#FFF2EB]" },
    { id: "code-screenshot", title: "Code Screenshot", category: "Development", year: "2024", img: "/projects/codescreenshot.webp", bg: "bg-gray-100" },
    { id: "iphone-15-pro", title: "iPhone 15 Pro", category: "Development", year: "2024", img: "/projects/iphone.webp", bg: "bg-[#F0F5FF]" },
    { id: "ochi-design", title: "Ochi Design", category: "Development & Design", year: "2024", img: "/projects/ochidesign.webp", bg: "bg-[#FFFDE0]" },
    { id: "snapalyzer", title: "Snapalyzer", category: "Development & Design", year: "2024", img: "/projects/snapalyzer.webp", bg: "bg-gray-100" },
    { id: "veni-labs", title: "Veni Labs", category: "Development", year: "2024", img: "/projects/veni-labs.webp", bg: "bg-[#FFF2EB]" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Development") return p.category.includes("Development");
    if (filter === "Design") return p.category.includes("Design");
    return true;
  });

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-[#F9F6F0] py-32 px-6 md:px-12 relative overflow-hidden select-none font-sans-clean">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght=700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* Grid Matrix Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header Badge */}
        <div className="mb-2 flex w-fit items-center gap-1.5 text-[#E25C1D]">
          {/* <Sparkles className="w-4 h-4 fill-[#E25C1D]/10" /> */}
          <p className="uppercase text-xs font-bold tracking-widest font-sans-clean">My Work</p>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl md:text-[42px] font-black tracking-tight text-[#2D2D2D] w-full md:w-2/3 leading-[1.15] uppercase font-sans-clean mb-12">
          Creating <span className="font-cursive text-[#E25C1D] normal-case text-4xl md:text-[54px] ml-1">next level</span> digital products.
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-2.5 w-full overflow-x-auto no-scrollbar sm:justify-end">
          {["All", "Development", "Design"].map((label) => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`relative rounded-full px-6 py-2.5 text-xs font-bold tracking-wider transition-all duration-200 uppercase font-sans-clean border
                ${filter === label
                  ? "bg-[#E25C1D] text-white border-[#E25C1D] shadow-md shadow-orange-600/10"
                  : "bg-[#FFFDF9] text-gray-500 border-gray-200/80 hover:bg-white hover:text-black hover:border-gray-300"}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Project Grid Layout */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-10 items-start">
          {filteredProjects.map((item, i) => (
            <ProjectCard key={item.title} item={item} index={i} onClick={() => navigate(`/project/${item.id}`)} />
          ))}
        </div>

      </div>
    </section><Footer /></>
  );
};

export default ProjectPage;