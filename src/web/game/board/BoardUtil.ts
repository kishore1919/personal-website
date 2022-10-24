import type { Board } from './Board';

const ticTacToe = {
    row: 3,
    numberOfTiles: 9,
    column: 3,
    numberOfTilesToWin: 3,
} as const;

const connectFour = {
    row: 6,
    numberOfTiles: 42,
    column: 7,
    numberOfTilesToWin: 4,
} as const;

const instanceOfTicTacToe = ({ type }: Board): boolean => type === 'TicTacToe';

export { ticTacToe, connectFour, instanceOfTicTacToe };
