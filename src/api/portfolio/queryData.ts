import { Portfolios } from '../../common/portfolio';

const portfolioLanguages = (portfolios: Portfolios): ReadonlyArray<string> =>
    Array.from(new Set(portfolios.flatMap((data) => data.languages)))
        .concat('All')
        .sort((a, b) => a.localeCompare(b));

const findPortfoliosFromLanguage = (
    portfolios: Portfolios,
    selectedLanguage: string
): Portfolios =>
    selectedLanguage === 'All'
        ? portfolios
        : portfolios.filter(({ languages }) =>
              languages.includes(selectedLanguage)
          );

const parsePageQuery = (
    page: number,
    numberOfPortfolioPerPage: number
): number => (page < 0 ? 0 : page * numberOfPortfolioPerPage);

const findLanguageQueried = (
    portfolios: Portfolios,
    language: string
): string | 'All' =>
    portfolios
        .flatMap(({ languages }) => languages.flat())
        .find((langu) => langu === language) ?? 'All';

const paginatePortfolio = (
    portfolios: Portfolios,
    pageNumber: number
): Portfolios =>
    portfolios.flatMap((_, index) => {
        const data = portfolios[index + pageNumber];
        return index >= 9 ? [] : !data ? [] : [data];
    });

const numberOfPortfolioPerPage = 9;

export {
    findLanguageQueried,
    parsePageQuery,
    portfolioLanguages,
    findPortfoliosFromLanguage,
    paginatePortfolio,
    numberOfPortfolioPerPage,
};
