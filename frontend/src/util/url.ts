import { isPositiveInt } from 'granula-string';
import { parseAsString } from 'parse-dont-validate';

const api = '/api';
const portfolioURL = `${api}/portfolio`;
const contactURL = `${api}/contact`;

const apiPortfolioQuery = (param: string) => `${portfolioURL}?${param}`;

type QueryParams = Readonly<{
    language: string;
    page: number;
}>;

const portfolioQuery = (queryParams: QueryParams) =>
    Object.entries(queryParams).reduce((prev, [key, value]) => {
        if (!value) {
            return prev;
        }
        const pair = `${key}=${value}`;
        return !prev ? pair : `${prev}&${pair}`;
    }, '');

const parseAsQueryParams = (params: string): QueryParams => {
    const search = new URLSearchParams(params);
    const page = search.get('page');
    return {
        language: parseAsString(search.get('language')).orElseLazyGet(
            () => 'All'
        ),
        page: isPositiveInt(page ?? '')
            ? parseInt(parseAsString(page).orElseThrowDefault('page'), 10)
            : 0,
    };
};

export { contactURL, portfolioQuery, apiPortfolioQuery, parseAsQueryParams };
