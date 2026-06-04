import React from 'react';
import { motion } from 'framer-motion';

const HeresHowSection = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-32 bg-[#FAF9F6] overflow-hidden">

      {/* 1. Illustration & Rays */}
      <div className="relative mb-8">
        <div className="absolute inset-0 -m-20 pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-black stroke-[1.5] fill-none" strokeLinecap="round">
            <path d="M100,20 L100,5" />
            <path d="M145,45 L170,20" />
            <path d="M180,100 L205,95" />
            <path d="M55,45 L30,20" />
            <path d="M20,100 L-5,95" />
            <path d="M45,150 Q25,160 15,190" />
            <path d="M155,150 Q175,160 185,190" />
          </svg>
        </div>

        {/* Floating Question */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max">
          <span className="text-gray-400 text-xs italic opacity-90" style={{ fontFamily: "'Gochi Hand', cursive" }}>
            Okay so... how do i do that?
          </span>
        </div>

        <div className="relative w-40 h-40 md:w-40 md:h-40">
          <img
            src="/src/assets/me.png"
            alt="Arjun Illustration"
            className="w-full h-full object-contain grayscale"
          />
        </div>
      </div>

      {/* 3. Heading with One-Time Animation */}
      <div className="text-center mt-4">
        <h2 className="text-4xl md:text-7xl font-bold text-[#222] tracking-tighter flex flex-wrap justify-center items-center gap-x-4">
          <span>Here's</span>
          <span className="relative inline-block">
            how

            <div className="absolute -bottom-2 left-0 w-full h-[10px] md:h-[14px]">
              <svg
                viewBox="0 0 100 8"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 83.809 6.07 C 84.458 4.878 63.184 1.99 61.24 1.781 C 45.485 0.085 29.958 -0.018 14.169 1.444 C 9.613 1.865 5.132 2.58 0.642 3.198 C -0.837 3.401 0.598 3.397 1.372 3.468 C 8.252 4.099 15.143 4.675 22.07 5.091 C 42.269 6.306 62.507 6.556 82.779 6.9 C 88.285 6.994 94.02 7.126 99.498 6.739 C 100.09 6.697 100.199 6.588 99.606 6.406 C 97.199 5.671 94.37 5.214 91.759 4.844 C 74.569 2.414 56.591 1.946 39.003 2.657 C 32.425 2.923 25.686 3.284 19.232 4.139 C 18.478 4.239 17.727 4.346 16.975 4.449 C 16.198 4.556 18.501 4.743 19.293 4.793 C 33.324 5.685 47.561 6.085 61.666 6.006 C 71.323 5.952 81.354 5.772 90.811 4.471 C 91.372 4.394 98.733 3.695 96.279 2.978 C 93.715 2.227 90.758 1.972 87.97 1.718 C 78.891 0.89 69.713 0.338 60.538 0.093 C 48.577 -0.226 36.812 0.327 24.912 0.938 C 22.543 1.06 19.837 1.489 17.494 1.357"
                  fill="transparent"
                  stroke="#B5440B"
                  strokeWidth="3"
                  strokeLinecap="round"

                  // --- INFINITE ANIMATION LOGIC ---
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1
                  }}
                  transition={{
                    duration: 2,           // Drawing speed
                    ease: "easeInOut",
                    repeat: Infinity,      // Infinite loop
                    repeatType: "loop",    // Animation resets and starts again
                    repeatDelay: 1,        // 1 second wait before starting again
                  }}
                />
              </svg>
            </div>
          </span>
        </h2>
      </div>

    </div>
  );
};

export default HeresHowSection;