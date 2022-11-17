class Board {
    constructor() {
        this.offset = hexToPixel(1.5, 3, tileSize);
        this.tiles = {};
        for (let i = -2; i <= 2; i++) {
            let a = i >= 0 ? 0 : -i;
            let b = i <= 0 ? 0 : -i;
            this.tiles[i] = {};
            for (let j = a - 2; j <= b + 2; j++) {
                let coord = hexToPixel(i, j, tileSize);
                this.tiles[i][j] = new Hex(coord.x + this.offset.x, coord.y + this.offset.y);
            }
        }

        this.activeTile = this.tiles[0][0];
    }

    hover(x, y) {
        let hex = pixelToHex(x - this.offset.x, y - this.offset.y, tileSize);
        let q = Math.round(hex.q);
        let r = Math.round(hex.r);
        if (q in this.tiles && r in this.tiles[q] && this.tiles[q][r] != this.activeTile){
            this.activeTile.unhighlight();
            this.activeTile = this.tiles[q][r];
            this.activeTile.highlight();
        }

    }

    drawBoard() {
        for (let i in this.tiles) {
            for (let j in this.tiles[i]) {
                this.tiles[i][j].unhighlight();
            }
        }
    }
}