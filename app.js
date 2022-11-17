const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tileSize = 50

ctx.fillStyle = "red";
ctx.fillRect(0, 0, 500, 500);

canvas.addEventListener("mousemove", (event) => {
    hex = pixelToHex(event.offsetX, event.offsetY, 50)
    pix = hexToPixel(Math.floor(hex.q), Math.floor(hex.r), 50);
    ctx.clearRect(0, 0, 500, 500);
    drawHex(pix.x, pix.y, 50);
    console.log(hex)
})

function hexToPixel(q, r, size) {
    return {
        x: (1.7320508075688772 * q + 0.8660254037844386 * r) * size,
        y: 1.5 * r * size
    };
}

function pixelToHex(x, y, size) {
    return {
        q: (0.5773502691896257 * x - 0.3333333333333333 * y) / size,
        r: 0.6666666666666666 * y / size
    };
}

function drawHex(x, y, size) {
    var angle;
    ctx.beginPath();
    for (i = 0.5; i < 6.5; i++) {
        angle = i * 1.0471975511965976;
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fill();
}