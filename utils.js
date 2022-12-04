function hexToPixel(q, r, size = tileSize) {
    return {
        x: (1.7320508075688772 * q + 0.8660254037844386 * r) * size,
        y: 1.5 * r * size
    };
}

function pixelToHex(x, y, size = tileSize) {
    return {
        q: (0.5773502691896257 * x - 0.3333333333333333 * y) / size,
        r: 0.6666666666666666 * y / size
    };
}

function shuffleArray(arr, times = 1) {
    for (let j = 0; j < times; j++){
        for (let i = 0; i < arr.length; i++) {
            let rnd = i + Math.floor(Math.random() * (arr.length - i));
            [arr[i], arr[rnd]] = [arr[rnd], arr[i]];
        }
    }
}