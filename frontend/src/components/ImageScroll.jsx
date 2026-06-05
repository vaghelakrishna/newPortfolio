import { motion } from 'framer-motion';

const ImageScroll = () => {
  const images = [1, 2, 3, 4, 5]; // आपकी इमेजेस का एरे

  return (
    <div className="w-full overflow-hidden py-10 cursor-grab">
      <motion.div
        className="flex gap-10"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* इमेजेस को दो बार रिपीट कर रहे हैं ताकि लूप स्मूथ रहे */}
        {[...images, ...images].map((img, i) => (
          <div key={i} className="relative group shrink-0">
            {/* डूडल टेप जो फोटो को पकड़ेगा */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-16 h-8 bg-yellow-200/60 rotate-2 border-l border-r border-black/20" />

            {/* फोटो फ्रेम */}
            <div className="w-64 h-80 bg-white p-3 rotate-[-1deg] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)] group-hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center font-['Gochi_Hand',_cursive] text-lg text-gray-500">
                Project {img}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
export default ImageScroll;