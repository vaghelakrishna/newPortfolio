import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Aapke custom plant/flower image assets aur watering can ke paths
import sproutImg from '../assets/sproutImg.png'; // User ke "my plant" ke liye unique sprout image
import flower1Img from '../assets/flower1Img.png';
import flower2Img from '../assets/flower2Img.png'; // Agar multiple varieties use karni ho
import wateringCanImg from '../assets/wateringCanImg.png';
import Plant from "../assets/leave.webm";
export default function CommunityGarden() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Garden Board
  const [userName, setUserName] = useState('');
  const [waterCount, setWaterCount] = useState(1);
  const [plants, setPlants] = useState([]);

  // Modal open hote hi random positions generate karne ke liye effect
  useEffect(() => {
    if (isOpen && step === 2) {
      const generatedPlants = [];
      const totalPlants = 120; // Kitne total plants board par scatter karne hain

      // 1 unique index choose karenge user ke "my plant" ke liye
      const myPlantIndex = Math.floor(Math.random() * totalPlants);

      for (let i = 0; i < totalPlants; i++) {
        // Random top (10% to 85%) aur left (5% to 90%) coordinates taaki bounds se bahar na jayein
        const top = Math.random() * 75 + 10;
        const left = Math.random() * 85 + 5;

        // Randomly choose sprout or different flower images
        const randType = Math.random();
        let imgAsset = sproutImg;
        if (randType > 0.4 && randType <= 0.7) imgAsset = flower1Img;
        if (randType > 0.7) imgAsset = flower2Img;

        generatedPlants.push({
          id: i,
          top: `${top}%`,
          left: `${left}%`,
          img: i === myPlantIndex ? sproutImg : imgAsset, // User ka plant sprout form me rahega
          isMyPlant: i === myPlantIndex,
          scale: Math.random() * 0.3 + 0.85, // Thoda random scale variation natural look ke liye (0.85 to 1.15)
        });
      }
      setPlants(generatedPlants);
    }
  }, [isOpen, step]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setStep(2);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setUserName('');
    }, 300);
  };

  return (
    <>
      {/* ========================================================
          1. FIXED FLOATING ICON (Bottom Right)
          ======================================================== */}
      <div className="fixed bottom-8 right-4 z-50 flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-1.5 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
        >
          <video
            src={Plant}
            autoPlay
            loop
            muted
            playsInline
            className="w-14 h-auto drop-shadow-sm pointer-events-none"
          />
          <span className="text-[11px] font-bold text-[#E05C1A] tracking-wide font-mono uppercase">
            Plant a seed!
          </span>
        </button>
      </div>

      {/* ========================================================
          2. GLOBAL LIGHT/BROWN BACKDROP OVERLAY
          ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-colors duration-300 ${step === 2 ? 'bg-[#5c3a21]/80 backdrop-blur-sm' : 'bg-[#5c3a21]/40 backdrop-blur-md'
              }`}
            onClick={handleClose}
          >
            {/* ========================================================
                STEP 1: WELCOME FORM CARD
                ======================================================== */}
            {step === 1 && (
              <motion.div
                key="form-step"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#FAF8F5] rounded-xl shadow-2xl border border-gray-200 max-w-sm w-full p-8 relative flex flex-col select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm font-bold font-mono">✕</button>
                <video src="/src/assets/leave.webm" autoPlay loop muted playsInline className="w-12 h-auto mb-4 object-contain pointer-events-none" />

                <span className="text-gray-400 text-sm font-medium">Hello!</span>
                <h2 className="text-2xl font-bold text-[#E05C1A] leading-tight mt-1">Welcome to my community garden</h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Plant one seed and grow another!</p>

                <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col gap-4">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">What should we call you?</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 text-sm">👤</span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-100/80 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:border-orange-400 focus:bg-white transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#E89E74] hover:bg-[#E05C1A] text-white text-xs font-bold py-3 px-4 rounded-lg shadow-sm transition-colors uppercase tracking-widest mt-2">
                    Submit
                  </button>
                </form>
              </motion.div>
            )}

            {/* ========================================================
                STEP 2: FULL RANDOMIZED INTERACTIVE GARDEN BOARD
                ======================================================== */}
            {step === 2 && (
              <motion.div
                key="garden-step"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#8b5a2b] border-4 border-[#5c3a21] rounded-2xl shadow-2xl max-w-4xl w-full aspect-[4/3] max-h-[90vh] p-6 relative flex flex-col overflow-hidden select-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #7c4f24, #7c4f24 35px, #835427 35px, #835427 70px)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Control Bar */}
                <div className="flex justify-between items-center w-full z-10 mb-4">
                  <div className="bg-[#5c3a21]/80 text-white font-mono text-xs px-3 py-1.5 rounded border border-white/10 uppercase tracking-wide">
                    242 seeds sowed
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1.5 rounded shadow-sm flex items-center gap-1 font-mono uppercase tracking-wider">
                      📋 Copy Link
                    </button>
                    <button onClick={handleClose} className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs px-3 py-1.5 rounded shadow-sm font-mono uppercase tracking-wider">
                      Exit ✕
                    </button>
                  </div>
                </div>

                {/* Main Mud Field - Absolute Coordinate Container */}
                <div className="flex-1 relative bg-black/10 rounded-xl overflow-hidden border border-black/5 shadow-inner">

                  {/* Dynamic Scattered Plants */}
                  {plants.map((plant) => (
                    <div
                      key={plant.id}
                      className="absolute group/plant"
                      style={{
                        top: plant.top,
                        left: plant.left,
                        transform: `scale(${plant.scale})`,
                        zIndex: Math.floor(parseFloat(plant.top)) // Nicche waale plants upar waalo ke aage overlap honge
                      }}
                    >
                      <div className="relative flex flex-col items-center transition-transform duration-200 hover:scale-110">
                        {/* Render actual asset images */}
                        <img
                          src={plant.img}
                          alt="plant asset"
                          className="w-7 h-auto object-contain select-none pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]"
                        />

                        {/* Specific User Custom tag for 'my plant' */}
                        {plant.isMyPlant && (
                          <div className="absolute top-[-24px] bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded whitespace-nowrap font-sans font-semibold tracking-wide border border-white/20 shadow-md animate-pulse">
                            my plant ({userName})
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                </div>

                {/* Bottom Game Widget Hud Controls */}
                <div className="mt-4 flex justify-between items-end w-full z-10">
                  {/* Water Instructions Box */}
                  <div className="bg-[#2a1a0e]/95 border border-[#5c3a21] text-amber-50 rounded-xl p-4 max-w-xs shadow-lg">
                    <span className="text-[10px] text-orange-400 font-bold block mb-0.5">2/4</span>
                    <p className="text-xs font-medium leading-relaxed font-sans">
                      Water someone else's sprout to help it bloom.
                    </p>
                  </div>

                  {/* Watering Tool Selector */}
                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2 rounded-xl border-2 border-gray-300 flex flex-col items-center shadow-md min-w-[70px]">
                      <button
                        onClick={() => { if (waterCount > 0) setWaterCount(0) }}
                        className={`p-1 active:scale-90 transition-all ${waterCount === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}`}
                      >
                        <img
                          src={wateringCanImg}
                          alt="Watering Can"
                          className="w-8 h-auto object-contain pointer-events-none"
                        />
                      </button>
                      <span className="text-[10px] font-bold font-mono text-gray-700 mt-1">{waterCount}/1</span>
                    </div>

                    <button className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-3.5 px-4 rounded-xl shadow-md border border-gray-200 uppercase tracking-wider font-mono">
                      ℹ️ More Info
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}