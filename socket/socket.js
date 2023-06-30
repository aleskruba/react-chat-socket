const http = require('http');
const socketIo = require('socket.io');

const socketPort = 4000; // Port for the Socket.IO server
const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join room', (username) => {
    // Add the user to the chat room or group
    socket.join('chatRoom');

    // Broadcast a user joined event to all connected clients except the current one
    socket.broadcast.to('chatRoom').emit('user joined', username);
  });

  socket.on('chat message', (data) => {
    // Broadcast the chat message to all connected clients in the chat room
    io.to('chatRoom').emit('chat message', data);
  });

  socket.on('typing', (username) => {
    // Broadcast the typing event to all connected clients in the chat room
    socket.broadcast.to('chatRoom').emit('typing', username);
  });

  socket.on('stop typing', (username) => {
    // Broadcast the stop typing event to all connected clients in the chat room
    socket.broadcast.to('chatRoom').emit('stop typing', username);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Perform necessary cleanup or leave any chat rooms or groups
    socket.leave('chatRoom');
  });
});



server.listen(socketPort, () => {
  console.log(`Socket.IO server listening on port ${socketPort}`);
});
