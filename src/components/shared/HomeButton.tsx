import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const HomeButton = () => {
  return (
    <motion.a
      href="https://garuda-sastra.netlify.app/"
      target="_self"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed left-4 bottom-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg 
                 hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
    >
      <Home className="h-5 w-5" />
      Home
    </motion.a>
  );
};

export default HomeButton;
