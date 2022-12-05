class Player {
  static COLORS = ["red", "white", "blue", "DarkOrange"];

  constructor(playerID, playerName, victoryPoint = 0) {
    this.playerID = playerID;
    this.playerName = playerName;
    this.victoryPoints = victoryPoint;

    this.resources = {
      wood: 4,
      brick: 4,
      sheep: 2,
      wheat: 2,
      ore: 0,
    };

    this.developmentCards = {
      knight: 0,
      roadBuilding: 0,
      yearOfPlenty: 0,
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

  canBuildRoad() {
    return (
      this.resources.wood >= 1 &&
      this.resources.brick >= 1 &&
      this.buildings.roads > 0
    );
  }

  buildRoad() {
    if (this.canBuildRoad()) {
      this.resources.wood--;
      this.resources.brick--;
      this.buildings.roads--;
      return true;
    }
    return false;
  }

  canBuildSettlement() {
    return (
      this.resources.wood >= 1 &&
      this.resources.brick >= 1 &&
      this.resources.wheat >= 1 &&
      this.resources.sheep >= 1 &&
      this.buildings.settlements > 0
    );
  }

  buildSettlement() {
    if (this.canBuildSettlement()) {
      this.resources.wood--;
      this.resources.brick--;
      this.resources.wheat--;
      this.resources.sheep--;
      this.buildings.settlements--;
      return true;
    }
    return false;
  }

  canUpgradeSettlement() {
    return (
      this.resources.wheat >= 2 &&
      this.resources.ore >= 2 &&
      this.buildings.cities > 0
    );
  }

  upgradeSettlement() {
    if (this.canUpgradeSettlement()) {
      this.resources.wheat -= 2;
      this.resources.ore -= 3;
      this.buildings.cities--;
      this.buildings.settlements++;
      return true;
    }
    return false;
  }

  canBuyDevelopmentCard() {
    return (
      this.resources.wheat >= 1 &&
      this.resources.sheep >= 1 &&
      this.resources.ore >= 1
    );
  }

  buyDevelopmentCard() {
    if (this.canBuyDevelopmentCard()) {
      this.resources.wheat--;
      this.resources.sheep--;
      this.resources.ore--;
    }
  }

  canPlayKnight() {
    return this.developmentCards.knight >= 1;
  }

  playKnight() {
    if (this.canPlayKnight()) {
      this.developmentCards.knight--;
      this.developmentCardsPlayed.knight++;
      return true;
    }
    return false;
  }

  canPlayRoadBuilding() {
    return this.developmentCards.roadBuilding >= 1;
  }

  playRoadBuilding() {
    if (this.canPlayRoadBuilding()) {
      this.developmentCards.roadBuilding--;
      this.developmentCardsPlayed.roadBuilding++;
      return true;
    }
    return false;
  }

  canPlayYearOfPlenty() {
    return this.developmentCards.roadBuilding >= 1;
  }

  playYearOfPlenty() {
    if (this.canPlayYearOfPlenty()) {
      this.developmentCards.yearOfPlenty--;
      this.developmentCardsPlayed.yearOfPlenty++;
      return true;
    }
    return false;
  }

  canPlayMonopoly() {
    return this.developmentCards.monopoly >= 1;
  }

  playMonopoly() {
    if (this.canPlayMonopoly()) {
      this.developmentCards.monopoly--;
      this.developmentCardsPlayed.monopoly++;
      return true;
    }
    return false;
  }

  receiveDevelopmentCard(developmentCard) {
    this.developmentCards[developmentCard]++;
  }
}
