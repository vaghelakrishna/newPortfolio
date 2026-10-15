import React from 'react'
import BookFlip from '../components/BookFlip'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cat from '../components/Cat'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Krishna Intro Section */}
      <section className="w-full bg-[#FAF9F6] pt-32 pb-12 px-6 md:px-12 font-sans select-none">
        <div className="max-w-4xl mx-auto">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-6">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#E25C1D]">
              About
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-black text-[#222] tracking-tight mb-4">
            Hi, I'm Krishna.
          </h1>

          {/* Subtitle / Currently */}
          <p className="text-lg md:text-xl font-medium text-gray-500 mb-8 font-mono">
            Currently: <span className="text-[#222] font-semibold">Full-Stack Developer</span> · KattalyxLabs
          </p>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-base md:text-lg text-[#444] leading-relaxed">
            <p>
              Years ago I wrote my first lines of code and never really stopped chasing that feeling — the split second where a static idea comes alive in the browser, reacting dynamically to every keystroke and click. These days that chase happens across modern full-stack architectures — React, TypeScript, Node.js, and MongoDB — engineering interactive interfaces and scalable systems that think before they act.
            </p>
            <p>
              Outside of building client platforms and core web architectures, you'll find me experimenting with new web technologies, fine-tuning UI micro-interactions, or turning messy problem statements into clean, maintainable code. Same curiosity, continuous execution.
            </p>
          </div>
        </div>
      </section>

      {/* Book Flip Section */}
      <BookFlip />
      <Cat />
      <Footer />
    </>
  )
}
