import { createConnectFourMove, createTicTacToeMove, Move } from '../move/Move';
import League, { isFirstPlayer } from '../piece/League';
import Tile from '../board/Tile';
import { Board } from '../board/Board';
import { connectFour } from '../board/BoardUtil';

export type Player = {
    readonly legalMoves: ReadonlyArray<Move>;
    readonly league: League;
    readonly opponentLeague: League;
    readonly makeMove: (movePassed: Move, board: Board) => Board;
    readonly makeMoveFromTileNumber: (
        tileNumber: number,
        board: Board
    ) => Board;
};

const createConnectFourMoves = (
    column: number,
    numberOfTiles: number,
    league: League,
    tileList: ReadonlyArray<Tile>
): ReadonlyArray<Move> => {
    const emptyRows: Array<Tile> = [];
    let begin = column * 5,
        min = 0;
    for (let i = begin; i >= min; i -= column) {
        if (i === numberOfTiles) {
            break;
        }
        const tile = tileList[i];
        if (!tile.isTileOccupied) {
            emptyRows.push(tile);
            min++;
            begin++;
            i = begin + column;
        } else if (i === min) {
            min++;
            begin++;
            i = begin + column;
        }
    }
    return emptyRows.map((emptyRow) =>
        createConnectFourMove(league, emptyRow.index)
    );
};

const createTicTactToeLegalMoves = (
    league: League,
    tileList: ReadonlyArray<Tile>
): ReadonlyArray<Move> => {
    return tileList
        .filter((tile) => !tile.isTileOccupied)
        .map((tile) => createTicTacToeMove(league, tile.index));
};

const createTicTacToePlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Player => {
    return {
        legalMoves: createTicTactToeLegalMoves(league, tileList),
        league,
        opponentLeague: isFirstPlayer(league) ? League.second : League.first,
        makeMove(movePassed: Move, board: Board): Board {
            return makeMove(this.legalMoves, movePassed, board);
        },
        makeMoveFromTileNumber(tileNumber: number, board: Board): Board {
            const movePassed = this.legalMoves.find(
                (move: Move) => move.piece.index === tileNumber
            );
            return makeMoveFromTileNumber(movePassed, board);
        },
    };
};

const createConnectFourPlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Player => {
    const { column, numberOfTiles } = connectFour;
    return {
        legalMoves: createConnectFourMoves(
            column,
            numberOfTiles,
            league,
            tileList
        ),
        league,
        opponentLeague: isFirstPlayer(league) ? League.second : League.first,
        makeMove(movePassed: Move, board: Board): Board {
            return makeMove(this.legalMoves, movePassed, board);
        },
        makeMoveFromTileNumber(tileNumber: number, board: Board): Board {
            const col = tileNumber % column;
            const moveFound = this.legalMoves.find(
                (move: Move) => move.piece.index % column === col
            );
            return makeMoveFromTileNumber(moveFound, board);
        },
    };
};

const makeMove = (
    legalMoves: ReadonlyArray<Move>,
    movePassed: Move,
    board: Board
): Board => {
    const moveFound = legalMoves.find((move: Move) => move.equals(movePassed));
    return makeMoveFromTileNumber(moveFound, board);
};

const makeMoveFromTileNumber = (
    moveFound: Move | undefined,
    board: Board
): Board => {
    if (moveFound === undefined) {
        throw new Error(
            'move found in makeMoveFromTileNumber function cannot be undefined'
        );
    }
    return (moveFound as Move).execute(board);
};

export const createCrossPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer(League.first, tileList);
export const createNoughtPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer(League.second, tileList);

export const createBlackPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer(League.first, tileList);
export const createRedPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer(League.second, tileList);
