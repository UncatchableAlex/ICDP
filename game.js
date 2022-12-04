class Game {
  constructor(gameId, board, ...players) {
    this.gameId = gameId;
    this.board = board;
    this.players = players;
    this.playerCount = players.length;
    this.turn = 0;
    this.longestRoad = null;
    this.largestArmy = null;
    this.currentPlayer;
    this.currentVPS;
    this.bank = new Bank();
    this.hasRolled = false;
    this.currentRoll;
  }

  // Check if the current player has won the game
  checkPlayerWin() {
    return this.currentPlayer.getVPS() >= 10;
  }

  // Passes the
  playerPassGame() {
    this.turn++;
    this.currentPlayer = this.players[this.playerCount % this.turn];
    this.hasRolled = false;
  }

  roll() {
    this.currentRoll = Math.floor(random() * 12);
    this.hasRolled = true;
  }
}
