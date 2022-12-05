const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = Math.floor(canvas.width / (5 * Math.sqrt(3)));

const board = new Board();
const player1 = new Player(0, "toby");
player1.resources.ore += 15;
player1.resources.sheep += 15;
player1.resources.wheat += 15;
player1.developmentCards.monopoly++;
player1.developmentCards.victoryPoint += 2;
const player2 = new Player(1, "keith");
const game = new Game(0, board, player1, player2);

// Update initial resources
updateResources();
updateDevCardSelect();

board.draw_board();

canvas.addEventListener("dragover", (event) => {
  event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
  let type = event.dataTransfer.getData("text/plain");
  let res = board[`add_${type}`](
    event.offsetX,
    event.offsetY,
    game.turn % game.playerCount
  );
  if (res) {
    res = game[`build_${type}`](game.currentPlayer, game.bank);
    if (res) {
      board.draw_board();
      updateResources();
    }
  }
});

//roll dice and distribute resource
let button = document.getElementById("roll");
button.addEventListener("click", () => {
  console.log(button);
  if (!game.hasRolled) {
    game.roll();
    console.log(game.currentRoll);
    for (let q in board.tiles) {
      for (let r in board.tiles[q]) {
        let hex = board.tiles[q][r];
        if (hex.number === game.currentRoll && !hex.robber) {
          for (let v of hex.vertices) {
            if (v.structure !== undefined) {
              if (v.structure === "settie")
                game.players[v.playerId].resources[hex.resource]++;
              else game.players[v.playerId].resources[hex.resource] += 2;
            }
          }
        }
      }
    }
  }
  updateResources();
  updateDevCardSelect();
});

button = document.getElementById("pass");
button.addEventListener("click", () => {
  if (game.hasRolled) game.playerPassGame();
});

function updateResources() {
  let resource = document.querySelectorAll('td[id^="resources"]');
  let t = 0;
  for (let res in game.currentPlayer.resources) {
    resource[t].innerHTML = game.currentPlayer.resources[res];
    t++;
  }
}

function updateDevCardSelect() {
  let developmentCards = document.querySelectorAll('td[id^="devCards"]');
  let t = 0;
  for (let dev in game.currentPlayer.developmentCards) {
    developmentCards[t].innerHTML = game.currentPlayer.developmentCards[dev];
    t++;
  }

  let selectList = document.createElement("select");
  for (let dev in game.currentPlayer.developmentCards) {
    if (game.currentPlayer.developmentCards[dev] > 0 && dev != "victoryPoint") {
      let option = document.createElement("option");
      option.id = "devCardSelect";
      option.text = dev;
      option.value = dev;
      selectList.appendChild(option);
    }
  }
  document.getElementById("devCardSelect").replaceWith(selectList);
}

button = document.getElementById("playCard");
button.addEventListener("click", () => {
  let select = document.getElementById("devCardSelect");
});

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

button = document.getElementById("buyDevelopmentCard");
button.addEventListener("click", () => {
  game.buyDevelopmentCard(game.currentPlayer, game.bank);
  updateDevCardSelect();
  updateResources();
});
