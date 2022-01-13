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

export type Board = Readonly<{
    league: League;
    firstPlayer: Player;
    secondPlayer: Player;
    currentPlayer: Player;
    tileList: ReadonlyArray<Tile>;
    stringFormat: () => string;
    identifier: 0 | 1;
}>;

export const createStandardTicTacToeBoard = (): Board =>
    createTicTacToeBoard(
        League.first,
        Array.from({
            length: ticTacToe.numberOfTiles,
        }).map((_, i) => createTile(i, null)) as ReadonlyArray<Tile>
    );

export const createStandardConnectFourBoard = (): Board =>
    createConnectFourBoard(
        League.first,
        Array.from({
            length: connectFour.numberOfTiles,
        }).map((_, i) => createTile(i, null)) as ReadonlyArray<Tile>
    );
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
): Board => ({
    league,
    firstPlayer,
    secondPlayer,
    tileList,
    currentPlayer: league === firstPlayer.league ? firstPlayer : secondPlayer,
    stringFormat: () =>
        tileList
            .map((tile: Tile, i: number) => {
                const newLine = i % column === 0 ? '\n' : '';
                return `${newLine}${tile.stringFormat}(${String(
                    tile.index
                )}) \t`;
            })
            .join(''),
    identifier,
});
