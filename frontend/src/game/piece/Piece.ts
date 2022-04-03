import { League } from './League';

type Piece = Readonly<{
    league: League;
    index: number;
}>;

export const createPiece = (league: League, index: number): Piece => ({
    index,
    league,
});

export type { Piece };
