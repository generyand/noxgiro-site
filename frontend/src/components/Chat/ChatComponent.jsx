import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useSocket } from "../../hooks/useSocket";
import { addMessage } from "../../store/chatSlice";
import { getRandomStartingMessage } from "./chatUtils";
import { scrollbarStyles } from "./customStyles";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const { messages, isAiTyping } = useSelector((state) => state.chat);
  const messageListRef = useRef(null);
  const initialMessageAddedRef = useRef(false);
  const { sendMessage } = useSocket();

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
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [messages, isAiTyping]);

  const handleSubmit = useCallback(
    (inputMessage) => {
      if (inputMessage.trim()) {
        dispatch(addMessage({ text: inputMessage, isAi: false }));
        sendMessage(inputMessage);
      }
    },
    [dispatch, sendMessage]
  );

  const memoizedMessages = useMemo(
    () => messages.map((msg, index) => <Message key={index} message={msg} />),
    [messages]
  );

  return (
    <div className="max-w-2xl p-4 mx-auto mt-24 bg-gray-100 rounded-lg shadow-md chat-container">
      <div
        ref={messageListRef}
        className="mb-4 space-y-4 overflow-y-auto message-list h-96"
        style={scrollbarStyles}
      >
        {memoizedMessages}
        {isAiTyping && <TypingIndicator />}
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatComponent;
