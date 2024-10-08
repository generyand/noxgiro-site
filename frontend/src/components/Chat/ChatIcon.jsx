import React from 'react';
import { motion } from 'framer-motion';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const ChatIcon = ({ onClick }) => {
  return (
    <motion.div
      className="fixed z-40 bottom-6 right-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-center w-16 h-16 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <IoChatbubbleEllipsesOutline className="text-3xl" />
      </button>
    </motion.div>
  );
};

export default ChatIcon;