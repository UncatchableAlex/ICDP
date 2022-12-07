const socket = io();

socket.on("join game", (info) => {
  console.log(`joining game as player ${info.playerId}`);
  board = new Board(info.tiles);
  game = new Game(0, this.board, info.cards, info.playerId);
  button = document.getElementById("buyDevelopmentCard");
  board.draw_board();
  updateDevCardSelect();
  updateResources();
});

socket.on("roll", (number) => {
  console.log(number + " rolled");
  game.currentRoll = number;
  game.hasRolled = true;
  game.payout();
});

socket.on("pass turn", () => {
  console.log("turn passed");
  game.turn++;
  game.currentPlayer =
    game.player.playerId === game.turn % game.playerCount ? true : false;
  game.hasRolled = false;
});

socket.on("build", (info) => {
  console.log(`${info.type} built`);
  let res = board[`add_${info.type}`](
    info.x,
    info.y,
    game.turn % game.playerCount
  );
  console.log(res);
  board.draw_board();
});
