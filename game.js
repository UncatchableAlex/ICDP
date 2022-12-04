class Game {
  constructor(gameId, board, ...players) {
    this.gameId = gameId;
    this.board = board;
    this.players = players;
    this.playerCount = players.length;
    this.turn = 0;
    this.longestRoad = null;
    this.largestArmy = null;
    this.currentPlayer = this.players[0];
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
    this.currentPlayer = this.players[this.turn % this.playerCount];
    this.hasRolled = false;
  }

  roll() {
    this.currentRoll = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.hasRolled = true;
  }

  // Allow given player to buy development card
  buyDevelopmentCard(player, bank) {
    if (bank.canSellDevelopmentCard() && player.canBuyDevelopmentCard()) {
      // Player purchases development card
      player.buyDevelopmentCard();
      // Transfer development card from bank to player
      receiveDevelopmentCard(bank.sellDevelopmentCard());
      // Give resources back to bank
      bank.reclaimDevelopmentCard();
    }
  }

  // Allow player to build a road
  build_road(player, bank) {
    if (player.canBuildRoad()) {
      player.buildRoad();
      bank.reclaimRoad();
      return true;
    }
    return false;
  }

  // Allow player to build a settlement
  build_settie(player, bank) {
    if (player.canBuildSettlement()) {
      player.buildSettlement();
      bank.reclaimSettlement();
      return true;
    }
    return false;
  }

  // Allow player to build a settlement
  build_city(player, bank) {
    if (player.canUpgradeSettlement()) {
      player.upgradeSettlement();
      bank.reclaimCity();
      return true;
    }
    return false;
  }
}
