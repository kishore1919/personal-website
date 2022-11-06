import {
    findLanguageQueried,
    findPortfoliosFromLanguage,
    numberOfPortfolioPerPage,
    paginatePortfolio,
    parsePageQuery,
    portfolioLanguages,
} from '../../../src/api/portfolio/queryData';
import portfolioData from '../dummy/portfolio.json';
import { describe, it, expect } from 'vitest';

const testProcessing = () =>
    describe('Data Processing', () => {
        it.each([
            {
                expected: 'Java',
                actual: 'Java',
            },
            {
                expected: '',
                actual: 'All',
            },
            {
                expected: 'C#',
                actual: 'C#',
            },
            {
                expected: 'JavaScript',
                actual: 'JavaScript',
            },
        ] as const)(
            'should return "$actual" as the language queried when "$expected" is searched and return portfolio data implemented/includes "$actual"',
            // 'Java', 'All', 'C#'
            ({ expected, actual }) => {
                expect(findLanguageQueried(portfolioData, expected)).toBe(
                    actual
                );
                expect(
                    findPortfoliosFromLanguage(portfolioData, actual)
                ).toStrictEqual(
                    actual === 'All'
                        ? portfolioData
                        : portfolioData.filter(({ languages }) =>
                              languages.includes(actual)
                          )
                );
            }
        );
        it.each([
            {
                page: 0,
                index: 0,
                portfolioData,
            },
            {
                page: 1,
                index: 9,
                portfolioData: [],
            },
            {
                page: 2,
                index: 18,
                portfolioData: [],
            },
            {
                page: -1,
                index: 0,
                portfolioData: [],
            },
        ])(
            'should parse the page query "$page" and return the starting index "$index" and return portfolio data',
            ({ page, index, portfolioData }) => {
                expect(parsePageQuery(page, numberOfPortfolioPerPage)).toBe(
                    index
                );
                expect(paginatePortfolio(portfolioData, index)).toStrictEqual(
                    portfolioData
                );
            }
        );
        it('should extract and sort the languages', () => {
            expect(portfolioLanguages(portfolioData)).toStrictEqual([
                'All',
                'C#',
                'Java',
                'JavaScript',
                'TypeScript',
            ]);
        });
    });

export default testProcessing;
