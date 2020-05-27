import Piece from './piece.js';

export default class King extends Piece {
    constructor(color, position) {
        
        if (color === 'white') {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg");
        } else {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg");
        };

        this.position = position;
        this.startingPosition = position;

        this.moveset = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1]
        ];

        this.castlingMoveset = [
            [0, 2],
            [0, -2]
        ];
    };

    checkPossibleMove(destination) {
        var move = [
            destination[0] - this.position[0], 
            destination[1] - this.position[1]
        ];

        return this.checkListforTuple(this.moveset, move);
    };

    getMovePath(destination) {
        return [];
    }
}