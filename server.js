
const { Board } = require("./board.js")
const { Queue } = require("./queue.js")

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8099;


const queue = new Queue();

app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // enter queue
  console.log("new user")
  queue.enqueue(socket);
  if (queue.getLength() >= 4) {
    let roomId = "room1";
    for (let i = 0; i < 4; i++) {
      let s = queue.dequeue();
      s.join(roomId)
    }
    let board = new Board();
    io.to(roomId).emit("join game", board);
  }

  socket.on("turn update", (info) => {
    io.to("room1").emit("turn update", info);
  })
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});