import React, { useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import {
  Pencil, Eraser, Minus, Square, Circle, Download,
  RotateCcw, RotateCw, Trash2, LayoutGrid, CircleDot
} from 'lucide-react';

export default function SketchCanvas() {
  const canvasRef = useRef(null);

  // States
  const [activeTool, setActiveTool] = useState('pencil');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [strokeColor, setStrokeColor] = useState('#3D3A36');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [showWidthMenu, setShowWidthMenu] = useState(false);

  // Shape drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const tools = [
    { id: 'pencil', icon: <Pencil size={18} /> },
    { id: 'eraser', icon: <Eraser size={18} /> },
    { id: 'line', icon: <Minus size={18} /> },
    { id: 'rectangle', icon: <Square size={18} /> },
    { id: 'circle', icon: <Circle size={18} /> },
  ];

  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
    setShowSubMenu(false);
    canvasRef.current.eraseMode(toolId === 'eraser');
  };

  const handleMouseDown = (e) => {
    if (activeTool === 'pencil' || activeTool === 'eraser' || activeTool === 'line') return;
    setIsDrawing(true);
    setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;

    if (activeTool === 'rectangle') {
      canvasRef.current.addPaths([{
        strokeWidth, strokeColor, drawMode: 'path',
        paths: [{ x: startPos.x, y: startPos.y }, { x: endX, y: startPos.y }, { x: endX, y: endY }, { x: startPos.x, y: endY }, { x: startPos.x, y: startPos.y }]
      }]);
    } else if (activeTool === 'circle') {
      const radius = Math.sqrt(Math.pow(endX - startPos.x, 2) + Math.pow(endY - startPos.y, 2));
      const points = [];
      for (let i = 0; i <= 32; i++) {
        const angle = (i / 32) * 2 * Math.PI;
        points.push({ x: startPos.x + radius * Math.cos(angle), y: startPos.y + radius * Math.sin(angle) });
      }
      canvasRef.current.addPaths([{ strokeWidth, strokeColor, drawMode: 'path', paths: points }]);
    }
  };

  const handleDownload = () => {
    canvasRef.current.exportImage('png').then(data => {
      const link = document.createElement('a');
      link.href = data;
      link.download = 'my-sketch.png';
      link.click();
    });
  };

  return (
    <div className="w-full h-full relative bg-[#FAF8F5] overflow-hidden">
      <div className={`w-full h-full absolute transition-opacity duration-300 z-10 ${showGrid ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `linear-gradient(to right, #d1cfc9 1px, transparent 1px), linear-gradient(to bottom, #d1cfc9 1px, transparent 1px)`, backgroundSize: '25px 25px', pointerEvents: 'none' }}
      />

      {/* Wrapper to capture Shape events */}
      <div className="absolute inset-0 z-20" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <ReactSketchCanvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", position: 'absolute' }}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
        />
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 z-50">
        {showSubMenu && (
          <div className="bg-[#F3F1ED] p-2 rounded-2xl border border-gray-300 shadow-xl flex flex-col gap-1">
            {tools.map((t) => (
              <button key={t.id} onClick={() => handleToolSelect(t.id)} className={`p-2 rounded-lg ${activeTool === t.id ? 'bg-white' : 'hover:bg-white/50'}`}>
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
          <ToolBtn icon={<RotateCcw size={16} />} onClick={() => canvasRef.current.undo()} />
          <ToolBtn icon={<RotateCw size={16} />} onClick={() => canvasRef.current.redo()} />
          <ToolBtn icon={<Trash2 size={16} />} onClick={() => canvasRef.current.clearCanvas()} />
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