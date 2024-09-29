import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      className={`px-8 py-3 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
