import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa';
import me2Img from '../assets/Me2.png';

export default React.forwardRef(function Footer(props, ref) {
  const [copied, setCopied] = useState(false);
  const emailAddress = "krishnawork2606@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      ref={ref}
      className="relative w-full bg-[#FAFAF8] text-[#1B1B1B] overflow-hidden pt-12 md:pt-16 pb-0 select-none border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">
          
          {/* ================= LEFT COLUMN: PHILOSOPHY ================= */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-6 pb-6 lg:pb-12 order-2 lg:order-1">
            {/* Header: Handwritten Script */}
            <span
              className="text-[#9E9E9E] text-2xl sm:text-3xl font-normal tracking-wide"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              My Philosophy
            </span>

            {/* Paragraph 1 */}
            <p className="text-[#202020] text-sm sm:text-base leading-relaxed font-sans font-normal max-w-sm">
              In short, I'm someone who{' '}
              <span className="bg-[#4ADE80] text-black px-1.5 py-0.5 rounded font-medium shadow-[0_1px_3px_rgba(74,222,128,0.3)]">
                enjoys working in messy, complex spaces
              </span>{' '}
              and making them clearer and more human.
            </p>

            {/* Paragraph 2 */}
            <p className="text-[#202020] text-sm sm:text-base leading-relaxed font-sans font-normal max-w-sm">
              I do that by{' '}
              <span className="bg-[#4ADE80] text-black px-1.5 py-0.5 rounded font-medium shadow-[0_1px_3px_rgba(74,222,128,0.3)]">
                experimenting to learn, shaping clear stories
              </span>{' '}
              that help people align, and{' '}
              <span className="bg-[#4ADE80] text-black px-1.5 py-0.5 rounded font-medium shadow-[0_1px_3px_rgba(74,222,128,0.3)]">
                designing systems with care
              </span>{' '}
              for the small details that quietly shape how something feels.
            </p>
          </div>

          {/* ================= CENTER COLUMN: ILLUSTRATION & CHAT BUBBLE ================= */}
          <div className="lg:col-span-4 flex flex-col items-center justify-end relative order-1 lg:order-2">
            
            {/* Blue Chat Bubble */}
            <div className="relative mb-2 flex flex-col items-center">
              <span className="text-[12px] sm:text-[13px] font-sans text-neutral-400 font-medium tracking-wide mb-1 self-start ml-3">
                Krishna
              </span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-[#007AFF] text-white text-sm sm:text-[15px] font-medium px-4 py-2.5 rounded-[20px] rounded-bl-sm shadow-md flex items-center justify-center whitespace-nowrap"
              >
                If this made sense, lets chat!
                {/* Speech tail */}
                <div 
                  className="absolute -bottom-1.5 left-3 w-3 h-3 bg-[#007AFF] [clip-path:polygon(0_0,100%_0,0_100%)]" 
                />
              </motion.div>
            </div>

            {/* Avatar / Boy Illustration */}
            <div className="relative w-44 sm:w-56 md:w-64 max-w-full flex items-end justify-center">
              <img
                src={me2Img}
                alt="Krishna Illustration"
                className="w-full h-auto object-contain pointer-events-none drop-shadow-sm select-none"
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN: DOODLE ARROWS & ACTIONS ================= */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-center justify-end pb-8 lg:pb-14 space-y-4 order-3">
            
            {/* Doodle Downward Arrows (3 arrows) */}
            <div className="flex items-center gap-3 text-neutral-300 select-none pb-1">
              <svg className="w-5 h-6 stroke-neutral-300 fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="w-5 h-6 stroke-neutral-300 fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="w-5 h-6 stroke-neutral-300 fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 4v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Email Pill: Clickable to Copy */}
            <div className="flex flex-col items-center">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                title="Click to copy email"
                className="relative px-6 sm:px-7 py-2.5 rounded-full border-2 border-[#1E1E1E] text-[#1E1E1E] font-medium text-base sm:text-lg bg-transparent hover:bg-neutral-100/70 transition-all cursor-pointer flex items-center justify-center shadow-xs"
                style={{
                  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px', // Hand-drawn border effect
                }}
              >
                <span>{copied ? "Copied to clipboard!" : emailAddress}</span>
              </motion.button>
              
              <span
                className="text-neutral-500 text-xs sm:text-sm mt-1.5"
                style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
              >
                tap to copy
              </span>
            </div>

            {/* LinkedIn Pill: Hand-drawn outline style */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-7 sm:px-9 py-2.5 rounded-full border-2 border-[#1E1E1E] text-[#1E1E1E] font-medium text-base sm:text-lg bg-transparent hover:bg-neutral-100/70 transition-all cursor-pointer flex items-center gap-2.5 shadow-xs"
              style={{
                borderRadius: '25px 225px 20px 255px/225px 20px 255px 25px', // Hand-drawn border effect
              }}
            >
              <div className="w-5 h-5 rounded-[4px] border border-[#1E1E1E] flex items-center justify-center p-0.5">
                <FaLinkedinIn className="text-xs text-[#1E1E1E]" />
              </div>
              <span className="font-semibold text-base sm:text-lg tracking-tight">LinkedIn</span>
            </motion.a>

          </div>

        </div>
      </div>
    </footer>
  );
});