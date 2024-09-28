import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, setAiTyping } from '../store/chatSlice';
import { initializeSocket, sendMessage as emitMessage } from '../services/socketService';

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanup = initializeSocket({
      onAiMessage: (msg) => {
        dispatch(addMessage({ text: msg, isAi: true }));
        dispatch(setAiTyping(false));
      },
      onAiTyping: () => dispatch(setAiTyping(true)),
      onError: (errorMsg) => console.error('Socket error:', errorMsg),
    });

    return cleanup;
  }, [dispatch]);

  const sendMessage = useCallback((message) => {
    emitMessage(message);
  }, []);

  return { sendMessage };
};
