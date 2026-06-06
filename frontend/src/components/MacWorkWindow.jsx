import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Folder from './Folder'; // Ensure this path is correct based on your project structure
import SketchCanvas from './SketchCanvas'; // Ensure this path is correct based on your project structure
export default function MacWorkWindow({ onClose, onFolderClick }) {
  const [activeTab, setActiveTab] = useState('Work projects');
  const text = "SELECTED WORK";

  // Custom animation variants
  const letterVariants = {
    initial: { color: "#3D3A36", scale: 1 },
    hover: { color: "#C86423", scale: 1.1, rotate: -2 } // Hover par color, size, aur halka tilt
  };

  // Folders Data with exact naming from your mockup
  const folders = [
    { id: 'khyaal', name: 'Khyaal', isWip: false },
    { id: 'blubees', name: 'Blubees', isWip: true },
    { id: 'nonlinear', name: 'Nonlinear', isWip: true },
    { id: 'others', name: 'Others', isWip: true },
  ];

  return (
    <div>


      <div className="w-full max-w-[1380px] mx-auto px-10 py-20 font-sans text-center">
        <div className="flex items-center gap-2 mb-4 items-center justify-center">
          <span className="text-xl">😊</span>
          <span className="font-mono font-medium text-[#E25C1D] text-sm">2024 - 2026</span>
        </div>

        <h1 className="text-6xl font-bold text-[#3D3A36] tracking-tighter mb-6 flex cursor-default items-center justify-center">
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="initial"
              whileHover="hover"
              className="inline-block" // Animation ke liye zaruri
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <p className="text-xs text-[#7D7870] max-w-2xl leading-relaxed">
          A selection of work I've led or contributed to significantly,
          each with context on the problem, my process, and what we built.
        </p>
      </div>

    <div
      className="w-full max-w-5xl aspect-[20/10] bg-[#FAF8F5] rounded-2xl shadow-xs border border-gray-300/70 overflow-hidden flex flex-col font-sans select-none text-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ========================================================
          1. MAC OS WINDOW HEADER BAR
          ======================================================== */}
      <div className="w-full bg-[#EAE6DF] h-10 border-b border-gray-300/50 flex items-center px-4 relative">
        {/* Window Control Buttons */}
        <div className="flex gap-2 z-10">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity" />
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAA2C]" />
        </div>

        {/* Centered Window Title */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-500 tracking-wide font-mono">
          krishna's work
        </div>
      </div>

      {/* ========================================================
          MAIN BODY LAYOUT (Sidebar + Folder Grid Content)
          ======================================================== */}
      <div className="flex-1 flex overflow-hidden">

        {/* 2. LEFT SIDEBAR PANEL */}
        <aside className="w-53 bg-[#E3DFD7] border-r border-gray-300/40 p-5 flex flex-col gap-6">
          {/* Favourites Section */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2 text-left">
              Favourites
              </span>
              
              <button
                onClick={() => setActiveTab('Work projects')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${activeTab === 'Work projects' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                  }`}
              >
                {/* Custom Folder Icon SVG instead of Emoji */}
                <svg className="w-4 h-4 text-[#69C1EE]" fill="currentColor" viewBox="0 0 24 20">
                  <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                </svg>
                Work projects
              </button>

              <button
                onClick={() => setActiveTab('Personal projects')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${activeTab === 'Personal projects' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                  }`}
              >
                {/* Custom Folder Icon SVG instead of Emoji */}
                <svg className="w-4 h-4 text-[#69C1EE]" fill="currentColor" viewBox="0 0 24 20">
                  <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                </svg>
                Personal projects
              </button>
          </div>

          {/* Explore Section */}
          <div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2 text-left">
              Explore
            </span>
              <button
                onClick={() => setActiveTab('Personal projects')}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${activeTab === 'Personal projects' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                  }`}
              >
                {/* Custom Folder Icon SVG instead of Emoji */}
                <svg className="w-4 h-4 text-[#69C1EE]" fill="currentColor" viewBox="0 0 24 20">
                  <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                </svg>
                Leave a Sketch
              </button>
          </div>
        </aside>


          {/* 3. RIGHT CONTENT GRID AREA */}
          <main className="flex-1 bg-[#FAF8F5] p-0 overflow-hidden relative">
            {activeTab === 'Work projects' ? (
              // WORK PROJECTS VIEW
              <div className="p-10 grid grid-cols-4 gap-10">
                {folders.map((folder) => (
                  <div key={folder.id} className="flex flex-col items-center gap-2">
                    <Folder />
                    <span className="text-[11px] font-semibold text-gray-600 tracking-wide text-center">
                      {folder.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : activeTab === 'Personal projects' ? (
              // PERSONAL PROJECT / SKETCH CANVAS VIEW
              <SketchCanvas />
            ) : (
              // FALLBACK VIEW (Optional)
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Select a folder
              </div>
            )}
          </main>

      </div>
    </div>
      </div>
  );
}