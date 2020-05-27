import Bishop from './pieces/bishop.js';
import King from './pieces/king.js';
import Knight from './pieces/knight.js';
import Pawn from './pieces/pawn.js';
import Queen from './pieces/queen.js';
import Rook from './pieces/rook.js';

export default function setupBoard(){
    var squares = [];

    // empty board
    for (let i = 0; i < 8; i++) {
        squares.push([null, null, null, null, null, null, null, null]);
    };

    // set up white side
    squares[7][0] = new Rook('white', [7, 0]);
    squares[7][1] = new Knight('white', [7, 1]);
    squares[7][2] = new Bishop('white', [7, 2]);
    squares[7][3] = new Queen('white', [7, 3]);
    squares[7][4] = new King('white', [7, 4]);
    squares[7][5] = new Bishop('white', [7, 5]);
    squares[7][6] = new Knight('white', [7, 6]);
    squares[7][7] = new Rook('white', [7, 7]);
    
    for (let i = 0; i < 8; i++) {
        squares[6][i] = new Pawn('white', [6, i]);
    };
    

    // set up black side
    squares[0][0] = new Rook('black', [0, 0]);
    squares[0][1] = new Knight('black', [0, 1]);
    squares[0][2] = new Bishop('black', [0, 2]);
    squares[0][3] = new Queen('black', [0, 3]);
    squares[0][4] = new King('black', [0, 4]);
    squares[0][5] = new Bishop('black', [0, 5]);
    squares[0][6] = new Knight('black', [0, 6]);
    squares[0][7] = new Rook('black', [0, 7]);

    for (let i = 0; i < 8; i++) {
        squares[1][i] = new Pawn('black', [1, i]);
    };

    

    return squares;
}