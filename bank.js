/**
 * Encompasses the default Catan bank with
 * all resources and development cards along
 * with all the functions needed to ensure the
 *
 */
class Bank {
  constructor() {
    this.resources = {
      ore: 19,
      wheat: 19,
      sheep: 19,
      wood: 19,
      brick: 19,
    };

    this.developmentCards = [];

    // Push 14 knights to development cards
    for (let k = 0; k < 14; k++) {
      this.developmentCards.push("knight");
    }
    // Push 5 victory points to development cards
    for (let v = 0; v < 5; v++) {
      this.developmentCards.push("victoryPoint");
    }
    // Push 2 road buildings to development cards
    for (let r = 0; r < 2; r++) {
      this.developmentCards.push("roadBuilding");
    }
    // Push 2 year of plenty's to development cards
    for (let y = 0; y < 2; y++) {
      this.developmentCards.push("yearOfPlenty");
    }
    // Push 2 monopolies to development cards
    for (let m = 0; m < 2; m++) {
      this.developmentCards.push("monopoly");
    }

    // Shuffle the development cards
    shuffleArray(this.developmentCards, this.developmentCards.length);
  }

  canSellDevelopmentCard() {
    return this.developmentCards.length > 0;
  }

  sellDevelopmentCard() {
    if (this.canSellDevelopmentCard()) {
      return this.developmentCards.shift();
    }
    return "Failed to draw development card from cards";
  }

  canDrawWood(amount) {
    return this.resources.wood >= amount;
  }

  drawWood(amount) {
    if (this.canDrawWood(amount)) {
      this.resources.wood -= amount;
      return true;
    }
    return false;
  }

  reclaimRoad() {
    this.resources.wood++;
    this.resources.brick++;
  }

  reclaimSettlement() {
    this.resources.wood++;
    this.resources.brick++;
    this.resources.sheep++;
    this.resources.wheat++;
  }

  reclaimCity() {
    this.resources.wheat += 2;
    this.resources.ore += 3;
  }

  reclaimDevelopmentCard() {
    this.resources.wheat++;
    this.resources.sheep++;
    this.resources.ore++;
  }
}
