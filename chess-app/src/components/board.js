import React from 'react';

import '../App.css';
import Square from './square.js';

export default class Board extends React.Component {
    renderSquare(i, j, squareShade) {


        return <Square
        key = {[i, j]}
        piece = {this.props.squares[i][j]}
        style = {this.props.squares[i][j] ? this.props.squares[i][j].style : null}
        shade = {squareShade}
        onClick={() => this.props.onClick(i, j)}
        />
    }

    render() {
        var lastShade = 'dark-square';
        const board = [];

        for (let i = 0; i < 8; i++) {
            const row = [];

            for (let j = 0; j < 8; j++) {
                lastShade === 'light-square' ? lastShade = 'dark-square' : lastShade = 'light-square';
                row.push(this.renderSquare(i, j, lastShade));
            }

            lastShade === 'light-square' ? lastShade = 'dark-square' : lastShade = 'light-square';

            board.push(<div key={i} className="board-row">{row}</div>)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}