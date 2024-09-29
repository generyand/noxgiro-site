import io from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

console.log(BACKEND_URL);
const socket = io(BACKEND_URL);

export const initializeSocket = ({ onAiMessage, onAiTyping, onError }) => {
  socket.on('ai message', onAiMessage);
  socket.on('ai typing', onAiTyping);
  socket.on('error', onError);

  return () => {
    socket.off('ai message');
    socket.off('ai typing');
    socket.off('error');
  };
};

export const sendMessage = (message) => {
  socket.emit('chat message', message);
};
