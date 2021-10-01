import Piece from '../piece/Piece';

export default interface Tile {
    readonly index: number
    readonly isTileOccupied: boolean
    readonly getPiece: Piece | null
    readonly stringFormat: string
};

export const createTile = (index: number, piece: Piece | null): Tile => {
    return {
        index: index,
        isTileOccupied: piece !== null,
        getPiece: piece,
        stringFormat: piece === null ? '-' : piece.league.toString()
    }
};