const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var board;
var game;

// Counter to allow player to select cards from the card bar
var cardsToSelect = 0;
// Update initial resources

canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
  let playerId;
  // In the initial building phase
  if (game.turn < 2 * game.playerCount) {
    if (game.turn < game.playerCount) {
      playerId = game.turn;
    } else {
      playerId = game.playerCount - (game.turn % game.playerCount) - 1;
    }
  } else {
    playerId = game.turn % game.playerCount;
  }
  let type = event.dataTransfer.getData("text/plain");
  let hex = board[`can_add_${type}`](event.offsetX, event.offsetY, playerId);
  if (hex) {
    let res = game.build(type, hex);
    console.log(res);
    if (res) {
      board.draw_board();
      updateUI();
    }
  }
});

//roll dice and distribute resource
let button = document.getElementById("roll");
button.addEventListener("click", () => {
  if (game.currentPlayer && !game.hasRolled) {
    game.roll();
    console.log(game.currentRoll);
  }
});

button = document.getElementById("pass");
button.addEventListener("click", () => {
  // Still in the building phase
  if (game.turn >= 2 * game.playerCount && game.hasRolled) {
    game.passTurn();
    return;
  }
  if (game.player.emptyHand()) {
    game.passTurn();
    return;
  } else {
    alert("Please place a settlement and road before ending your turn");
  }
});

// work in progress for playing development cards
button = document.getElementById("playCard");
button.addEventListener("click", () => {
  // Make sure it's the players turn
  if (!game.currentPlayer) {
    return;
  }
  let select = document.getElementById("devCardSelect");
  let card = select.value.charAt(0).toUpperCase() + select.value.slice(1);
  alert("Playing a " + card + " card");
  this.game[`play${card}`]();
  this.game.player.developmentCards[card];
  updateUI();
});

button = document.getElementById("buyDevelopmentCard");
button.addEventListener("click", () => {
  game.draw_devi();
  updateUI();
});

function updateResources() {
  let resource = document.querySelectorAll('td[id^="resources"]');
  let t = 0;
  for (let res in game.player.resources) {
    resource[t].innerHTML = game.player.resources[res];
    t++;
  }
}

function updateDevCardSelect() {
  let developmentCards = document.querySelectorAll('td[id^="devCards"]');
  let t = 0;
  for (let dev in game.player.developmentCards) {
    developmentCards[t].innerHTML = game.player.developmentCards[dev];
    t++;
  }

  let selectList = document.createElement("select");
  selectList.id = "devCardSelect";
  for (let dev in game.player.developmentCards) {
    if (game.player.developmentCards[dev] > 0 && dev != "victoryPoint") {
      let option = document.createElement("option");
      option.text = dev;
      option.value = dev;
      selectList.appendChild(option);
    }
  }
  document.getElementById("devCardSelect").replaceWith(selectList);
}

// Allow players to pick a resource
let cardSelectRow = document.getElementById("cardSelectRow");
let buttons = cardSelectRow.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Make sure the person making the button press is the current player
    if (!game.currentPlayer) {
      return;
    }
    // Check if the card can be drawn
    if (game.bank.draw(button.value, 1)) {
      alert("You drew one " + button.value);
      game.player.resources[button.value]++;
      this.cardsToSelect--;
      //this.cardsSelected.push(button.value);
      if (this.cardsToSelect <= 0) {
        enableChooseCard(true);

        // Make call to server to push changes
        game.playedDevie("yearOfPlenty");
      }
    } else {
      alert(
        "Sorry the there are not enough resources in the bank to draw 1" +
          button.value
      );
    }
    updateUI();
  });
});

function enableChooseCard(state) {
  let cardSelectRow = document.getElementById("cardSelectRow");
  let buttons = cardSelectRow.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = state;
  });
}

function updateVPS() {
  vps = document.getElementById("vpCounter");
  vps.innerHTML = game.player.getVPS();
}

function updateUI() {
  updateDevCardSelect();
  updateResources();
  updateVPS();
}
