class Game {
  constructor(gameId, board, ...players) {
    this.gameId = gameId;
    this.board = board;
    this.gameIds;
    this.players = players;
    this.playerCount = players.length;
    this.turn = 0;
    this.longestRoad = null;
    this.largestArmy = null;
    this.currentPlayer;
    this.currentVPS;
    this.bank = new Bank()
  }
}
