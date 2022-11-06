import { isPositiveInt } from 'granula-string';
import {
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import type { Data, QueryParams } from '../../common/portfolio';

const parseAsPortfolioData = (data: any): Data => {
    const parseAsLanguage = (language: unknown) =>
        parseAsString({
            string: language,
            ifParsingFailThen: 'throw',
            message: 'language is not a string',
        });
    return parseAsReadonlyObject({
        object: data,
        ifParsingFailThen: 'throw',
        message: 'data is not an object',
        parse: (data) => ({
            language: parseAsLanguage(data.language),
            page: parseAsNumber({
                number: data.page,
                ifParsingFailThen: 'throw',
                message: 'page is not a number',
            }),
            languages: parseAsReadonlyArray({
                array: data.languages,
                parseElement: parseAsLanguage,
                ifParsingFailThen: 'throw',
                message: 'languages is not an array',
            }),
            portfolios: parseAsReadonlyArray({
                array: data.portfolios,
                ifParsingFailThen: 'throw',
                message: 'portfolios is not an array',
                parseElement: (portfolio) => ({
                    name: parseAsString({
                        string: portfolio.name,
                        ifParsingFailThen: 'throw',
                        message: 'name is not a string',
                    }),
                    url: parseAsString({
                        string: portfolio.url,
                        ifParsingFailThen: 'throw',
                        message: 'url is not a string',
                    }),
                    description: parseAsString({
                        string: portfolio.description,
                        ifParsingFailThen: 'throw',
                        message: 'description is not a string',
                    }),
                    languages: parseAsReadonlyArray({
                        array: portfolio.languages,
                        parseElement: parseAsLanguage,
                        ifParsingFailThen: 'throw',
                        message: 'portfolio languages is not an array',
                    }),
                }),
            }),
        }),
    });
};

const parseAsPortfolioQueryParam = (query: unknown): QueryParams =>
    parseAsReadonlyObject({
        object: query,
        ifParsingFailThen: 'throw',
        message: 'query param is not an object',

        parse: (query) => ({
            language: decodeURIComponent(
                parseAsString({
                    string: query.language,
                    ifParsingFailThen: 'get',
                    alternativeValue: 'All',
                })
            ),
            page: !isPositiveInt(query.page ?? '')
                ? 0
                : parseInt(
                      parseAsString({
                          string: query.page,
                          ifParsingFailThen: 'throw',
                          message: 'page is not a parseable string',
                      })
                  ),
        }),
    });

export type { Data };
export { parseAsPortfolioData, parseAsPortfolioQueryParam };
