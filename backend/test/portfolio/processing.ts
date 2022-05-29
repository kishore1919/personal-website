import {
    findLanguageQueried,
    parsePageQuery,
    portfolioLanguages,
    findPortfoliosFromLanguage,
    paginatePortfolio,
    numberOfPortfolioPerPage,
} from '../../src/util/portfolio';
import portfolioData from '../dummy/portfolio.json';

const testProcessing = () =>
    describe('Data Processing', () => {
        it('should return the language queried', () => {
            expect(findLanguageQueried(portfolioData, 'Java')).toBe('Java');
            expect(findLanguageQueried(portfolioData, 'All')).toBe('All');
            expect(findLanguageQueried(portfolioData, 'C#')).toBe('C#');
        });
        it('should parse the page query', () => {
            expect(parsePageQuery('0', numberOfPortfolioPerPage)).toBe(0);
            expect(parsePageQuery('1', numberOfPortfolioPerPage)).toBe(9);
            expect(parsePageQuery('2', numberOfPortfolioPerPage)).toBe(18);
            expect(parsePageQuery('-1', numberOfPortfolioPerPage)).toBe(0);
        });
        it('should extract and sort the languages', () => {
            expect(portfolioLanguages(portfolioData)).toStrictEqual([
                'All',
                'C#',
                'Java',
                'JavaScript',
                'TypeScript',
            ]);
        });
        it('should find portfolios from the language queried', () => {
            expect(
                findPortfoliosFromLanguage(portfolioData, 'Java')
            ).toStrictEqual([
                {
                    name: 'AndroidSimpleAIChess',
                    language: 'Java',
                    description:
                        'First Android Project - Parallel AI Chess Game. Choose against AI from Level 1 to Level 10. You can play against your friend as well.',
                    url: 'https://github.com/GervinFung/AndroidSimpleAIChess',
                },
                {
                    name: 'LibGDX-Chess-Game',
                    language: 'Java',
                    description:
                        'A Parallel AI Chess Game made with LibGDX Framework to make the game playable on many devices. Choose against AI from Level 1 to Level 10. You can play against your friend as well.',
                    url: 'https://github.com/GervinFung/LibGDX-Chess-Game',
                },
            ]);
            expect(
                findPortfoliosFromLanguage(portfolioData, 'JavaScript')
            ).toStrictEqual([
                {
                    name: 'Room',
                    language: 'JavaScript',
                    description:
                        'A website build with rental information by web scraping from UTAR Accommodation list and build a better website using the information through collaboration with Eugene Yong',
                    url: 'https://github.com/GervinFung/Room',
                },
            ]);
        });
        it('should find portfolios from the language queried', () => {
            expect(paginatePortfolio(portfolioData, 0)).toStrictEqual(
                portfolioData
            );
            expect(paginatePortfolio(portfolioData, 9)).toStrictEqual([]);
        });
    });

export default testProcessing;
