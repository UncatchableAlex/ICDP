class Player {
  constructor(playerID) {
    this.playerID = playerID;
    this.victoryPoints;

    this.resources = {
      ore: 0,
      wheat: 0,
      sheep: 0,
      wood: 0,
      brick: 0,
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
      victoryPoint: 0,
    };

    function canBuildRoad() {
      return this.wood >= 1 && this.brick >= 1;
    }

    function canBuildSettlement() {
      return (
        this.wood >= 1 && this.brick >= 1 && this.wheat >= 1 && this.sheep >= 1
      );
    }

    function canUpgradeSettlement() {
      return this.wheat >= 2 && this.ore >= 2;
    }

    function canPanPlayKnight() {
      return this.knight >= 1;
    }

    function canPlayRoadBuilding() {
      return this.roadBuilding >= 1;
    }

    function canPlayYearOfPlenty() {
      return this.roadBuilding >= 1;
    }

    function canPlayMonopoly() {
      return this.monopoly >= 1;
    }
  }
}
