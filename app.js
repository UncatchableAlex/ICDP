const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = Math.floor(canvas.width / (5 * Math.sqrt(3)));

// const board = new Board();
// const player1 = new Player(0, "toby")
// const player2 = new Player(1, "keith")
// const game = new Game(0, board, player1, player2);

const socket = io();

socket.on("join game",(info)=>{
    console.log(info);
})

// board.draw_board();

// canvas.addEventListener("dragover", (event) => {
//     event.preventDefault();
// });

// canvas.addEventListener("drop", (event) => {
//     let type = event.dataTransfer.getData("text/plain");
//     let res = board[`add_${type}`](event.offsetX, event.offsetY, game.turn % game.playerCount);
//     if (res) {
//         res = game[`build_${type}`](game.currentPlayer, game.bank);
//         if (res) {
//             board.draw_board();
//         }
//     }
// });

// //roll dice and distribute resource
// let button = document.getElementById("roll");
// button.addEventListener("click", () => {
//     if (!game.hasRolled) {
//         game.roll();
//         console.log(game.currentRoll);
//         for (let q in board.tiles) {
//             for (let r in board.tiles[q]) {
//                 let hex = board.tiles[q][r];
//                 if (hex.number === game.currentRoll && !hex.robber) {
//                     for (let v of hex.vertices) {
//                         if (v.structure !== undefined) {
//                             if (v.structure === "settie")
//                                 game.players[v.playerId].resources[hex.resource]++;
//                             else
//                                 game.players[v.playerId].resources[hex.resource] += 2;
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });


// button = document.getElementById("pass");
// button.addEventListener("click", () => {
//     if (game.hasRolled)
//         game.playerPassGame();
// })
