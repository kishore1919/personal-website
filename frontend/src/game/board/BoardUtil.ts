import { Board } from './Board';

export const ticTacToe = {
    row: 3,
    numberOfTiles: 9,
    column: 3,
    numberOfTilesToWin: 3,
} as const;

export const connectFour = {
    row: 6,
    numberOfTiles: 42,
    column: 7,
    numberOfTilesToWin: 4,
} as const;

export const instanceOfTicTacToe = (board: Board): boolean =>
    board.identifier % 2 === 0;
