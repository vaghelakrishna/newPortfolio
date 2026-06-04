import React from 'react';
import { RiArrowRightUpLine, RiArrowUpLine } from "react-icons/ri";

export default function CombinedFooter() {
    const socialLinks = [
    { name: 'LINKEDIN', color: 'text-[#0A66C2]' },
    { name: 'INSTAGRAM', color: 'text-[#E4405F]' },
    { name: 'BEHANCE', color: 'text-[#0057FF]' },
    { name: 'TWITTER', color: 'text-[#555555]' },
  ];
  return (
    <footer className="w-full">

      <div className="w-full pt-20 pb-16 flex flex-col items-center justify-center relative bg-[#FDFBF7]">
        {/* Google Font for Cursive Look */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .font-cursive { font-family: 'Caveat', cursive; }
      `}</style>

        {/* Header Section */}
        <div className="text-center mb-10">
          <p className="text-[#E25C1D] text-2xl font-cursive mb-1">& That's a wrap!</p>
          <h2 className="text-[44px] font-black text-[#2D2D2D] tracking-tight leading-none">
            GLAD YOU MADE IT HERE.
          </h2>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-col items-center gap-6">
          <p className="text-[#E25C1D] font-cursive text-xl">You can connect with me on,</p>

          <div className="flex items-center gap-4 text-[11px] font-black tracking-[0.2em] text-[#555]">
            {socialLinks.map((link, i) => (
              <React.Fragment key={link.name}>
                <a href="#" className={`flex items-center gap-1 hover:opacity-70 transition-opacity ${link.color}`}>
                  {link.name} <RiArrowRightUpLine size={12} />
                </a>
                {i < socialLinks.length - 1 && <span className="text-[#333] text-[8px]">◆</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-10 right-10 w-20 h-20 flex items-center justify-center group"
        >
          <div className="absolute w-full h-full animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#333]">
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text className="text-[8px] font-black tracking-[0.6em] uppercase">
                <textPath href="#circlePath">GO TO TOP ◆ GO TO TOP ◆</textPath>
              </text>
            </svg>
          </div>
          <RiArrowUpLine size={32} className="text-[#E25C1D]" />
        </button>
      </div>
      {/* SECTION 1: DARK CONTACT FOOTER */}
      <div className="bg-[#1A1A1A] text-white py-20 px-10 md:px-20 border-b border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left Side */}
          <div className="space-y-8">
            <p className="text-[#E25C1D] font-cursive text-xl">get in touch</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">GOT A PROJECT<br />YOU WANT TO<br />TALK ABOUT?</h2>
            <button className="bg-[#E25C1D] text-white px-8 py-4 flex items-center gap-2 font-bold hover:bg-[#c54e17] transition-all">
              SEND ME A MESSAGE <RiArrowRightUpLine />
            </button>
          </div>
          {/* Right Side Links */}
          <div className="flex flex-col gap-4 text-right">
            <span className="text-[#E25C1D] text-sm font-bold tracking-widest mb-2">LINKS</span>
            {['HOME', 'WORK', 'ABOUT', 'RESUME', 'CONTACT'].map(link => (
              <a key={link} href="#" className="text-2xl font-bold flex items-center justify-end gap-2 hover:text-[#E25C1D]">
                {link} <RiArrowRightUpLine />
              </a>
            ))}
          </div>
        </div>
      </div>


    </footer>
  );
}