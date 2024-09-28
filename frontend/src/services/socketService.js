import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

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
