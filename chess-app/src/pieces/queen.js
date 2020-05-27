import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(color, position) {
        
        if (color === 'white') {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg");
        } else {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg");
        };
        this.position = position;
    };

    checkPossibleMove(destination) {
        var move = [
            destination[0] - this.position[0],
            destination[1] - this.position[1]
        ];

        // rook like movements
        if (move[0] === 0 && move[1] !== 0) {
            return true;
        } else if (move[1] === 0 && move[0] !== 0) {
            return true;

        // bishop like movement
        } else if (move[0] !== 0 && Math.abs(move[0]) === Math.abs(move[1])) {
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

        // moving horizontally
        if (move[0] === 0 && move[1] !== 0) {
            const dir = Math.sign(move[1]);

            for (let i = dir * 1; Math.abs(i) < Math.abs(move[1]); i += dir * 1) {
                path.push([this.position[0], this.position[1] + i]);
            }

        // moving vertically
        } else if (move[1] === 0 && move[0] !== 0) {
            const dir = Math.sign(move[0]);

            for (let i = dir * 1; Math.abs(i) < Math.abs(move[0]); i += dir * 1) {
                path.push([this.position[0] + i, this.position[1]]);
            }

        // otherwise moving like a bishop
        } else {
            const rowDir = Math.sign(move[0]);
            const colDir = Math.sign(move[1]);

            for (let i = 1; Math.abs(i) < Math.abs(move[0]); i += 1) {

                path.push([this.position[0] + rowDir * i, this.position[1] + colDir * i]);
            }
        }

        return path;
    }
}