import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const pages = [
  './src/assets/bookpage/1.png',
  './src/assets/bookpage/2.webp',
  './src/assets/bookpage/3.webp',
  './src/assets/bookpage/4.webp',
  './src/assets/bookpage/5.png',
  './src/assets/bookpage/6.webp',
  './src/assets/bookpage/7.webp',
  './src/assets/bookpage/8.webp',

];

export default function BookFlip() {
  return (
    <div className="flex justify-center items-center py-35 overflow-hidden">
      <HTMLFlipBook
        width={350}
        height={450}
        size="fixed"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1500}
        showCover={true}

      >
        {pages.map((img, i) => (
          <div key={i} className="page">
            <img src={img} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}