import jsonResponse from '../response';
import { parseAsPortfolioData } from '../../../src/web/parser/portfolio';
import portfolio from '../dummy/portfolio.json';
import { equal } from '../../util';

const testPortfolioQuery = () =>
    describe('Api portfolio query test', () => {
        it('should return language-specific portfolios', async () => {
            const results = ['TypeScript', 'Java'].map(async (lang) => {
                const { page, language, languages, portfolios } =
                    parseAsPortfolioData(
                        await jsonResponse({
                            param: `portfolio?language=${lang}`,
                            requestInit: {
                                method: 'GET',
                            },
                        })
                    );
                // some dummy data might not match due to pagination
                return (
                    page === 1 &&
                    language === lang &&
                    portfolio
                        .flatMap(({ languages }) => languages)
                        .some((language) => languages.includes(language)) &&
                    portfolio
                        .filter((data) => data.languages.includes(lang))
                        .some((portfolio) =>
                            portfolios.find(
                                ({ name, languages, description, url }) =>
                                    portfolio.name === name &&
                                    equal(portfolio.languages, languages) &&
                                    portfolio.description === description &&
                                    portfolio.url === url
                            )
                        )
                );
            });
            expect(results).toHaveLength(2);
            expect(results.every((result) => result)).toBe(true);
        });
        it('should return all portfolios', async () => {
            const { page, language, languages, portfolios } =
                parseAsPortfolioData(
                    await jsonResponse({
                        param: 'portfolio?language=All',
                        requestInit: {
                            method: 'GET',
                        },
                    })
                );
            expect({
                page,
                language,
            }).toStrictEqual({
                page: 1,
                language: 'All',
            });
            // some dummy data might not match due to pagination
            expect(
                portfolio
                    .flatMap(({ languages }) => languages)
                    .some((language) => languages.includes(language))
            ).toBe(true);
            expect(
                portfolio.some((portfolio) =>
                    portfolios.find(
                        ({ name, languages, description, url }) =>
                            portfolio.name === name &&
                            equal(portfolio.languages, languages) &&
                            portfolio.description === description &&
                            portfolio.url === url
                    )
                )
            ).toBe(true);
        });
    });

export default testPortfolioQuery;
