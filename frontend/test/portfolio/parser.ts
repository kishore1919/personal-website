import { parseAsPortfolioData } from '../../src/parser/portfolio';
import data from '../dummy/portfolio.json';

const testParser = () =>
    describe('Parser', () => {
        it('should successfully parse as data', () => {
            expect(parseAsPortfolioData(data)).toStrictEqual(data);
        });
        it('should failed to parse as data as page is not number', () => {
            expect(() =>
                parseAsPortfolioData({
                    ...data,
                    page: '123',
                })
            ).toThrowError();
        });
        it('should failed to parse as data as languages is not an array of string', () => {
            expect(() =>
                parseAsPortfolioData({
                    ...data,
                    languages: '123',
                })
            ).toThrowError();
        });
    });

export default testParser;
