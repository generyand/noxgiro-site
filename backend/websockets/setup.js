import { getChatResponseForSocket } from '../controllers/openaiController.js';

export default function setupWebSocket(io) {
  io.on('connection', (socket) => {
    // console.log('A user connected', {
    //   id: socket.id,
    //   time: new Date().toISOString(),
    //   query: socket.handshake.query
    // });

    console.log("A user connected", socket.handshake.query);

    socket.on('chat message', async (msg) => {
      try {
        // Emit a 'typing' event to show the AI is processing
        socket.emit('ai typing');

        // Get the response from OpenAI
        const response = await getChatResponseForSocket(msg);

        // Emit the AI's response back to the client
        socket.emit('ai message', response);
      } catch (error) {
        console.error('Error processing message:', error);
        socket.emit('error', 'An error occurred while processing your message.');
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}