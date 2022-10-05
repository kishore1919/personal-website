import { parseAsPortfolioQueryParam } from '../parser/portfolio';

const api = '/api';

const url = {
    contact: `${api}/contact`,
    portfolio: `${api}/portfolio`,
} as const;

type QueryParams = Readonly<{
    language: string;
    page: number;
}>;

const portfolioQuery = (queryParams: QueryParams) =>
    Object.entries(queryParams).reduce((prev, [key, value]) => {
        if (!value) {
            return prev;
        }
        const pair = `${key}=${encodeURIComponent(value)}`;
        return !prev ? pair : `${prev}&${pair}`;
    }, '');

const parseAsQueryParams = (params: Record<string, unknown>): QueryParams =>
    parseAsPortfolioQueryParam(params);

export { url, portfolioQuery, parseAsQueryParams };
