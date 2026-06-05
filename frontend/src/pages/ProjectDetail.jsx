import React from 'react';
import { useState } from 'react';
import { ArrowLeft, ArrowUp, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Stories for every interest",
    desc: "Explore fantasy, thriller, romance, and more. Always at your level.",
    img: "/images/explore-view.png" // यहाँ अपना इमेज पाथ डालें
  },
  {
    id: 2,
    title: "Tap any word, instantly understand",
    desc: "Translations appear as you read, so you get to stay in the flow without any interruptions.",
    img: "/images/reading-view.png"
  },
  {
    id: 3,
    title: "Listen and read at the same time",
    desc: "Follow along with audio narration for every fable. Read, listen, or both.",
    img: "/images/audio-view.png"
  },
  {
    id: 4,
    title: "Watch yourself improve",
    desc: "Track your progress: CEFR level, words learned, reading streaks, and more.",
    img: "/images/stats-view.png"
  }
];
const ProjectDetail = () => {

  const insights = [
    {
      title: "Retention is the hardest part",
      desc: "In order for users to actually appreciate your designs, they have to come back to the app in the first place! It's all about finding a core value loop and meeting your users where they are."
    },
    {
      title: "Claude Code is my best friend!",
      desc: "Honestly, I've become addicted to Claude Code. Iterating, polishing, and debugging is way easier with Claude Code, and I've learned how to best use subagents, worktrees, and MCP servers."
    },
    {
      title: "Design extends beyond the app",
      desc: "Before this, I had no idea just how important notifications were! They really do make a difference, from their copy to their frequency and time of day sent. Next up is widgets!"
    }
  ];

  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#2D2D2D] font-sans px-4 py-10 md:px-10">

      {/* Container - Sidebar & Content */}
      <div className="flex flex-col md:flex-row gap-14 max-w-8xl mx-auto">

        {/* LEFT SIDEBAR (Sticky on scroll) */}
        <aside className="w-full md:w-74 flex-shrink-0">
          <div className="sticky top-10">
            <button className="flex items-center gap-2 text-sm font-semibold mb-10 hover:opacity-70">
              <ArrowLeft size={16} /> HOME
            </button>

            <div className="bg-[#EFECE3] p-6 rounded-2xl border border-[#DBD6C9]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#7C7667] mb-4">Table of Contents</h3>
              <ul className="space-y-3">
                {['01. Context', '02. The solution', '03. Features', '04. Interaction design', '05. Onboarding', '06. Reflection'].map((item, i) => (
                  <li key={i} className={`text-sm font-medium cursor-pointer ${i === 0 ? 'text-[#E25C1D] font-bold' : 'text-[#635F55]'}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#635F55]">
              <ArrowUp size={14} /> Back to top
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 max-w-3xl">

          {/* Hero Banner */}
          <div className="w-full h-72 bg-white rounded-3xl border border-[#DBD6C9] mb-8 overflow-hidden shadow-sm">
            <img src="/lingofable-banner.jpg" alt="Lingofable Banner" className="w-full h-full object-cover" />
          </div>

          {/* Badges */}
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-[#E3DEC0]/50 rounded text-[10px] font-bold uppercase tracking-wider">Side Project</span>
            <span className="px-3 py-1 bg-[#E3DEC0]/50 rounded text-[10px] font-bold uppercase tracking-wider">Shipped</span>
          </div>

          {/* Title & Intro */}
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
            <span className="text-purple-400 mr-2">*</span>Building Lingofable from 0-1
          </h1>
          <p className="text-lg text-[#635F55] leading-relaxed mb-10">
            I designed & built Lingofable together with <a href="#" className="underline font-medium">@Simon Ilincev</a> as a passion project. It is a language app focused on learning through stories — we launched on the App Store in March 2026, pitched to Pinterest's ex-CPO, and were featured on Cornell's Speaking of Language podcast!
          </p>

          {/* Final CTA */}
          <div className="my-16">
            <button className="w-full py-4 bg-[#EFECE3] border border-[#DBD6C9] rounded-xl font-medium hover:bg-[#E3DEC0] transition-all">
              Visit Lingofable →
            </button>
          </div>
          {/* Pink Meta Info Box (New Section) */}
          <section className="bg-[#C46A86] text-white rounded-2xl p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Role", value: "Founder, Design Engineer, Marketing" },
              { label: "Team", value: "Simon Ilincev (Co-Founder)" },
              { label: "Timeline", value: "Oct 2025 – Apr 2026" },
              { label: "Skills", value: "Vibe coding, Interaction design" }
            ].map((meta, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">{meta.label}</h4>
                <p className="text-sm font-medium">{meta.value}</p>
              </div>
            ))}
          </section>

          {/* Context & Solution Sections */}
          <div className="space-y-12">
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667] mb-3">Context</h3>
              <h2 className="text-3xl font-serif text-[#2D2D2D] mb-4">Language learning is tricky</h2>
              <p className="text-lg text-[#635F55] leading-relaxed">
                Having learned Mandarin Chinese over the pandemic, I know from experience that language learning is tough.
                Engaging in native media is no doubt the best way to learn, but it’s really difficult to find media
                that is both interesting and at your level.
              </p>
            </section>

            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667] mb-3">The Solution</h3>
              <h2 className="text-3xl font-serif text-[#2D2D2D] mb-6">Comprehensible input at scale, delivered through stories</h2>
              <p className="text-lg text-[#635F55] leading-relaxed mb-4">
                The main thing that prevents learners from reading books in their target language is that most of the time, content is either:
              </p>
              <ul className="list-decimal pl-5 space-y-2 text-[#635F55] leading-relaxed">
                <li>Interesting but written for native speakers (and therefore linguistically complex), or</li>
                <li>Boring and written for children.</li>
              </ul>
            </section>


            <section className="py-16 space-y-8">
              {/* सेक्शन हेडर */}
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667]">03. Features</h3>

              {/* Grid Layout for Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1: From fairy tales to Reddit threads */}
                <div className="bg-[#EFECE3] p-8 rounded-3xl border border-[#DBD6C9]">
                  <h2 className="text-2xl font-serif text-[#2D2D2D] mb-2">From fairy tales to Reddit threads</h2>
                  <p className="text-[#635F55] mb-8">Pick what you want to read. We'll match it to your level.</p>
                  <div className="relative h-48 bg-white/50 rounded-2xl flex items-center justify-center border border-white/50">
                    {/* यहाँ आप अपनी इमेज प्लेसहोल्डर या इलस्ट्रेशन डाल सकते हैं */}
                    <span className="text-sm font-semibold text-[#A8A395]">Story Cards Preview</span>
                  </div>
                </div>

                {/* Card 2: Track your progress */}
                <div className="bg-[#EFECE3] p-8 rounded-3xl border border-[#DBD6C9]">
                  <h2 className="text-2xl font-serif text-[#2D2D2D] mb-2">Track your progress</h2>
                  <p className="text-[#635F55] mb-8">See your CEFR level rise and your vocabulary grow as you read.</p>
                  <div className="relative h-48 bg-white/50 rounded-2xl flex items-center justify-center border border-white/50">
                    <span className="text-sm font-semibold text-[#A8A395]">Progress Charts Preview</span>
                  </div>
                </div>

                {/* Card 3: Always at the perfect i+1 difficulty (Full Width) */}
                <div className="md:col-span-2 bg-[#DCE6D9] p-8 rounded-3xl border border-[#C1C9BE] flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif text-[#2D2D2D] mb-2">Always at the perfect i+1 difficulty</h2>
                    <p className="text-[#635F55]">Stories adapt to your level — never too hard, never too easy.</p>
                  </div>
                  <div className="h-32 w-32 bg-white/50 rounded-2xl flex items-center justify-center border border-white/50">
                    <span className="text-sm font-semibold text-[#A8A395]">Leaf Icon</span>
                  </div>
                </div>

              </div>
            </section>


            <section className="py-16 px-6 max-w-4xl mx-auto bg-[#F9F6F0]">
              {/* Header Section */}
              <div className="mb-10">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667] mb-3">
                  04. Interaction design
                </h3>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2D2D2D] mb-6">
                  Teaching users how to interact
                </h2>
                <p className="text-lg text-[#635F55] leading-relaxed">
                  During our beta testing, users told us that interacting with the reading page was confusing.
                  Although this is a standard interaction pattern in other apps such as Du Chinese,
                  many users had not encountered such apps before. Using Lottielab, I created
                  two different tutorial animations that would play when the user opened a story for the first time.
                </p>
              </div>

              {/* Interactive Card Preview Area */}
              <div className="bg-[#EFECE3] border border-[#DBD6C9] rounded-3xl p-8 md:p-16 relative">

                {/* Navigation Arrows */}
                <button className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white transition-all">
                  <ArrowRight size={20} />
                </button>

                {/* Content Cards */}
                <div className="flex flex-col items-center gap-4">
                  {/* Dictionary Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm border border-black/5">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg">la cima</h4>
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">A1</span>
                    </div>
                    <p className="text-sm text-gray-600">noun</p>
                    <p className="text-sm">summit, top, peak (of a mountain or hill)</p>
                  </div>

                  {/* Story Context Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm border border-black/5">
                    <h4 className="font-bold mb-2">El Fuego Que Sobrevive</h4>
                    <p className="text-sm">
                      El dragón vivía solo en <span className="bg-green-100 px-1 rounded">la cima</span> de una montaña de piedra negra.
                    </p>
                  </div>
                </div>

                {/* Caption */}
                <div className="text-center mt-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7C7667]">
                    LOOKING UP A WORD
                  </h4>
                </div>
              </div>
            </section>


            <section className="w-full max-w-6xl mx-auto py-20 px-8 bg-[#F9F6F0]">
              {/* सेक्शन हेडर */}
              <div className="mb-16">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#7C7667] mb-3">FEATURES</h3>
                <h2 className="text-4xl md:text-5xl font-serif text-[#2D2D2D]">Designed to help learners make real progress</h2>
                <p className="mt-4 text-lg text-[#635F55] max-w-2xl">
                  Users are able to browse a library of stories in their target language, and track weekly goals to keep on track with their learning.
                </p>
              </div>

              <div className="flex flex-col  items-center gap-16">
                {/* बायीं ओर: फीचर लिस्ट */}
                <div className="w-full md:w-1/2 space-y-4">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      onMouseEnter={() => setActiveFeature(feature)}
                      className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${activeFeature.id === feature.id
                          ? "bg-[#EFECE3] border-[#DBD6C9] shadow-sm"
                          : "bg-transparent border-transparent hover:bg-[#F5F2EA]"
                        }`}
                    >
                      <h4 className="text-xl font-bold text-[#2D2D2D] mb-1">{feature.title}</h4>
                      <p className="text-[#635F55] text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* दायीं ओर: मोबाइल मॉकअप (Interactive) */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-[#2D2D2D] shadow-2xl overflow-hidden">
                    {/* यहाँ आप activeFeature.img का इस्तेमाल कर सकते हैं */}
                    <div className="w-full h-full bg-[#FFFBF0] flex items-center justify-center text-center p-6 text-[#A8A395] font-semibold">
                      <p>Active View: <br /> {activeFeature.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <div className="min-h-screen bg-[#F9F6F0] p-8 md:p-20 font-sans text-[#2D2D2D]">



              {/* ऑनबोर्डिंग और प्रोग्रेस सेक्शन */}
              <section className="flex flex-col gap-12">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#7C7667]">Onboarding & Conversion</h3>
                  <h4 className="text-3xl font-serif">Crafting the perfect onboarding</h4>
                  <p className="text-[#635F55]">
                    I wove haptics into every single onboarding step, and made it easy to start off with a library filled with interesting stories.
                  </p>
                </div>

                {/* मोबाइल मॉकअप्स का यहाँ प्लेसमेंट करें */}
                <div className="flex gap-4 overflow-x-auto">
                  {/* Mockup Container Example */}
                  <div className="w-60 h-96 bg-black rounded-3xl shrink-0"></div>
                  <div className="w-60 h-96 bg-black rounded-3xl shrink-0"></div>
                </div>
              </section>
            </div>


            <section className="max-w-6xl mx-auto py-16 px-6">
              {/* Section Header */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#7C7667] mb-3">Reflection</h3>
                <h2 className="text-4xl font-serif text-[#2D2D2D]">What I've learned</h2>
                <p className="text-lg text-[#635F55] mt-4">
                  Building an app for real users is very different from working on a design case study or even a small side project.
                </p>
              </div>

              {/* 3-Column Insight Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {insights.map((insight, i) => (
                  <div key={i} className="bg-[#EFECE3] p-8 rounded-3xl border border-[#DBD6C9]">
                    <h4 className="text-lg font-bold text-[#2D2D2D] mb-3">{insight.title}</h4>
                    <p className="text-sm text-[#635F55] leading-relaxed">{insight.desc}</p>
                  </div>
                ))}
              </div>

              {/* Project Highlight / Presentation Image */}
              <div className="w-full overflow-hidden rounded-3xl border border-[#DBD6C9] shadow-lg">
                <img
                  src="/reflection-presentation.jpg"
                  alt="Lingofable Pitch Presentation"
                  className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="bg-[#EFECE3] p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#7C7667]">
                    Pitching to the ex-CPO of Pinterest
                  </p>
                </div>
              </div>
            </section>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;
