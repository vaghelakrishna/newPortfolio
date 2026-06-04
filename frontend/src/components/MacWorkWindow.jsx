import React, { useState } from 'react';

export default function MacWorkWindow({ onClose, onFolderClick }) {
  const [activeTab, setActiveTab] = useState('Work projects');

  // Folders Data with exact naming from your mockup
  const folders = [
    { id: 'khyaal', name: 'Khyaal', isWip: false },
    { id: 'blubees', name: 'Blubees', isWip: true },
    { id: 'nonlinear', name: 'Nonlinear', isWip: true },
    { id: 'others', name: 'Others', isWip: true },
  ];

  return (
    <div
      className="w-full max-w-5xl aspect-[16/10] bg-[#FAF8F5] rounded-2xl shadow-2xl border border-gray-300/70 overflow-hidden flex flex-col font-sans select-none text-center"
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
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2">
              Favourites
            </span>
            <button
              onClick={() => setActiveTab('Work projects')}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${activeTab === 'Work projects' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                }`}
            >
              <span className="text-sm opacity-70">📁</span> Work projects
            </button>
          </div>

          {/* Explore Section */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-2">
              Explore
            </span>
            <button
              onClick={() => {
                setActiveTab('leave a sketch');
                if (onFolderClick) onFolderClick('garden'); // Trigger garden view directly if needed
              }}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-left ${activeTab === 'leave a sketch' ? 'bg-gray-400/20 text-gray-800' : 'text-gray-600 hover:bg-gray-400/10'
                }`}
            >
              <span className="text-sm opacity-70">📁</span> leave a sketch
            </button>
          </div>
        </aside>

        {/* 3. RIGHT CONTENT GRID AREA */}
        <main className="flex-1 bg-[#FAF8F5] p-10 overflow-y-auto">
          {activeTab === 'Work projects' ? (
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-10">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => folder.id === 'others' && onFolderClick ? onFolderClick('garden') : null}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  {/* Folder Icon Frame */}
                  <div className="relative w-20 h-16 flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
                    {/* Apple Standard Cyan Folder SVG */}
                    <svg className="w-full h-full text-[#69C1EE] filter drop-shadow-sm" fill="currentColor" viewBox="0 0 24 20">
                      <path d="M2 3a2 2 0 012-2h4l2 3h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                    </svg>

                    {/* Conditional 'WIP' badge inside folder layer */}
                    {folder.isWip && (
                      <div className="absolute inset-0 top-3 flex items-center justify-center pointer-events-none">
                        <span className="text-[11px] font-black text-[#E05C1A] tracking-wider font-sans uppercase">
                          WIP
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Folder Label text */}
                  <span className="text-[11px] font-semibold text-gray-600 tracking-wide text-center px-2 group-hover:text-gray-900 transition-colors">
                    {folder.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback empty view or alternate state for explorer tabs */
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 font-mono text-xs">
              📂 Folder Content Area Empty
            </div>
          )}
        </main>

      </div>
    </div>
  );
}