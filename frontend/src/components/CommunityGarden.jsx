import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sproutImg from '../assets/sproutImg.png';
import flower1Img from '../assets/flower1Img.png';
import flower2Img from '../assets/flower2Img.png';
import wateringCanImg from '../assets/wateringCanImg.png';
import Plant from '../assets/leave.webm';

const STORAGE_KEY = 'cg_user';
const DAILY_LIMIT = 3;

function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "2025-01-15"
}

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveUser(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function CommunityGarden() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: garden
  const [nameInput, setNameInput] = useState('');
  const [user, setUser] = useState(null); // { name, joinedDate }
  const [plants, setPlants] = useState([]);
  const [wateredToday, setWateredToday] = useState(0); // how many watered today
  const [wateredIds, setWateredIds] = useState(new Set());
  const [showInfo, setShowInfo] = useState(false);
  const [copyMsg, setCopyMsg] = useState('');

  // On open — check if user already registered
  useEffect(() => {
    if (isOpen) {
      const saved = loadUser();
      if (saved) {
        setUser(saved);
        // Reset daily count if new day
        const today = getTodayStr();
        if (saved.lastWaterDate !== today) {
          const updated = { ...saved, lastWaterDate: today, wateredToday: 0, wateredIds: [] };
          saveUser(updated);
          setUser(updated);
          setWateredToday(0);
          setWateredIds(new Set());
        } else {
          setWateredToday(saved.wateredToday || 0);
          setWateredIds(new Set(saved.wateredIds || []));
        }
        setStep(2);
      } else {
        setStep(1);
      }
    }
  }, [isOpen]);

  // Generate plants when entering garden
  useEffect(() => {
    if (isOpen && step === 2 && user) {
      const totalPlants = 120;
      const generated = [];

      // Find or assign myPlantIndex based on user name hash
      const hash = [...user.name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const myPlantIndex = hash % totalPlants;

      for (let i = 0; i < totalPlants; i++) {
        // Use seeded random based on index for consistent positions
        const seed = (i * 9301 + 49297) % 233280;
        const rand1 = seed / 233280;
        const seed2 = (seed * 9301 + 49297) % 233280;
        const rand2 = seed2 / 233280;
        const seed3 = (seed2 * 9301 + 49297) % 233280;
        const rand3 = seed3 / 233280;

        const top = rand1 * 75 + 10;
        const left = rand2 * 85 + 5;
        const randType = rand3;
        let imgAsset = sproutImg;
        if (randType > 0.4 && randType <= 0.7) imgAsset = flower1Img;
        if (randType > 0.7) imgAsset = flower2Img;

        const isWatered = (saved_wateredIds => saved_wateredIds.has(i))(new Set(user.wateredIds || []));

        generated.push({
          id: i,
          top: `${top}%`,
          left: `${left}%`,
          img: isWatered ? flower1Img : (i === myPlantIndex ? sproutImg : imgAsset),
          isMyPlant: i === myPlantIndex,
          scale: 0.85 + rand1 * 0.3,
          watered: isWatered,
        });
      }
      setPlants(generated);
    }
  }, [isOpen, step, user]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    const today = getTodayStr();
    const newUser = {
      name: nameInput.trim(),
      joinedDate: today,
      lastWaterDate: today,
      wateredToday: 0,
      wateredIds: [],
    };
    saveUser(newUser);
    setUser(newUser);
    setWateredToday(0);
    setWateredIds(new Set());
    setStep(2);
  };

  const handleWater = (plantId) => {
    if (wateredToday >= DAILY_LIMIT) return;
    if (wateredIds.has(plantId)) return;
    const plant = plants.find(p => p.id === plantId);
    if (!plant || plant.isMyPlant) return;

    const newWateredIds = new Set([...wateredIds, plantId]);
    const newCount = wateredToday + 1;

    setWateredIds(newWateredIds);
    setWateredToday(newCount);
    setPlants(prev => prev.map(p =>
      p.id === plantId ? { ...p, watered: true, img: flower1Img } : p
    ));

    // Persist
    const updated = {
      ...user,
      wateredToday: newCount,
      lastWaterDate: getTodayStr(),
      wateredIds: [...newWateredIds],
    };
    saveUser(updated);
    setUser(updated);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setShowInfo(false), 300);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg(''), 2000);
    });
  };

  const remaining = DAILY_LIMIT - wateredToday;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-8 right-4 z-50 flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-1.5 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
        >
          <video src={Plant} autoPlay loop muted playsInline className="w-14 h-auto drop-shadow-sm pointer-events-none" />
          <span className="text-[11px] font-bold text-[#E05C1A] tracking-wide font-mono uppercase">Plant a seed!</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${step === 2 ? 'bg-[#5c3a21]/80 backdrop-blur-sm' : 'bg-[#5c3a21]/40 backdrop-blur-md'}`}
            onClick={handleClose}
          >
            {/* Step 1: Name Form */}
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
                <video src={Plant} autoPlay loop muted playsInline className="w-12 h-auto mb-4 object-contain pointer-events-none" />

                <span className="text-gray-400 text-sm font-medium">Hello!</span>
                <h2 className="text-2xl font-bold text-[#E05C1A] leading-tight mt-1">Welcome to my community garden</h2>
                <p className="text-xs text-gray-500 font-medium mt-1">Plant your seed — come back daily to water others 🌱</p>

                <form onSubmit={handleFormSubmit} className="mt-8 flex flex-col gap-4">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">What should we call you?</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 text-sm">👤</span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-100/80 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:border-orange-400 focus:bg-white transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#E89E74] hover:bg-[#E05C1A] text-white text-xs font-bold py-3 px-4 rounded-lg shadow-sm transition-colors uppercase tracking-widest mt-2">
                    Plant my seed 🌱
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Garden */}
            {step === 2 && user && (
              <motion.div
                key="garden-step"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-[#8b5a2b] border-4 border-[#5c3a21] rounded-2xl shadow-2xl max-w-4xl w-full aspect-[4/3] max-h-[90vh] p-6 relative flex flex-col overflow-hidden select-none"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, #7c4f24, #7c4f24 35px, #835427 35px, #835427 70px)' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Bar */}
                <div className="flex justify-between items-center w-full z-10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#5c3a21]/80 text-white font-mono text-xs px-3 py-1.5 rounded border border-white/10 uppercase tracking-wide">
                      {plants.length} seeds sowed
                    </div>
                    <div className="bg-[#5c3a21]/80 text-amber-300 font-mono text-xs px-3 py-1.5 rounded border border-white/10">
                      👋 {user.name}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleCopyLink} className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1.5 rounded shadow-sm flex items-center gap-1 font-mono uppercase tracking-wider">
                      📋 {copyMsg || 'Copy Link'}
                    </button>
                    <button onClick={handleClose} className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs px-3 py-1.5 rounded shadow-sm font-mono uppercase tracking-wider">
                      Exit ✕
                    </button>
                  </div>
                </div>

                {/* Garden Field */}
                <div className="flex-1 relative bg-black/10 rounded-xl overflow-hidden border border-black/5 shadow-inner">
                  {plants.map((plant) => (
                    <div
                      key={plant.id}
                      className="absolute group/plant"
                      style={{ top: plant.top, left: plant.left, transform: `scale(${plant.scale})`, zIndex: Math.floor(parseFloat(plant.top)) }}
                    >
                      <div
                        className={`relative flex flex-col items-center transition-transform duration-200 hover:scale-110 ${!plant.isMyPlant && remaining > 0 && !plant.watered ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => handleWater(plant.id)}
                      >
                        <img
                          src={plant.img}
                          alt="plant"
                          className={`w-7 h-auto object-contain select-none pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] ${plant.watered ? 'brightness-125' : ''}`}
                        />
                        {plant.isMyPlant && (
                          <div className="absolute top-[-24px] bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded whitespace-nowrap font-semibold border border-white/20 shadow-md animate-pulse">
                            🌱 {user.name}
                          </div>
                        )}
                        {plant.watered && (
                          <div className="absolute -top-4 text-[10px]">💧</div>
                        )}
                        {!plant.isMyPlant && remaining > 0 && !plant.watered && (
                          <div className="absolute -top-5 hidden group-hover/plant:block bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">
                            Water 💧
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom HUD */}
                <div className="mt-4 flex justify-between items-end w-full z-10">
                  <div className="bg-[#2a1a0e]/95 border border-[#5c3a21] text-amber-50 rounded-xl p-4 max-w-xs shadow-lg">
                    {remaining > 0 ? (
                      <>
                        <span className="text-[10px] text-orange-400 font-bold block mb-0.5">{wateredToday}/{DAILY_LIMIT} watered today</span>
                        <p className="text-xs font-medium leading-relaxed">
                          Click on any plant to water it 💧 <b>{remaining} left</b> today
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">Done for today! 🌟</span>
                        <p className="text-xs font-medium leading-relaxed">
                          Come back tomorrow for 3 more waters 🌱
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2 rounded-xl border-2 border-gray-300 flex flex-col items-center shadow-md min-w-[70px]">
                      <div className={`p-1 ${remaining === 0 ? 'opacity-30' : ''}`}>
                        <img src={wateringCanImg} alt="Watering Can" className="w-8 h-auto object-contain pointer-events-none" />
                      </div>
                      <span className="text-[10px] font-bold font-mono text-gray-700 mt-1">{remaining}/{DAILY_LIMIT}</span>
                    </div>
                    <button
                      onClick={() => setShowInfo(true)}
                      className="bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold py-3.5 px-4 rounded-xl shadow-md border border-gray-200 uppercase tracking-wider font-mono"
                    >
                      ℹ️ More Info
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* More Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#FAF8F5] rounded-2xl shadow-2xl max-w-sm w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold font-mono">✕</button>
              <h3 className="text-xl font-bold text-[#E05C1A] mb-4">How it works 🌱</h3>
              <ul className="text-sm text-gray-600 flex flex-col gap-3 leading-relaxed">
                <li>🌱 <b>Enter your name</b> — your unique plant appears in the garden</li>
                <li>💧 <b>3 waters per day</b> — click any plant (not yours) to water it</li>
                <li>🌸 <b>Watered plants bloom</b> into flowers instantly</li>
                <li>🔄 <b>Daily reset</b> — your 3 waters refresh every day</li>
                <li>📋 <b>Share the link</b> — invite friends to grow the garden together</li>
              </ul>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-6 w-full bg-[#E05C1A] text-white text-xs font-bold py-3 rounded-lg uppercase tracking-widest hover:bg-[#c44d14] transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
