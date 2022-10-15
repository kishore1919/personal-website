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
        parseAsString(language).elseThrow('language is not a string');
    return parseAsReadonlyObject(data, (data) => ({
        page: parseAsNumber(data.page).elseThrow('page is not a number'),
        languages: parseAsReadonlyArray(data.languages, (language) =>
            parseAsLanguage(language)
        ).elseThrow('languages is not an array'),
        portfolios: parseAsReadonlyArray(data.portfolios, (portfolio) => ({
            name: parseAsString(portfolio.name).elseThrow(
                'name is not a strng'
            ),
            description: parseAsString(portfolio.description).elseThrow(
                'description is not a string'
            ),
            languages: parseAsReadonlyArray(portfolio.languages, (language) =>
                parseAsString(language).elseThrow('language is not a string')
            ).elseThrow('portfolio languages is not an array'),
            url: parseAsString(portfolio.url).elseThrow('url is not a string'),
        })).elseThrow('portfolios is not an array'),
        language: parseAsLanguage(data.language),
    })).elseThrow('data is not an object');
};

const parseAsPortfolioQueryParam = (query: unknown) =>
    parseAsReadonlyObject(query, (query) => ({
        language: decodeURIComponent(
            parseAsString(query.language).elseGet('All')
        ),
        page: !isPositiveInt(query.page ?? '')
            ? 0
            : parseInt(
                  parseAsString(query.page).elseThrow(
                      'page is not a parseable string'
                  )
              ),
    })).elseThrow('query param is not an object');

export type { Data };
export { parseAsPortfolioData, parseAsPortfolioQueryParam };
