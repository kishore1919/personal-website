import { League, isFirstPlayer } from '../../piece/League';
import { connectFour } from '../../board/BoardUtil';
import { Board } from '../../board/Board';
import { DeepReadonly } from '../../../../common/type';

type Rows = DeepReadonly<(League | undefined)[][]>;

const evaluateConnectFourBoard = (
    board: Board,
    league: League,
    depth: number,
    searchDepth: number
): number =>
    depth
        ? numberOfConsecutivePieceEval(
              league,
              board,
              board.secondPlayer.league,
              board.firstPlayer.league
          ) *
          (searchDepth - depth)
        : numberOfConsecutivePieceEval(
              league,
              board,
              board.secondPlayer.league,
              board.firstPlayer.league
          );

const numberOfConsecutivePieceEval = (
    league: League,
    board: Board,
    currentLeague: League,
    enemyLeague: League
): number => {
    let score = 0;

    const vertical = getAllVerticalColumn(board);
    for (let k = 0; k < vertical.length; k++) {
        const eLeagues = vertical[k];
        if (!eLeagues) {
            throw new Error(`ELeagues: ${eLeagues} is undefined`);
        }
        const maxRun = 3;
        let currentTile = 0,
            emptyTile = 0,
            enemyTile = 0;
        let begin = 0,
            max = 3,
            index = 0;
        for (let j = begin; j <= max; j++) {
            const eLeague = eLeagues[j];
            if (eLeague === currentLeague) {
                currentTile++;
            } else if (eLeague === enemyLeague) {
                enemyTile++;
            } else if (eLeague === undefined) {
                emptyTile++;
            }

            if (j === max) {
                j = begin;
                index++;
                score += computeScore(
                    league,
                    currentTile,
                    enemyTile,
                    emptyTile
                );
                if (index === maxRun) {
                    break;
                }
                begin++;
                max++;
                currentTile = 0;
                emptyTile = 0;
                enemyTile = 0;
            }
        }
    }

    const horizontal = getAllHorizontalRow(board);
    for (let k = 0; k < horizontal.length; k++) {
        const eLeagues = horizontal[k];
        if (!eLeagues) {
            throw new Error(`ELeagues: ${eLeagues} is undefined`);
        }
        const maxRun = 4;
        let begin = 0,
            max = 3,
            currentTile = 0,
            emptyTile = 0,
            enemyTile = 0,
            index = 0;
        for (let j = begin; j <= max; j++) {
            const eLeague = eLeagues[j];
            if (eLeague === currentLeague) {
                currentTile++;
            } else if (eLeague === enemyLeague) {
                enemyTile++;
            } else if (eLeague === undefined) {
                emptyTile++;
            }

            if (j === max) {
                j = begin;
                index++;
                score += computeScore(
                    league,
                    currentTile,
                    enemyTile,
                    emptyTile
                );
                if (index === maxRun) {
                    break;
                }
                begin++;
                max++;
                currentTile = 0;
                emptyTile = 0;
                enemyTile = 0;
            }
        }
    }

    const positiveSlope = getPositiveSlopeRow(board);
    for (let k = 0; k < positiveSlope.length; k++) {
        const eLeagues = positiveSlope[k];
        if (!eLeagues) {
            throw new Error(`ELeagues: ${eLeagues} is undefined`);
        }
        let begin = 0,
            max = 3,
            currentTile = 0,
            emptyTile = 0,
            enemyTile = 0,
            index = 0;
        const maxRun = eLeagues.length - connectFour.numberOfTilesToWin;
        for (let j = begin; j <= max; j++) {
            const eLeague = eLeagues[j];
            if (eLeague === currentLeague) {
                currentTile++;
            } else if (eLeague === enemyLeague) {
                enemyTile++;
            } else if (eLeague === undefined) {
                emptyTile++;
            }

            if (j === max) {
                score += computeScore(
                    league,
                    currentTile,
                    enemyTile,
                    emptyTile
                );
                if (index === maxRun) {
                    break;
                }
                index++;
                j = begin;
                begin++;
                max++;
                currentTile = 0;
                emptyTile = 0;
                enemyTile = 0;
            }
        }
    }

    const negativeSlope = getNegativeSlopeRow(board);
    for (let k = 0; k < negativeSlope.length; k++) {
        const eLeagues = negativeSlope[k];
        if (!eLeagues) {
            throw new Error(`ELeagues: ${eLeagues} is undefined`);
        }
        let begin = 0,
            max = 3,
            currentTile = 0,
            emptyTile = 0,
            enemyTile = 0,
            index = 0;
        const maxRun = eLeagues.length - connectFour.numberOfTilesToWin;
        for (let j = begin; j <= max; j++) {
            const eLeague = eLeagues[j];
            if (eLeague === currentLeague) {
                currentTile++;
            } else if (eLeague === enemyLeague) {
                enemyTile++;
            } else if (eLeague === undefined) {
                emptyTile++;
            }

            if (j === max) {
                score += computeScore(
                    league,
                    currentTile,
                    enemyTile,
                    emptyTile
                );
                if (index === maxRun) {
                    break;
                }
                index++;
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

const computeScore = (
    league: League,
    currentTile: number,
    enemyTile: number,
    emptyTile: number
): number => {
    const magnifier = isFirstPlayer(league) ? 100 : 1;

    if (currentTile === 1 && emptyTile === 3) {
        return 1 * magnifier;
    }
    if (currentTile === 2 && emptyTile === 2) {
        return 100 * magnifier;
    }
    if (currentTile === 3 && emptyTile === 1) {
        return 10000 * magnifier;
    }
    if (currentTile === 4 && emptyTile === 0) {
        return 20000 * magnifier;
    }

    if (enemyTile === 4 && emptyTile === 0) {
        return -2000000;
    }
    if (enemyTile === 3 && emptyTile === 1) {
        return -1000000;
    }
    if (enemyTile === 2 && emptyTile === 2) {
        return -10000;
    }
    if (enemyTile === 1 && emptyTile === 3) {
        return -100;
    }

    if (enemyTile > currentTile) {
        return -100;
    }
    if (currentTile > enemyTile) {
        return 100;
    }

    return 0;
};

const getAllHorizontalRow = (board: Board): Rows => {
    const listOfLeagues: Array<ReadonlyArray<League | undefined>> = [];
    let begin = 0;
    let leagues: Array<League | undefined> = [];
    for (let index = begin; index < connectFour.numberOfTiles; index++) {
        const tile = board.tileList[index];
        if (!tile) {
            throw new Error(`Tile: ${tile} is undefined`);
        }
        leagues.push(
            tile.isTileOccupied && tile.getPiece
                ? tile.getPiece.league
                : undefined
        );
        if (index - begin === connectFour.row) {
            begin += connectFour.column;
            listOfLeagues.push(leagues as ReadonlyArray<League | undefined>);
            leagues = [];
        }
    }

    return listOfLeagues;
};

const getAllVerticalColumn = (board: Board): Rows => {
    const listOfLeagues: Array<ReadonlyArray<League | undefined>> = [];
    let begin = 0,
        max = connectFour.column * 5;
    let leagues: Array<League | undefined> = [];
    for (let index = begin; index <= max; index += connectFour.column) {
        const tile = board.tileList[index];
        if (!tile) {
            throw new Error(`Tile: ${tile} is undefined`);
        }
        leagues.push(
            tile.isTileOccupied && tile.getPiece
                ? tile.getPiece.league
                : undefined
        );
        if (index === max) {
            listOfLeagues.push(leagues as ReadonlyArray<League | undefined>);
            leagues = [];
            if (max < connectFour.numberOfTiles - 1) {
                begin++;
                index = begin - connectFour.column;
                max++;
            }
        }
    }

    return listOfLeagues;
};

const getPositiveSlopeRow = (board: Board): Rows => {
    const listOfLeagues: Array<ReadonlyArray<League | undefined>> = [];
    const increment = connectFour.column - 1;
    let begin = (connectFour.column - 1) / 2,
        max = 21,
        goEdge = false,
        leagues: Array<League | undefined> = [];
    for (let index = begin; index <= max; index += increment) {
        const tile = board.tileList[index];
        if (!tile) {
            throw new Error(`Tile: ${tile} is undefined`);
        }
        leagues.push(
            tile.isTileOccupied && tile.getPiece
                ? tile.getPiece.league
                : undefined
        );
        if (index === max) {
            listOfLeagues.push(leagues as ReadonlyArray<League | undefined>);
            leagues = [];
            if (begin === 20) {
                break;
            }
            if (begin === increment && !goEdge) {
                goEdge = true;
            }
            begin = goEdge ? begin + connectFour.column : begin + 1;
            max =
                max + connectFour.column >= connectFour.numberOfTiles
                    ? max + 1
                    : max + connectFour.column;
            index = begin - increment;
        }
    }
    return listOfLeagues;
};

const getNegativeSlopeRow = (board: Board): Rows => {
    const listOfLeagues: Array<ReadonlyArray<League | undefined>> = [];
    const increment = connectFour.column + 1;
    let begin = (connectFour.column - 1) / 2,
        max = 27,
        goEdge = false,
        leagues: Array<League | undefined> = [];
    for (let index = begin; index <= max; index += increment) {
        const tile = board.tileList[index];
        if (!tile) {
            throw new Error(`Tile: ${tile} is undefined`);
        }
        leagues.push(
            tile.isTileOccupied && tile.getPiece
                ? tile.getPiece.league
                : undefined
        );
        if (index === max) {
            listOfLeagues.push(leagues as ReadonlyArray<League | undefined>);
            leagues = [];

            if (begin === 14) {
                break;
            }
            if (begin === 0 && !goEdge) {
                goEdge = true;
            }
            begin = goEdge ? begin + connectFour.column : begin - 1;
            max =
                max + connectFour.column >= connectFour.numberOfTiles
                    ? max - 1
                    : max + connectFour.column;
            index = begin - increment;
        }
    }
    return listOfLeagues;
};

export default evaluateConnectFourBoard;
