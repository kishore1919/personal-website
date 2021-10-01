import {
    createBlackPlayer,
    createCrossPlayer,
    createNoughtPlayer,
    createRedPlayer,
    PlayerType,
} from '../player/Player';
import League from '../piece/League';
import Tile, { createTile } from './Tile';
import { connectFour, ticTacToe } from './BoardUtil';

interface Board<Player>{
    readonly league: League
    readonly firstPlayer: Player
    readonly secondPlayer: Player
    readonly currentPlayer: Player
    readonly tileList: ReadonlyArray<Tile>
    readonly stringFormat: () => string
    readonly identifier: 0 | 1
}

export type BoardType = Board<PlayerType>;

export const createStandardTicTacToeBoard = (): BoardType => {
    const tileList = [];
    for (let i = 0; i < ticTacToe.numberOfTiles; i++) {
        tileList.push(createTile(i, null));
    }
    return createTicTacToeBoard(League.first, tileList);
};

export const createStandardConnectFourBoard = (): BoardType => {
    const tileList = [];
    for (let i = 0; i < connectFour.numberOfTiles; i++) {
        tileList.push(createTile(i, null));
    }
    return createConnectFourBoard(League.first, tileList);
};

export const createTicTacToeBoard = (league: League, tileList: ReadonlyArray<Tile>): BoardType => {
    const { column } = ticTacToe;
    const firstPlayer = createCrossPlayer(tileList);
    const secondPlayer = createNoughtPlayer(tileList);
    return createBoard(column, league, firstPlayer, secondPlayer, tileList, 0);
};

export const createConnectFourBoard = (league: League, tileList: ReadonlyArray<Tile>): BoardType => {
    const { column } = connectFour;
    const firstPlayer = createBlackPlayer(tileList);
    const secondPlayer = createRedPlayer(tileList);
    return createBoard(column, league, firstPlayer, secondPlayer, tileList, 1);
};

const createBoard = (column: number,
                     league: League,
                     firstPlayer: PlayerType,
                     secondPlayer: PlayerType,
                     tileList: ReadonlyArray<Tile>,
                     identifier: 0 | 1): BoardType => {
    return {
        league,
        firstPlayer,
        secondPlayer,
        tileList,
        currentPlayer: league === firstPlayer.league ? firstPlayer : secondPlayer,
        stringFormat(): string {
            const stringFormat = this.tileList.map((tile: Tile, i: number) => {
                const newLine = i % column === 0 ? '\n' : '';
                return `${newLine}${tile.stringFormat}(${String(tile.index)}) \t`
            });
            return stringFormat.join('');
        },
        identifier
    }
};
