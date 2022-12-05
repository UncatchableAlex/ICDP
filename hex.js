class Hex {
  static COLORS = {
    wheat: "GoldenRod",
    sheep: "Olive",
    ore: "DimGrey",
    wood: "ForestGreen",
    brick: "SaddleBrown",
    desert: "SandyBrown",
  };

  constructor(x, y, resource, number) {
    this.x = x;
    this.y = y;
    this.robber = resource === "desert" ? true : false;
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
    // draw number
    if (this.number) {
      let size = canvas.height * 4.3e-2;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, size, size, 0, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = this.number === 6 || this.number === 8 ? "red" : "black";
      ctx.font = `${canvas.height * 6.2e-2}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.number, this.x, this.y);
    }
}

exports.Hex = Hex;
