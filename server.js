const express = require("express");
const app = express();
const port = 8099;
const router = express.Router();

let gameId = 0;
let playerId = 0;


let playerQueue = new Queue();

const gameIds = {};

function newGame() {
  // 4 players from queue
  let players;
  let newGame = Game(gameId, board, players);
  gameId++;

  games.push(newGame);
}

function deleteGame(id) {
  delete gameIds[id];
}

// Get code for the login page from Alex
app.get("/home", async (req, res) => {
  await new Promise();
  console.log("Here");
  res.send("Please login");
});

app.get("/queue", (req, res) => {
  res.send("Thank you for waiting in the queue");
  console.log("In queue");
});

router
  .route("/games/:gameId")
  .get((req, res) => {
    res.send(`Get game board with gameId ${req.params.gameId}`);
    console.log(req.player);
  })
  .put((req, res) => {
    res.send(`Update game board with gameId ${req.params.gameId}`);
  })
  .delete((req, res) => {
    res.send(`Delete game board with gameId ${req.params.gameId}`);
  });

router.param("/game/:gameId", (req, res, next, gameId) => {
  req.player = players[gameId];
  next();
});

app.get("/queue", (req, res) => {
  res.send("In Queue");
  console.log("in Queue");
});

// app.listen(port);
