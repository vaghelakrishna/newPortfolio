import React from 'react';
import photo1 from '../assets/bookpage/1.png';
import photo2 from '../assets/bookpage/2.webp';
import photo3 from '../assets/bookpage/3.webp';
import photo4 from '../assets/bookpage/4.webp';

const photos = [
  { src: photo1, rotate: -4 },
  { src: photo2, rotate: 2 },
  { src: photo3, rotate: -2 },
  { src: photo4, rotate: 3 },
];

export default function PhotoStrip() {
  return (
    <section className="w-full bg-[#F7F7F4] py-16 px-6 overflow-hidden">
      <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="bg-white p-3 pb-10 shadow-xl hover:scale-105 transition-transform duration-300"
            style={{ transform: `rotate(${photo.rotate}deg)`, width: 220 }}
          >
            <img
              src={photo.src}
              alt={`photo ${i + 1}`}
              className="w-full object-cover"
              style={{ height: 260 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
