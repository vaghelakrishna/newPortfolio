import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import { Mail, Check } from 'lucide-react';
import footerBg from '../assets/footer-bg.png';

export default React.forwardRef(function Footer(props, ref) {
  const [copied, setCopied] = useState(false);
  const emailAddress = "krishnawork2606@gmail.com";

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer ref={ref} className="relative w-full overflow-hidden font-sans select-none bg-[#FBE3ED]">
      
      {/* 
        ASPECT-RATIO LOCKED SCENIC CONTAINER (1319 / 1193)
        Exactly maps the artwork coordinates so text and floating pills sit 
        in their exact designed places regardless of viewport scale.
      */}
      <div className="relative w-full max-w-[1419px] mx-auto aspect-[1319/1193] overflow-hidden">

        {/* 1. SCENIC BACKGROUND COLLAGE (Dog, Cat, Duck, Chair on Hill) */}
        <img 
          src={footerBg} 
          alt="Footer Artwork" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* 2. TOP TYPOGRAPHY: Positioned in the upper sky zone (0% to 32% from top) */}
        <div className="absolute top-[5%] sm:top-[6%] md:top-[7%] inset-x-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none">
          <h2 className="text-[2.2rem] xs:text-[2.8rem] sm:text-[4rem] md:text-[5.2rem] lg:text-[6.4rem] font-bold text-[#1A1A1A] tracking-tight leading-none mb-1 sm:mb-2">
            let's talk
          </h2>
          <p 
            className="text-[0.8rem] xs:text-[1rem] sm:text-[1.3rem] md:text-[1.65rem] lg:text-[1.95rem] text-[#3D5A45] leading-snug px-2"
            style={{ fontFamily: "'Caveat', cursive, Georgia" }}
          >
            connection. presence. join the conversation<br />
            there is a place for every idea
          </p>
        </div>

        {/* 3. LEFT PILL: BLUE RESUME BUTTON (Positioned around 36% top, 14% left) */}
        <div className="absolute top-[36%] left-[8%] sm:left-[12%] md:left-[15%] z-20">
          <motion.a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center bg-[#1A62FF] hover:bg-blue-700 text-white font-bold text-[10px] xs:text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] px-3.5 sm:px-5 md:px-7 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-[0_6px_20px_rgba(26,98,255,0.35)] -rotate-6 transition-transform cursor-pointer"
          >
            Resume
          </motion.a>
        </div>

        {/* 4. RIGHT PILL: YELLOW EMAIL BADGE (Positioned around 28% top, right side) */}
        <div className="absolute top-[27%] sm:top-[28%] right-[6%] sm:right-[10%] md:right-[14%] z-20">
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            title="Click to copy email"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F6C944] hover:bg-[#EBBF39] text-[#1E1C1A] font-bold text-[9px] xs:text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-md -rotate-6 transition-transform cursor-pointer border border-yellow-500/20"
          >
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 stroke-[2.5]" />
            <span>{copied ? "Copied!" : emailAddress}</span>
            {copied && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-800 stroke-[3]" />}
          </motion.button>
        </div>

        {/* 5. RIGHT PILL: BLUE LINKEDIN CIRCLE (Positioned around 37% top, right side below email) */}
        <div className="absolute top-[37%] right-[14%] sm:right-[17%] md:right-[20%] z-20">
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, rotate: 6 }}
            whileTap={{ scale: 0.92 }}
            className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#0077B5] hover:bg-[#00669c] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,119,181,0.35)] rotate-6 transition-transform cursor-pointer"
          >
            <FaLinkedinIn className="text-sm xs:text-base sm:text-xl md:text-2xl" />
          </motion.a>
        </div>

      </div>

    </footer>
  );
});