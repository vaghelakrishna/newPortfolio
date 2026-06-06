import React, { useState, useRef, useEffect } from 'react';

const WalkingRobot = ({ footerRef }) => {
  const [count, setCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPanic, setIsPanic] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState(null);
  const [isRelief, setIsRelief] = useState(false);

  const containerRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStartY = useRef(null);
  const tooltipTimer = useRef(null);
  const isPanicRef = useRef(false); // to avoid stale closure

  const messages = ["Hello!", "Oh hi!", "What's up?", "Rude..."];

  const [footerBottom, setFooterBottom] = useState(0);

  useEffect(() => {
    const updateBottom = () => {
      if (!footerRef?.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const fromBottom = window.innerHeight - rect.top;
      setFooterBottom(fromBottom > 0 ? fromBottom : 0);
    };
    window.addEventListener('scroll', updateBottom, { passive: true });
    updateBottom();
    return () => window.removeEventListener('scroll', updateBottom);
  }, [footerRef]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    dragStartY.current = e.clientY;
    setIsDragging(true);
    setPos({ x: rect.left, y: rect.top });
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      const dy = dragStartY.current - e.clientY;
      if (dy > 40) {
        isPanicRef.current = true;
        setIsPanic(true);
        setShowTooltip(true);
      } else {
        isPanicRef.current = false;
        setIsPanic(false);
        setShowTooltip(false);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsPanic(false);
      setPos(null);

      if (isPanicRef.current) {
        isPanicRef.current = false;
        setIsRelief(true);
        setShowTooltip(true);
        clearTimeout(tooltipTimer.current);
        tooltipTimer.current = setTimeout(() => {
          setShowTooltip(false);
          setIsRelief(false);
        }, 3000);
      } else {
        setShowTooltip(false);
        setIsRelief(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const handleClick = () => {
    if (isDragging || isRelief) return;
    clearTimeout(tooltipTimer.current);
    setShowTooltip(true);
    setCount((prev) => (prev + 1) % messages.length);
    tooltipTimer.current = setTimeout(() => setShowTooltip(false), 3000);
  };

  const positionStyle = pos
    ? { position: 'fixed', left: pos.x, top: pos.y, bottom: 'auto', animation: 'none' }
    : { bottom: `${footerBottom}px` };

  const tooltipText = isPanic ? 'Help! Help!' : isRelief ? 'Thank god.. huhh' : messages[count];

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
        @keyframes leg-swing-fast { 0% { transform: rotate(-35deg); } 50% { transform: rotate(35deg); } 100% { transform: rotate(-35deg); } }

        .robot-container { position: fixed; left: 0; z-index: 100; cursor: grab; pointer-events: auto; user-select: none; transition: bottom 0.4s ease; }
        .robot-container:active { cursor: grabbing; }
        .robot-walker { animation: walk-across 60s linear infinite; }
        .robot-walker.stopped { animation-play-state: paused; }
        .body-sway { animation: body-sway 1.5s infinite ease-in-out; }
        .eye { animation: blink 2s infinite; }
        .leg-left { animation: leg-swing 1.5s infinite ease-in-out; transform-origin: top center; }
        .leg-right { animation: leg-swing 1.5s infinite ease-in-out; animation-delay: -0.75s; transform-origin: top center; }
        .leg-left-fast { animation: leg-swing-fast 0.4s infinite ease-in-out; transform-origin: top center; }
        .leg-right-fast { animation: leg-swing-fast 0.4s infinite ease-in-out; animation-delay: -0.2s; transform-origin: top center; }
        .tooltip-wrapper { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); transition: opacity 0.3s; white-space: nowrap; pointer-events: none; }
      `}</style>

      <div
        ref={containerRef}
        className="robot-container"
        style={positionStyle}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <div className={`robot-walker ${isDragging || (showTooltip && !isPanic) ? 'stopped' : ''}`}>
          <div className="body-sway flex flex-col items-center">

            <div className="tooltip-wrapper" style={{ opacity: showTooltip ? 1 : 0 }}>
              <div className="bg-[#2D2D2D] text-white px-3 py-1 rounded-full text-[10px] font-bold">
                {tooltipText}
              </div>
            </div>

            <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
              <ellipse cx="22" cy="53.5" rx="14" ry="1.8" fill="#242424" opacity="0.16" />
              <rect x="4" y="6" width="36" height="38" rx="5" fill="#242424" />

              {isPanic ? (
                <>
                  <rect x="12" y="24" width="6" height="2" rx="1" fill="#f3e9d6" />
                  <rect x="26" y="24" width="6" height="2" rx="1" fill="#f3e9d6" />
                </>
              ) : (
                <>
                  <rect className="eye" x="14" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
                  <rect className="eye" x="26" y="22" width="4" height="5" rx="1" fill="#f3e9d6" />
                </>
              )}

              <rect className={isPanic ? 'leg-left-fast' : 'leg-left'} x="14" y="42" width="8" height="10" rx="1.5" fill="#242424" />
              <rect className={isPanic ? 'leg-right-fast' : 'leg-right'} x="22" y="42" width="8" height="10" rx="1.5" fill="#242424" />

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