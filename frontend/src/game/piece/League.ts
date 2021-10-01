enum League {
    first, second
}

export const isFirstPlayer = (league: League) => league === League.first;

export default League;