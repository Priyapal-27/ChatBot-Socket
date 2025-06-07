// socketHandler.js
export default function socketHandler(socket, io) {
  console.log("⚡ New client connected");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🚫 Client disconnected');
  });
}
