import League from './League';

type Piece = {
    readonly league: League;
    readonly index: number;
};

export const createPiece = (league: League, index: number): Piece => ({
    index,
    league,
});

export default Piece;
