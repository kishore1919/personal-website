import {
    createBlackPlayer,
    createCrossPlayer,
    createNoughtPlayer,
    createRedPlayer,
    Player,
} from '../player/Player';
import League from '../piece/League';
import Tile, { createTile } from './Tile';
import { connectFour, ticTacToe } from './BoardUtil';

export type Board = {
    readonly league: League;
    readonly firstPlayer: Player;
    readonly secondPlayer: Player;
    readonly currentPlayer: Player;
    readonly tileList: ReadonlyArray<Tile>;
    readonly stringFormat: () => string;
    readonly identifier: 0 | 1;
};

export const createStandardTicTacToeBoard = (): Board => {
    const tileList: ReadonlyArray<Tile> = Array.from({
        length: ticTacToe.numberOfTiles,
    }).map((_, i) => createTile(i, null));
    return createTicTacToeBoard(League.first, tileList);
};

export const createStandardConnectFourBoard = (): Board => {
    const tileList: ReadonlyArray<Tile> = Array.from({
        length: connectFour.numberOfTiles,
    }).map((_, i) => createTile(i, null));
    return createConnectFourBoard(League.first, tileList);
};

export const createTicTacToeBoard = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Board => {
    const { column } = ticTacToe;
    const firstPlayer = createCrossPlayer(tileList);
    const secondPlayer = createNoughtPlayer(tileList);
    return createBoard(column, league, firstPlayer, secondPlayer, tileList, 0);
};

export const createConnectFourBoard = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Board => {
    const { column } = connectFour;
    const firstPlayer = createBlackPlayer(tileList);
    const secondPlayer = createRedPlayer(tileList);
    return createBoard(column, league, firstPlayer, secondPlayer, tileList, 1);
};

const createBoard = (
    column: number,
    league: League,
    firstPlayer: Player,
    secondPlayer: Player,
    tileList: ReadonlyArray<Tile>,
    identifier: 0 | 1
): Board => {
    return {
        league,
        firstPlayer,
        secondPlayer,
        tileList,
        currentPlayer:
            league === firstPlayer.league ? firstPlayer : secondPlayer,
        stringFormat(): string {
            const stringFormat = this.tileList.map((tile: Tile, i: number) => {
                const newLine = i % column === 0 ? '\n' : '';
                return `${newLine}${tile.stringFormat}(${String(
                    tile.index
                )}) \t`;
            });
            return stringFormat.join('');
        },
        identifier,
    };
};
