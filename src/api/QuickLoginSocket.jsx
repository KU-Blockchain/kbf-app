import { Server } from 'socket.io';
import WebSocket from 'ws';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.io server...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('start', ({ apiKey, lockId, jwtChallenge }) => {
        const apiBaseUrl = 'wss://api.heirloom.io';
        const wsUrl = `${apiBaseUrl}?apiKey=${apiKey}&lockId=${lockId}&jwtChallenge=${jwtChallenge}`;
        const ws = new WebSocket(wsUrl);

        const topic = `tokens:${apiKey}:${lockId}:${jwtChallenge}`;

        ws.on('open', () => {
          console.log('Connected to WebSocket server');
        });

        ws.on('message', (message) => {
          console.log('Received message:', message);

          // Emit the message to the client
          socket.emit(topic, message);
        });

        ws.on('error', (error) => {
          console.error('WebSocket error:', error);
        });

        ws.on('close', () => {
          console.log('WebSocket connection closed');
        });

        socket.on('disconnect', () => {
          console.log('User disconnected');
          ws.close();
        });
      });
    });
  } else {
    console.log('Socket.io server already running...');
  }
  res.end();
}
