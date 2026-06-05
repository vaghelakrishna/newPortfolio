import { motion } from 'framer-motion';

const testimonials = [
  { text: "Krishna's design logic just clicks. He makes complex systems feel incredibly simple.", name: "Sarah, Microsoft" },
  { text: "Working with him was a breeze. His ability to blend code and aesthetics is rare.", name: "Alex, Design Lead" },
  { text: "He sees the 'why' behind the 'what'. Truly a systems thinker.", name: "Priya, Product Manager" }
];

const TestimonialSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-20 px-6 bg-[#FAF9F6]">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="relative w-72 h-72 bg-[#FFF8C6] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] rotate-[1deg] hover:rotate-0 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {/* डूडल टेप जो नोट को पकड़ेगा */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-blue-200/50 rotate-[-2deg] border border-black/10" />
          
          <p className="font-['Gochi_Hand',_cursive] text-xl text-gray-800 leading-relaxed italic">
            "{t.text}"
          </p>
          <div className="absolute bottom-6 left-8 font-bold text-sm uppercase tracking-wider text-[#B5440B]">
            — {t.name}
          </div>
          
          {/* नीचे का रफ डूडल मार्क */}
          <svg className="absolute bottom-2 right-2 w-12 h-12 opacity-30" viewBox="0 0 100 100">
            <path d="M10,90 Q50,50 90,90" fill="none" stroke="#000" strokeWidth="2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialSection;