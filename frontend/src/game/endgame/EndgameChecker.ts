import { BoardType } from '../board/Board';
import {
    connectFour,
    instanceOfTicTacToe,
    ticTacToe,
} from '../board/BoardUtil';

interface EndgameChecker<Board extends BoardType> {
    readonly horizontalWin: (board: Board) => boolean;
    readonly verticalWin: (board: Board) => boolean;
    readonly diagonalWin: (board: Board, positiveSlope: boolean) => boolean;
    readonly checkMate: (board: Board) => boolean;
    readonly staleMate: (board: Board) => boolean;
}

const ticTacToeWinner: EndgameChecker<BoardType> = {
    horizontalWin: (board: BoardType): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        for (let i = 0; i < numberOfTiles; i++) {
            const tile = board.tileList[i];
            numberOfTilesOccupied = i % row === 0 ? 0 : numberOfTilesOccupied;
            if (tile.isTileOccupied && tile.getPiece !== null) {
                numberOfTilesOccupied =
                    tile.getPiece.league === board.currentPlayer.opponentLeague
                        ? numberOfTilesOccupied + 1
                        : 0;
                if (numberOfTilesOccupied === numberOfTilesToWin) {
                    return true;
                }
            }
        }

        return false;
    },
    verticalWin: (board: BoardType): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        const limit = numberOfTiles - 1;
        let numberOfTilesOccupied = 0,
            begin = 0,
            max = row * (row - 1) + begin;
        for (let i = begin; i <= max; i += row) {
            const tile = board.tileList[i];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                numberOfTilesOccupied =
                    tile.getPiece.league === board.currentPlayer.opponentLeague
                        ? numberOfTilesOccupied + 1
                        : 0;
                if (numberOfTilesOccupied === numberOfTilesToWin) {
                    return true;
                }
            }
            if (i === max && max < limit) {
                begin++;
                i = begin - row;
                max = row * (row - 1) + begin;
                numberOfTilesOccupied = 0;
            }
        }

        return false;
    },
    diagonalWin: (board: BoardType, positiveSlope: boolean): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        const begin = positiveSlope ? row - 1 : 0;
        const max = positiveSlope ? numberOfTiles - 1 : numberOfTiles;
        const increment = positiveSlope ? row - 1 : row + 1;
        for (let i = begin; i < max; i += increment) {
            const tile = board.tileList[i];
            if (!tile.isTileOccupied) {
                return false;
            }
            if (tile.getPiece === null) {
                throw new Error(
                    'if tile is occupied, then it contains a piece'
                );
            }
            numberOfTilesOccupied =
                tile.getPiece.league === board.currentPlayer.opponentLeague
                    ? numberOfTilesOccupied + 1
                    : 0;
        }
        return numberOfTilesOccupied === numberOfTilesToWin;
    },
    checkMate(board: BoardType): boolean {
        const verticalWin = this.verticalWin(board);
        const horizontalWin = this.horizontalWin(board);
        const positiveSlopeWin = this.diagonalWin(board, true);
        const negativeSlopeWin = this.diagonalWin(board, false);
        return (
            verticalWin || horizontalWin || positiveSlopeWin || negativeSlopeWin
        );
    },
    staleMate: (board: BoardType): boolean =>
        !board.tileList.some((tile) => !tile.isTileOccupied),
};

const connectFourWinner: EndgameChecker<BoardType> = {
    horizontalWin: (board: BoardType): boolean => {
        const { row, column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0;
        for (let i = begin; i < numberOfTiles; i++) {
            const tile = board.tileList[i];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                numTileOccupied =
                    tile.getPiece.league === board.currentPlayer.opponentLeague
                        ? numTileOccupied + 1
                        : 0;
                if (numTileOccupied === numberOfTilesToWin) {
                    return true;
                }
            } else {
                numTileOccupied = 0;
            }
            if (i - begin === row) {
                numTileOccupied = 0;
                begin += column;
            }
        }
        return false;
    },
    verticalWin: (board: BoardType): boolean => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0,
            max = column * 5;
        for (let i = begin; i <= max; i += column) {
            const tile = board.tileList[i];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                numTileOccupied =
                    tile.getPiece.league === board.currentPlayer.opponentLeague
                        ? numTileOccupied + 1
                        : 0;
                if (numTileOccupied === numberOfTilesToWin) {
                    return true;
                }
            } else {
                numTileOccupied = 0;
            }
            if (i === max && max < numberOfTiles - 1) {
                begin++;
                i = begin - column;
                max++;
                numTileOccupied = 0;
            }
        }
        return false;
    },
    diagonalWin: (board: BoardType, positiveSlope: boolean): boolean => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        const vector = positiveSlope ? -1 : 1;
        const negativeVector = vector * -1;
        const increment = column + vector;
        let begin = (column - 1) / 2;
        let max = positiveSlope ? 21 : 27,
            numTileOccupied = 0;
        let goEdge = false;
        for (let i = begin; i <= max; i += increment) {
            const tile = board.tileList[i];
            if (tile.isTileOccupied && tile.getPiece !== null) {
                numTileOccupied =
                    tile.getPiece.league === board.currentPlayer.opponentLeague
                        ? numTileOccupied + 1
                        : 0;
                if (numTileOccupied === numberOfTilesToWin) {
                    return true;
                }
            } else {
                numTileOccupied = 0;
            }
            if (i === max) {
                const compare = positiveSlope ? 20 : 14;
                if (begin === compare) {
                    break;
                }
                const compareNum = positiveSlope ? increment : 0;
                if (begin === compareNum && !goEdge) {
                    goEdge = true;
                }
                begin = goEdge ? begin + column : begin + negativeVector;
                max =
                    max + column >= numberOfTiles
                        ? max + negativeVector
                        : max + column;
                i = begin - increment;
                numTileOccupied = 0;
            }
        }
        return false;
    },
    checkMate(board: BoardType): boolean {
        const verticalWin = this.verticalWin(board);
        const horizontalWin = this.horizontalWin(board);
        const positiveSlopeWin = this.diagonalWin(board, true);
        const negativeSlopeWin = this.diagonalWin(board, false);
        return (
            verticalWin || horizontalWin || positiveSlopeWin || negativeSlopeWin
        );
    },
    staleMate: (board: BoardType): boolean =>
        !board.tileList.some((tile) => !tile.isTileOccupied),
};

export const checkmate = (board: BoardType) => {
    return instanceOfTicTacToe(board)
        ? ticTacToeWinner.checkMate(board as BoardType)
        : connectFourWinner.checkMate(board as BoardType);
};

export const stalemate = (board: BoardType) => {
    return instanceOfTicTacToe(board)
        ? ticTacToeWinner.staleMate(board as BoardType)
        : connectFourWinner.staleMate(board as BoardType);
};
