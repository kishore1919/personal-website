import {
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Data } from '../../../common/src/portfolio';

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
            language: parseAsString(portfolio.language).orElseThrowDefault(
                'language'
            ),
            url: parseAsString(portfolio.url).orElseThrowDefault('url'),
        })).orElseThrowDefault('portfolios'),
        language: parseAsLanguage(data.language),
    })).orElseThrowDefault('data');
};

export type { Data };
export { parseAsPortfolioData };
