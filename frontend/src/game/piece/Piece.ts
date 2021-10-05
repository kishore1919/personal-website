import League from './League';

export default interface Piece {
    readonly league: League;
    readonly index: number;
}

export const createPiece = (league: League, index: number): Piece => ({
    index,
    league,
});
