import cors from '../../src/api/cors';
import { EndPointFunc } from '../../src/api/endpoint';
import portfolios, { queryData } from '../../src/api/portfolio';
import { Data } from '../../src/common/portfolio';
import { parseAsPortfolioQueryParam } from '../../src/web/parser/portfolio';

const processPortfolioQuery = <
    Request extends Readonly<{
        query: any;
    }>
>(
    request: Request
) => {
    const {
        findLanguageQueried,
        findPortfoliosFromLanguage,
        numberOfPortfolioPerPage,
        paginatePortfolio,
        parsePageQuery,
        portfolioLanguages,
    } = queryData;

    const portfolio = portfolios();

    const { page, language } = parseAsPortfolioQueryParam(request.query);

    const selectedLanguage = findLanguageQueried(portfolio, language);

    const portfolioQueried = findPortfoliosFromLanguage(
        portfolio,
        selectedLanguage
    );

    return {
        page: Math.ceil(portfolioQueried.length / numberOfPortfolioPerPage),
        languages: portfolioLanguages(portfolio),
        portfolios: paginatePortfolio(
            portfolioQueried,
            parsePageQuery(page, numberOfPortfolioPerPage)
        ),
        language: selectedLanguage,
    };
};

const portfolio: EndPointFunc<Data> = async (req, res) => {
    await cors<Data>()(req, res);
    if (req.method !== 'GET') {
        res.status(404).json('Only accept GET request');
    } else {
        res.status(200).json(processPortfolioQuery(req));
    }
};

export { processPortfolioQuery };

export default portfolio;
