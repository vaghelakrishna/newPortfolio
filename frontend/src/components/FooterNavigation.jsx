import React, { useState } from 'react';

const WalkingRobot = () => {
  const [count, setCount] = useState(0);
  const messages = ["Hello!", "Oh hi!", "What's up?", "Rude..."];

  const handleInteraction = () => {
    setCount((prev) => (prev + 1) % messages.length);
  };

  return (
    <>
      <style>{`
        /* Slow & Smooth Walking Animation */
        @keyframes walk-across {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(110vw); }
        }
        
        .robot-container { 
          position: fixed; 
          bottom: 20px; 
          left: 0; 
          z-index: 100; 
          cursor: pointer; 
        }
        
        .robot-walker { 
          /* Duration 40s karne se ye bahut slow ho gaya hai */
          animation: walk-across 40s linear infinite; 
        }
        
        /* Tooltip style */
        .tooltip {
          position: absolute;
          top: -30px;
          white-space: nowrap;
          background: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: bold;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="robot-container" onClick={handleInteraction} onMouseEnter={handleInteraction}>
        <div className="robot-walker flex flex-col items-center">

          {/* Tooltip */}
          <div className="tooltip">
            {messages[count]}
          </div>

          {/* SVG Robot */}
          <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
            <rect x="4" y="6" width="36" height="38" rx="5" fill="#242424" />
            <rect x="14" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
            <rect x="26" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
            <rect x="10" y="42" width="8" height="10" rx="1.5" fill="#242424" />
            <rect x="26" y="42" width="8" height="10" rx="1.5" fill="#242424" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default WalkingRobot;