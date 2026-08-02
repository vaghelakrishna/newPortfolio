import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function IntroScreen({ onExplore }) {
  const navigate = useNavigate();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 140 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  const [sparkles, setSparkles] = useState([]);

  const handleDoubleClick = (e) => {
    const newSparkles = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.pageX,
      y: e.pageY,
      angle: Math.random() * 360,
      distance: Math.random() * 40 + 30, // 30 to 70
      scale: Math.random() * 0.6 + 0.5, // 0.5 to 1.1
      duration: Math.random() * 0.6 + 0.7, // 0.7s to 1.3s
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);
  };

  const Sparkle = ({ id, x, y, angle, distance, scale, duration }) => (
    <motion.div
      key={id}
      className="absolute z-50 rounded-full bg-white"
      style={{ left: x, top: y, width: 8, height: 8, transform: 'translate(-50%, -50%)' }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ x: Math.cos(angle * (Math.PI / 180)) * distance, y: Math.sin(angle * (Math.PI / 180)) * distance, scale, opacity: 0 }}
      transition={{ duration, ease: "easeOut" }}
      onAnimationComplete={() => setSparkles(prev => prev.filter(s => s.id !== id))}
    />
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative h-screen overflow-hidden bg-[#1d1d1f] text-white select-none"
      onDoubleClick={handleDoubleClick}
    >

      {/* Star Field with Smooth Opacity & Scale Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Sparkles on Double Click */}
      <AnimatePresence>
        {sparkles.map(sparkle => <Sparkle {...sparkle} />)}
      </AnimatePresence>


      {/* Decorative Floating Elements */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[14%] top-[52%] text-pink-400 text-3xl font-light pointer-events-none"
      >
        +
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[17%] top-[53%] text-yellow-300 text-sm pointer-events-none"
      >
        +
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[11%] top-[25%] text-yellow-200 pointer-events-none"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[26%] text-orange-400 text-xs pointer-events-none"
      >
        ●
      </motion.div>

      <motion.div
        animate={{ rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[25%] bottom-[18%] text-yellow-200 pointer-events-none"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[24%] bottom-[17%] text-cyan-400 text-xs pointer-events-none"
      >
        ○
      </motion.div>

      {/* Center Content with Staggered Entrance */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="uppercase text-gray-400 tracking-[0.25em] text-sm"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Welcome To
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="mt-3 text-[3rem] md:text-[5rem] leading-none tracking-tight font-medium"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Krishna's World
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <Link to="visitor-pass">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="mt-8 bg-[#ECE8DF] text-[#2b2b2b] px-7 py-3 rounded-full text-sm tracking-wide shadow-lg cursor-pointer"
              style={{ fontFamily: "Space Mono, monospace" }}
            >
              EXPLORE →
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <button
            onClick={() => navigate('/home')}
            className="mt-5 text-gray-500 text-xs tracking-[0.2em] uppercase hover:text-gray-300 transition-colors cursor-pointer"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Skip Intro
          </button>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="mt-16 max-w-xl text-center text-gray-400 uppercase text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          <span className="text-white font-bold">
            Discoveries
          </span>{" "}
          are out there, waiting to be made.
          <br />
          Why not by you?
        </motion.div>
      </motion.div>
      
      {/* Bottom Left Status */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-5 left-5 pointer-events-none"
        style={{ fontFamily: "Space Mono, monospace" }}
      >
        <div className="text-gray-300 text-lg font-mono">
          {time}
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase mt-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          All Systems Operational
        </div>
      </motion.div>
    </motion.section>
  );
}