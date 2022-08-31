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
    page: string,
    numberOfPortfolioPerPage: number
): number => {
    const parsedPage = parseInt(page, 10);
    return parsedPage < 0 ? 0 : parsedPage * numberOfPortfolioPerPage;
};

const findLanguageQueried = (
    portfolios: Portfolios,
    language: string
): string | 'All' => {
    const finalizedLang = language === 'C' ? 'C#' : language;
    return (
        portfolios
            .flatMap(({ languages }) => languages.flat())
            .find((language) => language === finalizedLang) ?? 'All'
    );
};

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
