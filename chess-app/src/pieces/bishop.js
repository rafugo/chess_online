import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor(color, position) {
        if (color === 'white') {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg");
        } else {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg");
        };
        this.position = position;
    };

    checkPossibleMove(destination) {
        var move = [
            destination[0] - this.position[0], 
            destination[1] - this.position[1]
        ];

        if (move[0] !== 0 && Math.abs(move[0]) === Math.abs(move[1])) {
            return true;
        } else {
            return false;
        };
    };

    getMovePath(destination) {
        var move = [
            destination[0] - this.position[0], 
            destination[1] - this.position[1]
        ];

        var path = [];

        const rowDir = Math.sign(move[0]);
        const colDir = Math.sign(move[1]);

        for (let i = 1; Math.abs(i) < Math.abs(move[0]); i += 1) {

            path.push([this.position[0] + rowDir * i, this.position[1] + colDir * i]);
        }

        return path;
        
    }

}