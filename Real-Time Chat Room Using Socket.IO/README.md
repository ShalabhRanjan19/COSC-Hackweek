# Real-Time Chat Room

A full-featured real-time chat application built with Node.js, Express, and Socket.IO featuring bi-directional messaging and message history.

## Features

- **Real-time messaging** - Instant message delivery using WebSocket connections
- **Message history** - Persistent chat history that loads for new users
- **User management** - Username-based identification and user count tracking
- **Typing indicators** - Shows when other users are typing
- **System notifications** - Join/leave notifications
- **Responsive design** - Works on desktop and mobile devices
- **Connection status** - Visual indicator of connection state
- **Modern UI** - Clean, gradient-based design with animations
## Installation

1. **Clone or create the project directory:**
   ```bash
   mkdir real-time-chat-room
   cd real-time-chat-room
   ```

2. **Create the necessary files:**
   - Copy the server code to `app.js`
   - Create a `public` directory and add `index.html` inside it
   - Create `package.json` with the provided configuration

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the application:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the chat room:**
   Open your browser and go to `http://localhost:3000`

## Project Structure

```
real-time-chat-room/
├── app.js              # Express server with Socket.IO
├── package.json        # Dependencies and scripts
├── public/
│   └── index.html      # Frontend chat interface
└── README.md          # Documentation
```
