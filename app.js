const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = 50

ctx.fillStyle = "red";

const board = new Board();

board.drawBoard();

canvas.addEventListener("mousemove", (event) => {
    board.hover(event.offsetX, event.offsetY);
})