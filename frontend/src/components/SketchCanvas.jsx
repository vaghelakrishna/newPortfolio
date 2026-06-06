import React, { useRef, useState, useEffect } from 'react';
import {
  Pencil, Eraser, Minus, Square, Circle, Download,
  RotateCcw, RotateCw, Trash2, LayoutGrid, CircleDot
} from 'lucide-react';

export default function SketchCanvas() {
  const mainCanvasRef = useRef(null);   // permanent drawings
  const overlayCanvasRef = useRef(null); // shape preview
  const historyRef = useRef([]);
  const redoStackRef = useRef([]);
  const isDrawingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [activeTool, setActiveTool] = useState('pencil');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [strokeColor, setStrokeColor] = useState('#3D3A36');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [showWidthMenu, setShowWidthMenu] = useState(false);

  const tools = [
    { id: 'pencil', icon: <Pencil size={18} /> },
    { id: 'eraser', icon: <Eraser size={18} /> },
    { id: 'line', icon: <Minus size={18} /> },
    { id: 'rectangle', icon: <Square size={18} /> },
    { id: 'circle', icon: <Circle size={18} /> },
  ];

  // Resize canvases on mount
  useEffect(() => {
    const resize = () => {
      const container = mainCanvasRef.current?.parentElement;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      [mainCanvasRef, overlayCanvasRef].forEach(ref => {
        if (ref.current) {
          const imgData = ref.current.getContext('2d').getImageData(0, 0, ref.current.width, ref.current.height);
          ref.current.width = width;
          ref.current.height = height;
          ref.current.getContext('2d').putImageData(imgData, 0, 0);
        }
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const saveHistory = () => {
    const ctx = mainCanvasRef.current.getContext('2d');
    historyRef.current.push(ctx.getImageData(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height));
    redoStackRef.current = [];
  };

  const getPos = (e) => {
    const rect = mainCanvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const drawShape = (ctx, tool, x0, y0, x1, y1) => {
    ctx.beginPath();
    ctx.strokeStyle = tool === 'eraser' ? '#FAF8F5' : strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    if (tool === 'rectangle') {
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
      ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === 'line') {
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
  };

  const onMouseDown = (e) => {
    isDrawingRef.current = true;
    const pos = getPos(e);
    startPosRef.current = pos;
    lastPosRef.current = pos;

    if (activeTool === 'pencil' || activeTool === 'eraser') {
      saveHistory();
      const ctx = mainCanvasRef.current.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    } else {
      saveHistory();
    }
  };

  const onMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const pos = getPos(e);
    const mainCtx = mainCanvasRef.current.getContext('2d');

    if (activeTool === 'pencil') {
      mainCtx.strokeStyle = strokeColor;
      mainCtx.lineWidth = strokeWidth;
      mainCtx.lineCap = 'round';
      mainCtx.lineJoin = 'round';
      mainCtx.lineTo(pos.x, pos.y);
      mainCtx.stroke();
    } else if (activeTool === 'eraser') {
      mainCtx.globalCompositeOperation = 'destination-out';
      mainCtx.strokeStyle = 'rgba(0,0,0,1)';
      mainCtx.lineWidth = strokeWidth * 3;
      mainCtx.lineCap = 'round';
      mainCtx.lineJoin = 'round';
      mainCtx.lineTo(pos.x, pos.y);
      mainCtx.stroke();
      mainCtx.globalCompositeOperation = 'source-over';
    } else {
      // preview on overlay
      const ovCtx = overlayCanvasRef.current.getContext('2d');
      ovCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      drawShape(ovCtx, activeTool, startPosRef.current.x, startPosRef.current.y, pos.x, pos.y);
    }
    lastPosRef.current = pos;
  };

  const onMouseUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const pos = getPos(e);

    if (activeTool !== 'pencil' && activeTool !== 'eraser') {
      // clear preview
      overlayCanvasRef.current.getContext('2d').clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      // commit to main canvas
      const mainCtx = mainCanvasRef.current.getContext('2d');
      drawShape(mainCtx, activeTool, startPosRef.current.x, startPosRef.current.y, pos.x, pos.y);
    }
  };

  const undo = () => {
    if (!historyRef.current.length) return;
    const ctx = mainCanvasRef.current.getContext('2d');
    redoStackRef.current.push(ctx.getImageData(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height));
    const prev = historyRef.current.pop();
    ctx.putImageData(prev, 0, 0);
  };

  const redo = () => {
    if (!redoStackRef.current.length) return;
    const ctx = mainCanvasRef.current.getContext('2d');
    historyRef.current.push(ctx.getImageData(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height));
    const next = redoStackRef.current.pop();
    ctx.putImageData(next, 0, 0);
  };

  const clearCanvas = () => {
    saveHistory();
    const ctx = mainCanvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, mainCanvasRef.current.width, mainCanvasRef.current.height);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = mainCanvasRef.current.toDataURL('image/png');
    link.download = 'my-sketch.png';
    link.click();
  };

  const cursor = activeTool === 'eraser' ? 'cell' : (activeTool === 'pencil' ? 'crosshair' : 'crosshair');

  return (
    <div className="w-full h-full relative bg-[#FAF8F5] overflow-hidden">
      <div className={`w-full h-full absolute transition-opacity duration-300 z-10 ${showGrid ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `linear-gradient(to right, #d1cfc9 1px, transparent 1px), linear-gradient(to bottom, #d1cfc9 1px, transparent 1px)`, backgroundSize: '25px 25px', pointerEvents: 'none' }}
      />

      <div className="absolute inset-0 z-20">
        <canvas ref={mainCanvasRef} className="absolute inset-0" />
        <canvas ref={overlayCanvasRef} className="absolute inset-0"
          style={{ cursor, pointerEvents: 'all' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 z-50">
        {showSubMenu && (
          <div className="bg-[#F3F1ED] p-2 rounded-2xl border border-gray-300 shadow-xl flex flex-col gap-1">
            {tools.map((t) => (
              <button key={t.id} onClick={() => { setActiveTool(t.id); setShowSubMenu(false); }}
                className={`p-2 rounded-lg ${activeTool === t.id ? 'bg-white' : 'hover:bg-white/50'}`}>
                {t.icon}
              </button>
            ))}
          </div>
        )}

        <div className="bg-[#F3F1ED]/90 backdrop-blur-sm border border-gray-300/60 rounded-2xl p-2 flex flex-col gap-1 shadow-xl">
          <button onClick={() => setShowSubMenu(!showSubMenu)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200">
            {tools.find(t => t.id === activeTool)?.icon}
          </button>
          <div className="w-6 h-0.5 bg-gray-300 rounded-full mx-auto my-1" />
          <div className="relative w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl">
            <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="opacity-0 absolute w-full h-full cursor-pointer" />
            <div className="w-5 h-5 rounded-full border border-gray-400" style={{ backgroundColor: strokeColor }} />
          </div>
          <div className="relative">
            <button onClick={() => setShowWidthMenu(!showWidthMenu)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-xl transition-all">
              <CircleDot size={18} />
            </button>
            {showWidthMenu && (
              <div className="absolute right-12 top-0 bg-[#F3F1ED] p-2 rounded-xl border border-gray-300 flex gap-2 shadow-xl">
                {[2, 4, 8, 12].map(w => (
                  <button key={w} onClick={() => { setStrokeWidth(w); setShowWidthMenu(false); }} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full">
                    <div style={{ width: w, height: w }} className="bg-black rounded-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setShowGrid(!showGrid)} className={`w-10 h-10 flex items-center justify-center rounded-xl ${showGrid ? 'bg-white text-black' : 'text-gray-600 hover:bg-white'}`}>
            <LayoutGrid size={16} />
          </button>
          <ToolBtn icon={<Download size={16} />} onClick={handleDownload} />
          <div className="h-px w-full bg-gray-300 my-1" />
          <ToolBtn icon={<RotateCcw size={16} />} onClick={undo} />
          <ToolBtn icon={<RotateCw size={16} />} onClick={redo} />
          <ToolBtn icon={<Trash2 size={16} />} onClick={clearCanvas} />
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-xl transition-all">
      {icon}
    </button>
  );
}
