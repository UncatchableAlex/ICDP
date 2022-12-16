class Game {
  constructor(gameId, board, devis, playerId, playerName = "steve") {
    this.gameId = gameId;
    this.board = board;
    this.player = new Player(playerId, playerName);
    this.playerCount = 2;
    this.turn = -1;
    this.longestRoad = null;
    this.largestArmy = null;
    this.currentPlayer = this.player.playerId === 0 ? this.player : undefined;
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
    if (this.currentPlayer && this.turn < 2 * this.playerCount) {
      if (this.currentPlayer) socket.emit("pass turn");
      return true;
    } else if (this.currentPlayer && this.hasRolled) {
      socket.emit("pass turn", this.turn);
      return true;
    }
    return false;
  }

  roll() {
    if (
      this.turn >= 2 * this.playerCount &&
      this.currentPlayer &&
      !this.hasRolled
    ) {
      socket.emit("roll", this.turn);
      return true;
    }
    return false;
  }

  payout() {
    this.board.forEach("tiles", (q, r, hex) => {
      if (hex.number === this.currentRoll && !hex.robber) {
        for (let v of hex.vertices) {
          if (
            v.structure !== undefined &&
            v.playerId === this.player.playerId
          ) {
            if (v.structure === "settie") game.player.resources[hex.resource]++;
            else if (v.structure === "city")
              game.player.resources[hex.resource] += 2;
          }
        }
      }
    });
  }

  // Allow given player to buy development card
  draw_devi() {
    if (
      this.currentPlayer &&
      this.bank.can_draw_devi() &&
      this.player.can_buy_devi()
    ) {
      // Player purchases development card
      this.player.buy_devi();
      // Transfer development card from bank to player
      this.player.receive_devi(this.bank.draw_devi());
      // Give resources back to bank
      this.bank.reclaim_devi();
    }
  }

  build(type, hex) {
    if (this.currentPlayer && this.player[`can_build_${type}`]()) {
      this.player[`build_${type}`]();
      this.bank[`reclaim_${type}`]();
      hex.type = type;
      socket.emit("build", this.gameId, this.turn, hex);
      return true;
    }
    return false;
  }

  // Make it so the player can choose two cards. Also enable selector
  playYearOfPlenty() {
    cardsToSelect = 2;
    enableChooseCard(false);
    this.player.developmentCards.yearOfPlenty--;
    this.player.developmentCardsPlayed.yearOfPlenty++;
    alert("Please choose two free resources from the select buttons below");
    playedDevie("yearOfPlenty");
  }

  playedDevie(type) {
    socket.emit(
      "played devie",
      this.gameId,
      this.turn,
      this.player.playerName,
      type
    );
  }

  // TODO Currently no checks if player indeed places the roads
  // also the bank gets cards back which is bad
  playRoadBuilding() {
    this.player.resources.wood += 2;
    this.player.resources.brick += 2;
    alert("Please place your two free roads");
    this.player.developmentCards.roadBuilding--;
    this.player.developmentCardsPlayed.roadBuilding++;
    playedDevie("roadBuilding");
  }

  playKnight(player, location) {
    this.playedDevie("knight");
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
    this.playedDevie("monopoly");
  }

  storeHand() {
    socket.emit(
      "hand",
      this.gameId,
      this.turn,
      this.player.playerName,
      this.player.resources.wood,
      this.player.resources.wheat,
      this.player.resources.sheep,
      this.player.resources.brick,
      this.player.resources.ore,
      this.player.developmentCards.victoryPoint,
      this.player.developmentCards.monopoly,
      this.player.developmentCards.knight,
      this.player.developmentCards.yearOfPlenty,
      this.player.developmentCards.roadBuilding,
      this.player.victoryPoints
    );
  }
}
