import { getChatResponseForSocket } from '../controllers/openaiController.js';
import logger from '../utils/logger.js';

export default function setupWebSocket(io) {
  io.on('connection', (socket) => {
    logger.info("A user connected", { query: socket.handshake.query });

    socket.on('chat message', async (msg) => {
      try {
        logger.info("Received message:", msg);
        socket.emit('ai typing');

        const response = await getChatResponseForSocket(msg);
        logger.info("Sending AI response:", response);

        socket.emit('ai message', response);
      } catch (error) {
        logger.error('Error processing message:', error);
        socket.emit('error', 'An error occurred while processing your message.');
      }
    });

    socket.on('disconnect', () => {
      logger.info('User disconnected');
    });
  });
}