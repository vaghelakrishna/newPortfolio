import React from 'react'
import folderBack from '../assets/folder-bot-pink.svg'
import folderFront from '../assets/folder-top-pink.svg'
import shadow from '../assets/folder-back-shadow.svg'

export default function Folder() {
  return (
    <div className="relative w-26 h-23 group cursor-pointer">
      {/* Container - Hinge effect */}
      <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:translate-y-1">

        {/* 1. BACK FOLDER */}
        <img src={folderBack} className="absolute inset-0 w-full h-full object-contain" alt="Folder Back" />

        {/* 2. PROJECT PREVIEWS - Adjusted for small size */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">

          {/* Card 1 (Left) - width/height and peek adjusted */}
          <div
            className="absolute w-16 h-14 bg-cover bg-center rounded shadow-md transition-all duration-500 ease-out z-0
            -rotate-[8deg] -translate-x-3 -translate-y-3
            group-hover:-translate-y-7"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97')` }}
          ></div>

          {/* Card 2 (Center) - width/height and peek adjusted */}
          <div
            className="absolute w-16 h-14 bg-cover bg-center rounded shadow-md transition-all duration-500 ease-out z-10
            -translate-y-4
            group-hover:-translate-y-8"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')` }}
          ></div>

          {/* Card 3 (Right) - width/height and peek adjusted */}
          <div
            className="absolute w-16 h-14 bg-cover bg-center rounded shadow-md transition-all duration-500 ease-out z-20
            rotate-[8deg] translate-x-3 -translate-y-3
            group-hover:-translate-y-7"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c')` }}
          ></div>

        </div>

        {/* 3. FRONT FOLDER - Adjusted top position for smaller height */}
        <img
          src={folderFront}
          className="absolute top-[13px] left-2 w-full h-full object-contain z-20 transition-transform duration-500 origin-bottom-left"
          alt="Folder front"
        />
      </div>

      {/* <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors duration-300">
        Mobile Website Builder
      </span> */}
    </div>
  )
}