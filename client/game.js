class Game {
  constructor(gameId, board, devis, playerId, playerName = "steve") {
    this.gameId = gameId;
    this.board = board;
    this.player = new Player(playerId, playerName);
    this.playerCount = 2;
    this.turn = 0;
    this.longestRoad = null;
    this.largestArmy = null;
    this.currentPlayer = this.player.playerId === 0 ? this.player : undefined;
    if (this.currentPlayer) alert("It's your turn");
    this.currentVPS;
    this.bank = new Bank(devis);
    this.hasRolled = false;
    this.currentRoll;
  }

  // Check if the current player has won the game
  checkPlayerWin() {
    return this.currentPlayer.getVPS() >= 10;
  }

  // Passes the
  passTurn() {
    if (this.currentPlayer) {
      socket.emit("pass turn");
      this.turn++;
      this.currentPlayer = this.player.playerId === this.turn % this.playerCount ? this.player : undefined;
      this.hasRolled = false;
    }
  }

  roll() {
    if (this.currentPlayer && !this.hasRolled) {
      this.currentRoll = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
      this.hasRolled = true;
      this.payout();
      socket.emit("roll", this.currentRoll)
      alert(`${this.currentRoll} was rolled`);
      return true;
    }
    return false;
  }

  payout() {
    for (let q in this.board.tiles) {
      for (let r in this.board.tiles[q]) {
        let hex = this.board.tiles[q][r];
        if (hex.number === this.currentRoll && !hex.robber) {
          for (let v of hex.vertices) {
            if (v.structure && v.playerId === this.player.playerId) {
              if (v.structure === "settie")
                game.player.resources[hex.resource]++;
              else game.player.resources[hex.resource] += 2;
            }
          }
        }
      }
    }
  }

  // Allow given player to buy development card
  buy_devi() {
    if (this.currentPlayer && this.bank.can_draw_devi() && this.player.can_buy_devi()) {
      // Player purchases development card
      this.player.buy_devi();
      // Transfer development card from bank to player
      this.player.receive_devi(this.bank.draw_devi());
      // Give resources back to bank
      this.bank.reclaim_devi();
    }
  }

  build(type, x, y) {
    if (this.currentPlayer && this.player[`can_build_${type}`]()) {
      this.player[`build_${type}`]();
      this.bank[`reclaim_${type}`]();
      socket.emit("build", {
        type: type,
        x: x,
        y: y
      });
      return true;
    }
    return false;
  }


  playMonopoly(player, resource) {
    if (this.currentPlayer && player.canPlayMonopoly()) {
      let totalStolen = 0;
      for (let otherPlayer in game.players) {
        if (otherPlayer !== player) {
          // Add all of players resources to total stolen
          totalStolen += otherPlayer.resources[resource];
          // Remove all of that players resources
          otherPlayer.resources[resource] = 0;
        }
      }
    }
    // Give player all of the stolen resource
    player.resources[resource] += totalResources;
  }

  playYearOfPlenty(player, resource1, resource2) {
    if (player.canPlayYearOfPlenty()) {
      player.resources[resource1]++;
      player.resources[resource2]++;
    }
  }

  playKnight(player, location) { }
}
