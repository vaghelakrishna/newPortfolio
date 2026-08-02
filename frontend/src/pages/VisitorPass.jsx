import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, PenTool, Eraser } from "lucide-react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Link, useNavigate } from "react-router-dom";
export default function App() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });

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

  const date = new Date().toLocaleDateString("en-GB");

  const visitorId = "5993";

  const generateRandomName = () => {
    const random =
      randomNames[Math.floor(Math.random() * randomNames.length)];

    setName(random);
  };

  const clearEverything = () => canvasRef.current?.clearCanvas();

  const handleEnter = async () => {
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
    navigate('/home');
  };


  return (
    <div className="min-h-screen bg-[#efede8] flex flex-col items-center px-4 py-8 font-mono relative overflow-hidden">

      {/* Custom Cursor - Instant tracking without spring lag */}
      <div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {insideCard ? (
          <div className="text-xs font-bold tracking-widest bg-white/90 backdrop-blur-xs px-2 py-1 rounded shadow-sm text-black">
            {isEraser ? "ERASE" : "DRAW"}
          </div>
        ) : (
          <div
            className="w-4 h-4 rounded-full shadow-sm"
            style={{
              backgroundColor: themes[theme],
              transition: "background-color 0.3s ease-in-out",
            }}
          />
        )}
      </div>

      {/* floating dot */}
      <Link to="/visitor-pass" >
        <div className="absolute top-8 left-16 hover:opacity-70 transition-opacity" >Back</div>
      </Link>

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-4"
      >
        <h2 className="tracking-[3px] text-[#3b3b3b] text-sm md:text-base">
          WELCOME, VISITOR.
        </h2>

        <p className="tracking-[3px] text-[#8f8f8f] text-sm mt-2">
          I HOPE YOU ENJOY YOUR TIME HERE.
        </p>
      </motion.div>

      {/* input row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-4 mt-10 flex-wrap justify-center"
      >
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
          transition-all
          focus:ring-2
          focus:ring-black/10
        "
        />

        <motion.button
          whileHover={{ scale: 1.08, rotate: 180 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={generateRandomName}
          className="
          h-11
          w-11
          rounded-xl
          bg-[#ece7d9]
          flex
          items-center
          justify-center
          shadow-xs
        "
        >
          <RefreshCw size={16} />
        </motion.button>
      </motion.div>

      {/* card container */}
      <motion.div
        onMouseEnter={() => setInsideCard(true)}
        onMouseLeave={() => setInsideCard(false)}
        whileHover={{
          scale: 1.02,
          rotate: -0.5,
          boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="
        relative
        mt-10
        w-[390px]
        max-w-[95vw]
        h-[250px]
        rounded-[28px]
        overflow-hidden
        shadow-md
      "
        style={{
          backgroundColor: themes[theme],
          transition: "background-color 0.5s ease-in-out",
        }}
      >
        {/* dotted world style pattern */}
        <div
          className="
          absolute
          inset-0
          opacity-25
          pointer-events-none
          bg-[radial-gradient(circle,white_1.6px,transparent_1.6px)]
        "
          style={{
            backgroundSize: "8px 8px",
            clipPath:
              "polygon(25% 20%,45% 10%,60% 20%,75% 15%,90% 30%,80% 45%,92% 55%,75% 65%,70% 85%,50% 75%,35% 65%,15% 70%,10% 45%,20% 35%)",
          }}
        />

        {/* clear button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
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
          backdrop-blur-xs
          text-white
          font-bold
          z-20
        "
        >
          CLEAR
        </motion.button>

        {/* card content */}
        <div className="relative z-10 p-7 text-white h-full pointer-events-none">

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
            strokeColor="white"
            canvasColor="transparent"
            eraserWidth={20}
            className="w-full h-full cursor-none"
            onMouseEnter={() => isEraser ? canvasRef.current?.eraseMode(true) : canvasRef.current?.eraseMode(false)}
          />
        </div>

      </motion.div>

      {/* theme selector */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 mt-10"
      >

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme("blue")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "blue"
              ? "border-black scale-110 shadow-md"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.blue,
          }}
        />

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme("green")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "green"
              ? "border-black scale-110 shadow-md"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.green,
          }}
        />

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme("pink")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "pink"
              ? "border-black scale-110 shadow-md"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.pink,
          }}
        />

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme("orange")}
          className={`
            w-9 h-9 rounded-full
            border-4
            transition-all
            ${theme === "orange"
              ? "border-black scale-110 shadow-md"
              : "border-transparent"
            }
          `}
          style={{
            backgroundColor: themes.orange,
          }}
        />

        {/* draw + eraser */}
        <div className="flex gap-2 ml-4">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEraser(false);
              canvasRef.current?.eraseMode(false);
            }}
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
                ? "ring-2 ring-black bg-white"
                : ""
              }
            `}
          >
            <PenTool size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEraser(true);
              canvasRef.current?.eraseMode(true);
            }}
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
                ? "ring-2 ring-black bg-white"
                : ""
              }
            `}
          >
            <Eraser size={16} />
          </motion.button>

        </div>
      </motion.div>

      {/* Dialog: sign required */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs"
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#efede8] rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl border border-[#d4cfc5]"
            >
              <h3 className="font-mono tracking-[2px] text-[#2d2d2d] text-sm uppercase font-bold mb-2">Enter a sign</h3>
              <p className="text-[#888] text-xs tracking-widest mb-6">PLEASE DRAW YOUR SIGNATURE ON THE CARD BEFORE ENTERING.</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDialog(false)}
                className="bg-[#1f1f1f] text-white px-6 py-2.5 rounded-xl text-xs tracking-[2px]"
              >
                OK, GOT IT
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* enter button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-[#1f1f1f] text-white px-8 py-4 rounded-2xl tracking-[2px] text-sm font-semibold shadow-md"
        onClick={handleEnter}
      >
        ENTER →
      </motion.button>


      {/* footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="
        mt-10
        text-[#9f9f9f]
        text-xs
        tracking-[2px]
        text-center
      "
      >
        Your card will appear in the visitor gallery after review.
      </motion.p>

    </div>
  );
}