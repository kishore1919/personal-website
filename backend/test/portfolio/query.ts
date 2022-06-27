import { isBlank, isEmpty, isWhiteSpace } from 'granula-string';
import { portfolioDataPromise } from '../../src/portfolio/queryData';

const testDataPromise = () =>
    describe('Data from GitHub', () => {
        const portfolioData = portfolioDataPromise();
        it('should return at least 9 datas', async () => {
            expect((await portfolioData).length >= 9).toBe(true);
        });
        it('should contain proper data type and shape and contains non empty string value', async () => {
            const hasProperContent = (content: string) =>
                !isEmpty(content) &&
                !isBlank(content) &&
                !isWhiteSpace(content);
            expect(
                (await portfolioData).every(
                    ({ description, language, name, url }) =>
                        hasProperContent(description) &&
                        hasProperContent(language) &&
                        hasProperContent(name) &&
                        hasProperContent(url)
                )
            ).toBe(true);
        });
        it('should contain Java and TypeScript as main language', async () => {
            expect(
                (await portfolioData).some(
                    ({ language }) =>
                        language === 'Java' || language === 'TypeScript'
                )
            ).toBe(true);
        });
    });

export default testDataPromise;
