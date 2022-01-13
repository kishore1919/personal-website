import Piece, { createPiece } from '../piece/Piece';
import League, { isFirstPlayer } from '../piece/League';
import {
    Board,
    createConnectFourBoard,
    createTicTacToeBoard,
} from '../board/Board';
import Tile, { createTile } from '../board/Tile';

export type Move = Readonly<{
    piece: Piece;
    equals: (move: Move) => boolean;
    execute: (board: Board) => Board;
}>;

export const createTicTacToeMove = (league: League, index: number): Move => ({
    piece: createPiece(league, index),
    equals(move: Move): boolean {
        return (
            move.piece.index === this.piece.index &&
            move.piece.league === this.piece.league
        );
    },
    execute(board: Board): Board {
        const { league, tileList } = execute(board, this.piece);
        return createTicTacToeBoard(league, tileList);
    },
});

export const createConnectFourMove = (league: League, index: number): Move => ({
    piece: createPiece(league, index),
    equals(move: Move): boolean {
        return (
            move.piece.index === this.piece.index &&
            move.piece.league === this.piece.league
        );
    },
    execute(board: Board): Board {
        const { league, tileList } = execute(board, this.piece);
        return createConnectFourBoard(league, tileList);
    },
});

const execute = (board: Board, piece: Piece) => ({
    league: isFirstPlayer(board.currentPlayer.league)
        ? League.second
        : League.first,
    tileList: board.tileList.map((tile) =>
        tile.index === piece.index ? createTile(piece.index, piece) : tile
    ) as ReadonlyArray<Tile>,
});
