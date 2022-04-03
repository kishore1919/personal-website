import { Board } from '../board/Board';
import {
    connectFour,
    instanceOfTicTacToe,
    ticTacToe,
} from '../board/BoardUtil';

type EndgameChecker<Board> = Readonly<{
    horizontalWin: (board: Board) => boolean;
    verticalWin: (board: Board) => boolean;
    diagonalWin: (board: Board, isPositiveSlope: boolean) => boolean;
    checkMate: (board: Board) => boolean;
    staleMate: (board: Board) => boolean;
}>;

const ticTacToeWinner: EndgameChecker<Board> = (() => {
    const horizontalWin = (board: Board): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        for (let i = 0; i < numberOfTiles; i++) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            numberOfTilesOccupied = i % row === 0 ? 0 : numberOfTilesOccupied;
            if (tile.isTileOccupied && tile.getPiece) {
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
    };
    const verticalWin = (board: Board): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        const limit = numberOfTiles - 1;
        let numberOfTilesOccupied = 0,
            begin = 0,
            max = row * (row - 1) + begin;
        for (let i = begin; i <= max; i += row) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            if (tile.isTileOccupied && tile.getPiece) {
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
    };
    const diagonalWin = (board: Board, isPositiveSlope: boolean): boolean => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        const begin = isPositiveSlope ? row - 1 : 0;
        const max = isPositiveSlope ? numberOfTiles - 1 : numberOfTiles;
        const increment = isPositiveSlope ? row - 1 : row + 1;
        for (let i = begin; i < max; i += increment) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            if (!tile.isTileOccupied) {
                return false;
            }
            if (!tile.getPiece) {
                throw new Error(
                    'if tile is occupied, then it contains a piece'
                );
            }
            numberOfTilesOccupied =
                tile?.getPiece.league === board.currentPlayer.opponentLeague
                    ? numberOfTilesOccupied + 1
                    : 0;
        }
        return numberOfTilesOccupied === numberOfTilesToWin;
    };
    return {
        diagonalWin,
        verticalWin,
        horizontalWin,
        checkMate: (board: Board) =>
            verticalWin(board) ||
            horizontalWin(board) ||
            diagonalWin(board, true) ||
            diagonalWin(board, false),
        staleMate: (board: Board): boolean =>
            board.tileList.every((tile) => tile.isTileOccupied),
    };
})();

const connectFourWinner: EndgameChecker<Board> = (() => {
    const horizontalWin = (board: Board): boolean => {
        const { row, column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0;
        for (let i = begin; i < numberOfTiles; i++) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            if (tile.isTileOccupied && tile.getPiece) {
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
    };
    const verticalWin = (board: Board): boolean => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0,
            max = column * 5;
        for (let i = begin; i <= max; i += column) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            if (tile.isTileOccupied && tile.getPiece) {
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
    };
    const diagonalWin = (board: Board, isPositiveSlope: boolean): boolean => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        const vector = isPositiveSlope ? -1 : 1;
        const negativeVector = vector * -1;
        const increment = column + vector;
        let begin = (column - 1) / 2;
        let max = isPositiveSlope ? 21 : 27,
            numTileOccupied = 0;
        let goEdge = false;
        for (let i = begin; i <= max; i += increment) {
            const tile = board.tileList[i];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            if (tile.isTileOccupied && tile.getPiece) {
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
                const compare = isPositiveSlope ? 20 : 14;
                if (begin === compare) {
                    break;
                }
                const compareNum = isPositiveSlope ? increment : 0;
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
    };
    return {
        diagonalWin,
        verticalWin,
        horizontalWin,
        checkMate: (board: Board) =>
            verticalWin(board) ||
            horizontalWin(board) ||
            diagonalWin(board, true) ||
            diagonalWin(board, false),
        staleMate: ({ tileList }: Board): boolean =>
            tileList.every(({ isTileOccupied }) => isTileOccupied),
    };
})();

const checkmate = (board: Board) =>
    instanceOfTicTacToe(board)
        ? ticTacToeWinner.checkMate(board)
        : connectFourWinner.checkMate(board);

const stalemate = (board: Board) =>
    instanceOfTicTacToe(board)
        ? ticTacToeWinner.staleMate(board)
        : connectFourWinner.staleMate(board);

export { checkmate, stalemate };
