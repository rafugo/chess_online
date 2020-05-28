import Piece from './piece.js';

export default class Knight extends Piece {
    constructor(color, position) {
        
        if (color === 'white') {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg");
        } else {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg");
        };

        this.position = position;

        this.moveset = [
            [-1, 2],
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1]
        ];
    };

    checkPossibleMove(destination) {
        var move = [
            destination[0] - this.position[0], 
            destination[1] - this.position[1]
        ];
        return this.checkListForTuple(this.moveset, move);
    };

    getMovePath(destination) {
        return [];
    }
}