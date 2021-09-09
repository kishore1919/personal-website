import {Board} from '../../board/Board.js';
import League from '../../piece/League.js';

class Evaluator {
    evaluateBoard = (board, league, depth, searchDepth) => {
        throw new Error('To be implemented by subclass');
    };
}

class Standard extends Evaluator {
    evaluateBoard = (board, league, depth, searchDepth) => {
        if (depth === 0) {
            return Standard.numberOfConsecutivePieceEval(league, board, board.getRedPlayer().getLeague(), board.getBlackPlayer().getLeague());
        }
        return Standard.numberOfConsecutivePieceEval(league, board, board.getRedPlayer().getLeague(), board.getBlackPlayer().getLeague()) * (searchDepth - depth);
    };

    static numberOfConsecutivePieceEval = (league, board, currentLeague, enemyLeague) => {

        let score = 0;

        const vertical = Standard.getAllVerticalColumn(board);
        for (let k = 0; k < vertical.length; k++) {
            const eLeagues = vertical[k];
            let currentTile = 0, emptyTile = 0, enemyTile = 0;
            let begin = 0, max = 3;
            let maxRun = 3, i = 0;
            for (let j = begin; j <= max; j++) {
                if (eLeagues[j] === currentLeague) { currentTile++; }
                else if (eLeagues[j] === enemyLeague) { enemyTile++; }
                else if (eLeagues[j] === null) { emptyTile++; }

                if (j === max) {
                    j = begin;
                    i++;
                    score += Standard.computeScore(league, currentTile, enemyTile, emptyTile);
                    if (i === maxRun) { break; }
                    begin++;
                    max++;
                    currentTile = 0;
                    emptyTile = 0;
                    enemyTile = 0;
                }
            }
        }

        const horizontal = Standard.getAllHorizontalRow(board);
        for (let k = 0; k < horizontal.length; k++) {
            const eLeagues = horizontal[k];
            let begin = 0, max = 3;
            let currentTile = 0;
            let emptyTile = 0;
            let enemyTile = 0;
            let maxRun = 4, i = 0;
            for (let j = begin; j <= max; j++) {
                if (eLeagues[j] === currentLeague) { currentTile++; }
                else if (eLeagues[j] === enemyLeague) { enemyTile++; }
                else if (eLeagues[j] === null) { emptyTile++; }

                if (j === max)
                {
                    j = begin;
                    i++;
                    score += Standard.computeScore(league, currentTile, enemyTile, emptyTile);
                    if (i === maxRun) { break; }
                    begin++;
                    max++;
                    currentTile = 0;
                    emptyTile = 0;
                    enemyTile = 0;
                }
            }
        }

        const positiveSlope = Standard.getPositiveSlopeRow(board);
        for (let k = 0; k < positiveSlope.length; k++) {
            const eLeagues = positiveSlope[k];
            let begin = 0, max = 3;
            let currentTile = 0, emptyTile = 0, enemyTile = 0;
            let maxRun = eLeagues.length - Board.DEFAULT_WIN_NUM_TILES, i = 0;
            for (let j = begin; j <= max; j++) {
                if (eLeagues[j] === currentLeague) { currentTile++; }
                else if (eLeagues[j] === enemyLeague) { enemyTile++; }
                else if (eLeagues[j] === null) { emptyTile++; }

                if (j === max)
                {
                    score += Standard.computeScore(league, currentTile, enemyTile, emptyTile);
                    if (i === maxRun) { break; }
                    i++;
                    j = begin;
                    begin++;
                    max++;
                    currentTile = 0;
                    emptyTile = 0;
                    enemyTile = 0;
                }
            }
        }

        const negativeSlope = Standard.getNegativeSlopeRow(board);
        for (let k = 0; k < negativeSlope.length; k++) {
            const eLeagues = negativeSlope[k];
            let begin = 0, max = 3;
            let currentTile = 0, emptyTile = 0, enemyTile = 0;
            let maxRun = eLeagues.length - Board.DEFAULT_WIN_NUM_TILES, i = 0;
            for (let j = begin; j <= max; j++) {
                if (eLeagues[j] === currentLeague) { currentTile++; }
                else if (eLeagues[j] === enemyLeague) { enemyTile++; }
                else if (eLeagues[j] === null) { emptyTile++; }

                if (j === max)
                {
                    score += Standard.computeScore(league, currentTile, enemyTile, emptyTile);
                    if (i === maxRun) { break; }
                    i++;
                    j = begin;
                    begin++;
                    max++;
                    currentTile = 0;
                    emptyTile = 0;
                    enemyTile = 0;
                }
            }
        }

        return score;
    };

    static computeScore = (league, currentTile, enemyTile, emptyTile) => {
        const magnifier = League.isBlack(league) ? 100 : 1;

        if (currentTile === 1 && emptyTile === 3) { return 1 * magnifier; }
        if (currentTile === 2 && emptyTile === 2) { return 100 * magnifier; }
        if (currentTile === 3 && emptyTile === 1) { return 10000 * magnifier; }
        if (currentTile === 4 && emptyTile === 0) { return 20000 * magnifier; }

        if (enemyTile === 4 && emptyTile === 0) { return -2000000; }
        if (enemyTile === 3 && emptyTile === 1) { return -1000000; }
        if (enemyTile === 2 && emptyTile === 2) { return -10000; }
        if (enemyTile === 1 && emptyTile === 3) { return -100; }

        if (enemyTile > currentTile) { return -100; }
        if (currentTile > enemyTile) { return 100; }

        return 0;
    };

    static getAllHorizontalRow = (board) => {
        const listOfLeagues = [];
        let begin = 0;
        let leagues = [];
        for (let i = begin; i < Board.DEFAULT_NUM_TILES; i++) {
            const tile = board.getTileAt(i);
            leagues.push(tile.isTileOccupied() ? tile.getPiece().getLeague() : null);
            if (i - begin === Board.DEFAULT_ROW)
            {
                begin += Board.DEFAULT_COL;
                listOfLeagues.push(Object.freeze(leagues));
                leagues = [];
            }
        }

        return Object.freeze(listOfLeagues);
    };

    static getAllVerticalColumn = (board) => {
        const listOfLeagues = [];
        let begin = 0, max = Board.DEFAULT_COL * 5;
        let leagues = [];
        for (let i = begin; i <= max; i += Board.DEFAULT_COL) {
            const tile = board.getTileAt(i);
            leagues.push(tile.isTileOccupied() ? tile.getPiece().getLeague(): null);
            if (i === max)
            {
                listOfLeagues.push(Object.freeze(leagues));
                leagues = [];
                if (max < Board.DEFAULT_NUM_TILES - 1)
                {
                    begin++;
                    i = begin - Board.DEFAULT_COL;
                    max++;
                }
            }
        }

        return Object.freeze(listOfLeagues);
    };

    static getPositiveSlopeRow = (board) => {
        const listOfLeagues = [];
        let increment = Board.DEFAULT_COL - 1, begin = (Board.DEFAULT_COL - 1) / 2;
        let max = 21;
        let goEdge = false;
        let leagues = [];
        for (let i = begin; i <= max; i += increment) {
            const tile = board.getTileAt(i);
            leagues.push(tile.isTileOccupied() ? tile.getPiece().getLeague(): null);
            if (i === max) {
                listOfLeagues.push(Object.freeze(leagues));
                leagues = [];

                if (begin === 20) { break; }
                if (begin === increment && !goEdge) { goEdge = true; }

                begin = goEdge ? begin + Board.DEFAULT_COL : begin + 1;
                max = max + Board.DEFAULT_COL >= Board.DEFAULT_NUM_TILES ? max + 1 : max + Board.DEFAULT_COL;
                i = begin - increment;
            }
        }
        return Object.freeze(listOfLeagues);
    };

    static getNegativeSlopeRow = (board) => {
        const listOfLeagues = [];
        let increment = Board.DEFAULT_COL + 1, begin = (Board.DEFAULT_COL - 1) / 2;
        let max = 27;
        let goEdge = false;
        let leagues = [];
        for (let i = begin; i <= max; i += increment) {
            const tile = board.getTileAt(i);
            leagues.push(tile.isTileOccupied() ? tile.getPiece().getLeague(): null);
            if (i === max) {
                listOfLeagues.push(Object.freeze(leagues));
                leagues = [];
            
                if (begin === 14) { break; }
                if (begin === 0 && !goEdge) { goEdge = true; }
            
                begin = goEdge ? begin + Board.DEFAULT_COL : begin - 1;
                max = max + Board.DEFAULT_COL >= Board.DEFAULT_NUM_TILES ? max - 1 : max + Board.DEFAULT_COL;
                i = begin - increment;
            }
        }

        return Object.freeze(listOfLeagues);
    };
}

export default Standard;