import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUp, CheckCircle2, Layers, Cpu, Code2, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Local Asset fallbacks
import caroviiAsset from '../assets/carovii.png';
import canvaelementsAsset from '../assets/canvaelements.png';
import kattalyxAsset from '../assets/kattalyx.webp';

const projectsData = {
  "carovii": {
    title: "Carovii",
    category: "Web Application / Tool",
    year: "2026",
    img: caroviiAsset,
    color: "#e1306c",
    tagline: "Seamless Instagram carousel slicing & instant export directly in the browser.",
    desc: "A browser-based Instagram carousel creation tool enabling creators to slice, preview, and export seamless panoramic multi-slide posts with zero sign-up and no watermarks.",
    role: "Full Stack Developer / Creator",
    team: "Solo / Independent",
    timeline: "2026",
    skills: "React.js, Tailwind CSS, HTML5 Canvas API, Lucide React, Framer Motion, JSZip, FileSaver.js, Vercel",
    context: "Content creators and social media marketers often need to split wide banners and panoramas into seamless multi-slide carousels, but existing tools add watermarks, mandate logins, or compress quality.",
    solution: "Built a client-side image processing utility utilizing the HTML5 Canvas API to calculate grid aspect ratios (1:1 and 4:5), render real-time interactive carousel swipe previews, and export sequential ZIP archives instantly without server bottlenecks.",
    highlights: [
      "Client-side seamless image splitting with lossless output using the HTML5 Canvas API.",
      "Real-time interactive swipeable preview simulating the native Instagram post experience.",
      "Customizable slide splitting with automatic 1:1 and 4:5 portrait ratio constraint handling.",
      "Instant multi-slide export bundled into sequential ZIP archives via JSZip and FileSaver."
    ],
    features: [
      {
        title: "Lossless Canvas Slicing",
        desc: "Uses sub-pixel calculation on HTML5 canvas buffers to mathematically divide panoramas without compression artifacts or jagged edge seams."
      },
      {
        title: "Aspect Ratio Presets",
        desc: "Instant one-tap toggle between 1:1 square feeds and 4:5 portrait formats matching official Meta distribution guidelines."
      },
      {
        title: "Interactive Swiper Simulator",
        desc: "Simulates exact touch momentum and swipe physics so creators can visually test continuity across frame boundaries before downloading."
      },
      {
        title: "Zero-Server Zip Packaging",
        desc: "All slicing and zip compression executes in browser memory via JSZip, ensuring 100% private data handling and zero hosting egress cost."
      }
    ],
    architecture: [
      { step: "01. Upload", detail: "File reader ingestion with instant EXIF orientation normalization." },
      { step: "02. Geometry Calc", detail: "Computes slice coordinates based on requested slide count (2-10)." },
      { step: "03. Virtual Canvas", detail: "Extracts individual slices onto dedicated offscreen canvas nodes." },
      { step: "04. Client ZIP Export", detail: "Encodes blobs as PNG/JPG and packages numbered assets into a clean ZIP archive." }
    ],
    learnings: [
      {
        title: "Client-side computing reduces operational overhead",
        desc: "Running image operations entirely in browser memory eliminated backend server costs, latency, and privacy compliance hurdles."
      },
      {
        title: "Framer Motion gesture handling beats third-party swipers",
        desc: "Building a custom swipe preview with Framer Motion resulted in a smaller bundle size and tighter animation timing than generic slider libraries."
      }
    ]
  },
  "canvaelements": {
    title: "CanvaElements",
    category: "Developer Tool / Asset Library",
    year: "2026",
    img: canvaelementsAsset,
    color: "#00c4cc",
    tagline: "Discover, inspect, and copy SVG elements & UI assets with sub-second speeds.",
    desc: "A developer tool and asset utility designed to extract, inspect, and manage SVG shapes, design elements, and graphic assets for modern UI creators.",
    role: "Full Stack Developer / Creator",
    team: "Solo / Creator",
    timeline: "2026",
    skills: "React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Lucide React, Framer Motion, Vercel",
    context: "UI designers and front-end developers frequently need quick access to clean, scalable graphic assets and design elements without wading through bloated asset marketplaces.",
    solution: "Engineered a lightning-fast asset discovery platform featuring categorized element browsing, live SVG code inspection, one-click copy utilities, and a secure backend for scalable asset management.",
    highlights: [
      "Dynamic asset categorization with instant search and responsive grid filtering.",
      "Live SVG code preview and one-click clipboard copying for seamless developer handoff.",
      "Optimized asset rendering pipelines using modern frontend frameworks and responsive CSS layouts.",
      "Scalable backend architecture supporting metadata indexing and fast query retrieval."
    ],
    features: [
      {
        title: "Live SVG Code Inspection",
        desc: "View raw SVG XML markup, stroke properties, fill rules, and viewBox dimensions side-by-side with interactive visual renders."
      },
      {
        title: "One-Click React/JSX Export",
        desc: "Automatically converts standard SVG markup into clean, camelCased React component snippets ready to paste directly into codebases."
      },
      {
        title: "Faceted Taxonomy Filtering",
        desc: "Search through curated collections of geometric badges, abstract blobs, doodles, and 3D wireframes with zero debounce lag."
      },
      {
        title: "Optimized SVG Sanitization",
        desc: "Strips unneeded metadata, XML tags, and editor artifacts to minimize final SVG payload weight by up to 35%."
      }
    ],
    architecture: [
      { step: "01. Parsing & Cleaning", detail: "Sanitizes raw SVG XML streams and strips bloated editor namespaces." },
      { step: "02. Metadata Tagging", detail: "Indexes shapes by style, stroke weight, category, and complexity." },
      { step: "03. Virtual Grid View", detail: "Renders vector elements inside an optimized responsive layout with low GPU overhead." },
      { step: "04. Clipboard API", detail: "Copies clean SVG or React JSX directly to user clipboard with confirmation feedback." }
    ],
    learnings: [
      {
        title: "Developer handoff needs zero-friction UX",
        desc: "Adding one-click React JSX formatting made the tool 10x more useful for devs compared to just offering raw SVG downloads."
      },
      {
        title: "Vector rendering optimization matters",
        desc: "Rendering hundreds of inline SVGs simultaneously can cause lag; virtualization and simplified preview paths keep 60 FPS scrolling intact."
      }
    ]
  },
  "craftoria": {
    title: "Craftoria",
    category: "Full-Stack Development",
    year: "2026",
    img: "/projects/eliteverseportfolio.jpg",
    color: "#4f46e5",
    tagline: "Sub-50ms typo-tolerant digital asset discovery platform with multi-format downloads.",
    desc: "A digital asset discovery & search platform supporting multi-format downloads (PNG/SVG/WebP), persistent bookmark collections, and sub-50ms typo-tolerant search.",
    role: "Full Stack Developer",
    team: "Solo / Independent",
    timeline: "2026",
    skills: "React.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, Typesense, Cloudinary, Framer Motion, JWT",
    context: "Creative designers and developers frequently struggle with cluttered asset libraries that lack fast, typo-tolerant search and high-speed image rendering.",
    solution: "Engineered a production platform integrating Typesense for faceted search across semantic tags, dynamic Masonry layouts with Cloudinary on-the-fly transformations, and a secure Admin CMS for bulk asset uploads.",
    highlights: [
      "Typo-tolerant sub-50ms faceted search across tags, styles, and color palettes with Typesense.",
      "Optimized UI render latency by ~45% via dynamic Masonry grid and automated Cloudinary transformations.",
      "Protected Admin CMS with JWT authentication managing bulk uploads and indexing pipelines.",
      "Support for multi-format downloads (PNG, SVG, WebP) and persistent user collections."
    ],
    features: [
      {
        title: "Sub-50ms Instant Search",
        desc: "Direct Typesense cluster indexing enables instant search results with phonetic matching and typo tolerance on every single keystroke."
      },
      {
        title: "Dynamic Responsive Masonry",
        desc: "Pure CSS and JS balanced column distribution preventing image reflows and layout shifting during rapid infinite scrolls."
      },
      {
        title: "Automated Image Pipeline",
        desc: "Cloudinary f_auto/q_auto transformations convert high-res master uploads into lightweight WebP thumbnails tailored to client DPR."
      },
      {
        title: "Admin Ingestion Console",
        desc: "Protected dashboard allowing authenticated admins to bulk upload assets, tag categories, and trigger instant re-indexing."
      }
    ],
    architecture: [
      { step: "01. Search Query", detail: "Keystroke events dispatch debounced queries to the fast Typesense search engine." },
      { step: "02. Index Querying", detail: "Faceted attributes filter tags, colors, and format flags in under 30 milliseconds." },
      { step: "03. Cloudinary CDN", detail: "Images stream from globally edge-cached CDN with automatic DPR and format optimization." },
      { step: "04. Mongo Persistence", detail: "User likes, collections, and analytics sync securely through JWT authenticated endpoints." }
    ],
    learnings: [
      {
        title: "Dedicated search engines outshine database queries",
        desc: "Moving search from MongoDB regex queries to Typesense decreased server response times from 350ms to less than 40ms."
      },
      {
        title: "Image optimization is essential for visual discovery",
        desc: "Using modern WebP compression cut total page payload by 60%, delivering a 95+ score on Google Lighthouse."
      }
    ]
  },
  "sugra-jewels": {
    title: "Sugra Jewels",
    category: "E-Commerce Platform",
    year: "2026",
    img: "/projects/SugraJewels.jpg",
    color: "#ec4899",
    tagline: "High-trust luxury jewelry storefront with RBAC admin and real-time inventory locking.",
    desc: "A production-grade luxury jewelry storefront engineered with React, TypeScript, and Node.js featuring persistent cart state, real-time inventory checks, and an admin management suite.",
    role: "Full Stack Developer",
    team: "Client / Freelance",
    timeline: "2026",
    skills: "React.js, TypeScript, Node.js, Express.js, MongoDB, JWT, Cloudinary, Tailwind CSS, Framer Motion",
    context: "Fine jewelry sales require high-trust visuals, frictionless shopping carts, and strict real-time stock integrity to avoid accidental zero-stock checkouts.",
    solution: "Architected a full-stack platform with RBAC authentication separating customer storefronts from management portals, automated stock validation, and 90+ Lighthouse mobile performance.",
    highlights: [
      "Role-Based Access Control (RBAC) via JWT isolating customers and administrative managers.",
      "Full CRUD Admin Dashboard for collections, product catalog, dynamic price tiers, and stock alerts.",
      "Edge-case automated checkout locks restricting zero-stock purchases across concurrent sessions.",
      "Cloudinary f_auto/q_auto optimization reducing image payload by 60% and achieving 90+ Lighthouse score."
    ],
    features: [
      {
        title: "Concurrent Inventory Locking",
        desc: "Guards against race conditions during high-demand drops by executing atomic checks on checkout initiation."
      },
      {
        title: "Persistent Cart State",
        desc: "Stores user bag selections across session restarts with automatic stock re-validation upon bag re-opening."
      },
      {
        title: "Curated Collection Showcases",
        desc: "Full-width editorial storytelling components featuring zoomable product details and multi-angle macro previews."
      },
      {
        title: "Role-Based Administrative Portal",
        desc: "Enables store owners to manage product variants, metal carats, dynamic pricing, and order fulfillment status."
      }
    ],
    architecture: [
      { step: "01. Product Catalog", detail: "Indexed MongoDB collections with fast filtering by metal, gem type, and price range." },
      { step: "02. Real-Time Cart", detail: "Client-side state synchronization with server-backed session verification." },
      { step: "03. Checkout Guard", detail: "Atomic inventory reserve operation preventing over-selling of single-piece jewelry." },
      { step: "04. Fulfillment Pipeline", detail: "Admin portal tracks invoice lifecycle from payment received to dispatch." }
    ],
    learnings: [
      {
        title: "E-commerce trust depends on speed and polish",
        desc: "Luxury buyers abandon slow sites. Polishing layout shifts and micro-interactions directly improved user checkout confidence."
      },
      {
        title: "Concurrency requires atomic database operations",
        desc: "Simple check-then-write logic fails during concurrent cart checkouts; Mongoose findOneAndUpdate with condition locks resolved race conditions."
      }
    ]
  },
  "onlyloop": {
    title: "OnlyLoop",
    category: "D2C E-Commerce",
    year: "2026",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
    color: "#f59e0b",
    tagline: "Direct-to-Consumer storefront with compound indexing and debounced instant filtering.",
    desc: "An end-to-end Direct-to-Consumer e-commerce storefront with dynamic multi-category filtering, debounced catalog search, and protected operational fulfillment consoles.",
    role: "Full Stack Engineer",
    team: "Independent Project",
    timeline: "2026",
    skills: "React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, Tailwind CSS, REST APIs",
    context: "High-volume D2C catalogs experience performance bottlenecks when unfiltered search triggers heavy database read loads on every keystroke.",
    solution: "Engineered client-side custom debounce logic and MongoDB compound indexing that cut redundant API calls by 40% while ensuring transactional consistency during simultaneous checkouts.",
    highlights: [
      "Dynamic multi-category filtering and responsive checkout user flows.",
      "RBAC across Express middleware protecting inventory fulfillment and order lifecycle tracking.",
      "Real-time stock validation at checkout to ensure transactional consistency across concurrent sessions.",
      "Compound MongoDB indexing + client debounce trimming redundant backend calls by 40%."
    ],
    features: [
      {
        title: "Compound Indexed Catalog",
        desc: "Optimized database read queries allowing multi-parameter filtering (category, price range, stock status) in under 20ms."
      },
      {
        title: "Adaptive Debounce Search",
        desc: "Reduces server load by throttling client search requests until 250ms of typing inactivity occurs."
      },
      {
        title: "Mobile-First Ergonomics",
        desc: "Sticky checkout trays, bottom sheets, and haptic-feel touch triggers built specifically for handheld shopping."
      },
      {
        title: "Fulfillment Management Console",
        desc: "Back-office order dashboard with order status progression and shipping tracking updates."
      }
    ],
    architecture: [
      { step: "01. Client Input", detail: "Debounced search triggers API request only when user finishes typing keyword." },
      { step: "02. Express Middleware", detail: "Validates input sanitization and applies JWT auth for account-bound actions." },
      { step: "03. Compound Queries", detail: "Queries MongoDB using pre-computed compound indexes for instant sorting." },
      { step: "04. Order Lifecycle", detail: "Tracks state changes from Pending -> Processing -> Shipped with automated logs." }
    ],
    learnings: [
      {
        title: "Index design dictates API scalability",
        desc: "Creating targeted compound indexes on category and price fields decreased database CPU usage by over 50% under load."
      },
      {
        title: "Mobile shoppers prefer clean bottom sheets",
        desc: "Replacing complex modal popups with mobile-friendly bottom trays improved mobile test session completion."
      }
    ]
  },
  "kattalyx-labs": {
    title: "KattalyxLabs",
    category: "Full-Stack Development",
    year: "2026",
    img: "/projects/kattalyxlabs.jpg",
    color: "#0284c7",
    tagline: "Multi-portal enterprise architecture with automated Excel-to-Certificate generation pipelines.",
    desc: "Architected multi-portal enterprise web applications (Admin, School, and Speaker dashboards) supporting hybrid learning and automated batch operations.",
    role: "Full-Stack Developer",
    team: "KattalyxLabs Team",
    timeline: "Jan 2026 - Present",
    skills: "React.js, Node.js, Express.js, MongoDB, RESTful APIs, Excel Parsing, Microservices",
    context: "Managing physical-digital hybrid educational sessions required distinct portals for schools, administrators, and guest speakers without data overlap.",
    solution: "Engineered scalable REST microservices and automated an Excel-driven certificate generation pipeline saving over 90% of manual processing time.",
    highlights: [
      "Multi-portal architecture: unified Admin, School, and Speaker dashboards.",
      "Automated bulk certificate engine parsing spreadsheets to generate custom certificates and one-click ZIP exports.",
      "Redesigned the official company web presence with high-performance responsive UI components."
    ],
    features: [
      {
        title: "Automated Certificate Pipeline",
        desc: "Processes student attendee spreadsheets, generates personalized certificates, and bundles exports into ZIP archives in seconds."
      },
      {
        title: "Role-Isolated Multi-Portal",
        desc: "Separates Admin governance, School institutional tracking, and Guest Speaker session calendars with strict access control."
      },
      {
        title: "Session Feedback Engine",
        desc: "Gathers attendee evaluations and computes aggregated satisfaction scores for school administrators."
      },
      {
        title: "High-Performance Marketing Site",
        desc: "Designed and engineered the public web portal with responsive layouts and accessible component structures."
      }
    ],
    architecture: [
      { step: "01. Excel Ingestion", detail: "Parses Excel/CSV spreadsheets on server workers with schema validation." },
      { step: "02. Template Synthesis", detail: "Draws recipient names and unique credential IDs onto high-res certificate templates." },
      { step: "03. Streamed ZIP Packaging", detail: "Streams generated PDFs/images into a single compressed download archive." },
      { step: "04. Portal Authorization", detail: "JWT RBAC restricts data access strictly between School and Speaker entities." }
    ],
    learnings: [
      {
        title: "Automating manual repetitive tasks creates immense ROI",
        desc: "Turning a 4-hour manual certificate creation task into a 30-second bulk script saved countless operational work hours."
      },
      {
        title: "Data isolation between enterprise roles is critical",
        desc: "Isolating database queries per institution prevented accidental cross-school data leaks and established institutional trust."
      }
    ]
  },
  "curio-ai": {
    title: "Curio.ai Admin CMS",
    category: "Frontend Development",
    year: "2025",
    img: "/projects/carovii.jpg",
    color: "#10b981",
    tagline: "Enterprise hierarchical curriculum CMS with complex validation workflows and RBAC.",
    desc: "An enterprise Admin CMS enabling centralized management of multi-tier educational curriculums across subjects, chapters, topics, and subtopics.",
    role: "Frontend Developer Intern",
    team: "Curio.ai Team",
    timeline: "July 2025 - Oct 2025",
    skills: "React.js, RBAC, RESTful APIs, Form Validation, State Optimization",
    context: "Authoring and maintaining hundreds of modular learning curriculums was error-prone and lacked granular access control between institutions.",
    solution: "Engineered dynamic multi-step form workflows with validation states and RBAC filtering to enforce data privacy and low-latency dashboard tables.",
    highlights: [
      "Centralized curriculum management hierarchy: Subjects -> Chapters -> Topics -> Subtopics.",
      "Role-Based Access Control and multi-criteria client-side search guaranteeing institution-level privacy.",
      "Optimized state management for low-latency rendering across data-heavy dashboard tables."
    ],
    features: [
      {
        title: "Hierarchical Tree Management",
        desc: "Interactive curriculum navigation traversing from broad subjects down to granular interactive subtopic modules."
      },
      {
        title: "Multi-Step Form Validation",
        desc: "Ensures comprehensive lesson planning with instant visual validation for media embeds, quizzes, and learning objectives."
      },
      {
        title: "Fast Table Search & Filter",
        desc: "Client-side filtered tables managing hundreds of concurrent curriculum nodes without interface freezing."
      },
      {
        title: "RBAC Module Permissions",
        desc: "Restricts edit access to assigned curriculum authors while granting read-only oversight to review boards."
      }
    ],
    architecture: [
      { step: "01. Tree Node Selection", detail: "Selecting hierarchy levels updates dynamic sub-module query contexts." },
      { step: "02. Form Engine", detail: "Validates field schemas before triggering asynchronous patch requests." },
      { step: "03. Normalized Store", detail: "Maintains centralized curriculum entities to prevent duplicate network calls." },
      { step: "04. Access Guard", detail: "Enforces role capabilities across all edit, delete, and publish triggers." }
    ],
    learnings: [
      {
        title: "Complex state requires normalized data models",
        desc: "Flattening nested curriculum trees in React state eliminated redundant re-renders across parent components."
      },
      {
        title: "Early form validation saves backend cycles",
        desc: "Validating edge-case input constraints on the client reduced invalid draft submissions by nearly 80%."
      }
    ]
  }
};

const toc = [
  { id: 'overview', label: '01. Overview' },
  { id: 'context', label: '02. Context & Challenge' },
  { id: 'solution', label: '03. Solution & Highlights' },
  { id: 'features', label: '04. Core Features' },
  { id: 'architecture', label: '05. Architecture' },
  { id: 'learnings', label: '06. Key Learnings' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const project = projectsData[id];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const observers = toc.map(({ id: sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [id]);

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // If invalid project ID, show clean Not Found view instead of silent fallback
  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 bg-[#F9F6F0] text-[#2D2D2D] select-none text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFECE3] border border-[#DBD6C9] flex items-center justify-center text-2xl mb-4">
            🔍
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">Project Not Found</h2>
          <p className="text-[#635F55] max-w-md text-sm leading-relaxed mb-6">
            The project identifier <code className="bg-[#E3DEC0]/50 px-2 py-0.5 rounded text-black font-mono font-semibold">{id}</code> doesn't exist or may have been renamed.
          </p>
          <button
            onClick={() => navigate('/project')}
            className="flex items-center gap-2 bg-[#E25C1D] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Explore All Projects
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen bg-[#F9F6F0] text-[#2D2D2D] font-sans px-4 py-12 md:px-10 select-none"
      >
        <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
          
          {/* ================= LEFT SIDEBAR (STICKY TOC) ================= */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-12 space-y-6">
              
              <button
                onClick={() => navigate('/project')}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7C7667] hover:text-[#2D2D2D] transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Projects
              </button>

              <div className="bg-[#EFECE3] p-5 rounded-2xl border border-[#DBD6C9] shadow-xs">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667] mb-3">
                  Table of Contents
                </h3>
                <ul className="space-y-2.5">
                  {toc.map(({ id: sectionId, label }) => (
                    <li
                      key={sectionId}
                      onClick={() => scrollTo(sectionId)}
                      className={`text-xs cursor-pointer transition-all duration-200 py-0.5 ${
                        activeSection === sectionId
                          ? 'text-[#E25C1D] font-bold pl-1 border-l-2 border-[#E25C1D]'
                          : 'text-[#635F55] font-medium hover:text-[#2D2D2D]'
                      }`}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#635F55] hover:text-black transition-colors cursor-pointer"
              >
                <ArrowUp size={13} /> Back to top
              </button>

            </div>
          </aside>

          {/* ================= MAIN CASE STUDY CONTENT ================= */}
          <main className="flex-1 max-w-3xl space-y-16">

            {/* 01. OVERVIEW & HERO */}
            <section id="overview" className="space-y-6">
              
              {/* Hero Banner Image */}
              <div className="w-full h-80 sm:h-96 bg-white rounded-3xl border border-[#DBD6C9] overflow-hidden shadow-sm relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#E3DEC0]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4D4940] border border-[#DBD6C9]/60">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-200">
                  Shipped · {project.year}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-[#222]">
                  <span className="text-[#E25C1D] mr-2 font-mono">*</span>
                  {project.title}
                </h1>
                <p className="text-lg sm:text-xl text-[#555] font-serif italic mt-2 leading-relaxed">
                  "{project.tagline}"
                </p>
                <p className="text-base text-[#635F55] leading-relaxed mt-4">
                  {project.desc}
                </p>
              </div>

              {/* Metadata 4-Box Grid */}
              <div
                className="rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-white shadow-sm"
                style={{ backgroundColor: project.color }}
              >
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Role</h4>
                  <p className="text-xs sm:text-sm font-semibold">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Team</h4>
                  <p className="text-xs sm:text-sm font-semibold">{project.team}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Timeline</h4>
                  <p className="text-xs sm:text-sm font-semibold">{project.timeline}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Stack</h4>
                  <p className="text-xs sm:text-sm font-semibold truncate" title={project.skills}>
                    {project.skills.split(',')[0]}, {project.skills.split(',')[1]}...
                  </p>
                </div>
              </div>
            </section>

            {/* 02. CONTEXT & THE CHALLENGE */}
            <section id="context" className="space-y-4 pt-4 border-t border-[#DBD6C9]/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">
                02. Context & The Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
                Understanding the friction
              </h2>
              <div className="bg-[#EFECE3] border border-[#DBD6C9] p-6 sm:p-7 rounded-2xl">
                <p className="text-base text-[#524E45] leading-relaxed">
                  {project.context}
                </p>
              </div>
            </section>

            {/* 03. ENGINEERED SOLUTION & HIGHLIGHTS */}
            <section id="solution" className="space-y-6 pt-4 border-t border-[#DBD6C9]/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">
                03. The Solution
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
                How we architected the system
              </h2>
              <p className="text-base text-[#635F55] leading-relaxed">
                {project.solution}
              </p>

              {/* Highlights Bullet List */}
              <div className="bg-[#FAF8F5] border border-[#DBD6C9] p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#7C7667] flex items-center gap-2">
                  <Sparkles size={14} className="text-[#E25C1D]" /> Key Engineering Highlights
                </h3>
                <div className="space-y-3">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#E25C1D] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#3E3A33] font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 04. CORE FEATURES */}
            <section id="features" className="space-y-6 pt-4 border-t border-[#DBD6C9]/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">
                04. Core Features
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
                Engineered for speed & ergonomics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-[#EFECE3] border border-[#DBD6C9] p-6 rounded-2xl flex flex-col justify-between hover:border-[#C4BFAF] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#7C7667] block mb-2">
                        MODULE 0{i + 1}
                      </span>
                      <h3 className="text-base font-bold text-[#2B2A27] mb-2">{feat.title}</h3>
                      <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. ARCHITECTURE WORKFLOW */}
            <section id="architecture" className="space-y-6 pt-4 border-t border-[#DBD6C9]/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">
                05. Architecture Pipeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
                Data flow & execution pipeline
              </h2>

              <div className="space-y-3">
                {project.architecture.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#FAF8F5] border border-[#DBD6C9] p-4 sm:p-5 rounded-xl flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EFECE3] border border-[#DBD6C9] flex items-center justify-center font-mono font-bold text-xs text-[#2B2A27] shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2B2A27]">{item.step}</h4>
                      <p className="text-xs sm:text-sm text-[#635F55] mt-0.5 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 06. KEY LEARNINGS & REFLECTION */}
            <section id="learnings" className="space-y-6 pt-4 border-t border-[#DBD6C9]/60 pb-12">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">
                06. Key Learnings & Takeaways
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D2D2D]">
                What this build taught me
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.learnings.map((learn, i) => (
                  <div
                    key={i}
                    className="bg-[#EFECE3] border border-[#DBD6C9] p-6 rounded-2xl"
                  >
                    <h4 className="text-sm font-bold text-[#2B2A27] mb-2">{learn.title}</h4>
                    <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">{learn.desc}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-6 flex items-center justify-between">
                <button
                  onClick={() => navigate('/project')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D2D2D] hover:text-[#E25C1D] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} /> View Other Projects
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7C7667] hover:text-black transition-colors cursor-pointer"
                >
                  <ArrowUp size={14} /> Back to top
                </button>
              </div>

            </section>

          </main>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
