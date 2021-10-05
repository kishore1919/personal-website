import {
    createConnectFourMove,
    createTicTacToeMove,
    MoveType,
} from '../move/Move';
import League, { isFirstPlayer } from '../piece/League';
import Tile from '../board/Tile';
import { BoardType } from '../board/Board';
import { connectFour } from '../board/BoardUtil';

interface Player<Board extends BoardType, Move extends MoveType> {
    readonly legalMoves: ReadonlyArray<Move>;
    readonly league: League;
    readonly opponentLeague: League;
    readonly makeMove: (movePassed: Move, board: Board) => Board;
    readonly makeMoveFromTileNumber: (
        tileNumber: number,
        board: Board
    ) => Board;
}

export type PlayerType = Player<BoardType, MoveType>;

const createConnectFourMoves = (
    column: number,
    numberOfTiles: number,
    league: League,
    tileList: ReadonlyArray<Tile>
): ReadonlyArray<MoveType> => {
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
): ReadonlyArray<MoveType> => {
    return tileList
        .filter((tile) => !tile.isTileOccupied)
        .map((tile) => createTicTacToeMove(league, tile.index));
};

const createTicTacToePlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): PlayerType => {
    return {
        legalMoves: createTicTactToeLegalMoves(league, tileList),
        league,
        opponentLeague: isFirstPlayer(league) ? League.second : League.first,
        makeMove(movePassed: MoveType, board: BoardType): BoardType {
            return makeMove(this.legalMoves, movePassed, board);
        },
        makeMoveFromTileNumber(
            tileNumber: number,
            board: BoardType
        ): BoardType {
            const movePassed = this.legalMoves.find(
                (move: MoveType) => move.piece.index === tileNumber
            );
            return makeMoveFromTileNumber(movePassed, board);
        },
    };
};

const createConnectFourPlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): PlayerType => {
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
        makeMove(movePassed: MoveType, board: BoardType): BoardType {
            return makeMove(this.legalMoves, movePassed, board);
        },
        makeMoveFromTileNumber(
            tileNumber: number,
            board: BoardType
        ): BoardType {
            const col = tileNumber % column;
            const moveFound = this.legalMoves.find(
                (move: MoveType) => move.piece.index % column === col
            );
            return makeMoveFromTileNumber(moveFound, board);
        },
    };
};

const makeMove = (
    legalMoves: ReadonlyArray<MoveType>,
    movePassed: MoveType,
    board: BoardType
): BoardType => {
    const moveFound = legalMoves.find((move: MoveType) =>
        move.equals(movePassed)
    );
    return makeMoveFromTileNumber(moveFound, board);
};

const makeMoveFromTileNumber = (
    moveFound: MoveType | undefined,
    board: BoardType
): BoardType => {
    if (moveFound === undefined) {
        throw new Error(
            'move found in makeMoveFromTileNumber function cannot be undefined'
        );
    }
    return (moveFound as MoveType).execute(board);
};

export const createCrossPlayer = (tileList: ReadonlyArray<Tile>): PlayerType =>
    createTicTacToePlayer(League.first, tileList);
export const createNoughtPlayer = (tileList: ReadonlyArray<Tile>): PlayerType =>
    createTicTacToePlayer(League.second, tileList);

export const createBlackPlayer = (tileList: ReadonlyArray<Tile>): PlayerType =>
    createConnectFourPlayer(League.first, tileList);
export const createRedPlayer = (tileList: ReadonlyArray<Tile>): PlayerType =>
    createConnectFourPlayer(League.second, tileList);
