import React, { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Message from './Message';
import ChatInput from './ChatInput';
import { useSocket } from '../../hooks/useSocket';
import { addMessage } from '../../store/chatSlice';

const ChatComponent = () => {
  const dispatch = useDispatch();
  const { messages, isAiTyping } = useSelector(state => state.chat);
  const messageListRef = useRef(null);

  const { sendMessage } = useSocket();

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages, isAiTyping]);

  const handleSubmit = (inputMessage) => {
    if (inputMessage.trim()) {
      dispatch(addMessage({ text: inputMessage, isAi: false }));
      sendMessage(inputMessage);
    }
  };

  const memoizedMessages = useMemo(() => messages.map((msg, index) => (
    <Message key={index} message={msg} />
  )), [messages]);

  return (
    <div className="max-w-2xl p-4 mx-auto mt-24 bg-gray-100 rounded-lg shadow-md chat-container">
      <div 
        ref={messageListRef}
        className="mb-4 space-y-4 overflow-y-auto message-list h-96"
      >
        {memoizedMessages}
        {isAiTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="italic text-gray-500 typing-indicator"
          >
            AI is typing...
          </motion.div>
        )}
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatComponent;