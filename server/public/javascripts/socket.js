const socket = io();

socket.on("join game", (info) => {
  console.log(`joining game as player ${info.playerId}`);
  board = new Board(info.tiles);
  game = new Game(info.gameId, this.board, info.cards, info.playerId);
  board.draw_board();
  updateDevCardSelect();
  updateResources();
});

socket.on("roll", (number) => {
  alert(`${number} was rolled`);
  game.currentRoll = number;
  game.hasRolled = true;
  game.payout();
});

socket.on("pass turn", async () => {
  game.turn++;
  if (game.turn < 2 * game.playerCount) {
    if (game.turn < game.playerCount) {
      game.currentPlayer = game.player.playerId === game.turn ? true : false;
    } else {
      game.currentPlayer =
        game.player.playerId ===
        game.playerCount - (game.turn % game.playerCount) - 1
          ? true
          : false;
    }
    if (game.currentPlayer) {
      game.bank.draw("brick", 2);
      game.bank.draw("wood", 2);
      game.bank.draw("sheep", 1);
      game.bank.draw("wheat", 1);
      game.player.resources.brick = 2;
      game.player.resources.wood = 2;
      game.player.resources.sheep = 1;
      game.player.resources.wheat = 1;
      updateResources();
    }
  } else {
    game.currentPlayer =
      game.player.playerId === game.turn % game.playerCount ? true : false;
    game.hasRolled = false;
  }
  if (game.currentPlayer) {
    alert("It's your turn")
    socket.emit()
  }
});

socket.on("build", (info) => {
  console.log("building:", info);
  if (game.turn < 2 * game.playerCount) {
    if (game.turn < game.playerCount) {
      board.add(info.type, info.q, info.r, game.turn);
    } else {
      board.add(
        info.type,
        info.q,
        info.r,
        game.playerCount - (game.turn % game.playerCount) - 1
      );
    }
  } else {
    board.add(info.type, info.q, info.r, game.turn % game.playerCount);
  }
  game.bank[`reclaim_${info.type}`]();
  board.draw_board();
});

socket.on("player disconnected", () => {
  console.log("Game terminated");
  alert("Sorry, player disconnected, this game can no longer proceed");
});

// If another player buys a devie pop that card off every players card stack
socket.on("bought devie", (playerId) => {
  console.log("da player " + playerId);
  if (game.player.playerId !== playerId) {
    game.bank.draw_devi();
  }
});

socket.on("Player Wins", (playerName) => {
  console.log("Client: receiving player win from");
  alert(playerName + " has won!!!");
});
