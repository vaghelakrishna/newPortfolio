import React from 'react';

const FilmStrip = () => {
  const images = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 flex flex-col items-center font-serif overflow-x-hidden">

      {/* 1. KODAK CANISTER (Top) */}
      <div className="relative w-72 z-20 mb-[-8px]">
        {/* Transparent PNG Canister */}
        <img
          src="https://www.nationphoto.com/7514-large_default/kodak-pro-image-100-135-36.jpg"
          alt="Kodak Pro Image 100"
          className="w-full h-full object-contain drop-shadow-xl"
        />
        {/* Yellow Sparks from image_4da402.jpg */}
        <div className="absolute -left-12 bottom-2 text-yellow-400 text-5xl rotate-12 select-none">
          ✨
        </div>
      </div>

      {/* 2. THE FILM STRIP */}
      <div className="relative flex bg-zinc-950 p-3 shadow-2xl rounded-sm">

        {/* Left Sprocket Holes */}
        <div className="flex flex-col justify-between py-4 px-1">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-white rounded-[2px] mb-3 opacity-95" />
          ))}
        </div>

        {/* Center Photos */}
        <div className="flex flex-col gap-4 px-3">
          {images.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Frame ${index}`}
                className="w-64 h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
              />
              {/* Divider lines between frames */}
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Right Sprocket Holes */}
        <div className="flex flex-col justify-between py-4 px-1">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-4 h-6 bg-white rounded-[2px] mb-3 opacity-95" />
          ))}
        </div>

        {/* 3. DECORATIVE ELEMENTS (Positioned exactly like watermarked_img_1998269076362106339.png) */}

        {/* Top Right "Woo-hoo!" */}
        <div className="absolute -right-20 top-24 text-zinc-400 font-bold text-3xl [writing-mode:vertical-lr] rotate-180 opacity-60">
          Woo-hoo!
        </div>

        {/* Left Paragraph */}
        <div className="absolute -left-56 top-48 w-48 text-[11px] text-zinc-500 leading-relaxed italic text-right">
          "thank you for being the kind of friend who stays—through the mess, the silence, the chaos, and the joy. i’m so damn grateful for you."
        </div>

        {/* Moon Phases Sticker */}
        <div className="absolute -right-14 top-[35%] flex flex-col gap-3 text-2xl grayscale opacity-50">
          <span>🌙</span><span>🌑</span><span>🌓</span><span>🌕</span>
        </div>

        {/* Blue 'Beautiful Day' Sticker */}
        <div className="absolute -left-36 top-[55%] text-blue-400 font-bold text-xl -rotate-12 w-28">
          it's a <br /> <span className="text-3xl text-blue-500">beautiful</span> <br /> day
        </div>

        {/* "Still Growing" Bottom Left */}
        <div className="absolute -left-14 bottom-24 text-emerald-600 font-semibold [writing-mode:vertical-lr] flex items-center gap-1 opacity-70">
          <span>still growing</span>
          <span className="rotate-90">🌱</span>
          <span>still growing</span>
        </div>

      </div>

      {/* Footer Text */}
      <p className="mt-10 text-zinc-400 text-xs tracking-widest uppercase">
        Memories — Kodak Pro Image 100
      </p>
    </div>
  );
};

export default FilmStrip;