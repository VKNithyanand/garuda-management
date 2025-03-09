import React from 'react';
import { motion } from 'framer-motion';

const CricbuzzButton = () => {
  return (
    <motion.a
      href="https://www.cricbuzz.com"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed left-4 bottom-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg 
                 shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      Cricbuzz
    </motion.a>
  );
};

export default CricbuzzButton;