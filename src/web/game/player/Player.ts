import { createConnectFourMove, createTicTacToeMove, Move } from '../move/Move';
import { League, isFirstPlayer } from '../piece/League';
import { Tile } from '../board/Tile';
import { Board } from '../board/Board';
import { connectFour } from '../board/BoardUtil';
import { DeepReadonly } from '../../../common/type';

type Player = DeepReadonly<{
    legalMoves: Move[];
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
    tileList.flatMap(({ isTileOccupied, index }) =>
        isTileOccupied ? [] : [createTicTacToeMove(league, index)]
    );

const createTicTacToePlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Player => {
    const legalMoves = createTicTactToeLegalMoves(league, tileList);
    return {
        legalMoves,
        league,
        opponentLeague: isFirstPlayer(league) ? 'second' : 'first',
        makeMove: (movePassed: Move, board: Board): Board =>
            makeMove(legalMoves, movePassed, board),
        makeMoveFromTileNumber: (tileNumber: number, board: Board): Board =>
            makeMoveFromTileNumber(
                legalMoves.find(({ piece: { index } }) => index === tileNumber),
                board
            ),
    };
};

const createConnectFourPlayer = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Player => {
    const { column, numberOfTiles } = connectFour;
    const legalMoves = createConnectFourMoves(
        column,
        numberOfTiles,
        league,
        tileList
    );
    return {
        legalMoves,
        league,
        opponentLeague: isFirstPlayer(league) ? 'second' : 'first',
        makeMove: (movePassed: Move, board: Board): Board =>
            makeMove(legalMoves, movePassed, board),
        makeMoveFromTileNumber: (tileNumber: number, board: Board): Board => {
            const col = tileNumber % column;
            return makeMoveFromTileNumber(
                legalMoves.find(
                    ({ piece: { index } }) => index % column === col
                ),
                board
            );
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

const createCrossPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer('first', tileList);
const createNoughtPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createTicTacToePlayer('second', tileList);

const createBlackPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer('first', tileList);
const createRedPlayer = (tileList: ReadonlyArray<Tile>): Player =>
    createConnectFourPlayer('second', tileList);

export type { Player };
export {
    createRedPlayer,
    createBlackPlayer,
    createCrossPlayer,
    createNoughtPlayer,
};
