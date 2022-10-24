import type { Piece } from '../piece/Piece';

type Tile = Readonly<{
    index: number;
    isTileOccupied: boolean;
    getPiece: Piece | undefined;
    stringFormat: string;
}>;

const createTile = (index: number, piece: Piece | undefined): Tile => ({
    index: index,
    getPiece: piece,
    isTileOccupied: Boolean(piece),
    stringFormat: !piece ? '-' : piece.league.toString(),
});

export { createTile };
export type { Tile };
