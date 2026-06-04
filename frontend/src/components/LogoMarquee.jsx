import React from 'react';
import curioLogo from '../assets/curio.svg';
import kattalyxLogo from '../assets/kattalyx.webp';

export default function LogoMarquee() {
  const logos = [
    { name: 'Curio.ai', src: curioLogo },
    { name: 'KattalyxLabs', src: kattalyxLogo },
  ];

  const displayLogos = [...logos, ...logos];

  return (
    <div className="max-w-3xl w-full py-6 overflow-hidden relative select-none mx-auto flex justify-center">
      <style>
        {`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: max-content;
            /* Animation ko infinite aur smooth rakha hai */
            animation: marquee-scroll 15s linear infinite;
            will-change: transform;
          }
          .marquee-container:hover {
            animation-duration: 40s;
          }
        `}
      </style>

      {/* Marquee Wrapper */}
      <div className="marquee-container">
        {displayLogos.map((logo, idx) => (
          <div key={`set1-${idx}`} className="flex items-center justify-center h-12 px-8 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-full w-auto object-contain max-w-[160px]"
            />
          </div>
        ))}
        {displayLogos.map((logo, idx) => (
          <div key={`set2-${idx}`} className="flex items-center justify-center h-12 px-8 flex-shrink-0">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-full w-auto object-contain max-w-[160px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}