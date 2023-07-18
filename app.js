const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const Room = require("./room");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();

app.use(cors());




// app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const socketIO = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:5000',
    methods: ['GET', 'POST'],
  },
});

// const io = new Server(server);

const room = new Room();


socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);

  //sends the message to all the users on the server
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

server.listen(3001, () => {
  console.log("Server working on port 3001");
});
