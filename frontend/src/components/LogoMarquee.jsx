import React from 'react';

export default function LogoMarquee() {
  const logos = [
    { name: 'FeatsClub', type: 'text', text: 'FeatsClub', subtext: 'Be the true you. Be found.' },
    { name: 'khyaal', type: 'image', src: 'https://via.placeholder.com/120x40?text=khyaal' },
    { name: 'Blubeez', type: 'image', src: 'https://via.placeholder.com/140x40?text=Blubeez' },
    { name: 'NONLINEAR', type: 'text', text: 'NONLINEAR', icon: '₪' },
    { name: 'Diamond Brand', type: 'icon', icon: '💎' }
  ];

  return (
    <section className="w-full py-12 overflow-hidden relative select-none flex justify-center">

      {/* CSS Styles for Smooth Infinite Marquee Animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap');
        .font-sans-clean { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dotted Matrix Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(#E5E0D8 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* ========================================================
          CONSTRAINED VIEWPORT WITH GRADIENT BLUR MASKS
          ======================================================== */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden px-4">

        {/* Left Side Blur Fade Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FEFDFB] via-[#FEFDFB]/70 to-transparent z-20 pointer-events-none" />

        {/* Right Side Blur Fade Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FEFDFB] via-[#FEFDFB]/70 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track Wrapper */}
        <div className="w-full flex items-center">
          <div className="animate-marquee gap-14 px-4">

            {/* Loop 1 + Loop 2 को मिलाकर कतार */}
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[140px] transition-all duration-300 "
              >
                {logo.name === 'FeatsClub' && (
                  <div className="flex flex-col items-start font-sans-clean">
                    <span className="text-lg font-extrabold text-gray-800 tracking-tight leading-none">
                      Feats<span className="text-gray-500 font-medium">Club</span>
                    </span>
                    <span className="text-[7px] text-gray-400 tracking-tight mt-0.5">{logo.subtext}</span>
                  </div>
                )}

                {logo.name === 'khyaal' && (
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-light text-[#5C4033] lowercase tracking-tight">khyaal</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8BC34A] -mt-2.5 shadow-sm" />
                  </div>
                )}

                {logo.name === 'Blubeez' && (
                  <div className="flex items-center gap-1.5 font-sans-clean">
                    <span className="text-lg font-bold text-[#2B549A] tracking-tight">Blubeez</span>
                  </div>
                )}

                {logo.name === 'NONLINEAR' && (
                  <div className="flex flex-col items-center font-sans-clean">
                    <div className="text-base font-bold text-gray-700 leading-none tracking-widest">//\\</div>
                    <span className="text-[8px] font-bold text-gray-400 tracking-[0.2em] mt-1">{logo.text}</span>
                  </div>
                )}

                {logo.name === 'Diamond Brand' && (
                  <div className="w-7 h-7 transform rotate-45 border-2 border-purple-400 flex items-center justify-center rounded-sm bg-purple-50/50">
                    <span className="transform -rotate-45 text-xs">💜</span>
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}