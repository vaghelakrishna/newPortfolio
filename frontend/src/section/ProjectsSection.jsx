import React from 'react';
import bgImage from '../assets/image.png';

// Realistic Paperclip SVG
const PaperClip = ({ color = '#3b82f6', className = '' }) => (
  <svg
    viewBox="0 0 28 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)] pointer-events-none z-30 ${className}`}
  >
    <path
      d="M14 62 C7 62 3 56 3 48 V15 C3 7 8 2 15 2 C22 2 26 7 26 15 V52 C26 58 22 61 17 61 C12 61 8 58 8 52 V19 C8 15 11 12 15 12 C19 12 21 15 21 19 V45"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Title Badge Tag Matching Screenshot
const ProjectsBadge = () => (
  <div className="relative inline-flex items-center bg-[#dff0fc] text-slate-800 font-semibold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg shadow-md -rotate-[14deg] select-none">
    {/* Blue Folder / Star Icon Badge on Left */}
    <div className="absolute -left-3 -top-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center shadow-sm border border-white/80">
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-1.5V9a3 3 0 0 0-3-3h-3.379a3 3 0 0 1-2.122-.879L8.379 3.999A3 3 0 0 0 6.257 3.12H4.5A3 3 0 0 0 1.5 6.12v11.88a3 3 0 0 0 3 3h15Zm-7.5-6.5 1.157 2.345 2.588.376-1.872 1.825.442 2.577L12 20.407l-2.315 1.216.442-2.577-1.872-1.825 2.588-.376L12 14.5Z" />
      </svg>
    </div>

    {/* Paper Clip on the badge */}
    <div className="absolute left-5 -top-2.5">
      <PaperClip color="#0284c7" className="w-3.5 h-8 -rotate-12" />
    </div>

    {/* Text */}
    <span className="text-xs sm:text-sm tracking-wide font-medium ml-4 mr-2">
      Projects
    </span>

    {/* Folded Top-Right Corner Sticker */}
    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#0284c7] rounded-tr-sm clip-corner" />
  </div>
);

// Project Card Component
const ProjectCard = ({ project, rotation, clipColor, clipPosition = '-top-4 sm:-top-5 left-1/2 -translate-x-1/2' }) => {
  return (
    <a
      href={project.link || "#"}
      className={`relative group bg-white rounded-lg sm:rounded-xl shadow-md border border-black/5 p-1.5 sm:p-2 flex flex-col transition-all duration-300 ${rotation}`}
    >
      {/* Paperclip */}
      <div className={`absolute ${clipPosition}`}>
        <PaperClip color={clipColor} className="w-4 h-9 sm:w-5 sm:h-12" />
      </div>

      {/* Mac Window Dots */}
      <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:py-1 mb-0.5">
        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
      </div>

      {/* Image Container (Only image scales on hover) */}
      <div className="w-full aspect-[4/3] rounded-md overflow-hidden bg-neutral-100 relative cursor-pointer">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Card Info */}
      <div className="mt-1.5 px-1 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">
            {project.title}
          </h4>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase">{project.category}</span>
        </div>
        <p className="text-[9px] sm:text-[11px] text-gray-500 font-mono truncate">
          {project.tags}
        </p>
      </div>
    </a>
  );
};

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'Craftoria',
      category: 'Asset Discovery',
      tags: 'React • Typesense • MongoDB',
      description: 'Digital asset discovery platform with sub-50ms typo-tolerant search and masonry layouts.',
      image: '/projects/eliteverseportfolio.jpg',
      rotation: '-rotate-2 sm:-rotate-3',
      clipColor: '#4f46e5',
      clipPosition: '-top-4 sm:-top-5 left-1/3',
      link: '/project/craftoria'
    },
    {
      id: 2,
      title: 'Sugra Jewels',
      category: 'E-Commerce',
      tags: 'React • Node • Cloudinary',
      description: 'Production jewelry storefront with RBAC, persistent cart, real-time inventory and 90+ Lighthouse score.',
      image: '/projects/SugraJewels.jpg',
      rotation: 'rotate-1',
      clipColor: '#ec4899',
      clipPosition: '-top-4 sm:-top-5 left-1/2 -translate-x-1/2',
      link: '/project/sugra-jewels'
    },
    {
      id: 3,
      title: 'OnlyLoop',
      category: 'D2C Storefront',
      tags: 'Full-Stack • REST API',
      description: 'Direct-to-consumer store with compound index search, debounced filtering, and concurrent stock checks.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
      rotation: 'rotate-2 sm:rotate-3',
      clipColor: '#f59e0b',
      clipPosition: '-top-4 sm:-top-5 right-1/4',
      link: '/project/onlyloop'
    },
    {
      id: 4,
      title: 'KattalyxLabs',
      category: 'Multi-Portal App',
      tags: 'React • Microservices',
      description: 'Multi-portal platforms (Admin, School, Speaker) with automated bulk certificate export pipeline.',
      image: '/projects/kattalyxlabs.jpg',
      rotation: '-rotate-1 sm:-rotate-2',
      clipColor: '#0284c7',
      clipPosition: '-top-4 sm:-top-5 left-1/4',
      link: '/project/kattalyx-labs'
    },
    {
      id: 5,
      title: 'Curio.ai Admin CMS',
      category: 'Enterprise CMS',
      tags: 'React • RBAC • Dashboards',
      description: 'Enterprise curriculum CMS with complex validation workflows, RBAC data isolation, and low-latency tables.',
      image: '/projects/carovii.jpg',
      rotation: 'rotate-1 sm:rotate-2',
      clipColor: '#10b981',
      clipPosition: '-top-4 sm:-top-5 right-1/3',
      link: '/project/curio-ai'
    },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden flex flex-col items-center">
      {/* Background Hill/Sky Wallpaper */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter saturate-[1.1]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Googly Eyes (Top-Left) */}
      <div className="absolute top-6 left-6 z-10 hidden md:flex gap-1 select-none">
        <div className="w-5 h-5 bg-white rounded-full border border-black flex items-center justify-end pr-0.5 shadow-sm">
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
        </div>
        <div className="w-5 h-5 bg-white rounded-full border border-black flex items-center justify-end pr-0.5 shadow-sm">
          <div className="w-2.5 h-2.5 bg-black rounded-full" />
        </div>
      </div>

      {/* Title & Tag Group matching Screenshot */}
      <div className="relative z-10 flex flex-col items-center mb-8 sm:mb-12">
        <div className="relative flex flex-col items-start">
          {/* Tag placed on top left of title */}
          <div className="relative -mb-3 sm:-mb-4 -ml-4 sm:-ml-8 z-20">
            <ProjectsBadge />
          </div>

          {/* Bold Header */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1c1d1f] uppercase leading-[0.95] select-none drop-shadow-xs">
            PROJECTS THAT <br />
            TELL STORIES
          </h2>
        </div>
      </div>

      {/* Responsive Projects Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Row 1: 3 Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-5 md:gap-6 mb-6">
          {projects.slice(0, 3).map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              rotation={proj.rotation}
              clipColor={proj.clipColor}
              clipPosition={proj.clipPosition}
            />
          ))}
        </div>

        {/* Row 2: 2 Cards Centered */}
        <div className="w-full max-w-2xl sm:max-w-xl md:max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-5 md:gap-6">
          {projects.slice(3, 5).map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              rotation={proj.rotation}
              clipColor={proj.clipColor}
              clipPosition={proj.clipPosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}