import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function RepelWord({ word, bold, mouseX, mouseY }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 15 });
  const sy = useSpring(y, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX.get();
      const dy = cy - mouseY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 100;
      if (dist < radius && dist > 0) {
        const force = (radius - dist) / radius;
        x.set((dx / dist) * force * 40);
        y.set((dy / dist) * force * 40);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const unsub = mouseX.on("change", update);
    const unsub2 = mouseY.on("change", update);
    return () => { unsub(); unsub2(); };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-block mx-1 ${bold ? "text-white font-bold" : ""}`}
    >
      {word}
    </motion.span>
  );
}

function ExploreButton({ mouseX, mouseY }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 100, damping: 15 });
  const sy = useSpring(y, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX.get();
      const dy = cy - mouseY.get();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;
      if (dist < radius && dist > 0) {
        const force = (radius - dist) / radius;
        x.set((dx / dist) * force * 30);
        y.set((dy / dist) * force * 30);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const unsub = mouseX.on("change", update);
    const unsub2 = mouseY.on("change", update);
    return () => { unsub(); unsub2(); };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.button
      ref={ref}
      className="relative mt-8 bg-[#ECE8DF] text-[#2b2b2b] px-7 py-3 rounded-full text-sm tracking-wide shadow-lg cursor-pointer"
      style={{ x: sx, y: sy, fontFamily: "Space Mono, monospace" }}
    >
      EXPLORE →
    </motion.button>
  );
}

export default function IntroScreen({ onExplore }) {
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const cursorX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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

  const [ripples, setRipples] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const createRipple = (e) => {
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => setRipples((prev) => prev.filter(r => r.id !== newRipple.id)), 800);
  };

  const createSparkles = (e) => {
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY,
      angle: (360 / 12) * i + Math.random() * 20,
      distance: Math.random() * 50 + 30,
      duration: Math.random() * 0.3 + 0.4,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative h-screen overflow-hidden bg-[#1d1d1f] text-white select-none cursor-none"
      onClick={createSparkles}
      onDoubleClick={createSparkles}
    >

      {/* Glowing Moon Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.6)]" />
      </motion.div>
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

      {/* Ripple on Click */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="fixed pointer-events-none z-50 rounded-full border border-white"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 120, height: 120, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}

      {/* Sparkles on Click */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="fixed pointer-events-none z-50 text-white text-xs"
          style={{ left: s.x, top: s.y }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(s.angle * Math.PI / 180) * s.distance,
            y: Math.sin(s.angle * Math.PI / 180) * s.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: s.duration, ease: "easeOut" }}
          onAnimationComplete={() => setSparkles(p => p.filter(sp => sp.id !== s.id))}
        >
          ✦
        </motion.div>
      ))}


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
          style={{ fontFamily: "Gelica, serif" }}
        >
          {["Krishna's", "World"].map((word, i) => (
            <RepelWord key={i} word={word} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </motion.h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <Link to="visitor-pass">
            <ExploreButton mouseX={mouseX} mouseY={mouseY} />
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
          {[
            { word: "Discoveries", bold: true },
            { word: "are" },
            { word: "out" },
            { word: "there," },
            { word: "waiting" },
            { word: "to" },
            { word: "be" },
            { word: "made." },
            { word: "Why" },
            { word: "not" },
            { word: "by" },
            { word: "you?", bold: true },
          ].map(({ word, bold }, i) => (
            <RepelWord key={i} word={word} bold={bold} mouseX={mouseX} mouseY={mouseY} />
          ))}
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