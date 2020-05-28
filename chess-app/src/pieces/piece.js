export default class Piece {
    constructor(color, pieceUrl) {
        this.color = color;
        this.style = {backgroundImage: `url(${pieceUrl})`};
    }

    checkListForTuple(listToCheck, tuple) {
        for (let i = 0; i < listToCheck.length; i += 1) {
            if (listToCheck[i][0] === tuple[0] && listToCheck[i][1] === tuple[1]) {
                return true;
            }
        }
        return false;
    }
}