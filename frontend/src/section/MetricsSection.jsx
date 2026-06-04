import React from 'react';
import MacWorkWindow from '../components/MacWorkWindow';
import ExperienceMetrics from './ExperienceMetrics';

export default function BlueprintCanvasBox() {
  // Exact layout array index loop setup matching image_4ecfbe.png
  const topNumbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 16, 18, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45
  ];

  const leftNumbers = [0, 1];

  return (
    <div
      className="w-full min-h-screen bg-[#FDFBF7] flex items-center justify-center p-8 md:p-12 relative overflow-hidden select-none"
      style={{
        // Canvas outer area dotted dashboard background mesh
        backgroundImage: 'radial-gradient(#DBD5C7 1.5px, transparent 1.5px)',
        backgroundSize: '40px 40px',
        backgroundPosition: '14px 14px'
      }}
    >
      {/* CANVAS SHEET CONTAINER */}
      <div className="w-full max-w-[1380px] bg-[#FEFDFB] rounded-[24px] border border-[#E3DDD3] shadow-[0_12px_40px_rgba(218,211,196,0.15)] relative flex flex-col overflow-hidden">

        {/* TOP COORD MEASUREMENT BAR */}
        <div className="w-full h-11 border-b border-[#F4EFE6] flex items-end relative z-20 bg-[#FEFDFB]">
          <div className="w-[52px] h-full flex-shrink-0" /> {/* Sidebar spacing offset buffer */}

          <div className="flex-1 flex justify-between pr-10 pl-2 pb-1.5">
            {topNumbers.map((num, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono font-bold text-[#E25C1D] w-6 text-center leading-none tracking-tighter"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT AND SIDE RULER SPLIT */}
        <div className="w-full flex relative flex-1">

          {/* LEFT COORD MEASUREMENT BAR */}
          <div className="w-[52px] border-r border-[#F4EFE6] flex flex-col items-center pt-3 gap-[30px] relative z-20 flex-shrink-0 bg-[#FEFDFB]">
            {leftNumbers.map((num, idx) => (
              <span
                key={idx}
                className="text-[9px] font-mono font-bold text-[#E25C1D] h-4 flex items-center justify-center leading-none"
              >
                {num}
              </span>
            ))}
          </div>

          {/* ========================================================
              INTERNAL CRISP BACKGROUND GRID & COMPONENT HOLDER
              ======================================================== */}
          <div
            className="flex-1 min-h-[360px] relative px-4 pb-18 rounded-br-[24px] flex items-center justify-center flex-col" // <-- yahan flex classes add ki hain
            style={{
              backgroundImage: `
      linear-gradient(to right, #F5EFE4 1px, transparent 1px),
      linear-gradient(to bottom, #F5EFE4 1px, transparent 1px)
    `,
              backgroundSize: 'calc((100% - 32px) / 38) 46px',
              backgroundPosition: '14px 6px'
            }}
          >
 <ExperienceMetrics />  
            <MacWorkWindow />

          </div>

        </div>

      </div>
    </div>
  );
}