class Vertex {
    constructor(hex, offsetX, offsetY) {
        let pix = Utils.hexToPixel(hex.q / 3, hex.r / 3);
        this.x = pix.x + offsetX;
        this.y = pix.y + offsetY;
        this.structure;
        this.playerId;
        this.tiles = [];
        this.edges = [];
    }

    draw() {
        if (this.playerId !== undefined) {
            ctx.fillStyle = Player.COLORS[this.playerId];
            if (this.structure === "settie") {
                let size = tileSize * 0.3;
                let half = size / 2;
                ctx.fillRect(this.x - half, this.y - half, size, size);
            } else {
                let size = tileSize * 0.32;
                let half = size / 2;
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, half, half, 0, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

        }
    }
}