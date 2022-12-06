class Board {
  static #TILE_COORDINATES = [
    [0, -2],
    [-1, -1],
    [-2, 0],
    [-2, 1],
    [-2, 2],
    [-1, 2],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, -1],
    [2, -2],
    [1, -2],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 0],
    [1, -1],
    [0, 0],
  ];
  static #TILE_NUMBERS = [
    11, 3, 6, 5, 4, 9, 10, 8, 4, 11, 12, 9, 10, 8, 3, 6, 2, 5,
  ];

  /**
   *
   * @constructor
   * @param {string} resources
   */
  constructor(resources) {
    this.offsetX = canvas.width / 2;
    this.offsetY = canvas.width / 2;
    this.tiles = {};
    this.edges = {};
    this.vertices = {};

    let directions = [
      { q: 1, r: 0 },
      { q: 1, r: -1 },
      { q: 0, r: -1 },
      { q: -1, r: 0 },
      { q: -1, r: 1 },
      { q: 0, r: 1 },
    ];
    let numbers = Board.#TILE_NUMBERS.splice(0);
    Board.#TILE_COORDINATES.forEach((coord, index) => {
      let q = coord[0];
      let r = coord[1];

      let num = resources[index] === "desert" ? 0 : numbers.pop();
      this.tiles[q] = this.tiles[q] || {};

      let pos = Utils.hexToPixel(q, r);
      this.tiles[q][r] = new Hex(
        pos.x + this.offsetX,
        pos.y + this.offsetY,
        resources[index],
        num
      );
      for (let k = 0; k < 6; k++) {
        // initialize and link vertices with hexes
        let id = {
          q: 3 * q + directions[k].q + directions[(k + 1) % 6].q,
          r: 3 * r + directions[k].r + directions[(k + 1) % 6].r,
        };
        this.vertices[id.q] = this.vertices[id.q] || {};
        this.vertices[id.q][id.r] =
          this.vertices[id.q][id.r] ||
          new Vertex(id, this.offsetX, this.offsetY);
        this.vertices[id.q][id.r].tiles.push(this.tiles[q][r]);
        this.tiles[q][r].vertices[k] = this.vertices[id.q][id.r];

        // initialize and link edges with hexes
        id = {
          q: 2 * q + directions[k].q,
          r: 2 * r + directions[k].r,
        };
        this.edges[id.q] = this.edges[id.q] || {};
        this.edges[id.q][id.r] = this.edges[id.q][id.r] || new Edge();
        this.edges[id.q][id.r].tiles.push(this.tiles[q][r]);
        this.tiles[q][r].edges[k] = this.edges[id.q][id.r];
      }
      // link vertices and edges
      for (let k = 0; k < 6; k++) {
        let e = this.tiles[q][r].edges[k];
        let v2 = this.tiles[q][r].vertices[k];
        let v1 = this.tiles[q][r].vertices[(k + 5) % 6];
        if (!e.vertices.includes(v1)) e.vertices.push(v1);
        if (!e.vertices.includes(v2)) e.vertices.push(v2);
        if (!v1.edges.includes(e)) v1.edges.push(e);
        if (!v2.edges.includes(e)) v2.edges.push(e);
      }
    });
  }

  has(type, hex) {
    return type in this && hex.q in this[type] && hex.r in this[type][hex.q];
  }

  get(type, hex) {
    if (this.has(type, hex)) {
      return this[type][hex.q][hex.r];
    }
  }

  add_settie(x, y, playerId) {
    let pos = Utils.pixelToHex(x - this.offsetX, y - this.offsetY);
    pos.q = Math.round(pos.q * 3);
    pos.r = Math.round(pos.r * 3);
    let v = this.get("vertices", pos);
    if (v) {
      // check for neighbors
      for (let e of v.edges) {
        if (
          e.vertices[0].structure !== undefined ||
          e.vertices[1].structure !== undefined
        )
          return false;
      }
      v.structure = "settie";
      v.playerId = playerId;
      return true;
    }
    return false;
  }

  add_city(x, y, playerId) {
    let pos = Utils.pixelToHex(x - this.offsetX, y - this.offsetY);
    pos.q = Math.round(pos.q * 3);
    pos.r = Math.round(pos.r * 3);
    let v = this.get("vertices", pos);
    if (v && v.structure === "settie" && v.playerId === playerId) {
      v.structure = "city";
      return true;
    }
    return false;
  }

  add_road(x, y, playerId) {
    let pos = Utils.pixelToHex(x - this.offsetX, y - this.offsetY);
    pos.q = Math.round(pos.q * 2);
    pos.r = Math.round(pos.r * 2);
    let e = this.get("edges", pos);
    if (e && e.playerId === undefined) {
      // check for scr
      let valid = false;
      for (let v of e.vertices) {
        if (valid || v.playerId === playerId) {
          valid = true;
          break;
        }
        for (let n of v.edges) {
          if (n.playerId === playerId) {
            valid = true;
            break;
          }
        }
      }
      if (!valid) return false;
      e.playerId = playerId;
      return true;
    }
    return false;
  }

  draw_board() {
    ctx.fillStyle = "DeepSkyBlue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let type of ["tiles", "edges", "vertices"]) {
      for (let i in this[type]) {
        for (let j in this[type][i]) {
          this[type][i][j].draw();
        }
      }
    }
}
