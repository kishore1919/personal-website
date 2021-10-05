import Piece, { createPiece } from '../piece/Piece';
import League, { isFirstPlayer } from '../piece/League';
import {
    BoardType,
    createConnectFourBoard,
    createTicTacToeBoard,
} from '../board/Board';
import Tile, { createTile } from '../board/Tile';

interface Move<Board extends BoardType> {
    readonly piece: Piece;
    readonly equals: (move: Move<Board>) => boolean;
    readonly execute: (board: Board) => Board;
}

export type MoveType = Move<BoardType>;

export const createTicTacToeMove = (
    league: League,
    index: number
): MoveType => {
    return {
        piece: createPiece(league, index),
        equals(move: MoveType): boolean {
            return (
                move.piece.index === this.piece.index &&
                move.piece.league === this.piece.league
            );
        },
        execute(board: BoardType): BoardType {
            const { league, tileList } = execute(board, this.piece);
            return createTicTacToeBoard(league, tileList);
        },
    };
};

export const createConnectFourMove = (
    league: League,
    index: number
): MoveType => {
    return {
        piece: createPiece(league, index),
        equals(move: MoveType): boolean {
            return (
                move.piece.index === this.piece.index &&
                move.piece.league === this.piece.league
            );
        },
        execute(board: BoardType): BoardType {
            const { league, tileList } = execute(board, this.piece);
            return createConnectFourBoard(league, tileList);
        },
    };
};

const execute = (board: BoardType, piece: Piece) => {
    const league = isFirstPlayer(board.currentPlayer.league)
        ? League.second
        : League.first;
    const index = piece.index;
    const tileList: ReadonlyArray<Tile> = board.tileList.map((tile) =>
        tile.index === index ? createTile(index, piece) : tile
    );
    return { league, tileList };
};
