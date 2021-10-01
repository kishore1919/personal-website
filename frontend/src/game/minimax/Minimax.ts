import { BoardType } from '../board/Board';
import { instanceOfTicTacToe } from '../board/BoardUtil';
import { checkmate, stalemate } from '../endgame/EndgameChecker';
import { MoveType } from '../move/Move';
import League, { isFirstPlayer } from '../piece/League';
import { evaluateConnectFourBoard } from './connectFourEval/ConnectFourEvaluator';

interface Minimax<Board extends BoardType> {
    readonly min: (board: Board, depth: number, highestValue: number, lowestValue: number) => number
    readonly max: (board: Board, depth: number, highestValue: number, lowestValue: number) => number
    readonly execute: () => Board
    readonly depth: number
}

export interface ConnectFourMinimax extends Minimax<BoardType>{
    readonly positionEval: ReadonlyArray<number>
    readonly league: League;
}

const createTicTacToeMinimax = (board: BoardType): Minimax<BoardType> => {
    return {
        depth: 4,
        min(board: BoardType, depth: number, highestValue: number, lowestValue: number): number {
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
                currentLowest = Math.min(currentLowest, this.max(latestBoard, depth - 1, highestValue, currentLowest));
                if (currentLowest <= highestValue) {
                    return highestValue;
                }
            }
            return currentLowest;
        }, max(board: BoardType, depth: number, highestValue: number, lowestValue: number): number {
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
                currentHighest = Math.max(currentHighest, this.min(latestBoard, depth - 1, currentHighest, lowestValue));
                if (currentHighest >= lowestValue) {
                    return lowestValue;
                }
            }
            return currentHighest;
        }, execute(): BoardType {
            const currentPlayer = board.currentPlayer;
            let highestSeenValue = Number.NEGATIVE_INFINITY, lowestSeenValue = Number.POSITIVE_INFINITY;

            let bestMove: MoveType | null = null;

            for (const move of currentPlayer.legalMoves) {
                const latestBoard = currentPlayer.makeMove(move, board);
                if (checkmate(latestBoard)) {
                    return latestBoard;
                }
                const currentVal = isFirstPlayer(currentPlayer.league) ?
                    this.min(latestBoard, this.depth - 1, highestSeenValue, lowestSeenValue) :
                    this.max(latestBoard, this.depth - 1, highestSeenValue, lowestSeenValue);
                
                if (isFirstPlayer(currentPlayer.league) && currentVal > highestSeenValue) {
                    highestSeenValue = currentVal;
                    bestMove = move;
                }
                else if (!isFirstPlayer(currentPlayer.league) && currentVal < lowestSeenValue) {
                    lowestSeenValue = currentVal;
                    bestMove = move;
                }
            }
            if (bestMove === null) {
                throw new Error('best move cannot be undefined');
            }
            return currentPlayer.makeMove(bestMove, board);
        }
    };
};

const createConnectFourMinimax = (board: BoardType): ConnectFourMinimax => {
    return {
        execute(): BoardType {
            const currentPlayer = board.currentPlayer
            let highestSeenValue = Number.NEGATIVE_INFINITY, lowestSeenValue = Number.POSITIVE_INFINITY;

            const sortedMove = generateSortedMoves(this.positionEval, currentPlayer.legalMoves);
            let bestMove = sortedMove[0];

            for (let i = 0; i < sortedMove.length; i++) {
                const move = sortedMove[i];
                const latestBoard = currentPlayer.makeMove(move, board);
                if (checkmate(latestBoard)) {
                    return latestBoard;
                }
                const currentVal = isFirstPlayer(currentPlayer.league) ?
                    this.min(latestBoard, this.depth - 1, highestSeenValue, lowestSeenValue) :
                    this.max(latestBoard, this.depth - 1, highestSeenValue, lowestSeenValue);
                if (!isFirstPlayer(currentPlayer.league) && currentVal > highestSeenValue) {
                    highestSeenValue = currentVal;
                    bestMove = move;
                } else if (isFirstPlayer(currentPlayer.league) && currentVal < lowestSeenValue) {
                    lowestSeenValue = currentVal;
                    bestMove = move;
                }
            }
            return currentPlayer.makeMove(bestMove, board);
        }, max(board: BoardType, depth: number, highestValue: number, lowestValue: number): number {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(board, this.league, depth, this.depth);
            }
            let currentHighest = highestValue;
            const sortedMove = generateSortedMoves(this.positionEval, board.currentPlayer.legalMoves);
            for (let i = 0; i < sortedMove.length; i++) {
                const move = sortedMove[i];
                const latestBoard = board.currentPlayer.makeMove(move, board);
                currentHighest = Math.max(currentHighest, this.min(latestBoard, depth - 1, currentHighest, lowestValue));
                if (currentHighest >= lowestValue) {
                    return lowestValue;
                }
            }
            return currentHighest;
        }, min(board: BoardType, depth: number, highestValue: number, lowestValue: number): number {
            if (depth === 0 || checkmate(board) || stalemate(board)) {
                return evaluateConnectFourBoard(board, this.league, depth, this.depth);
            }
            let currentLowest = lowestValue;
            const sortedMove = generateSortedMoves(this.positionEval, board.currentPlayer.legalMoves);
            for (let i = 0; i < sortedMove.length; i++) {
                const move = sortedMove[i];
                const latestBoard = board.currentPlayer.makeMove(move, board);
                currentLowest = Math.min(currentLowest, this.max(latestBoard, depth - 1, highestValue, currentLowest));
                if (currentLowest <= highestValue) {
                    return highestValue;
                }
            }
            return currentLowest;
        },
        positionEval: [
            3, 4, 5, 7, 5, 4, 3,
            4, 6, 8, 10, 8, 6, 4,
            5, 8, 11, 13, 11, 8, 5,
            5, 8, 11, 13, 11, 8, 5,
            4, 6, 8, 10, 8, 6, 4,
            3, 4, 5, 7, 5, 4, 3
        ],
        depth: 4,
        league: board.currentPlayer.league
    }
};

const generateSortedMoves = (positionEval: ReadonlyArray<number>, legalMoves: ReadonlyArray<MoveType>): ReadonlyArray<MoveType> => {
    const moveScore = legalMoves.map(move => {
        return {
            key: move,
            value: positionEval[move.piece.index]
        };
    });
    //descending sort
    moveScore.sort((a, b) => {
        if (a.value > b.value) {
            return -1;
        } else if (a.value === b.value) {
            return 0;
        } return 1;
    });
    return moveScore.map(score => score.key);
};

export const minimaxMakeMove = (board: BoardType): BoardType => {
    return instanceOfTicTacToe(board) ? createTicTacToeMinimax(board as BoardType).execute() : createConnectFourMinimax(board as BoardType).execute();
}