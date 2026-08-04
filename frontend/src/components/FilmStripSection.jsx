import React, { useRef, useState, useEffect } from "react";
import photo1 from "../assets/bookpage/1.png";
import photo2 from "../assets/bookpage/2.webp";
import photo3 from "../assets/bookpage/3.webp";
import photo4 from "../assets/bookpage/4.webp";
import photo5 from "../assets/bookpage/5.png";
import photo6 from "../assets/bookpage/6.webp";
import photo7 from "../assets/bookpage/7.webp";
import photo8 from "../assets/bookpage/8.webp";

const strip1 = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];
const strip2 = [photo5, photo3, photo7, photo1, photo8, photo2, photo6, photo4];

const sprocketBg = `repeating-linear-gradient(
  to right,
  transparent 0px, transparent 6px,
  white 6px, white 16px,
  transparent 16px, transparent 22px
)`;

function FilmStrip({ images, direction }) {
  const doubled = [...images, ...images];
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const speed = direction === "Left" ? -0.04 : 0.04; // px per ms

  useEffect(() => {
    const totalWidth = trackRef.current?.scrollWidth / 2 || 1300;

    function animate(time) {
      if (!pausedRef.current && !dragRef.current.active) {
        if (lastTimeRef.current !== null) {
          offsetRef.current += speed * (time - lastTimeRef.current);
        }
        lastTimeRef.current = time;

        // loop
        if (offsetRef.current <= -totalWidth) offsetRef.current += totalWidth;
        if (offsetRef.current >= 0) offsetRef.current -= totalWidth;
      } else {
        lastTimeRef.current = null;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseEnter = () => { pausedRef.current = true; };
  const onMouseLeave = () => {
    pausedRef.current = false;
    dragRef.current.active = false;
  };

  const onMouseDown = (e) => {
    dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
  };

  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    const totalWidth = trackRef.current?.scrollWidth / 2 || 1300;
    let next = dragRef.current.startOffset + (e.clientX - dragRef.current.startX);
    if (next <= -totalWidth) next += totalWidth;
    if (next >= 0) next -= totalWidth;
    offsetRef.current = next;
  };

  const onMouseUp = () => { dragRef.current.active = false; };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#111] select-none"
      style={{ height: 150, cursor: "grab" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* Top sprockets */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        style={{ height: 18, backgroundImage: sprocketBg, backgroundSize: "22px 10px", backgroundRepeat: "repeat-x", backgroundPosition: "0 4px" }} />

      {/* Bottom sprockets */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
        style={{ height: 18, backgroundImage: sprocketBg, backgroundSize: "22px 10px", backgroundRepeat: "repeat-x", backgroundPosition: "0 4px" }} />

      {/* Images */}
      <div ref={trackRef} className="absolute top-[18px] bottom-[18px] flex gap-[3px]" style={{ willChange: "transform" }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" className="flex-shrink-0 object-cover" style={{ width: 163, height: "100%" }} />
        ))}
      </div>
    </div>
  );
}

export default function FilmStripSection() {
  return (
    <section className="w-full bg-[#F7F4EF] py-16 flex flex-col items-center gap-6 overflow-hidden">
      <p className="text-xs tracking-[0.3em] text-[#999] uppercase font-mono">— moments —</p>
      <div className="w-full flex flex-col gap-4">
        <FilmStrip images={strip1} direction="Left" />
        <FilmStrip images={strip2} direction="Right" />
      </div>
    </section>
  );
}
