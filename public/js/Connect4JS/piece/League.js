class League {
    constructor() {
        throw 'Cannot instantiate League object'
    }

    static league = Object.freeze({
        BLACK: 'BLACK',
        RED: 'RED'
    });

    static isBlack(league) {
        if (league === League.league.BLACK) {
            return true;
        }
        if (league === League.league.RED) {
            return false
        }
        throw new Error('Cannot be of type other than RED and BLACK');
    }

    static ToString(league) {
        if (league === League.league.BLACK) {
            return 'B';
        }
        if (league === League.league.RED) {
            return 'R'
        }
        throw new Error('Cannot be of type other than RED and BLACK');
    }
}

export default League;