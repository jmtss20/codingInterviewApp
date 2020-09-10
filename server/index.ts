import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';
import { router } from './router';
import { rooms } from './data';

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
    rooms[room]['users'] ? (rooms[room]['users'][socket.id] = true) : (rooms[room]['users'] = { [socket.id]: true });
  });

  socket.on('send-text-update', (room, text) => {
    socket.to(room).broadcast.emit('text-update', text);
    rooms[room]['textEditor'] = text;
  });

  socket.on('send-canvas-update', (room, url) => {
    socket.to(room).broadcast.emit('canvas-update', url);
    rooms[room]['whiteboard'] = url;
  });

  socket.on('send-code-update', (room, data) => {
    socket.to(room).broadcast.emit('code-update', data);
    rooms[room]['codeEditor'] = data;
  });

  socket.on('send-prompt-update', (room, prompt) => {
    socket.nsp.to(room).emit('prompt-update', prompt);
    rooms[room]['prompt'] = prompt;
  });

  socket.on('send-session-update', (room, bool) => {
    socket.nsp.to(room).emit('session-update', bool);
  });

  socket.on('send-notes-update', (room, text) => {
    rooms[room]['notes'] = text;
  });

  socket.on('disconnect', () => {
    Object.entries(rooms).forEach((row: any) => {
      if (!!row[1]['users'][socket.id]) {
        socket.to(row[0]).broadcast.emit('user-left-room', `Client ${socket.id} left the room`);
        delete rooms[row[0]]['users'][socket.id];
        if (!Object.keys(rooms[row[0]]['users']).length) delete rooms[row[0]];
      }
    });
  });
});
// ---------------------------------------------

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
