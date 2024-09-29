import React, { useState, useCallback } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardAware } from '../../hooks/useKeyboardAware';

const ChatInput = ({ onSubmit }) => {
  const [inputMessage, setInputMessage] = useState('');
  const keyboardHeight = useKeyboardAware();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSubmit(inputMessage);
      setInputMessage('');
    }
  }, [inputMessage, onSubmit]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-center p-4 bg-gray-900 shadow-lg"
      style={{ 
        position: 'sticky', 
        bottom: keyboardHeight, 
        zIndex: 10 
      }}
    >
      <RiRobot2Line className="absolute text-blue-400 left-6" size={24} />
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full py-3 pl-12 pr-12 text-gray-100 placeholder-gray-400 bg-gray-800 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AnimatePresence>
        {inputMessage.trim() && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="absolute p-2 text-blue-400 transition-colors duration-200 bg-gray-700 rounded-full right-6 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <IoSendSharp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};

export default React.memo(ChatInput);
