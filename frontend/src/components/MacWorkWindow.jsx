import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Folder from './Folder';
import SketchCanvas from './SketchCanvas';

export default function MacWorkWindow({ onClose, onFolderClick }) {
  const [activeTab, setActiveTab] = useState('Work projects');
  const text = "SELECTED WORK";

  const letterVariants = {
    initial: { color: "#3D3A36", scale: 1 },
    hover: { color: "#C86423", scale: 1.1, rotate: -2 },
  };

  const folders = [
    { id: 'khyaal', name: 'Khyaal', isWip: false },
    { id: 'blubees', name: 'Blubees', isWip: true },
    { id: 'nonlinear', name: 'Nonlinear', isWip: true },
    { id: 'others', name: 'Others', isWip: true },
  ];

  const FolderIcon = () => (
    <svg className="w-4 h-4 text-[#69C1EE]" fill="currentColor" viewBox="0 0 24 20">
      <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
    </svg>
  );

  return (
    <div className="w-full font-sans">

      {/* MOBILE LAYOUT */}
      <div className="md:hidden px-4 py-10">
        <div className="text-center mb-6">
          <span className="font-mono font-medium text-[#E25C1D] text-sm">2024 - 2026</span>
          <h1 className="text-3xl font-bold text-[#3D3A36] tracking-tighter mt-2">SELECTED WORK</h1>
          <p className="text-xs text-[#7D7870] mt-3 leading-relaxed">
            A selection of work I've led or contributed to significantly.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {folders.map((folder) => (
            <div key={folder.id} className="flex items-center gap-3 bg-[#FAF8F5] rounded-xl p-4 border border-gray-200">
              <svg className="w-8 h-8 text-[#69C1EE] flex-shrink-0" fill="currentColor" viewBox="0 0 24 20">
                <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">{folder.name}</span>
              {folder.isWip && (
                <span className="ml-auto text-[9px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-mono">WIP</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block">
        <div className="w-full max-w-[900px] mx-auto px-10 py-20 text-center">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="font-mono font-medium text-[#E25C1D] text-sm">2024 - 2026</span>
          </div>
          <h1 className="text-6xl font-bold text-[#3D3A36] tracking-tighter mb-6 flex cursor-default items-center justify-center">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="initial"
                whileHover="hover"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <p className="text-xs text-[#7D7870] max-w-2xl leading-relaxed mx-auto">
            A selection of work I've led or contributed to significantly,
            each with context on the problem, my process, and what we built.
          </p>
        </div>

        <div
          className="w-full max-w-5xl mx-auto h-[490px] bg-[#FAF8F5] rounded-2xl shadow-xs border border-gray-300/70 overflow-hidden flex flex-col select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mac Header */}
          <div className="w-full bg-[#EAE6DF] h-10 border-b border-gray-300/50 flex items-center px-4 relative flex-shrink-0">
            <div className="flex gap-2 z-10">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity" />
              <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAA2C]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-500 tracking-wide font-mono">
              krishna's work
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-52 bg-[#E3DFD7] border-r border-gray-300/40 p-5 flex flex-col gap-6 flex-shrink-0">
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2 text-left">
                  Favourites
                </span>
                {['Work projects', 'Personal projects'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                      activeTab === tab ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                    }`}
                  >
                    <FolderIcon />
                    {tab}
                  </button>
                ))}
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2 text-left">
                  Explore
                </span>
                <button
                  onClick={() => setActiveTab('Sketch')}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${
                    activeTab === 'Sketch' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                  }`}
                >
                  <FolderIcon />
                  Leave a Sketch
                </button>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 bg-[#FAF8F5] overflow-hidden relative">
              {activeTab === 'Work projects' && (
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
              )}
              {activeTab === 'Personal projects' && (
                <div className="p-10 flex items-center justify-center text-gray-400 text-sm">
                  Personal projects coming soon...
                </div>
              )}
              {activeTab === 'Sketch' && <SketchCanvas />}
              {!['Work projects', 'Personal projects', 'Sketch'].includes(activeTab) && (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Select a folder
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

    </div>
  );
}
