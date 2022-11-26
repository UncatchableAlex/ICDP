class Hex {
    constructor(x, y, resource, number) {
        this.x = x;
        this.y = y;
        this.robber = false;
        this.number = number;
        this.resource = resource;
        this.vertices = new Array(6);
        this.sides = new Array(6);
    }

    highlight() {
        ctx.fillStyle = "yellow"
        drawHex(this.x,this.y,tileSize);
    }

    unhighlight(){
        ctx.fillStyle = "red"
        drawHex(this.x,this.y,tileSize);
    }
}