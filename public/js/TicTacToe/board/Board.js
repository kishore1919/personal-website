import League from '../piece/League.js';
import Tile from './Tile.js';
import {NoughtsPlayer, CrossPlayer} from '../player/Player.js';

class Board {
    static GRID = 3;
    static NUMBER_OF_TILES = 9;

    //Player
    noughtsPlayer;
    crossPlayer;
    currentPlayer;

    //TileList
    tileList;

    constructor(boardBuilder) {
        this.tileList = boardBuilder.getImmutableTileList();

        this.noughtsPlayer = new NoughtsPlayer(this);
        this.crossPlayer = new CrossPlayer(this);

        this.currentPlayer = boardBuilder.chooseCurrentPlayer(this.noughtsPlayer, this.crossPlayer);
    }

    getTileList = () => Object.freeze(this.tileList);

    getTileAt = (index) => this.tileList[index];

    getCrossPlayer = () => this.crossPlayer;

    getNoughtsPlayer = () => this.noughtsPlayer;

    getCurrentPlayer = () => this.currentPlayer;

    static createStandardBoard = () => {
        const builder = new BoardBuilder(League.league.CROSS);
        for (let i = 0; i < Board.NUMBER_OF_TILES; i++) { builder.appendTile(Tile.createTile(null, i)); }
        return builder.build();
    };

    toString = () => {
        const gameReadable = this.tileList.map((tile, i) => {
            const newLine = i % Board.GRID === 0 ? '\n' : '';
            return `${newLine}${tile.toString()}(${String(tile.getIndex())}) \t`;
        });
        return Object.freeze(gameReadable.join(''));
    };
}

class BoardBuilder {
    tileList;
    league;

    constructor(league) {
        this.tileList = [];
        this.league = league;
    }

    appendTile = (tile) => {
        this.tileList.push(tile);
        return this;
    };

    setPiece = (piece) => {
        this.tileList[piece.getIndex()] = Tile.createTile(piece, piece.getIndex());
        return this;
    };

    build = () => Object.freeze(new Board(this));

    getImmutableTileList = () => Object.freeze(this.tileList);

    chooseCurrentPlayer = (redPlayer, blackPlayer) => League.isCross(this.league) ? blackPlayer : redPlayer;
}

export {BoardBuilder, Board};