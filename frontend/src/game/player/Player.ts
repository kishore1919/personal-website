import { createConnectFourMove, createTicTacToeMove, Move } from '../move/Move';
import League, { isFirstPlayer } from '../piece/League';
import Tile from '../board/Tile';
import { Board } from '../board/Board';
import { connectFour } from '../board/BoardUtil';

export type Player = Readonly<{
    legalMoves: ReadonlyArray<Move>;
    league: League;
    opponentLeague: League;
    makeMove: (movePassed: Move, board: Board) => Board;
    makeMoveFromTileNumber: (tileNumber: number, board: Board) => Board;
}>;

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
        if (!tile) {
            throw new Error(`Tile: ${tile} is undefined`);
        }
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
): ReadonlyArray<Move> =>
    tileList.flatMap((tile) =>
        tile.isTileOccupied ? [] : [createTicTacToeMove(league, tile.index)]
    );

const createTicTacToePlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Player => ({
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
});

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
): Board =>
    makeMoveFromTileNumber(
        legalMoves.find((move: Move) => move.equals(movePassed)),
        board
    );

const makeMoveFromTileNumber = (
    moveFound: Move | undefined,
    board: Board
): Board => {
    if (!moveFound) {
        throw new Error(
            'move found in makeMoveFromTileNumber function cannot be undefined'
        );
    }
    return moveFound.execute(board);
};

export const createCrossPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer(League.first, tileList);
export const createNoughtPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer(League.second, tileList);

export const createBlackPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer(League.first, tileList);
export const createRedPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer(League.second, tileList);
