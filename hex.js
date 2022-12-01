class Hex {
    static COLORS = {
        g: "GoldenRod",
        w: "Olive",
        o: "DimGrey",
        l: "ForestGreen",
        b: "SaddleBrown",
        d: "SandyBrown",
    }

    constructor(resource, number) {
        this.robber = resource === "d" ? true : false;
        this.number = number;
        this.resource = resource;
        this.vertices = new Array(6);
        this.edges = new Array(6);
    }

    draw() {
        ctx.fillStyle = Hex.COLORS[this.resource];
        ctx.beginPath();
        for (let v of this.vertices) {
            ctx.lineTo(v.x, v.y);
        }
        ctx.closePath();
        ctx.fill();
    }
}