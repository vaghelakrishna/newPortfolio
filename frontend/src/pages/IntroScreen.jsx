import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function IntroScreen({ onExplore }) {
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
      duration: Math.random() * 4 + 2,
    }));
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[#1d1d1f] text-white">

      {/* Star Field */}
      <div className="absolute inset-0">
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
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Decorative Stars */}
      <div className="absolute left-[14%] top-[52%] text-pink-400 text-3xl font-light">
        +
      </div>

      <div className="absolute left-[17%] top-[53%] text-yellow-300 text-sm">
        +
      </div>

      <div className="absolute right-[11%] top-[25%] text-yellow-200">
        ✦
      </div>

      <div className="absolute right-[12%] top-[26%] text-orange-400 text-xs">
        ●
      </div>

      <div className="absolute right-[25%] bottom-[18%] text-yellow-200">
        ✦
      </div>

      <div className="absolute right-[24%] bottom-[17%] text-cyan-400 text-xs">
        ○
      </div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <p
          className="uppercase text-gray-500 tracking-[0.25em] text-sm"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Welcome To
        </p>

        <h1
          className="mt-3 text-[3rem] md:text-[5rem] leading-none"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Krishna's World
        </h1>

<Link to="visitor-pass" >
        <button
          className="mt-8 bg-[#ECE8DF] text-[#2b2b2b] px-7 py-3 rounded-full text-sm tracking-wide hover:scale-105 transition-all"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          EXPLORE →
        </button>
        </Link>

        <button
          className="mt-5 text-gray-600 text-xs tracking-[0.2em] uppercase hover:text-gray-400 transition"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Skip Intro
        </button>

        <div
          className="mt-16 max-w-xl text-center text-gray-400 uppercase text-lg leading-relaxed"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          <span className="text-white font-bold">
            Discoveries
          </span>{" "}
          are out there, waiting to be made.
          <br />
          Why not by you?
        </div>
      </motion.div>

      {/* Bottom Left Status */}
      <div
        className="absolute bottom-5 left-5"
        style={{ fontFamily: "Space Mono, monospace" }}
      >
        <div className="text-gray-400 text-lg">
          {time}
        </div>

        <div className="flex items-center gap-2 text-gray-500 uppercase">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          All Systems Operational
        </div>
      </div>
    </section>
  );
}