
const { Queue } = require("./server/queue.js");
const { Utils } = require("./server/utils.js")

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8099;

const queue = new Queue();

var rooms = 0;

app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
  // enter queue
  console.log("new user")
  queue.enqueue(socket);
  if (queue.getLength() >= 2) {
    let roomId = `room ${rooms++}`;
    console.log(`created ${roomId}`);

    let tiles = Utils.get_rand_tile_seq();
    let cards = Utils.get_rand_devi_seq();
    for (let i = 0; i < 2; i++) {
      let s = queue.dequeue();
      s.join(roomId)
      s.on("roll", () => {
        let num = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
        io.to(roomId).emit("roll", num);
      })
      s.on("pass turn", () => {
        io.to(roomId).emit("pass turn");
      })
      s.on("build", (info) => {
        s.to(roomId).emit("build", info);
      })
      io.to(s.id).emit("join game", {
        tiles: tiles,
        cards: cards,
        playerId: i
      });
    }
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});