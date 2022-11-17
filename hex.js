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
}