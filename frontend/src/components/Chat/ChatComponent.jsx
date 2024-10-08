import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import Message from "./Message";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import ChatHeader from "./ChatHeader";
import { useSocket } from "../../hooks/useSocket";
import { addMessage } from "../../store/chatSlice";
import { getRandomStartingMessage } from "./chatUtils";
import { useKeyboardAware } from "../../hooks/useKeyboardAware";

const ChatComponent = ({ onClose }) => {
  const dispatch = useDispatch();
  const { messages, isAiTyping } = useSelector((state) => state.chat);
  const messageListRef = useRef(null);
  const chatRef = useRef(null);
  const initialMessageAddedRef = useRef(false);
  const { sendMessage } = useSocket();
  const keyboardHeight = useKeyboardAware();

  const addInitialMessage = useCallback(() => {
    if (messages.length === 0 && !initialMessageAddedRef.current) {
      const initialMessage = getRandomStartingMessage();
      dispatch(addMessage({ text: initialMessage, isAi: true }));
      initialMessageAddedRef.current = true;
    }
  }, [dispatch, messages.length]);

  useEffect(addInitialMessage, [addInitialMessage]);

  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      setTimeout(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }, 0);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping, scrollToBottom]);

  const handleSubmit = useCallback(
    (inputMessage) => {
      if (inputMessage.trim()) {
        dispatch(addMessage({ text: inputMessage, isAi: false }));
        sendMessage(inputMessage);
      }
    },
    [dispatch, sendMessage]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOutsideClick = useCallback(
    (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleKeyDown, handleOutsideClick]);

  const memoizedMessages = useMemo(
    () =>
      messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Message message={msg} />
        </motion.div>
      )),
    [messages]
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:p-12 md:p-24"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
      >
        <div
          ref={chatRef}
          className="absolute inset-0 flex flex-col w-full h-full max-w-3xl mx-auto overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm sm:relative sm:inset-auto sm:rounded-lg"
          style={{ bottom: `${keyboardHeight}px` }}
        >
          <ChatHeader onClose={onClose} />
          <div className="flex flex-col flex-grow overflow-hidden">
            <div
              className="flex-grow overflow-y-auto message-list no-scrollbar"
              aria-live="polite"
              ref={messageListRef}
            >
              <div className="flex flex-col p-4 space-y-4">
                {memoizedMessages}
                {isAiTyping && <TypingIndicator />}
              </div>
            </div>
            <div className="w-full bg-gradient-to-br from-gray-900/90 to-gray-800/90">
              <ChatInput onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatComponent;
