import Piece from '../piece/Piece';

type Tile = {
    readonly index: number;
    readonly isTileOccupied: boolean;
    readonly getPiece: Piece | null;
    readonly stringFormat: string;
};

export const createTile = (index: number, piece: Piece | null): Tile => {
    return {
        index: index,
        isTileOccupied: !!piece,
        getPiece: piece,
        stringFormat: piece === null ? '-' : piece.league.toString(),
    };
};

export default Tile;
