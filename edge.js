class Edge {
    constructor() {
        this.vertices = [];
        this.tiles = [];
        this.playerId;
    }

    draw() {
        if (this.playerId !== undefined) {
            ctx.strokeStyle = playerColors[this.playerId];
            ctx.lineWidth = tileSize * 0.1;
            ctx.beginPath();
            ctx.lineTo(this.vertices[0].x,this.vertices[0].y);
            ctx.lineTo(this.vertices[1].x,this.vertices[1].y);
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = 1;
        }
    }
}