import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';
import { router } from './router';

const PORT = process.env.PORT || 80;
const app: Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const server = http.createServer(app);
const io = socketIo(server);

// SOCKETS LOGIC -----------------------------
io.on('connection', (socket) => {

  socket.on('join-room', (room) => {
    socket.to(room).broadcast.emit('user-joined-room', `Client ${socket.id} joined the room`);
    socket.join(room);
  })

  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', message);
  })

  socket.on('send-canvas-update', (room, url) => {
    socket.to(room).broadcast.emit('canvas-update', url);
  })

  socket.on('send-code-update', (room, data) => {
    socket.to(room).broadcast.emit('code-update', data);
  })

  socket.on('send-prompt-update', (room, prompt) => {
    socket.nsp.to(room).emit('prompt-update', prompt);
  })

  socket.on('send-timer-update', (room) => {
    socket.nsp.to(room).emit('timer-update');
  })

  socket.on('disconnect', () => {
    // future disconnecting logic
    console.log(`Client ${socket.id} left`)
  })

})
// ---------------------------------------------

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));