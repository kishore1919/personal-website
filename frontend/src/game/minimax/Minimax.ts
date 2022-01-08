import { Board } from '../board/Board';
import { instanceOfTicTacToe } from '../board/BoardUtil';
import { checkmate, stalemate } from '../endgame/EndgameChecker';
import { Move } from '../move/Move';
import League, { isFirstPlayer } from '../piece/League';
import { evaluateConnectFourBoard } from './connectFourEval/ConnectFourEvaluator';

type Minimax<Board> = {
    readonly min: (
        board: Board,
        depth: number,
        highestValue: number,
        lowestValue: number
    ) => number;
    readonly max: (
        board: Board,
        depth: number,
        highestValue: number,
        lowestValue: number
    ) => number;
    readonly execute: () => Board;
    readonly depth: number;
};

export type ConnectFourMinimax = {
    readonly positionEval: ReadonlyArray<number>;
    readonly league: League;
} & Minimax<Board>;

const createTicTacToeMinimax = (board: Board): Minimax<Board> => {
    return {
        depth: 4,
        min(
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ): number {
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
        },
        max(
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ): number {
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
        },
        execute(): Board {
            const currentPlayer = board.currentPlayer;
            let highestSeenValue = Number.NEGATIVE_INFINITY,
                lowestSeenValue = Number.POSITIVE_INFINITY;

            let bestMove: Move | null = null;

            for (const move of currentPlayer.legalMoves) {
                const latestBoard = currentPlayer.makeMove(move, board);
                if (checkmate(latestBoard)) {
                    return latestBoard;
                }
                const currentVal = isFirstPlayer(currentPlayer.league)
                    ? this.min(
                          latestBoard,
                          this.depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      )
                    : this.max(
                          latestBoard,
                          this.depth - 1,
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
        },
    };
};

const createConnectFourMinimax = (board: Board): ConnectFourMinimax => {
    return {
        execute(): Board {
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
                          this.depth - 1,
                          highestSeenValue,
                          lowestSeenValue
                      )
                    : this.max(
                          latestBoard,
                          this.depth - 1,
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
            throw new Error(`Best move : ${bestMove} is undefined`);
        },
        max(
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ): number {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(
                    board,
                    this.league,
                    depth,
                    this.depth
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
        },
        min(
            board: Board,
            depth: number,
            highestValue: number,
            lowestValue: number
        ): number {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(
                    board,
                    this.league,
                    depth,
                    this.depth
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
        },
        positionEval: [
            3, 4, 5, 7, 5, 4, 3, 4, 6, 8, 10, 8, 6, 4, 5, 8, 11, 13, 11, 8, 5,
            5, 8, 11, 13, 11, 8, 5, 4, 6, 8, 10, 8, 6, 4, 3, 4, 5, 7, 5, 4, 3,
        ],
        depth: 4,
        league: board.currentPlayer.league,
    };
};

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

export const minimaxMakeMove = (board: Board): Board => {
    return instanceOfTicTacToe(board)
        ? createTicTacToeMinimax(board).execute()
        : createConnectFourMinimax(board).execute();
};
