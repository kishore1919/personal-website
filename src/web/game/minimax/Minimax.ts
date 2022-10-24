import type { DeepReadonly } from '../../../common/type';
import type { Board } from '../board/Board';
import { instanceOfTicTacToe } from '../board/BoardUtil';
import { checkmate, stalemate } from '../endgame/EndgameChecker';
import type { Move } from '../move/Move';
import type { League } from '../piece/League';
import { isFirstPlayer } from '../piece/League';
import evaluateConnectFourBoard from './connectFourEval/ConnectFourEvaluator';

type Minimax = Readonly<{
    min: (
        board: Board,
        depth: number,
        highestValue: number,
        lowestValue: number
    ) => number;
    max: (
        board: Board,
        depth: number,
        highestValue: number,
        lowestValue: number
    ) => number;
    execute: () => Board;
    depth: number;
}>;

type ConnectFourMinimax = DeepReadonly<{
    positionEval: number[];
    league: League;
}> &
    Minimax;

const createTicTacToeMinimax = (board: Board): Minimax =>
    new (class {
        readonly depth = 4;

        readonly min = (
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ) => {
            if (checkmate(board)) {
                return 10 - depth;
            }
            if (stalemate(board)) {
                return -depth;
            }
            let currentLowest = lowestValue;
            const currentPlayer = board.currentPlayer;
            for (const move of currentPlayer.legalMoves) {
                const latestBoard = currentPlayer.makeMove(move, board);
                currentLowest = Math.min(
                    currentLowest,
                    this.max(
                        latestBoard,
                        depth - 1,
                        highestValue,
                        currentLowest
                    )
                );
                if (currentLowest <= highestValue) {
                    return highestValue;
                }
            }
            return currentLowest;
        };

        readonly max = (
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ) => {
            if (checkmate(board)) {
                return depth - 10;
            }
            if (stalemate(board)) {
                return depth;
            }
            let currentHighest = highestValue;
            const currentPlayer = board.currentPlayer;
            for (const move of currentPlayer.legalMoves) {
                const latestBoard = currentPlayer.makeMove(move, board);
                currentHighest = Math.max(
                    currentHighest,
                    this.min(
                        latestBoard,
                        depth - 1,
                        currentHighest,
                        lowestValue
                    )
                );
                if (currentHighest >= lowestValue) {
                    return lowestValue;
                }
            }
            return currentHighest;
        };

        readonly execute = (): Board => {
            const { depth } = this;
            const currentPlayer = board.currentPlayer;
            let highestSeenValue = Number.NEGATIVE_INFINITY,
                lowestSeenValue = Number.POSITIVE_INFINITY;

            let bestMove: Move | undefined = undefined;

            for (const move of currentPlayer.legalMoves) {
                const latestBoard = currentPlayer.makeMove(move, board);
                if (checkmate(latestBoard)) {
                    return latestBoard;
                }
                const currentVal = isFirstPlayer(currentPlayer.league)
                    ? this.min(
                          latestBoard,
                          depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      )
                    : this.max(
                          latestBoard,
                          depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      );

                if (
                    isFirstPlayer(currentPlayer.league) &&
                    currentVal > highestSeenValue
                ) {
                    highestSeenValue = currentVal;
                    bestMove = move;
                } else if (
                    !isFirstPlayer(currentPlayer.league) &&
                    currentVal < lowestSeenValue
                ) {
                    lowestSeenValue = currentVal;
                    bestMove = move;
                }
            }
            if (!bestMove) {
                throw new Error('best move cannot be undefined');
            }
            return currentPlayer.makeMove(bestMove, board);
        };
    })();

const createConnectFourMinimax = (board: Board): ConnectFourMinimax =>
    new (class {
        readonly depth = 4;
        readonly league = board.currentPlayer.league;
        readonly positionEval = [
            3, 4, 5, 7, 5, 4, 3, 4, 6, 8, 10, 8, 6, 4, 5, 8, 11, 13, 11, 8, 5,
            5, 8, 11, 13, 11, 8, 5, 4, 6, 8, 10, 8, 6, 4, 3, 4, 5, 7, 5, 4, 3,
        ] as const;

        readonly max = (
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ) => {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(
                    board,
                    this.league,
                    depth,
                    depth
                );
            }
            let currentHighest = highestValue;
            const sortedMove = generateSortedMoves(
                this.positionEval,
                board.currentPlayer.legalMoves
            );
            for (const move of sortedMove) {
                const latestBoard = board.currentPlayer.makeMove(move, board);
                currentHighest = Math.max(
                    currentHighest,
                    this.min(
                        latestBoard,
                        depth - 1,
                        currentHighest,
                        lowestValue
                    )
                );
                if (currentHighest >= lowestValue) {
                    return lowestValue;
                }
            }
            return currentHighest;
        };

        readonly min = (
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ) => {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(
                    board,
                    this.league,
                    depth,
                    depth
                );
            }
            let currentLowest = lowestValue;
            const sortedMove = generateSortedMoves(
                this.positionEval,
                board.currentPlayer.legalMoves
            );
            for (const move of sortedMove) {
                const latestBoard = board.currentPlayer.makeMove(move, board);
                currentLowest = Math.min(
                    currentLowest,
                    this.max(
                        latestBoard,
                        depth - 1,
                        highestValue,
                        currentLowest
                    )
                );
                if (currentLowest <= highestValue) {
                    return highestValue;
                }
            }
            return currentLowest;
        };

        readonly execute = (): Board => {
            const { depth } = this;
            const currentPlayer = board.currentPlayer;
            let highestSeenValue = Number.NEGATIVE_INFINITY,
                lowestSeenValue = Number.POSITIVE_INFINITY;

            const sortedMove = generateSortedMoves(
                this.positionEval,
                currentPlayer.legalMoves
            );
            let bestMove = sortedMove[0];

            for (const move of sortedMove) {
                const latestBoard = currentPlayer.makeMove(move, board);
                if (checkmate(latestBoard)) {
                    return latestBoard;
                }
                const currentVal = isFirstPlayer(currentPlayer.league)
                    ? this.min(
                          latestBoard,
                          depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      )
                    : this.max(
                          latestBoard,
                          depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      );
                if (
                    !isFirstPlayer(currentPlayer.league) &&
                    currentVal > highestSeenValue
                ) {
                    highestSeenValue = currentVal;
                    bestMove = move;
                } else if (
                    isFirstPlayer(currentPlayer.league) &&
                    currentVal < lowestSeenValue
                ) {
                    lowestSeenValue = currentVal;
                    bestMove = move;
                }
            }
            if (bestMove) {
                return currentPlayer.makeMove(bestMove, board);
            }
            throw new Error('Best move is undefined');
        };
    })();

const generateSortedMoves = (
    positionEval: ReadonlyArray<number>,
    legalMoves: ReadonlyArray<Move>
): ReadonlyArray<Move> =>
    legalMoves
        .map((move) => {
            const value = positionEval[move.piece.index];
            if (value === undefined) {
                throw new Error(`Value of ${value} is undefined`);
            }
            return {
                key: move,
                value,
            };
        })
        .sort((a, b) => b.value - a.value)
        .map((score) => score.key);

const minimaxMakeMove = (board: Board): Board =>
    instanceOfTicTacToe(board)
        ? createTicTacToeMinimax(board).execute()
        : createConnectFourMinimax(board).execute();

export { minimaxMakeMove };
export type { Minimax };
