import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: "Work", path: "/work", rotate: "-2deg" },
    { name: "About", path: "/about", rotate: "2deg" },
    { name: "Project", path: "/project", rotate: "-1deg" },
    { name: "Contact", path: "/contact", rotate: "3deg" }
  ];

  return (
    <nav className="fixed top-8 left-8 right-8 z-50">
      <div className="flex justify-between items-center px-4">

        {/* LEFT: KV Logo */}
        <Link to="/" className="cursor-pointer">
          <div className="w-14 h-12 flex items-center justify-center font-black text-2xl transform -rotate-6 font-['Gochi_Hand',_cursive]">
            KV
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="relative cursor-pointer group"
              whileHover={{ y: -5, rotate: 0 }}
              style={{ rotate: link.rotate }}
            >
              <Link to={link.path}>
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
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block w-6 h-0.5 bg-[#161515]" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-6 h-0.5 bg-[#161515]" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block w-6 h-0.5 bg-[#161515]" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 flex flex-col gap-4 bg-[#f5f0e8] rounded-2xl px-6 py-5 shadow-md"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-[#161515] font-['Gochi_Hand',_cursive] text-2xl border-b border-[#161515]/10 pb-2 last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;