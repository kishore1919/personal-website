import type { QueryParams } from '../../common/portfolio';

const url = (() => {
    const api = '/api';

    return {
        contact: `${api}/contact`,
        portfolio: `${api}/portfolio`,
    } as const;
})();

const portfolioQuery = (queryParams: QueryParams) =>
    Object.entries(queryParams).reduce((prev, [key, value]) => {
        if (!value) {
            return prev;
        }
        const pair = `${key}=${encodeURIComponent(value)}`;
        return !prev ? pair : `${prev}&${pair}`;
    }, '');

export { url, portfolioQuery };
