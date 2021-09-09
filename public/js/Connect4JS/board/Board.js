import League from '../piece/League.js';
import Tile from './Tile.js';
import {RedPlayer, BlackPlayer} from '../player/Player.js';

class Board {
    static DEFAULT_NUM_TILES = 42;
    static DEFAULT_WIN_NUM_TILES = 4;
    static DEFAULT_ROW = 6;
    static DEFAULT_COL = 7;

    //Player
    redPlayer;
    blackPlayer;
    currentPlayer;

    //TileList
    tileList;

    constructor(boardBuilder) {
        this.tileList = boardBuilder.getImmutableTileList();

        this.redPlayer = new RedPlayer(this);
        this.blackPlayer = new BlackPlayer(this);

        this.currentPlayer = boardBuilder.chooseCurrentPlayer(this.redPlayer, this.blackPlayer);
    };

    getTileList = () => Object.freeze(this.tileList);

    getTileAt = (index) => this.tileList[index];

    getBlackPlayer = () => this.blackPlayer;

    getRedPlayer = () => this.redPlayer;

    getCurrentPlayer = () => this.currentPlayer;

    static createStandardBoard = () => {
        const builder = new BoardBuilder(League.league.BLACK);
        for (let i = 0; i < Board.DEFAULT_NUM_TILES; i++) { builder.appendTile(Tile.createTile(null, i)); }
        return builder.build();
    };

    toString = () => {
        const gameReadable = this.tileList.map((tile, i) => {
            const newLine = i % Board.DEFAULT_COL === 0 ? '\n' : '';
            return `${newLine}${tile.toString()}(${String(tile.getIndex())}) \t`;
        });
        return Object.freeze(gameReadable.join(''));
    };
}

class BoardBuilder {

    tileList;
    league;

    constructor(league) {
        this.league = league;
        this.tileList = [];
    }

    appendTile = (tile) => {
        this.tileList.push(tile);
        return this;
    };

    setPiece = (piece) => {
        this.tileList[piece.getIndex()] = Tile.createTile(piece, piece.getIndex());
        return this;
    };

    getImmutableTileList = () => Object.freeze(this.tileList);

    chooseCurrentPlayer = (redPlayer, blackPlayer) => League.isBlack(this.league) ? blackPlayer : redPlayer;

    build = () => Object.freeze(new Board(this));
}

export {Board, BoardBuilder};