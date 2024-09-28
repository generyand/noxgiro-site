import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.3 }}
    className="flex items-center space-x-1 typing-indicator"
  >
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
        className="w-2 h-2 bg-gray-500 rounded-full"
      />
    ))}
  </motion.div>
);

export default TypingIndicator;
