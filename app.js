const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = Math.floor(canvas.height / (5 * Math.sqrt(3)));

const board = new Board();

const playerColors = ["red", "white", "blue", "DarkOrange"]

player = 0;

board.draw_board();

canvas.addEventListener("dragover", (event) => {
    event.preventDefault();
});

canvas.addEventListener("drop", (event) => {
    let type = event.dataTransfer.getData("text/plain");
    let res = board[`add_${type}`](event.offsetX, event.offsetY, player);
    if (res){
        board.draw_board();
        player = (player + 1)%4
    }
});