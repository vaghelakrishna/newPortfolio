import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Copy, Check, ArrowUp } from 'lucide-react'; // यहाँ ArrowUp फिक्स किया

export default React.forwardRef(function Footer(props, ref) {
  const [time, setTime] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const emailAddress = "krishnawork2606@gmail.com"; // आपकी पूरी ईमेल आईडी

  const socialLinks = [
    { name: 'LINKEDIN', color: 'text-[#0A66C2]' },
    { name: 'INSTAGRAM', color: 'text-[#E4405F]' },
  ];

  // लाइव क्लॉक (Live Clock)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyMail = (e) => {
    e.stopPropagation(); // पैरेंट एलिमेंट्स को डिस्टर्ब होने से रोकने के लिए
    navigator.clipboard.writeText(emailAddress);
    setIsCopied(true);

    // 2.5 सेकंड बाद बटन वापस नॉर्मल हो जाएगा
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <>
      <div  className="w-full pt-20 pb-16 flex flex-col items-center justify-center relative bg-[#FDFBF7] rounded-xl mb-8">
      {/* Google Font for Cursive Look */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin 10s linear infinite; }
          .font-cursive { font-family: 'Caveat', cursive; }
        `}</style>

      {/* Header Section */}
      <div className="text-center mb-10">
        <p className="text-[#E25C1D] text-2xl font-cursive mb-1">& That's a wrap!</p>
        <h2 className="text-[44px] font-black text-[#2D2D2D] tracking-tight leading-none">
          GLAD YOU MADE IT HERE.
        </h2>
      </div>

      {/* Social Links Row */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-[#E25C1D] font-cursive text-xl">You can connect with me on,</p>

        <div className="flex items-center gap-4 text-[11px] font-black tracking-[0.2em] text-[#555]">
          {socialLinks.map((link, i) => (
            <React.Fragment key={link.name}>
              <a href="#" className={`flex items-center gap-1 hover:opacity-70 transition-opacity ${link.color}`}>
                {link.name} <ArrowUpRight size={12} /> {/* यहाँ ArrowUpRight यूज किया */}
              </a>
              {i < socialLinks.length - 1 && <span className="text-[#333] text-[8px]">◆</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Go to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-10 right-10 w-20 h-20 flex items-center justify-center group"
      >
        <div className="absolute w-full h-full animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#333]">
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
            <text className="text-[8px] font-black tracking-[0.6em] uppercase">
              <textPath href="#circlePath">GO TO TOP ◆ GO TO TOP ◆</textPath>
            </text>
          </svg>
        </div>
        <ArrowUp size={32} className="text-[#E25C1D]" /> {/* यहाँ ArrowUp फिक्स किया */}
      </button>
      </div>
      
      
      <footer ref={ref} className="w-full bg-[#1e1a17] text-[#e8e4df] font-sans px-6 md:px-16 py-8 flex flex-col justify-between min-h-[500px] select-none">


        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-700/50 pb-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="font-semibold text-white">Built with</span>
            <span className="text-xs font-mono opacity-70">❖ ⚡ ❄</span>
            <span className="font-serif italic text-orange-500">and a lot of passion! 🧡</span>
          </div>
          <div className="flex items-center gap-4 font-mono tracking-wider text-xs">
            <span>{time || "5:51:31 PM"}</span>
            <span className="text-zinc-600">|</span>
            <span>Thursday, June 4, 2026</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-auto pt-10">

          {/* Left Side (CTA) */}
          <div className="flex flex-col justify-center items-start">
            <span className="font-serif italic text-orange-500 text-lg mb-3 tracking-wide">
              get in touch
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-8 max-w-md">
              Got a project <br /> you want to <br /> talk about?
            </h2>
            <button className="flex items-center gap-3 bg-[#e65100] hover:bg-[#bf4300] text-white font-bold uppercase tracking-wider text-xs py-4 px-6 rounded shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Send me a message
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side (Links) */}
          <div className="flex flex-col justify-center md:items-end">
            <span className="text-[#e65100] text-xs font-bold uppercase tracking-widest mb-4 block md:text-right w-full max-w-xs">
              Links
            </span>
            <nav className="flex flex-col gap-3 w-full max-w-xs">
              {['Home', 'Work', 'About', 'Resume', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="flex items-center justify-between text-2xl md:text-2xl font-black uppercase tracking-wider border-b border-transparent hover:border-zinc-700/50 py-1 transition-all duration-300 group"
                >
                  <span className="group-hover:text-orange-400 transition-colors duration-300">{item}</span>
                  <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar: Smart Expanding Mail Button */}
        <div className="border-t border-zinc-700/50 pt-6 flex justify-end">
          <div
            className="group relative flex items-center bg-zinc-900/50 border border-zinc-700/80 hover:border-zinc-500 h-12 rounded-lg overflow-hidden transition-all duration-500 ease-out p-1 w-44 hover:w-80"
          >
            {/* Default Text State */}
            <div className="absolute inset-0 flex items-center gap-2.5 px-4 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-x-4">
              <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
              <span className="text-zinc-300 text-xs font-medium whitespace-nowrap">Copy my mail</span>
            </div>

            {/* Hover State: ईमेल आईडी + बटन */}
            <div className="w-full flex items-center justify-between pl-3 pr-1 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto">
              <span className="text-zinc-300 text-xs font-mono select-all truncate pr-2">
                {emailAddress}
              </span>

              <button
                onClick={handleCopyMail}
                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider h-9 px-3.5 rounded-md transition-all duration-300 shrink-0 ${isCopied
                  ? 'bg-emerald-600 text-white scale-100'
                  : 'bg-zinc-800 hover:bg-orange-600 text-white active:scale-95'}`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="animate-fade-in">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </footer></>
  );
});