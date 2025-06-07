// index.js
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import socketHandler from './controllers/socketHandler.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socketHandler(socket, io);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
