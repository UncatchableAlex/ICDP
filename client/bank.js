/**
 *
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

  can_draw_devi() {
    return this.developmentCards.length > 0;
  }

  draw_devi() {
    if (this.can_draw_devi()) {
      return this.developmentCards.pop();
    }
    return "Failed to draw development card from cards";
  }

  can_draw(type, amount) {
    return this.resources[type] >= amount;
  }

  draw(type, amount) {
    if (this.can_draw(type, amount)) {
      this.resources[type] -= amount;
      return true;
    }
    return false;
  }

  reclaim_road() {
    this.resources.wood++;
    this.resources.brick++;
  }

  reclaim_settie() {
    this.resources.wood++;
    this.resources.brick++;
    this.resources.sheep++;
    this.resources.wheat++;
  }

  reclaim_city() {
    this.resources.wheat += 2;
    this.resources.ore += 3;
  }

  reclaim_devi() {
    this.resources.wheat++;
    this.resources.sheep++;
    this.resources.ore++;
  }

  get_state() {
    let output = {
      resources: {},
      developmentCards: this.developmentCards.splice(0),
    };
    for (let r in this.resources) {
      output.resources[r] = this.resources[r];
    }
    return output;
  }

  set_state(state) {
    this.resources = state.resources;
    this.developmentCards = state.developmentCards;
  }
}
