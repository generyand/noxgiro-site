import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 5 }}
    transition={{ duration: 0.2 }}
    className="flex items-center space-x-1.5 p-2 typing-indicator"
  >
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
      />
    ))}
  </motion.div>
);

export default TypingIndicator;
