class Player {
  static COLORS = ["red", "white", "blue", "DarkOrange"];

  constructor(playerId, playerName) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.victoryPoints = 0;

    this.resources = {
      wood: 0,
      brick: 0,
      sheep: 0,
      wheat: 0,
      ore: 0,
    };

    this.developmentCards = {
      knight: 0,
      roadBuilding: 1,
      yearOfPlenty: 1,
      monopoly: 0,
      victoryPoint: 0,
    };

    this.developmentCardsPlayed = {
      knight: 0,
      roadBuilding: 0,
      yearOfPlenty: 0,
      monopoly: 0,
    };

    this.buildings = {
      roads: 15,
      settlements: 5,
      cities: 4,
    };
  }

  getVPS() {
    return this.victoryPoints + this.developmentCards.victoryPoint;
  }

  can_build_road() {
    return (
      this.resources.wood >= 1 &&
      this.resources.brick >= 1 &&
      this.buildings.roads > 0
    );
  }

  build_road() {
    if (this.can_build_road()) {
      this.resources.wood--;
      this.resources.brick--;
      this.buildings.roads--;
      return true;
    }
    return false;
  }

  can_build_settie() {
    return (
      this.resources.wood >= 1 &&
      this.resources.brick >= 1 &&
      this.resources.wheat >= 1 &&
      this.resources.sheep >= 1 &&
      this.buildings.settlements > 0
    );
  }

  build_settie() {
    if (this.can_build_settie()) {
      this.resources.wood--;
      this.resources.brick--;
      this.resources.wheat--;
      this.resources.sheep--;
      this.buildings.settlements--;
      this.victoryPoints++;
      return true;
    }
    return false;
  }

  can_build_city() {
    return (
      this.resources.wheat >= 2 &&
      this.resources.ore >= 2 &&
      this.buildings.cities > 0
    );
  }

  build_city() {
    if (this.can_build_city()) {
      this.resources.wheat -= 2;
      this.resources.ore -= 3;
      this.buildings.cities--;
      this.buildings.settlements++;
      this.victoryPoints++;
      return true;
    }
    return false;
  }

  can_buy_devi() {
    return (
      this.resources.wheat >= 1 &&
      this.resources.sheep >= 1 &&
      this.resources.ore >= 1
    );
  }

  buy_devi() {
    if (this.can_buy_devi()) {
      this.resources.wheat--;
      this.resources.sheep--;
      this.resources.ore--;
      return true;
    }
    return false;
  }

  can_play_devi(type) {
    return this.developmentCards[type] >= 1;
  }

  play_devi(type) {
    if (this.can_play_devi(type)) {
      this.developmentCards[type]--;
      this.developmentCardsPlayed[type]++;
      return true;
    }
    return false;
  }

  receive_devi(developmentCard) {
    this.developmentCards[developmentCard]++;
  }
}
