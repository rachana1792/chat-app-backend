const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const cors = require("cors");
const socketIo = require("socket.io");
const { addMessage, getMessagesInRoom } = require("./user");

const app = express();

app.use(cors());

const server = http.createServer(app);

const socketIO = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5000",
    methods: ["GET", "POST"],
  },
});

socketIO.on("connection", async (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("join-room", (data) => {
    socket.join(data);
    socket.to(data.roomId).emit("messageArray", data);
  });
  //sends the message to all the users on the server
  socket.on("message", (data) => {
    const messages = addMessage(data.roomId, data);

    socketIO.to(data.roomId).emit("messageResponse", messages);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("/rooms/:roomId/messages", (req, res) => {
  const messages = getMessagesInRoom(req.params.roomId);
  return res.json({ messages });
});

server.listen(3001, () => {
  console.log("Server working on port 3001");
});
