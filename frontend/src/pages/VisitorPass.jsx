import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, PenTool, Eraser } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Link, useNavigate } from "react-router-dom";
export default function App() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);
  const randomNames = [
    "MOONLIT FIREFLY",
    "OCEAN WHISPER",
    "STARLIGHT FOX",
    "DREAMY SPARROW",
    "MISTY ROSE",
    "COSMIC OWL",
    "GOLDEN SWAN",
    "SILENT DEER",
  ];

  const themes = {
    blue: "#1594A8",
    green: "#238C48",
    pink: "#BE5B83",
    orange: "#CC7A35",
  };

  const [name, setName] = useState("MOONLIT FIREFLY");
  const [theme, setTheme] = useState("blue");
  const [isEraser, setIsEraser] = useState(false);
  const [insideCard, setInsideCard] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });


  
  const date = new Date().toLocaleDateString("en-GB");

  const visitorId = "5993";

  const generateRandomName = () => {
    const random =
      randomNames[Math.floor(Math.random() * randomNames.length)];

    setName(random);
  };

  const clearEverything = () => canvasRef.current?.clearCanvas();

  const handleEnter = async () => {
    // Check if canvas has any drawing (sign)
    const paths = await canvasRef.current?.exportPaths();
    if (!paths || paths.length === 0) {
      setShowDialog(true);
      return;
    }
    const doodle = await canvasRef.current?.exportImage('png');
    const newCard = {
      id: Date.now(),
      name,
      theme,
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '/'),
      doodle,
    };
    const existing = JSON.parse(localStorage.getItem('visitorCards')) || [];
    localStorage.setItem('visitorCards', JSON.stringify([newCard, ...existing]));
    navigate('/visitor-gallery');
  };

  
  return (
    <div className="min-h-screen bg-[#efede8] flex flex-col items-center px-4 py-8 font-mono relative overflow-hidden">

            {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {insideCard ? (
          <div className="text-xl">
            {isEraser ? "🧽" : "✏️"}
          </div>
        ) : (
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: themes[theme],
            }}
          />
        )}
      </div>
      {/* floating dot */}
      <Link to="/visitor-pass" >
        <div className="absolute top-8 left-16" >Back</div>
      </Link>

      {/* heading */}
      <div className="text-center mt-4">
        <h2 className="tracking-[3px] text-[#3b3b3b] text-sm md:text-base">
          WELCOME, VISITOR.
        </h2>

        <p className="tracking-[3px] text-[#8f8f8f] text-sm mt-2">
          I HOPE YOU ENJOY YOUR TIME HERE.
        </p>
      </div>

      {/* input row */}
      <div className="flex items-center gap-4 mt-10 flex-wrap justify-center">
        <span className="tracking-[2px] text-sm">NAME:</span>

        <input
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          className="
          w-[400px]
          max-w-[90vw]
          h-11
          rounded-xl
          bg-white/80
          px-4
          outline-none
          tracking-[2px]
          uppercase
        "
        />

        <button
          onClick={generateRandomName}
          className="
          h-11
          w-11
          rounded-xl
          bg-[#ece7d9]
          flex
          items-center
          justify-center
          hover:scale-105
          transition
        "
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* card container */}
      <motion.div
        whileHover={{
          scale: 1.02,
          rotate: -1,
        }}
        className="
        relative
        mt-10
        w-[390px]
        max-w-[95vw]
        h-[250px]
        rounded-[28px]
        overflow-hidden
      "
        style={{
          backgroundColor: themes[theme],
        }}
      >

        {/* dotted world style pattern */}
        <div
          className="
          absolute
          inset-0
          opacity-25
          bg-[radial-gradient(circle,white_1.6px,transparent_1.6px)]
        "
          style={{
            backgroundSize: "8px 8px",
            clipPath:
              "polygon(25% 20%,45% 10%,60% 20%,75% 15%,90% 30%,80% 45%,92% 55%,75% 65%,70% 85%,50% 75%,35% 65%,15% 70%,10% 45%,20% 35%)",
          }}
        />

        {/* clear button */}
        <button
          onClick={clearEverything}
          className="
          absolute
          top-3
          right-3
          text-[10px]
          tracking-[2px]
          px-3
          py-1
          rounded-lg
          bg-white/20
          text-white
          font-bold
          z-20
        "
        >
          CLEAR
        </button>

        {/* card content */}
        <div className="relative z-10 p-7 text-white h-full">

          {/* title */}
          <h2
            className="
            text-4xl
            font-serif
            leading-none
          "
          >
            Megan's World
          </h2>

          {/* visitor */}
          <div className="mt-4">
            <p className="text-white/60 tracking-[2px] text-xs">
              VISITOR:
            </p>

            <h3 className="text-3xl mt-1 tracking-[2px] break-words">
              {name || "___________"}
            </h3>
          </div>

          {/* date */}
          <div className="mt-4">
            <p className="text-white/60 tracking-[2px] text-xs">
              ISSUED ON
            </p>

            <p className="text-sm mt-1">
              {date}
            </p>
          </div>

          {/* bottom row */}
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">

            <div>
              <p className="text-white/40 text-xs tracking-[2px]">
                NO. {visitorId}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-xl">
                X
              </span>

              <div className="w-[200px] border-b border-white" />
            </div>

          </div>
        </div>

     

        {/* drawing canvas */}
        <div className="absolute inset-0 z-[15]">
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={3}
            strokeColor={
              isEraser
                ? themes[theme]
                : "white"
            }
            canvasColor="transparent"
            className="w-full h-full"
          />
        </div>

      </motion.div>
    
      {/* theme selector */}
      <div className="flex items-center gap-4 mt-10">

        <button
          onClick={() => setTheme("blue")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "blue"
              ? "border-black scale-110"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.blue,
          }}
        />

        <button
          onClick={() => setTheme("green")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "green"
              ? "border-black scale-110"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.green,
          }}
        />

        <button
          onClick={() => setTheme("pink")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "pink"
              ? "border-black scale-110"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.pink,
          }}
        />

        <button
          onClick={() => setTheme("orange")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "orange"
              ? "border-black scale-110"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.orange,
          }}
        />

        {/* draw + eraser */}
        <div className="flex gap-2 ml-4">

          <button
            onClick={() => setIsEraser(false)}
            className={`
              w-10
              h-10
              rounded-xl
              bg-[#ece7d9]
              flex
              items-center
              justify-center
              transition
              ${!isEraser
                ? "ring-2 ring-black"
                : ""
              }
            `}
          >
            <PenTool size={16} />
          </button>

          <button
            onClick={() => setIsEraser(true)}
            className={`
              w-10
              h-10
              rounded-xl
              bg-[#ece7d9]
              flex
              items-center
              justify-center
              transition
              ${isEraser
                ? "ring-2 ring-black"
                : ""
              }
            `}
          >
            <Eraser size={16} />
          </button>

        </div>
      </div>

      {/* Dialog: sign required */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#efede8] rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl border border-[#d4cfc5]"
            >
              <p className="text-2xl mb-2">✍️</p>
              <h3 className="font-mono tracking-[2px] text-[#2d2d2d] text-sm uppercase font-bold mb-2">Enter a sign</h3>
              <p className="text-[#888] text-xs tracking-widest mb-6">PLEASE DRAW YOUR SIGNATURE ON THE CARD BEFORE ENTERING.</p>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-[#1f1f1f] text-white px-6 py-2.5 rounded-xl text-xs tracking-[2px] hover:opacity-80 transition"
              >
                OK, GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* enter button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-[#1f1f1f] text-white px-8 py-4 rounded-2xl tracking-[2px] text-sm font-semibold"
        onClick={handleEnter}
      >
        ENTER →
      </motion.button>


      {/* footer */}
      <p
        className="
        mt-10
        text-[#9f9f9f]
        text-xs
        tracking-[2px]
        text-center
      "
      >
        Your card will appear in the visitor gallery after review.
      </p>

    </div>
  );
}