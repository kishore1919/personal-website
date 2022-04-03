import { Piece, createPiece } from '../piece/Piece';
import { League, isFirstPlayer } from '../piece/League';
import {
    Board,
    createConnectFourBoard,
    createTicTacToeBoard,
} from '../board/Board';
import { Tile, createTile } from '../board/Tile';

type Move = Readonly<{
    piece: Piece;
    equals: (move: Move) => boolean;
    execute: (board: Board) => Board;
}>;

const createTicTacToeMove = (league: League, index: number): Move => {
    const piece = createPiece(league, index);
    return {
        piece,
        equals: ({ piece: { index, league } }: Move) =>
            index === piece.index && league === piece.league,
        execute: (board: Board) => {
            const { league, tileList } = execute(board, piece);
            return createTicTacToeBoard(league, tileList);
        },
    };
};

const createConnectFourMove = (league: League, index: number): Move => {
    const piece = createPiece(league, index);
    return {
        piece,
        equals: ({ piece: { index, league } }: Move) =>
            index === piece.index && league === piece.league,
        execute: (board: Board) => {
            const { league, tileList } = execute(board, piece);
            return createConnectFourBoard(league, tileList);
        },
    };
};

const execute = (board: Board, piece: Piece) => ({
    league: isFirstPlayer(board.currentPlayer.league)
        ? 'second'
        : ('first' as League),
    tileList: board.tileList.map((tile) =>
        tile.index === piece.index ? createTile(piece.index, piece) : tile
    ) as ReadonlyArray<Tile>,
});

export { createTicTacToeMove, createConnectFourMove };
export type { Move };
