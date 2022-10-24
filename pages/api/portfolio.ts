import cors from '../../src/api/cors';
import type { EndPointFunc } from '../../src/api/endpoint';
import portfolios, { queryData } from '../../src/api/portfolio';
import type { Data } from '../../src/common/portfolio';
import { parseAsPortfolioQueryParam } from '../../src/web/parser/portfolio';

const processPortfolioQuery = <
    Request extends Readonly<{
        query: any;
    }>
>(
    request: Request
) => {
    const portfolio = portfolios();

    const { page, language } = parseAsPortfolioQueryParam(request.query);

    const selectedLanguage = queryData.findLanguageQueried(portfolio, language);

    const portfolioQueried = queryData.findPortfoliosFromLanguage(
        portfolio,
        selectedLanguage
    );

    return {
        page: Math.ceil(
            portfolioQueried.length / queryData.numberOfPortfolioPerPage
        ),
        languages: queryData.portfolioLanguages(portfolio),
        portfolios: queryData.paginatePortfolio(
            portfolioQueried,
            queryData.parsePageQuery(page, queryData.numberOfPortfolioPerPage)
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
