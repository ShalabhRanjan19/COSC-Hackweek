const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store message history in memory (in production, use a database)
let messageHistory = [];
const MAX_MESSAGES = 100; // Limit stored messages

// Serve static files
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Send message history to new user
  socket.emit('message history', messageHistory);
  
  // Handle user joining
  socket.on('user joined', (username) => {
    socket.username = username;
    
    const joinMessage = {
      id: Date.now(),
      username: 'System',
      message: `${username} joined the chat`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
    
    // Add to history and broadcast
    messageHistory.push(joinMessage);
    if (messageHistory.length > MAX_MESSAGES) {
      messageHistory.shift();
    }
    
    io.emit('user joined', joinMessage);
    
    // Send updated user count
    io.emit('user count', io.engine.clientsCount);
  });
  
  // Handle chat messages
  socket.on('chat message', (data) => {
    const messageData = {
      id: Date.now(),
      username: socket.username || 'Anonymous',
      message: data.message,
      timestamp: new Date().toISOString(),
      type: 'message'
    };
    
    // Add to history
    messageHistory.push(messageData);
    if (messageHistory.length > MAX_MESSAGES) {
      messageHistory.shift();
    }
    
    // Broadcast to all users
    io.emit('chat message', messageData);
  });
  
  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {
      username: socket.username,
      isTyping: data.isTyping
    });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.username) {
      const leaveMessage = {
        id: Date.now(),
        username: 'System',
        message: `${socket.username} left the chat`,
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      
      messageHistory.push(leaveMessage);
      if (messageHistory.length > MAX_MESSAGES) {
        messageHistory.shift();
      }
      
      socket.broadcast.emit('user left', leaveMessage);
    }
    
    // Send updated user count
    io.emit('user count', io.engine.clientsCount);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the chat room`);
});