import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Match backend port

export default socket;
