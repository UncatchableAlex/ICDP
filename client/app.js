const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var board;
var game;

socket.on("roll", (number) => {
  game.currentRoll = number;
  game.hasRolled = true;
  game.payout();
  updateResources();
});

socket.on("pass turn", () => {
  game.playerPassGame();
});

// Update initial resources

canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
  let playerId;
  if (game.turn < 2 * game.playerCount) {
    if (game.turn < game.playerCount) {
      playerId = game.turn;
    } else {
      playerId = game.playerCount - game.turn % game.playerCount - 1;
    }
  } else {
    playerId =  game.turn % game.playerCount;
  }
  let type = event.dataTransfer.getData("text/plain");
  let hex = board[`can_add_${type}`](
    event.offsetX,
    event.offsetY,
   playerId
  );
  if (hex) {
    let res = game.build(type, hex);
    console.log(res);
    if (res) {
      board.draw_board();
      updateResources();
      updateVPS();
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
  game.passTurn();
});

// work in progress for playing development cards
button = document.getElementById("playCard");
button.addEventListener("click", () => {
  let select = document.getElementById("devCardSelect");
  updateDevCardSelect();
  updateVPS();
});

button = document.getElementById("buyDevelopmentCard");
button.addEventListener("click", () => {
  console.log("Here");
  game.draw_devi();
  updateDevCardSelect();
  updateResources();
  updateVPS();
});


button = document.getElementById("buyDevelopmentCard");
button.addEventListener("click", () => {
  game.draw_devi();
  updateDevCardSelect();
  updateResources();
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

function updateVPS() {
  vps = document.getElementById("vpCounter");
  vps.innerHTML = game.player.getVPS();
}
