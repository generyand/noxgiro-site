export default function setupWebSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', async (msg) => {
      // Here you can integrate with the OpenAI API directly
      // or call a function from your openaiController
      // For now, we'll just echo the message back
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}