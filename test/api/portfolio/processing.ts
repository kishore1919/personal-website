import {
    findLanguageQueried,
    findPortfoliosFromLanguage,
    numberOfPortfolioPerPage,
    paginatePortfolio,
    parsePageQuery,
    portfolioLanguages,
} from '../../../src/api/portfolio/queryData';
import portfolioData from '../dummy/portfolio.json';

const testProcessing = () =>
    describe('Data Processing', () => {
        it('should return the language queried', () => {
            expect(
                ['Java', 'All', 'C#'].every((language) =>
                    findLanguageQueried(portfolioData, language)
                )
            ).toBe(true);
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
            const java = 'Java';
            expect(
                findPortfoliosFromLanguage(portfolioData, java)
            ).toStrictEqual(
                portfolioData.filter((data) => data.languages.includes(java))
            );
            const javaScript = 'JavaScript';
            expect(
                findPortfoliosFromLanguage(portfolioData, javaScript)
            ).toStrictEqual(
                portfolioData.filter((data) =>
                    data.languages.includes(javaScript)
                )
            );
        });
        it('should find portfolios from the pagination', () => {
            expect(paginatePortfolio(portfolioData, 0)).toStrictEqual(
                portfolioData
            );
            expect(paginatePortfolio(portfolioData, 9)).toStrictEqual([]);
        });
    });

export default testProcessing;
