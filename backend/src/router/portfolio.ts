import express from 'express';
import { parseAsString } from 'parse-dont-validate';
import {
    findLanguageQueried,
    findPortfoliosFromLanguage,
    numberOfPortfolioPerPage,
    paginatePortfolio,
    parsePageQuery,
    portfolioDataPromise,
    portfolioLanguages,
} from '../util/portfolio';

const portfolioRouter = (app: express.Application) =>
    (() => {
        const portfolioData = portfolioDataPromise();
        return {
            query: async () => {
                app.get('/api/portfolio', async (req, res) => {
                    if (req.method !== 'GET') {
                        throw new Error('Only accept GET request');
                    } else {
                        const { query } = req;

                        const page = parseAsString(query.page).orElseLazyGet(
                            () => '0'
                        );

                        const language = parseAsString(
                            query.language
                        ).orElseLazyGet(() => 'All');

                        const portfolio = await portfolioData;

                        const selectedLanguage = findLanguageQueried(
                            portfolio,
                            language
                        );

                        const portfolioQueried = findPortfoliosFromLanguage(
                            portfolio,
                            selectedLanguage
                        );

                        res.status(200).json({
                            page: Math.ceil(
                                portfolioQueried.length /
                                    numberOfPortfolioPerPage
                            ),
                            languages: portfolioLanguages(portfolio),
                            portfolios: paginatePortfolio(
                                portfolioQueried,
                                parsePageQuery(page, numberOfPortfolioPerPage)
                            ),
                            language: selectedLanguage,
                        });
                    }
                });
            },
        };
    })();

export default portfolioRouter;
