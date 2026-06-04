import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className='justify-center flex'>

    <motion.footer variants={itemVariants} className="  border-t border-gray-800 pt-8">
      <div className=" w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Let's Connect<br />There</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-white dark:bg-[#171717] text-black dark:text-white rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-[#171717]/80 transition-colors"
        >
          Hire Me Now!
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div>
          <span>©2025 All rights reserved.</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="mailto:vghelakrishna523@gmail.com" className="hover:text-white transition-colors">
            Email
          </a>
          <span>/</span>
          <a href="https://github.com/vaghelakrishna" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/krishna-vaghela-395072284" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </motion.footer>
          </div>
  )
}

export default Footer
