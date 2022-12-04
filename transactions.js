// Allow given player to buy development card
function buyDevelopmentCard(player, bank) {
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
function buildRoad(player, bank) {
  if (player.canBuildRoad()) {
    player.buildRoad();
    bank.reclaimRoad();
    return true;
  }
  return false;
}

// Allow player to build a settlement
function buildSettlement(player, bank) {
  if (player.canBuildSettlement()) {
    player.buildSettlement();
    bank.reclaimSettlement();
    return true;
  }
  return false;
}

// Allow player to build a settlement
function upgradeSettlement(player, bank) {
  if (player.canUpgradeSettlement()) {
    player.upgradeSettlement();
    bank.reclaimCity();
    return true;
  }
  return false;
}

// Define functions for trades
