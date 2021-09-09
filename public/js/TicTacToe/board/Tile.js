import {Board} from './Board.js';

class Tile {

    index;

    constructor(index) {
        this.index = index;
        if (this.constructor === Tile) {
            throw new TypeError('Abstract class "Tile" cannot be instantiated directly.');
        }
    }
    /**
     * Implementation
     */
    isTileOccupied = () => new Error('You have to implement the method isTileOccupied!');
    getPiece = () => new Error('You have to implement the method getPiece!');

    /**
     * Concrete
     */
    getIndex = () => this.index;

    static createTile = (piece, index) => {
        if (index < 0 || index >= Board.NUMBER_OF_TILES) {
            throw new Error (`Index should be greater than 0 and less than ${Board.NUMBER_OF_TILES}`);
        }
        return piece === null ? Object.freeze(new EmptyTile(index)) : Object.freeze(new OccupiedTile(piece, index));
    }
}

class EmptyTile extends Tile {

    constructor(index) {
        super(index);
    }

    isTileOccupied = () => false;
    getPiece = () => null;
    toString = () => '-';
}

class OccupiedTile extends Tile {

    piece;

    constructor(piece, index) {
        super(index);
        if (piece === null) {
            throw new Error('Piece cannot be null for occupied tile!');
        }
        this.piece = piece;
    }

    isTileOccupied = () => true;
    getPiece = () => this.piece;
    toString = () => this.piece.toString();
}

export default Tile;