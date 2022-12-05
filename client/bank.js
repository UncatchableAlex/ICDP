/**
 * Encompasses the default Catan bank with
 * all resources and development cards along
 * with all the functions needed to ensure the
 *
 */
class Bank {
  constructor(developmentCards) {
    this.resources = {
      ore: 19,
      wheat: 19,
      sheep: 19,
      wood: 19,
      brick: 19,
    };

    this.developmentCards = developmentCards;
  }

  canDrawDevelopmentCard() {
    return developmentCards.length > 0;
  }

  drawDevelopmentCard() {
    if (this.canSellDevelopmentCard()) {
      return developmentCards.shift();
    }
    return "Failed to draw development card from cards";
  }

  canDraw(type, amount) {
    return this.resources[type] >= amount;
  }

  draw(type, amount) {
    if (this.canDraw(type, amount)){
      this.resources[type] -= amount;
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
