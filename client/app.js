const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = Math.floor(canvas.width / (5 * Math.sqrt(3)));

var board;
var game;

const socket = io();

socket.on("join game", (info) => {
  console.log(`joining game as player ${info.playerId}`);
  this.board = new Board(info.tiles);
  game = new Game(0, this.board, info.cards, info.playerId)
  button = document.getElementById("buyDevelopmentCard");
  button.addEventListener("click", () => {
    game.buyDevelopmentCard(game.player, game.bank);
    updateDevCardSelect();
    updateResources();
  });
  this.board.draw_board();
  updateDevCardSelect();
  updateResources();
})

socket.on("roll", (number) => {
  game.currentRoll = number;
  game.hasRolled = true;
  board.payout();
})

socket.on("pass turn", () => {
  game.playerPassGame();
})

// Update initial resources

canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
  let type = event.dataTransfer.getData("text/plain");
  let res = this.board[`add_${type}`](
    event.offsetX,
    event.offsetY,
    game.turn % game.playerCount
  );
  if (res) {
    res = game[`build_${type}`](game.player, game.bank);
    if (res) {
      this.board.draw_board();
      updateResources();
    }
  }
});

//roll dice and distribute resource
let button = document.getElementById("roll");
button.addEventListener("click", () => {
  if (!game.hasRolled) {
    game.roll();
    console.log(game.currentRoll);
  }

  button = document.getElementById("pass");
  button.addEventListener("click", () => {
    if (game.hasRolled) game.playerPassGame();
  });

  // work in progress for playing development cards
  button = document.getElementById("playCard");
  button.addEventListener("click", () => {
    let select = document.getElementById("devCardSelect");
  });

  updateResources();
  updateDevCardSelect();
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
  for (let dev in game.player.developmentCards) {
    if (game.player.developmentCards[dev] > 0 && dev != "victoryPoint") {
      let option = document.createElement("option");
      option.id = "devCardSelect";
      option.text = dev;
      option.value = dev;
      selectList.appendChild(option);
    }
  }
  document.getElementById("devCardSelect").replaceWith(selectList);
}



// Work in progress!
function selectResource() {
  let row = document.createElement("tr");
  row.id = "selectResourceId";

  let td = document.createElement("td");
  let wood = document.createElement("button");
  let brick = document.createElement("button");
  let sheep = document.createElement("button");
  let wheat = document.createElement("button");
  let ore = document.createElement("button");

  let cardTable = document.getElementById("devCardTable");
}
