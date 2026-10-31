import React, { useMemo } from 'react';

// Assets from bookpage
import photo1 from '../assets/bookpage/1.png';
import photo2 from '../assets/cute-me.jpeg';
import photo3 from '../assets/bookpage/3.webp';
import photo4 from '../assets/flower-animation/f-1.png';
import photo5 from '../assets/bookpage/5.png';
import photo6 from '../assets/bookpage/6.webp';
import photo7 from '../assets/bookpage/7.webp';
import photo8 from '../assets/bookpage/8.webp';

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

export default function PhotoAutoScroll() {
  const doublePhotos = useMemo(() => [...photos, ...photos], []);

  // Har image container ke liye random equal box size aur vertical offset
  const randomStyles = useMemo(() => {
    return photos.map(() => {
      // Random square size: height aur width dono barabar (180px se 280px ke beech)
      const randomBoxSize = Math.floor(Math.random() * (280 - 180 + 1)) + 180;
      // Random upar-neeche offset
      const randomTranslateY = Math.floor(Math.random() * 61) - 30;

      return {
        boxSize: `${randomBoxSize}px`,
        transform: `translateY(${randomTranslateY}px)`,
      };
    });
  }, []);

  return (
    <section className="w-full bg-[#FAF9F6] py-16 sm:py-24 overflow-hidden select-none">
      <style>{`
        @keyframes autoScrollTrack {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .auto-scroll-marquee {
          display: flex;
          width: max-content;
          animation: autoScrollTrack 32s linear infinite;
        }
      `}</style>

      {/* Marquee Track: continuously moving, no pause on hover */}
      <div className="relative w-full flex items-center overflow-hidden">
        <div className="auto-scroll-marquee flex items-center gap-6 sm:gap-8 will-change-transform">
          {doublePhotos.map((src, index) => {
            const style = randomStyles[index % photos.length];

            return (
              <div
                key={index}
                style={{
                  width: style.boxSize,
                  height: style.boxSize,
                  transform: style.transform,
                }}
                className="shrink-0 flex items-center justify-center"
              >
                {/* object-contain se photo bilkul bhi crop ya cut nahi hogi aur full visible rahegi */}
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-contain block pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}