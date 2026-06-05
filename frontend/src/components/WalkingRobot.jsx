import React, { useState } from 'react';

const WalkingRobot = () => {
  const [count, setCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const messages = ["Hello!", "Oh hi!", "What's up?", "Rude..."];

  const handleInteraction = () => {
    setShowTooltip(true);
    setCount((prev) => (prev + 1) % messages.length);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <>
      <style>{`
        @keyframes walk-across {
          0% { transform: translateX(50px) scaleX(1); }
          40% { transform: translateX(calc(100vw - 150px)) scaleX(1); }
          45% { transform: translateX(calc(100vw - 150px)) scaleX(-1); }
          90% { transform: translateX(50px) scaleX(-1); }
          100% { transform: translateX(50px) scaleX(1); }
        }
        @keyframes blink { 0%, 90%, 100% { height: 5px; } 95% { height: 0px; } }
        @keyframes body-sway { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes leg-swing { 0% { transform: rotate(-20deg); } 50% { transform: rotate(20deg); } 100% { transform: rotate(-20deg); } }

        .robot-container { position: fixed; bottom: 0px; left: 0; z-index: 100; cursor: pointer; pointer-events: auto; }
        
        /* 'paused' क्लास मिलने पर सब कुछ रुक जाएगा */
        .paused, .paused * { animation-play-state: paused !important; }
        
        .robot-walker { animation: walk-across 60s linear infinite; }
        .body-sway { animation: body-sway 1.5s infinite ease-in-out; }
        .eye { animation: blink 2s infinite; }
        .leg-left { animation: leg-swing 1.5s infinite ease-in-out; transform-origin: top center; }
        .leg-right { animation: leg-swing 1.5s infinite ease-in-out; animation-delay: -0.75s; transform-origin: top center; }
        
        .tooltip-wrapper { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); transition: opacity 0.3s; }
      `}</style>

      <div className="robot-container" onClick={handleInteraction} onMouseEnter={handleInteraction}>
        {/* अगर tooltip दिख रही है, तो पूरी 'robot-walker' क्लास को 'paused' क्लास दे दो */}
        <div className={`robot-walker ${showTooltip ? 'paused' : ''}`}>
          <div className="body-sway flex flex-col items-center">

            <div className="tooltip-wrapper" style={{ opacity: showTooltip ? 1 : 0 }}>
              <div className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-[10px] font-bold">
                {messages[count]}
              </div>
            </div>

            <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
              <ellipse cx="22" cy="53.5" rx="14" ry="1.8" fill="#242424" opacity="0.16" />
              <rect x="4" y="6" width="36" height="38" rx="5" fill="#242424" />
              <rect className="eye" x="14" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
              <rect className="eye" x="26" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
              <rect className="leg-left" x="14" y="42" width="8" height="10" rx="1.5" fill="#242424" />
              <rect className="leg-right" x="22" y="42" width="8" height="10" rx="1.5" fill="#242424" />

              <g>
                <rect x="6" y="1" width="32" height="6" rx="2" fill="#e8c84a" />
                <rect x="10" y="-4" width="24" height="5" rx="2" fill="#e8c84a" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalkingRobot;




// import React, { useState } from 'react';

// const WalkingRobot = () => {
//   const [count, setCount] = useState(0);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const messages = ["Hello!", "Oh hi!", "What's up?", "Rude..."];

//   const handleInteraction = () => {
//     setShowTooltip(true);
//     setCount((prev) => (prev + 1) % messages.length);
//     setTimeout(() => setShowTooltip(false), 3000);
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes walk-across {
//           0% { transform: translateX(50px) scaleX(1); }
//           40% { transform: translateX(calc(100vw - 150px)) scaleX(1); }
//           45% { transform: translateX(calc(100vw - 150px)) scaleX(-1); }
//           90% { transform: translateX(50px) scaleX(-1); }
//           100% { transform: translateX(50px) scaleX(1); }
//         }
//         @keyframes blink { 0%, 90%, 100% { height: 5px; } 95% { height: 0px; } }
//         @keyframes body-sway { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
//         @keyframes leg-left-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
//         @keyframes leg-right-walk { 0%, 100% { transform: translateY(-6px); } 50% { transform: translateY(0); } }

//         .robot-container { position: fixed; bottom: 0px; left: 0; z-index: 100; cursor: pointer; pointer-events: auto; }
//         .robot-walker { animation: walk-across 80s linear infinite; }
//         .body-sway { animation: body-sway 1.5s infinite ease-in-out; }
//         .eye { animation: blink 2s infinite; }
        
//         .leg-left { animation: leg-left-walk 0.6s infinite ease-in-out; }
//         .leg-right { animation: leg-right-walk 0.6s infinite ease-in-out; }
        
//         .paused, .paused * { animation-play-state: paused !important; }
        
//         .tooltip-wrapper { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); transition: opacity 0.3s; }
//       `}</style>

//       <div className="robot-container" onClick={handleInteraction} onMouseEnter={handleInteraction}>
//         <div className={`robot-walker ${showTooltip ? 'paused' : ''}`}>
//           <div className="body-sway flex flex-col items-center">

//             <div className="tooltip-wrapper" style={{ opacity: showTooltip ? 1 : 0 }}>
//               <div className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-[10px] font-bold">
//                 {messages[count]}
//               </div>
//             </div>

//             <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
//               <ellipse cx="22" cy="53.5" rx="14" ry="1.8" fill="#242424" opacity="0.16" />
//               <rect x="4" y="6" width="36" height="38" rx="5" fill="#242424" />
//               <rect className="eye" x="14" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
//               <rect className="eye" x="26" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />

//               {/* गैप वाले पैर: x पोजीशन को 12 और 24 कर दिया है */}
//               <rect className="leg-left" x="12" y="42" width="8" height="10" rx="1.5" fill="#242424" />
//               <rect className="leg-right" x="24" y="42" width="8" height="10" rx="1.5" fill="#242424" />

//               <g>
//                 <rect x="6" y="1" width="32" height="6" rx="2" fill="#e8c84a" />
//                 <rect x="10" y="-4" width="24" height="5" rx="2" fill="#e8c84a" />
//               </g>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WalkingRobot;