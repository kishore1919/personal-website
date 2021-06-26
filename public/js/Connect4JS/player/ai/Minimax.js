// const logicalProcessorCount = navigator.hardwareConcurrency;
import League from '../../piece/League.js';
import Standard from './Evaluator.js';

const searchDepth = 4;
const positionEval = Object.freeze([
    3, 4, 5, 7, 5, 4, 3,
    4, 6, 8, 10, 8, 6, 4,
    5, 8, 11, 13, 11, 8, 5,
    5, 8, 11, 13, 11, 8, 5,
    4, 6, 8, 10, 8, 6, 4,
    3, 4, 5, 7, 5, 4, 3
]);

class Minimax {
    static evulator = new Standard();
    league
    constructor(league) {
        this.league = league;
    }

    static generateSortedMoves(legalMoves) {
        const sortedMove = [];
        const moveScore = [];
        for (let i = 0; i < legalMoves.length; i++) {
            const legalMove = legalMoves[i];
            moveScore.push({
                key:legalMove,
                value:positionEval[legalMove.getIndex()]
            });
        }
        //descending sort
        moveScore.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            } else if (a.value === b.value) {
                return 0;
            }
            return 1;
        })

        for (let i = 0; i < moveScore.length; i++) {
            sortedMove.push(moveScore[i].key);
        }

        return Object.freeze(sortedMove);
    }

    makeMove(board) {
        const currentPlayer = board.getCurrentPlayer();
        let highestSeenValue = Number.NEGATIVE_INFINITY, lowestSeenValue = Number.POSITIVE_INFINITY;

        const sortedMove = Minimax.generateSortedMoves(currentPlayer.getLegalMoves());
        let bestMove = sortedMove[0];

        for (let i = 0; i < sortedMove.length; i++) {
            const move = sortedMove[i];
            const latestBoard = currentPlayer.makeMove(move, board);
            if (latestBoard.getCurrentPlayer().isStalemate(board) || latestBoard.getCurrentPlayer().isInCheckmate(board)) { return move; }
            const currentVal = League.isBlack(currentPlayer.getLeague()) ?
                this.min(latestBoard, searchDepth - 1, highestSeenValue, lowestSeenValue) :
                this.max(latestBoard, searchDepth - 1, highestSeenValue, lowestSeenValue);
            if (!League.isBlack(currentPlayer.getLeague()) && currentVal > highestSeenValue) {
                highestSeenValue = currentVal;
                bestMove = move;
            } else if (League.isBlack(currentPlayer.getLeague()) && currentVal < lowestSeenValue) {
                lowestSeenValue = currentVal;
                bestMove = move;
            }
        }

        return bestMove;
    }

    min(board, depth, highestValue, lowestValue) {
        if (depth === 0 || board.getCurrentPlayer().isInCheckmate(board) || board.getCurrentPlayer().isStalemate(board)) {
            return Minimax.evulator.evaluateBoard(board, this.league, depth, searchDepth);
        }
        let currentLowest = lowestValue;
        const sortedMove = Minimax.generateSortedMoves(board.getCurrentPlayer().getLegalMoves());
        for (let i = 0; i < sortedMove.length; i++) {
            const move = sortedMove[i];
            const latestBoard = board.getCurrentPlayer().makeMove(move, board);
            currentLowest = Math.min(currentLowest, this.max(latestBoard, depth - 1, highestValue, currentLowest));
            if (currentLowest <= highestValue) {
                return highestValue;
            }
        }
        return currentLowest;
    }

    max(board, depth, highestValue, lowestValue) {
        if (depth === 0 || board.getCurrentPlayer().isInCheckmate(board) || board.getCurrentPlayer().isStalemate(board)) {
            return Minimax.evulator.evaluateBoard(board, this.league, depth, searchDepth);
        }
        let currentHighest = highestValue;
        const sortedMove = Minimax.generateSortedMoves(board.getCurrentPlayer().getLegalMoves());
        for (let i = 0; i < sortedMove.length; i++) {
            const move = sortedMove[i];
            const latestBoard = board.getCurrentPlayer().makeMove(move, board);
            currentHighest = Math.max(currentHighest, this.min(latestBoard, depth - 1, currentHighest, lowestValue));
            if (currentHighest >= lowestValue) {
                return lowestValue;
            }
        }
        return currentHighest;
    }
}

export default Minimax;