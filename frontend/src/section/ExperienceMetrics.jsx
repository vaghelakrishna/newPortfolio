import React from 'react';

export default function ExperienceMetrics() {
  const notes = [
    {
      title: "Research & problem definition.",
      desc: "Clear problem definition and JTBD list.",
      bg: "bg-[#FFF2EB]", // Soft Peach/Orange
      textColor: "text-[#E25C1D]",
      rotate: "hover:rotate-0 -rotate-2",
      lineColor: "rgba(226, 92, 29, 0.15)"
    },
    {
      title: "Ideation & Exploration.",
      desc: "Concept validation with multiple options on the table.",
      bg: "bg-[#FAFAFA]", // Off White
      textColor: "text-[#E25C1D]",
      rotate: "hover:rotate-0 rotate-1",
      lineColor: "rgba(0, 0, 0, 0.06)"
    },
    {
      title: "Visual Design & prototyping.",
      desc: "Intentional, brand consistent screens that serve the strategy.",
      bg: "bg-[#F0F5FF]", // Soft Blue
      textColor: "text-[#E25C1D]",
      rotate: "hover:rotate-0 -rotate-1",
      lineColor: "rgba(59, 130, 246, 0.15)"
    },
    {
      title: "Automated Handoff & Documentation.",
      desc: "A developer-ready document.",
      bg: "bg-[#FFFDE0]", // Pastel Yellow
      textColor: "text-[#E25C1D]",
      rotate: "hover:rotate-0 rotate-2",
      lineColor: "rgba(234, 179, 8, 0.15)"
    }
  ];

  return (
    <section className="w-full min-h-screen  py-26 px-6 flex flex-col items-center justify-center font-sans-clean select-none relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        .font-cursive { font-family: 'Caveat', cursive; }
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Realistic Page Curl Shadow Effect */
        .shadow-page-curl {
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .shadow-page-curl::after {
          z-index: -1;
          position: absolute;
          content: "";
          bottom: 12px;
          right: 8px;
          left: auto;
          width: 50%;
          top: 80%;
          max-width: 300px;
          background: rgba(0, 0, 0, 0.18);
          box-shadow: 0 12px 15px rgba(0, 0, 0, 0.28);
          transform: rotate(4deg);
        }
        .shadow-page-curl::before {
          z-index: -1;
          position: absolute;
          content: "";
          bottom: 12px;
          left: 8px;
          right: auto;
          width: 50%;
          top: 80%;
          max-width: 300px;
          background: rgba(0, 0, 0, 0.15);
          box-shadow: 0 12px 15px rgba(0, 0, 0, 0.25);
          transform: rotate(-4deg);
        }
      `}</style>

      {/* Background Dotted Matrix */}
      {/* <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      /> */}

      <div className="relative z-10 max-w-5xl w-full text-center">
        {/* ========================================================
            MAIN HEADER
            ======================================================== */}
        <h2 className="text-3xl md:text-[38px] font-black tracking-tight text-[#2D2D2D] mb-16 uppercase leading-[1.1]">
          3+ YEARS BUILDING & <br />
          SCALING <span className="font-cursive text-[#E25C1D] normal-case text-4xl md:text-[52px] ml-1">early-stage products.</span>
        </h2>

        {/* ========================================================
            METRICS COUNTERS GRID
            ======================================================== */}
        <div className="grid grid-cols-3 gap-6 mb-24 max-w-3xl mx-auto">
          <div className="flex flex-col items-center border-r border-gray-300/40 last:border-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">User Growth</span>
            <span className="text-4xl md:text-[46px] font-black text-[#2D2D2D] tracking-tighter leading-none">100X</span>
            <span className="text-[11px] font-bold text-gray-400 mt-2 leading-tight">50K to 5M<br />@ Khyaal</span>
          </div>

          <div className="flex flex-col items-center border-r border-gray-300/40 last:border-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Users Reached</span>
            <span className="text-4xl md:text-[46px] font-black text-[#2D2D2D] tracking-tighter leading-none">5M+</span>
            <span className="text-[11px] font-bold text-gray-400 mt-2 leading-tight">Across all<br />products</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Features</span>
            <span className="text-4xl md:text-[46px] font-black text-[#2D2D2D] tracking-tighter leading-none">20+</span>
            <span className="text-[11px] font-bold text-gray-400 mt-2 leading-tight">from 0 to 1,<br />full stack</span>
          </div>
        </div>

        {/* ========================================================
            REALISTIC STICKY NOTES GRID
            ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start px-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`transform ${note.rotate} ${note.bg}  border border-black/[0.04] rounded-[3px] p-5 pt-10 min-h-[255px] text-left relative transition-all duration-300 ease-out`}
              style={{
                // Creating the linear notebook rule line background matching original style
                backgroundImage: `linear-gradient(${note.lineColor} 1px, transparent 1px)`,
                backgroundSize: '100% 20px',
                backgroundPosition: '0 30px'
              }}
            >
              {/* Binder Punch Holes with Inner Shadows */}
              <div className="absolute top-3 left-0 w-full flex justify-between px-3.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative w-3 h-3 rounded-full bg-[#F9F6F0] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.2)] border border-white flex items-center justify-center">
                    {/* The dark background peeking through behind the hole */}
                    <div className="w-2 h-2 rounded-full bg-[#E5E0D8]/40" />
                  </div>
                ))}
              </div>

              {/* Sticky Note Typography */}
              <h4 className={`text-[17px] font-bold ${note.textColor} font-cursive leading-tight mb-4 tracking-wide`}>
                {note.title}
              </h4>
              <p className="text-[11px] font-bold text-gray-400/90 leading-[1.6]">
                {note.desc.split(/(problem definition|JTBD|multiple options|consistent screens|strategy|developer-ready)/gi).map((part, i) => {
                  const isBold = /(problem definition|JTBD|multiple options|consistent screens|strategy|developer-ready)/i.test(part);
                  return isBold ? <strong key={i} className="text-gray-600 font-extrabold">{part}</strong> : part;
                })}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}