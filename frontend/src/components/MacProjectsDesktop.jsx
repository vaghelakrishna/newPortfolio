import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Share2, 
  Plus, 
  Copy, 
  Sidebar,
  Maximize2,
  Minus,
  X,
  ExternalLink
} from 'lucide-react';

// Assets
import projectsBg from '../assets/projects-bg.jpg';
import projectsDock from '../assets/projects-dock.png';
import projectsFolder from '../assets/projects-folder.png';
import kattalyxImg from '../assets/kattalyx.webp';
import workImg from '../assets/work.png';
import cutieImg from '../assets/cutie.png';
import leaveVideo from '../assets/leave.webm';

const projectsList = [
  {
    id: 'carovii',
    title: 'Carovii Platform',
    role: 'Full-Stack Developer',
    stack: 'React, HTML5 Canvas, Tailwind',
    year: '2026',
    url: 'carovii.app',
    type: 'video',
    videoSrc: leaveVideo,
    fallbackImg: kattalyxImg,
    badgeColor: '#E11D48',
  },
  {
    id: 'craftoria',
    title: 'Craftoria Platform',
    role: 'Full-Stack Developer',
    stack: 'React, Typesense, MongoDB',
    year: '2026',
    url: 'craftoria.dev',
    type: 'image',
    fallbackImg: workImg,
    badgeColor: '#4F46E5',
  },
  {
    id: 'sugra-jewels',
    title: 'Sugra Jewels Storefront',
    role: 'Frontend Engineer',
    stack: 'React, Tailwind, Cloudinary',
    year: '2026',
    url: 'sugrajewels.com',
    type: 'image',
    fallbackImg: kattalyxImg,
    badgeColor: '#D97706',
  },
  {
    id: 'onlyloop',
    title: 'OnlyLoop D2C Store',
    role: 'Full-Stack Developer',
    stack: 'Node, Express, MongoDB',
    year: '2026',
    url: 'onlyloop.shop',
    type: 'image',
    fallbackImg: workImg,
    badgeColor: '#059669',
  }
];

export default function MacProjectsDesktop() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState('All');

  const currentProject = projectsList[activeProjectIndex];

  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 px-3 sm:px-6 md:px-10 overflow-hidden flex flex-col items-center justify-center font-sans select-none">
      
      {/* 1. SCENIC BACKGROUND WALLPAPER */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter saturate-[1.05]"
        style={{
          backgroundImage: `url(${projectsBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* 2. TOP CALENDAR / KEYNOTE WIDGET (Top Left) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10 hidden sm:flex flex-col bg-white/80 backdrop-blur-md rounded-2xl p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white/60 w-36">
        <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider">Monday</span>
        <span className="text-3xl font-black text-gray-800 leading-none my-0.5">22</span>
        <span className="text-xs font-bold text-gray-700 mt-2">Apple Keynote</span>
        <span className="text-[10px] text-gray-400">Online • 10:00-11:30</span>
      </div>

      {/* 3. DESKTOP FOLDERS & ICONS (Top Right) */}
      <div className="absolute top-6 right-6 md:top-10 md:right-12 z-10 flex flex-col items-center gap-6">
        {/* drafts+ folder */}
        <div 
          onClick={() => setIsFolderOpen(!isFolderOpen)}
          className="flex flex-col items-center gap-1 cursor-pointer group"
        >
          <div className="relative w-14 h-14 transition-transform duration-200 group-hover:scale-105">
            <img 
              src={projectsFolder} 
              alt="drafts" 
              className="w-full h-full object-contain drop-shadow-md" 
            />
            {/* cute bunny / sticker icon on folder */}
            <span className="absolute -top-1 right-2 text-xs">🐰</span>
          </div>
          <span className="text-[11px] font-semibold text-gray-700 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs group-hover:bg-blue-500 group-hover:text-white transition-colors">
            drafts+
          </span>
        </div>

        {/* Polaroid / survival.jpg */}
        <div className="hidden md:flex flex-col items-center gap-1 cursor-pointer group">
          <div className="w-13 h-15 bg-white p-1 rounded-sm shadow-md rotate-3 group-hover:rotate-0 transition-transform">
            <img 
              src={cutieImg} 
              alt="survival" 
              className="w-full h-10 object-cover" 
            />
          </div>
          <span className="text-[10px] font-semibold text-gray-600 bg-white/60 px-1.5 py-0.5 rounded">
            survival.jpg
          </span>
        </div>
      </div>

      {/* 4. TITLE: "projects - things i've designed" */}
      <div className="relative z-10 flex flex-col items-center mb-6 md:mb-8 text-center pointer-events-none">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#1e293b] tracking-tighter leading-none select-none">
          projects
        </h2>
        <span 
          className="text-2xl sm:text-3xl md:text-4xl text-[#0f172a] -mt-3 sm:-mt-5 md:-mt-6 select-none font-serif italic"
          style={{ fontFamily: "'Caveat', cursive, Georgia" }}
        >
          things i've designed
        </span>
      </div>

      {/* 5. CENTER MAC OS BROWSER WINDOW */}
      <AnimatePresence>
        {isWindowOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isMaximized ? '96%' : '100%',
              maxWidth: isMaximized ? '1280px' : '980px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="relative z-20 bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-black/10 overflow-hidden flex flex-col mb-20"
          >
            {/* --- MAC WINDOW TITLEBAR --- */}
            <div className="w-full bg-[#FAF8F5] border-b border-gray-200/80 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
              
              {/* Traffic Light Window Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsWindowOpen(false)}
                  title="Close"
                  className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition-opacity flex items-center justify-center group"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-black/70 stroke-[3]" />
                </button>
                <button 
                  onClick={() => setIsWindowOpen(false)}
                  title="Minimize"
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 transition-opacity flex items-center justify-center group"
                >
                  <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/70 stroke-[3]" />
                </button>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  title="Maximize"
                  className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAA2C] hover:opacity-80 transition-opacity flex items-center justify-center group"
                >
                  <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-black/70 stroke-[3]" />
                </button>
              </div>

              {/* Navigation Back / Forward Buttons */}
              <div className="hidden sm:flex items-center gap-1 text-gray-400">
                <button 
                  onClick={() => setActiveProjectIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length)}
                  className="p-1 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors"
                >
                  <ArrowLeft size={14} />
                </button>
                <button 
                  onClick={() => setActiveProjectIndex((prev) => (prev + 1) % projectsList.length)}
                  className="p-1 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors"
                >
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* URL Address Bar (Static as requested: only search bar not working) */}
              <div className="flex-1 max-w-sm sm:max-w-md mx-2 bg-white border border-gray-200/90 rounded-lg px-3 py-1 flex items-center justify-center shadow-2xs">
                <span className="text-xs font-mono font-medium text-gray-600 truncate select-all">
                  {currentProject.url}
                </span>
              </div>

              {/* Right Window Action Icons */}
              <div className="flex items-center gap-1 text-gray-400">
                <button className="p-1 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors hidden sm:block">
                  <Share2 size={13} />
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="p-1 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors"
                >
                  <RotateCw size={13} />
                </button>
                <button className="p-1 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors hidden sm:block">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* --- WEB APP PREVIEW CONTAINER (Center Video / App UI) --- */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-[#FDFBF7] overflow-hidden flex flex-col">
              
              {/* App UI Sub-Header Bar (Matching Flebo UI in Screenshot) */}
              <div className="w-full bg-[#1A1F2C] text-white px-3 sm:px-5 py-2 flex items-center justify-between text-[11px] font-sans">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
                    {currentProject.id === 'carovii' ? (
                      <>carovii<span className="text-pink-400">.app</span></>
                    ) : (
                      currentProject.title
                    )}
                  </span>
                  <span className="hidden md:inline-block bg-yellow-400/20 text-yellow-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
                    ★ 4.9
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 text-gray-300 text-[10px] sm:text-xs">
                  <span className="hidden sm:inline">Home Collection</span>
                  <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-sm font-semibold">
                    Lab Visit
                  </span>
                  <span className="border border-gray-500 px-2 py-0.5 rounded-sm cursor-pointer hover:bg-white/10">
                    Filters & sort
                  </span>
                </div>
              </div>

              {/* MAIN CONTENT CANVAS: Video with seamless loop OR Interactive Image */}
              <div className="relative flex-1 w-full h-full overflow-hidden bg-white flex items-center justify-center">
                {currentProject.type === 'video' ? (
                  <video
                    src={currentProject.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentProject.fallbackImg}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Optional overlay tag for live preview */}
                <a
                  href={`/project/${currentProject.id}`}
                  className="absolute bottom-4 right-4 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs transition-colors shadow-lg"
                >
                  View Case Study <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* --- WINDOW FOOTER (Re-design Flebo | UX Designer | Figma, Claude | 2026) --- */}
            <div className="w-full bg-[#FAF8F5] border-t border-gray-200/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-gray-900 tracking-tight text-sm sm:text-base">
                  {currentProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-8 text-gray-500 font-mono text-xs">
                <span>{currentProject.role}</span>
                <span className="hidden sm:inline">•</span>
                <span>{currentProject.stack}</span>
                <span className="hidden sm:inline">•</span>
                <span className="font-bold text-gray-800">{currentProject.year}</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Button if closed */}
      {!isWindowOpen && (
        <button
          onClick={() => setIsWindowOpen(true)}
          className="relative z-20 mb-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-black/10 text-sm font-bold text-gray-800 hover:bg-white transition-all transform hover:scale-105"
        >
          Re-open Window 💻
        </button>
      )}

      {/* 6. BOTTOM MAC OS FLOATING DOCK */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.12)] flex items-center gap-2 sm:gap-3">
          
          {/* Dock Icon: Finder */}
          <div 
            onClick={() => setIsWindowOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-200"
          >
            <span className="text-xl">📁</span>
          </div>

          {/* Dock Icon: Carovii (Active) */}
          <div 
            onClick={() => { setActiveProjectIndex(0); setIsWindowOpen(true); }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-200 border ${
              activeProjectIndex === 0 ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            <span className="text-xs font-bold text-pink-500 font-mono">carovii</span>
          </div>

          {/* Dock Icon: Craftoria */}
          <div 
            onClick={() => { setActiveProjectIndex(1); setIsWindowOpen(true); }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2D1B69] flex items-center justify-center shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-200 border ${
              activeProjectIndex === 1 ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            <span className="text-xs font-bold text-pink-300 font-mono">craft</span>
          </div>

          {/* Dock Icon: Sugra */}
          <div 
            onClick={() => { setActiveProjectIndex(2); setIsWindowOpen(true); }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-200 border ${
              activeProjectIndex === 2 ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            <span className="text-[10px] font-bold text-orange-400">SUGRA</span>
          </div>

          {/* Dock Icon: Trash */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-200/80 flex items-center justify-center shadow-sm cursor-pointer hover:-translate-y-2 transition-transform duration-200">
            <span className="text-lg">🗑️</span>
          </div>

        </div>
      </div>

      {/* 7. PLAYFUL DOG MASCOT (Bottom Right) */}
      <div className="absolute bottom-2 right-4 sm:right-10 z-20 pointer-events-none select-none">
        <svg width="120" height="90" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dog Body with sweater */}
          <ellipse cx="90" cy="85" rx="35" ry="25" fill="#C67D42" />
          {/* Knit sweater pattern */}
          <rect x="65" y="65" width="45" height="30" rx="6" fill="#F8F8F6" stroke="#4B6B94" strokeWidth="2" strokeDasharray="3 3" />
          {/* Tail */}
          <path d="M125 80 Q145 60 140 75" stroke="#C67D42" strokeWidth="7" strokeLinecap="round" />
          {/* Dog Head */}
          <ellipse cx="50" cy="55" rx="22" ry="18" fill="#C67D42" />
          {/* Black Snout */}
          <ellipse cx="32" cy="62" rx="14" ry="10" fill="#2D2018" />
          <circle cx="23" cy="58" r="3" fill="#000" />
          {/* Eye */}
          <circle cx="45" cy="48" r="3.5" fill="#1C1917" />
          <circle cx="46" cy="47" r="1" fill="#FFF" />
          {/* Long Ear */}
          <ellipse cx="62" cy="60" rx="9" ry="18" fill="#2D2018" transform="rotate(15 62 60)" />
          {/* Red Beret Hat */}
          <ellipse cx="48" cy="38" rx="14" ry="6" fill="#DC2626" />
          <circle cx="48" cy="33" r="2.5" fill="#991B1B" />
          {/* Front Legs */}
          <rect x="75" y="95" width="7" height="18" rx="3.5" fill="#2D2018" />
          <rect x="95" y="95" width="7" height="18" rx="3.5" fill="#2D2018" />
        </svg>
      </div>

    </section>
  );
}
