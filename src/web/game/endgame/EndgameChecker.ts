import type { Board } from '../board/Board';
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

const ticTacToeWinner: EndgameChecker<Board> = new (class {
    readonly staleMate = (board: Board) =>
        board.tileList.every((tile) => tile.isTileOccupied);

    readonly checkMate = (board: Board) =>
        this.verticalWin(board) ||
        this.horizontalWin(board) ||
        this.diagonalWin(board, true) ||
        this.diagonalWin(board, false);

    readonly horizontalWin = (board: Board) => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        for (let index = 0; index < numberOfTiles; index++) {
            const tile = board.tileList[index];
            if (!tile) {
                throw new Error(`Tile: ${tile} is undefined`);
            }
            numberOfTilesOccupied =
                index % row === 0 ? 0 : numberOfTilesOccupied;
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

    readonly verticalWin = (board: Board) => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        const limit = numberOfTiles - 1;
        let numberOfTilesOccupied = 0,
            begin = 0,
            max = row * (row - 1) + begin;
        for (let index = begin; index <= max; index += row) {
            const tile = board.tileList[index];
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
            if (index === max && max < limit) {
                begin++;
                index = begin - row;
                max = row * (row - 1) + begin;
                numberOfTilesOccupied = 0;
            }
        }

        return false;
    };

    readonly diagonalWin = (board: Board, isPositiveSlope: boolean) => {
        const { row, numberOfTiles, numberOfTilesToWin } = ticTacToe;
        let numberOfTilesOccupied = 0;
        const begin = isPositiveSlope ? row - 1 : 0;
        const max = isPositiveSlope ? numberOfTiles - 1 : numberOfTiles;
        const increment = isPositiveSlope ? row - 1 : row + 1;
        for (let index = begin; index < max; index += increment) {
            const tile = board.tileList[index];
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
})();

const connectFourWinner: EndgameChecker<Board> = new (class {
    readonly staleMate = ({ tileList }: Board) =>
        tileList.every(({ isTileOccupied }) => isTileOccupied);

    readonly checkMate = (board: Board) =>
        this.verticalWin(board) ||
        this.horizontalWin(board) ||
        this.diagonalWin(board, true) ||
        this.diagonalWin(board, false);

    readonly horizontalWin = (board: Board) => {
        const { row, column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0;
        for (let index = begin; index < numberOfTiles; index++) {
            const tile = board.tileList[index];
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
            if (index - begin === row) {
                numTileOccupied = 0;
                begin += column;
            }
        }
        return false;
    };

    readonly verticalWin = (board: Board) => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        let numTileOccupied = 0,
            begin = 0,
            max = column * 5;
        for (let index = begin; index <= max; index += column) {
            const tile = board.tileList[index];
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
            if (index === max && max < numberOfTiles - 1) {
                begin++;
                index = begin - column;
                max++;
                numTileOccupied = 0;
            }
        }
        return false;
    };

    readonly diagonalWin = (board: Board, isPositiveSlope: boolean) => {
        const { column, numberOfTiles, numberOfTilesToWin } = connectFour;
        const vector = isPositiveSlope ? -1 : 1;
        const negativeVector = vector * -1;
        const increment = column + vector;
        let begin = (column - 1) / 2;
        let max = isPositiveSlope ? 21 : 27,
            numTileOccupied = 0;
        let goEdge = false;
        for (let index = begin; index <= max; index += increment) {
            const tile = board.tileList[index];
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
            if (index === max) {
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
                index = begin - increment;
                numTileOccupied = 0;
            }
        }
        return false;
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
