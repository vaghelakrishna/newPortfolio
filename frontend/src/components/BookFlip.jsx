import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import page1 from '../assets/bookpage/1.png';
import page2 from '../assets/bookpage/2.webp';
import page3 from '../assets/bookpage/3.webp';
import page4 from '../assets/bookpage/4.webp';
import page5 from '../assets/bookpage/5.png';
import page6 from '../assets/bookpage/6.webp';
import page7 from '../assets/bookpage/7.webp';
import page8 from '../assets/bookpage/8.webp';

const pages = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6,
  page7,
  page8
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