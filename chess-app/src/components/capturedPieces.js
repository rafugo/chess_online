import React from 'react';
import '../index.css';
import Square from './square.js';

export default class CapturedPieces extends React.Component {

    renderSquare(square, i, j, squareShade) {
        return <Square
        piece = {square}
        style = {square.style}
        />
    }

    render() {
        return (
            <div>
            <div className='board-row'>{this.props.whiteCapturedPieces.map((ws, index) =>
                this.renderSquare(ws, index)
            )}</div>
            <div className='board-row'>{this.props.blackCapturedPieces.map((bs, index) =>
                this.renderSquare(bs, index)
            )}</div>
            </div>
        );
    }
}