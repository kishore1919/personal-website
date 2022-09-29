import {
    createBlackPlayer,
    createCrossPlayer,
    createNoughtPlayer,
    createRedPlayer,
    Player,
} from '../player/Player';
import { League } from '../piece/League';
import { Tile, createTile } from './Tile';
import { connectFour, ticTacToe } from './BoardUtil';
import { DeepReadonly } from '../../../common/type';

type Board = DeepReadonly<{
    league: League;
    firstPlayer: Player;
    secondPlayer: Player;
    currentPlayer: Player;
    tileList: Tile[];
    stringFormat: () => string;
    type: 'TicTacToe' | 'ConnectFour';
}>;

const createStandardTicTacToeBoard = (): Board =>
    createTicTacToeBoard(
        'first',
        Array.from(
            {
                length: ticTacToe.numberOfTiles,
            },
            (_, i) => createTile(i, undefined)
        ) as ReadonlyArray<Tile>
    );

const createStandardConnectFourBoard = (): Board =>
    createConnectFourBoard(
        'first',
        Array.from(
            {
                length: connectFour.numberOfTiles,
            },
            (_, i) => createTile(i, undefined)
        ) as ReadonlyArray<Tile>
    );
const createTicTacToeBoard = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Board => {
    const { column } = ticTacToe;
    const firstPlayer = createCrossPlayer(tileList);
    const secondPlayer = createNoughtPlayer(tileList);
    return createBoard(
        column,
        league,
        firstPlayer,
        secondPlayer,
        tileList,
        'TicTacToe'
    );
};

const createConnectFourBoard = (
    league: League,
    tileList: ReadonlyArray<Tile>
): Board => {
    const { column } = connectFour;
    const firstPlayer = createBlackPlayer(tileList);
    const secondPlayer = createRedPlayer(tileList);
    return createBoard(
        column,
        league,
        firstPlayer,
        secondPlayer,
        tileList,
        'ConnectFour'
    );
};

const createBoard = (
    column: number,
    league: League,
    firstPlayer: Player,
    secondPlayer: Player,
    tileList: ReadonlyArray<Tile>,
    type: Board['type']
): Board => ({
    league,
    firstPlayer,
    secondPlayer,
    tileList,
    currentPlayer: league === firstPlayer.league ? firstPlayer : secondPlayer,
    stringFormat: () =>
        tileList
            .map(
                (tile, index) =>
                    `${index % column ? '' : '\n'}${tile.stringFormat}(${String(
                        tile.index
                    )}) \t`
            )
            .join(''),
    type,
});

export {
    createConnectFourBoard,
    createTicTacToeBoard,
    createStandardConnectFourBoard,
    createStandardTicTacToeBoard,
};
export type { Board };
