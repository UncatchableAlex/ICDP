class Utils {

    static shuffleArray(arr, times = 1) {
        for (let j = 0; j < times; j++) {
            for (let i = 0; i < arr.length; i++) {
                let rnd = i + Math.floor(Math.random() * (arr.length - i));
                [arr[i], arr[rnd]] = [arr[rnd], arr[i]];
            }
        }
    }

    static get_rand_tile_seq() {
        let res = ['brick', 'brick', 'brick', 'desert', 'wheat', 'wheat', 'wheat', 'wheat', 'wood', 'wood', 'wood', 'wood', 'ore', 'ore', 'ore', 'sheep', 'sheep', 'sheep', 'sheep'];
        Utils.shuffleArray(res, 3);
        return res;
    }

    static get_rand_devi_seq() {
        let developmentCards = [];

        // Push 14 knights to development cards
        for (let k = 0; k < 14; k++) {
            developmentCards.push("knight");
        }
        // Push 5 victory points to development cards
        for (let v = 0; v < 5; v++) {
            developmentCards.push("victoryPoint");
        }
        // Push 2 road buildings to development cards
        for (let r = 0; r < 2; r++) {
            developmentCards.push("roadBuilding");
        }
        // Push 2 year of plenty's to development cards
        for (let y = 0; y < 2; y++) {
            developmentCards.push("yearOfPlenty");
        }
        // Push 2 monopolies to development cards
        for (let m = 0; m < 2; m++) {
            developmentCards.push("monopoly");
        }
        // Shuffle the development cards
        Utils.shuffleArray(developmentCards, developmentCards.length);
        return developmentCards;
    }
}

exports.Utils = Utils;