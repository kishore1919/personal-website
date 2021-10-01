import { BoardType } from './Board';

export default interface BoardUtil {
    readonly row: 3 | 6
    readonly column: 3 | 7
    readonly numberOfTiles: 9 | 42
    readonly numberOfTilesToWin: 3 | 4
}

export const ticTacToe: BoardUtil = {
    row: 3,
    numberOfTiles: 9,
    column: 3,
    numberOfTilesToWin: 3
};

export const connectFour: BoardUtil = {
    row: 6,
    numberOfTiles: 42,
    column: 7,
    numberOfTilesToWin: 4
};

export const instanceOfTicTacToe = (board: BoardType): boolean => board.identifier % 2 === 0;