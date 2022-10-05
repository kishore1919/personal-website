import { isPositiveInt } from 'granula-string';
import {
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Data } from '../../common/portfolio';

const parseAsPortfolioData = (data: any): Data => {
    const parseAsLanguage = (language: unknown) =>
        parseAsString(language).orElseThrowDefault('language');
    return parseAsReadonlyObject(data, (data) => ({
        page: parseAsNumber(data.page).orElseThrowDefault('page'),
        languages: parseAsReadonlyArray(data.languages, (language) =>
            parseAsLanguage(language)
        ).orElseThrowDefault('languages'),
        portfolios: parseAsReadonlyArray(data.portfolios, (portfolio) => ({
            name: parseAsString(portfolio.name).orElseThrowDefault('name'),
            description: parseAsString(
                portfolio.description
            ).orElseThrowDefault('description'),
            languages: parseAsReadonlyArray(portfolio.languages, (language) =>
                parseAsString(language).orElseThrowDefault('language')
            ).orElseThrowDefault('portfolio languages'),
            url: parseAsString(portfolio.url).orElseThrowDefault('url'),
        })).orElseThrowDefault('portfolios'),
        language: parseAsLanguage(data.language),
    })).orElseThrowDefault('data');
};

const parseAsPortfolioQueryParam = (query: unknown) =>
    parseAsReadonlyObject(query, (query) => ({
        language: decodeURIComponent(
            parseAsString(query.language).orElseGet('All')
        ),
        page: !isPositiveInt(query.page ?? '')
            ? 0
            : parseInt(parseAsString(query.page).orElseThrowDefault('page')),
    })).orElseThrowDefault('query param');

export type { Data };
export { parseAsPortfolioData, parseAsPortfolioQueryParam };
