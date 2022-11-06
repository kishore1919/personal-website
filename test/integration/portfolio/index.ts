import jsonResponse from '../response';
import { parseAsPortfolioData } from '../../../src/web/parser/portfolio';
import portfolio from '../dummy/portfolio.json';
import { describe, it, expect } from 'vitest';

const testPortfolioQuery = () =>
    describe('Api portfolio query test', () => {
        it.each(['TypeScript', 'Java'])(
            'should return "%s" related portfolios',
            async (lang) => {
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
                expect(
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
                                        portfolio.url === url &&
                                        portfolio.name === name &&
                                        portfolio.description === description &&
                                        portfolio.languages.every((language) =>
                                            languages.includes(language)
                                        )
                                )
                            )
                ).toBe(true);
            }
        );
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
                            portfolio.url === url &&
                            portfolio.name === name &&
                            portfolio.description === description &&
                            portfolio.languages.every((language) =>
                                languages.includes(language)
                            )
                    )
                )
            ).toBe(true);
        });
    });

export default testPortfolioQuery;
