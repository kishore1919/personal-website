import Piece from '../piece/Piece';

type Tile = Readonly<{
    index: number;
    isTileOccupied: boolean;
    getPiece: Piece | null;
    stringFormat: string;
}>;

export const createTile = (index: number, piece: Piece | null): Tile => ({
    index: index,
    isTileOccupied: !!piece,
    getPiece: piece,
    stringFormat: !piece ? '-' : piece.league.toString(),
});

export default Tile;
