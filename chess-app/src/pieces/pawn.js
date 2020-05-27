import Piece from './piece';
export default class Pawn extends Piece {
    constructor(color, position) {
        if (color === 'white') {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg");
            this.direction = -1;
            this.startingRow = 6;
        } else {
            super(color, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg");
            this.direction = 1;
            this.startingRow = 1;
        };

        this.position = position;
        this.firstMoveSet = [
            [this.direction, 0],
            [this.direction * 2, 0],
        ];

        this.moveSet = [
            [this.direction, 0],
        ];

        this.captureMoveSet = [
            [this.direction, -1],
            [this.direction, 1]
        ];
    };


    // destination is the position where the pawn is going
    // isEnemyAtDestination is a boolean that determines whether
    // the pawn can move diagonally to capture the enemy
    checkPossibleMove(destination, isEnemyAtDestination) {
        var move = [
            destination[0] - this.position[0], 
            destination[1] - this.position[1]
        ];
        console.log({
            'position: ': this.position,
            'destination: ': destination,
            'move': move
        });

        if (isEnemyAtDestination) {
            return this.checkListforTuple(this.captureMoveSet, move);

        } else if (this.position[0] === this.startingRow) {

            return this.checkListforTuple(this.firstMoveSet, move);
            
        } else {
            return this.checkListforTuple(this.moveSet, move);
        };
    };

    // this will only be called on an already verified correct destination
    // it will not provide the start or the finish, only the middle steps
    // the piece would take to get to the destination
    getMovePath(destination) {
        const move = [destination[0] - this.position[0], 
                        destination[1] - this.position[1]];
        
        if (this.checkListforTuple(this.captureMoveSet, move) || this.checkListforTuple(this.moveSet, move)) {
            return [];

        } else if (this.checkListforTuple(this.firstMoveSet, move)) {
            return [[this.position[0]+this.direction, this.position[1]]];

        } else {
            return [];
        }
    }
}
