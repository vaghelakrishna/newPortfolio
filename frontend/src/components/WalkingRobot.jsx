import React, { useState, useRef, useEffect } from 'react';

const WalkingRobot = ({ footerRef }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPanic, setIsPanic] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState(null);
  const [isRelief, setIsRelief] = useState(false);

  const containerRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartY = useRef(null);
  const tooltipTimer = useRef(null);
  const isPanicRef = useRef(false);

  // Playful hover & click messages
  const messages = [
    "Hii bestie! ✨",
    "Looking cute today! 🎀",
    "Don't tickle me! 🙈",
    "Need any help? 💭",
    "Just strolling around... 🌸",
    "You found me! 💕",
    "Keep scrolling! 💫",
    "Hehe what's up? 🍓"
  ];

  const [footerBottom, setFooterBottom] = useState(16);

  useEffect(() => {
    const updateBottom = () => {
      if (!footerRef?.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const fromBottom = window.innerHeight - rect.top;
      setFooterBottom(fromBottom > 16 ? fromBottom : 16);
    };
    window.addEventListener('scroll', updateBottom, { passive: true });
    updateBottom();
    return () => window.removeEventListener('scroll', updateBottom);
  }, [footerRef]);

  // Hover Events
  const handleMouseEnter = () => {
    if (isDragging || isDropping) return;
    setIsHovered(true);
    clearTimeout(tooltipTimer.current);
    // Shuffle to next message on hover
    setMsgIndex((prev) => (prev + 1) % messages.length);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDragging && !isRelief) {
      tooltipTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    }
  };

  // Click Event
  const handleClick = (e) => {
    e.stopPropagation();
    if (isDragging || isRelief || isDropping) return;
    clearTimeout(tooltipTimer.current);
    setShowTooltip(true);
    setMsgIndex((prev) => (prev + 1) % messages.length);
    tooltipTimer.current = setTimeout(() => setShowTooltip(false), 2200);
  };

  // Drag Start
  const handleStart = (clientX, clientY) => {
    if (isDropping) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    dragStartY.current = clientY;
    setIsDragging(true);
    setIsDropping(false);
    setPos({ x: rect.left, y: rect.top });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (clientX, clientY) => {
      setPos({ x: clientX - dragOffset.current.x, y: clientY - dragOffset.current.y });
      const dy = dragStartY.current - clientY;
      if (dy > 30) {
        isPanicRef.current = true;
        setIsPanic(true);
        setShowTooltip(true);
      } else {
        isPanicRef.current = false;
        setIsPanic(false);
        setShowTooltip(false);
      }
    };

    const onMouseMove = (e) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onEnd = () => {
      setIsDragging(false);
      setIsPanic(false);

      const hadPanicked = isPanicRef.current;
      isPanicRef.current = false;
      setIsDropping(true);

      setTimeout(() => {
        setPos(null);
        setIsDropping(false);

        if (hadPanicked) {
          setIsRelief(true);
          setShowTooltip(true);
          clearTimeout(tooltipTimer.current);
          tooltipTimer.current = setTimeout(() => {
            setShowTooltip(false);
            setIsRelief(false);
          }, 2400);
        } else {
          setShowTooltip(false);
        }
      }, 400);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  const positionStyle = pos
    ? {
      position: 'fixed',
      left: `${pos.x}px`,
      top: isDropping ? `calc(100vh - ${footerBottom + 60}px)` : `${pos.y}px`,
      bottom: 'auto',
      transition: isDropping ? 'top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
    }
    : {
      bottom: `${footerBottom}px`,
    };

  const tooltipText = isPanic
    ? 'Put me down!! 😭'
    : isRelief
      ? 'Phew... my bow is ruined! 🥺'
      : messages[msgIndex];

  // Pause walk when interacting (hover, drag, drop, relief, talk)
  const isPaused = isDragging || isDropping || isHovered || isRelief || (showTooltip && !isPanic);

  return (
    <>
      <style>{`
        /* 44s Smooth Walk Cycle across screen */
        @keyframes walk-across {
          0% { transform: translateX(10px); }
          45% { transform: translateX(calc(100vw - 70px)); }
          50% { transform: translateX(calc(100vw - 70px)); }
          95% { transform: translateX(10px); }
          100% { transform: translateX(10px); }
        }

        /* Natural 3D turn with squash and jump flip */
        @keyframes natural-turn {
          0%, 45% { 
            transform: rotateY(0deg) translateY(0); 
          }
          46.5% { 
            transform: rotateY(0deg) translateY(2px) scaleY(0.92); 
          }
          48.5% { 
            transform: rotateY(90deg) translateY(-8px) scale(1.05); 
          }
          50% { 
            transform: rotateY(180deg) translateY(0) scale(1); 
          }
          95% { 
            transform: rotateY(180deg) translateY(0); 
          }
          96.5% { 
            transform: rotateY(180deg) translateY(2px) scaleY(0.92); 
          }
          98.5% { 
            transform: rotateY(90deg) translateY(-8px) scale(1.05); 
          }
          100% { 
            transform: rotateY(0deg) translateY(0) scale(1); 
          }
        }

        @keyframes blink { 0%, 90%, 100% { height: 6px; } 95% { height: 1px; } }
        @keyframes body-sway { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
        @keyframes leg-swing { 0% { transform: rotate(-22deg); } 50% { transform: rotate(22deg); } 100% { transform: rotate(-22deg); } }
        @keyframes leg-swing-fast { 0% { transform: rotate(-35deg); } 50% { transform: rotate(35deg); } 100% { transform: rotate(-35deg); } }
        @keyframes tear-drop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(8px); opacity: 0; } }

        .robot-container {
          position: fixed;
          left: 0;
          z-index: 100;
          cursor: grab;
          pointer-events: auto;
          user-select: none;
          perspective: 600px;
        }
        .robot-container:active { cursor: grabbing; }

        .robot-walker {
          animation: walk-across 44s linear infinite;
        }
        .robot-walker.stopped,
        .robot-turn.stopped {
          animation-play-state: paused;
        }

        .robot-turn {
          animation: natural-turn 44s linear infinite;
          transform-style: preserve-3d;
          transform-origin: center center;
        }

        .body-sway { animation: body-sway 1.3s infinite ease-in-out; }
        .eye { animation: blink 2.2s infinite; }
        .leg-left { animation: leg-swing 1.3s infinite ease-in-out; transform-origin: top center; }
        .leg-right { animation: leg-swing 1.3s infinite ease-in-out; animation-delay: -0.65s; transform-origin: top center; }
        .leg-left-fast { animation: leg-swing-fast 0.3s infinite ease-in-out; transform-origin: top center; }
        .leg-right-fast { animation: leg-swing-fast 0.3s infinite ease-in-out; animation-delay: -0.15s; transform-origin: top center; }
        .tear-anim { animation: tear-drop 0.6s infinite ease-in; }

        /* Speech Bubble Wrapper - always remains readable facing front */
        .tooltip-wrapper {
          position: absolute;
          top: -46px;
          left: 50%;
          transform: translateX(-50%) translateZ(50px);
          transition: opacity 0.25s, transform 0.25s;
          white-space: nowrap;
          pointer-events: none;
          z-index: 200;
        }
      `}</style>

      <div
        ref={containerRef}
        className="robot-container"
        style={positionStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        <div className={`robot-walker relative ${isPaused ? 'stopped' : ''}`}>

          {/* Always-Readable Tooltip Bubble */}
          <div
            className="tooltip-wrapper"
            style={{
              opacity: showTooltip ? 1 : 0,
              transform: showTooltip ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)',
            }}
          >
            <div className="bg-[#FF4081] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md border border-pink-200 flex items-center gap-1">
              <span>{tooltipText}</span>
            </div>
          </div>

          {/* 3D Natural Flip Container */}
          <div className={`robot-turn ${isPaused ? 'stopped' : ''}`}>
            <div className="body-sway flex flex-col items-center relative">

              {/* Cute Girly Robot SVG */}
              <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
                {/* Shadow */}
                <ellipse cx="24" cy="57" rx="14" ry="2.5" fill="#F472B6" opacity="0.25" />

                {/* Legs */}
                <rect className={isPanic ? 'leg-left-fast' : 'leg-left'} x="15" y="44" width="7" height="11" rx="3.5" fill="#FF5E8E" />
                <rect className={isPanic ? 'leg-right-fast' : 'leg-right'} x="26" y="44" width="7" height="11" rx="3.5" fill="#FF5E8E" />

                {/* Main Body */}
                <rect x="5" y="10" width="38" height="36" rx="8" fill="#FFF0F5" stroke="#FF5E8E" strokeWidth="2.5" />

                {/* Cheeks */}
                <circle cx="11" cy="31" r="3" fill="#FFB6C1" opacity="0.8" />
                <circle cx="37" cy="31" r="3" fill="#FFB6C1" opacity="0.8" />

                {/* Expressions */}
                {isPanic ? (
                  <>
                    <path d="M14 24 L18 27 L14 30" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M34 24 L30 27 L34 30" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle className="tear-anim" cx="12" cy="35" r="1.5" fill="#38BDF8" />
                    <circle className="tear-anim" cx="36" cy="35" r="1.5" fill="#38BDF8" />
                    <ellipse cx="24" cy="32" rx="3.5" ry="4.5" fill="#FF4081" />
                  </>
                ) : (
                  <>
                    <rect className="eye" x="14" y="22" width="4" height="6" rx="2" fill="#2B2327" />
                    <rect className="eye" x="30" y="22" width="4" height="6" rx="2" fill="#2B2327" />
                    <circle cx="15" cy="23.5" r="1" fill="#FFFFFF" />
                    <circle cx="31" cy="23.5" r="1" fill="#FFFFFF" />
                    <path d="M22 30 Q24 33 26 30" stroke="#FF5E8E" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </>
                )}

                {/* Ribbon Bow on Head */}
                <g transform="translate(14, 2)">
                  <ellipse cx="4" cy="6" rx="4.5" ry="3.5" fill="#FF4081" />
                  <ellipse cx="16" cy="6" rx="4.5" ry="3.5" fill="#FF4081" />
                  <circle cx="10" cy="6" r="3" fill="#FF1493" />
                  <circle cx="9.5" cy="5.5" r="1" fill="#FFFFFF" />
                </g>
              </svg>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default WalkingRobot;