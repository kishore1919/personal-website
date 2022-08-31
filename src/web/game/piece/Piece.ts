import { League } from './League';

type Piece = Readonly<{
    league: League;
    index: number;
}>;

const createPiece = (league: League, index: number): Piece => ({
    index,
    league,
});

export { createPiece };

export type { Piece };
