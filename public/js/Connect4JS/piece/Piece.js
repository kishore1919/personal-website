import League from '../piece/League.js';

class Piece {
    league;
    index;
    constructor(league, index) {
        this.league = league;
        this.index = index;
        if (this.constructor === Piece) {
            throw new TypeError('Abstract class "Piece" cannot be instantiated directly.');
        }
    }

    getIndex = () => this.index;

    getLeague = () => this.league;

    toString = () => League.ToString(this.league);

    static createPiece = (league, index) => League.isBlack(league) ? Object.freeze(new BlackPiece(index)) : Object.freeze(new RedPiece(index));
}

class RedPiece extends Piece {
    constructor(index) {
        super(League.league.RED, index);
    }
}

class BlackPiece extends Piece {
    constructor(index) {
        super(League.league.BLACK, index);
    }
}

export default Piece;