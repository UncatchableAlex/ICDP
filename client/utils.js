const tileSize = Math.floor(canvas.width / (5 * Math.sqrt(3)));
class Utils {
    static hexToPixel(q, r, size = tileSize) {
        return {
            x: (1.7320508075688772 * q + 0.8660254037844386 * r) * size,
            y: 1.5 * r * size
        };
    }

    static pixelToHex(x, y, size = tileSize) {
        return {
            q: (0.5773502691896257 * x - 0.3333333333333333 * y) / size,
            r: 0.6666666666666666 * y / size
        };
    }
}