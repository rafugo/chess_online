import React from 'react';
import Board from './board.js';
import CapturedPieces from './capturedPieces.js';
import setupBoard from '../setupBoard.js';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: setupBoard(),
            whiteCapturedPieces: [],
            blackCapturedPieces: [],
            sourceSelection: [-1, -1],
            status: '',
            turn: 'white'
        }
    }

    handleClick(destinationRow, destinationCol){
        var i = destinationRow;
        var j = destinationCol;
        const squares = this.state.squares.slice();

        // if no piece is selected
        if (this.state.sourceSelection[0] === -1 && this.state.sourceSelection[1] === -1){
            this.handleNoPieceSelected(squares, i, j);

        // if we already have a piece selected and the user wants to move it
        } else {
            this.handleMoveInput(squares, i, j);
        }
        
    }

    handleNoPieceSelected(squares, i, j) {
        console.log(this.state.sourceSelection)
        // if the wrong piece/square is selected
        if(!squares[i][j] || squares[i][j].color !== this.state.turn){
            this.setState({status: "Wrong selection. Choose a " + this.state.turn + " piece."});
            
            if (squares[i][j] !== null) {
                delete squares[i][j].style.backgroundColor;
            }
        
        // if the right color piece is selected
        } else {
            squares[i][j].style = {...squares[i][j].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
            

            this.setState({
                status: "Choose destination for the selected piece",
                sourceSelection: [i, j]
            });
        }
    }

    deleteSquareSelectionColor(squares, i, j) {
        let newStyle = Object.assign({}, squares[i][j].style)
        delete newStyle.backgroundColor;
        squares[i][j].style = newStyle;
    }


    handleMoveInput(squares, i, j) {

        this.deleteSquareSelectionColor(squares, this.state.sourceSelection[0], this.state.sourceSelection[1]);

        this.isMoveLegal(squares, i, j) ? this.handleLegalMove(squares, i, j) : this.handleIllegalMove(squares, i, j);

    }
     
    isMoveLegal(squares, i, j) {
        // cant capture own pieces
        if (squares[i][j] && squares[i][j].color === this.state.turn){
            return false;
        
        } else {
            const isEnemyAtDestination = squares[i][j] ? true : false;

            const isMovePossible = squares[this.state.sourceSelection[0]][this.state.sourceSelection[1]].checkPossibleMove([i, j], isEnemyAtDestination);
            
            // if piece does not move how it should
            if ( !isMovePossible ) {
                return false;
            }
            
            const movePath = squares[this.state.sourceSelection[0]][this.state.sourceSelection[1]].getMovePath([i, j])
            const isMovePathLegal = this.isMovePathLegal(movePath);

            // if there's something in the way of the piece's path
            if ( !isMovePathLegal ) {
                return false;
            }
        }
        return true;
    }

    handleLegalMove(squares, i, j) {
        
        this.handleCapturedPiece(squares, i, j);
        
        this.handlePieceMoving(squares, i, j);

        let turn = this.state.turn === 'white' ? 'black' : 'white';
        this.setState({
            sourceSelection: [-1, -1],
            squares: squares,
            status: '',
            turn: turn
        });
    }

    handleIllegalMove(squares, i, j) {
        this.setState({
            status: "Invalid selection.",
            sourceSelection: [-1, -1]
        });
    }

    handlePieceMoving(squares, i, j) {
        squares[i][j] = squares[this.state.sourceSelection[0]][this.state.sourceSelection[1]];
        squares[this.state.sourceSelection[0]][this.state.sourceSelection[1]] = null;
        squares[i][j].position = [i, j];
    }

    handleCapturedPiece(squares, i, j) {
        if(squares[i][j] !== null){
            if(squares[i][j].color === 'white'){
                this.state.whiteCapturedPieces.push(squares[i]);
            }
            else{
                this.state.blackCapturedPieces.push(squares[i]);
            }
        }
    }

    isMovePathLegal(movePath) {
        for (let i=0; i < movePath.length; i++) {
            var stepRow = movePath[i][0];
            var stepCol = movePath[i][1];
            console.log(movePath);
            // if there's any object in the way, not valid
            if (this.state.squares[stepRow][stepCol] !== null) {
                return false;
            }
        }

        return true;
    }

    render() {
        return (
            <div>
            <div className="game">
            <div className="game-board">
                <Board 
                squares = {this.state.squares}
                onClick = {(i, j) => this.handleClick(i, j)}
                />
            </div>
            <div className="game-info">
                <h3>Turn</h3>
                <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
    
                </div>
                <div className="game-status">{this.state.status}</div>

                <div className="captured-pieces">
                
                {<CapturedPieces
                whiteCapturedPieces = {this.state.whiteCapturedPieces}
                blackCapturedPieces = {this.state.blackCapturedPieces}
                />
                }
                </div>
                
            </div>
            </div>

            <div className="icons-attribution">
            <div> <small> Chess Icons And Favicon (extracted) By en:User:Cburnett [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a>, <a href="http://opensource.org/licenses/bsd-license.php">BSD</a> or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">via Wikimedia Commons</a> </small></div>
            </div>
        </div>
        )
    };
}