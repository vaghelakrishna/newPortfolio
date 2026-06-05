import { motion } from 'framer-motion';

const Navbar = () => {
  const navLinks = [
    { name: "Work", rotate: "-2deg" },
    { name: "About", rotate: "2deg" },
    { name: "Project", rotate: "-1deg" },
    { name: "Contact", rotate: "3deg" }
  ];

  return (
    // 'justify-between' का उपयोग किया है ताकि लोगो लेफ्ट और लिंक्स राइट में रहें
    <nav className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center px-4">

      {/* LEFT: KV Logo */}
      <div className="cursor-pointer">
        <div className="w-14 h-12  flex items-center justify-center font-black text-2xl transform -rotate-6  font-['Gochi_Hand',_cursive] ">
          KV
        </div>
      </div>

      {/* RIGHT: Navigation Links */}
      <div className="flex gap-8">
        {navLinks.map((link) => (
          <motion.div
            key={link.name}
            className="relative cursor-pointer group"
            whileHover={{ y: -5, rotate: 0 }}
            style={{ rotate: link.rotate }}
          >
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-[#B5440B] opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
            />

            <span className="text-[#161515] font-['Gochi_Hand',_cursive] text-2xl">
              {link.name}
            </span>

            <svg className="absolute -top-3 -left-3 w-16 h-12 opacity-0 group-hover:opacity-20 pointer-events-none" viewBox="0 0 100 50">
              <path d="M5,25 Q50,-10 95,25 T5,25" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;