import { parseAsEnv } from 'esbuild-env-parsing';
import devPortfolioCache from './cacheDevelopment';
import { portfolioDataPromise } from './queryData';

const portfolios = async () => {
    if (
        parseAsEnv({
            name: 'NODE_ENV',
            env: process.env.NODE_ENV,
        }) !== 'DEVELOPMENT'
    ) {
        return await portfolioDataPromise();
    }
    const { cacheForDevelopment, getCache } = devPortfolioCache;
    const cache = await getCache();
    switch (cache.type) {
        case 'cache':
            return cache.portfolios;
        case 'nocache': {
            const portfolioData = await portfolioDataPromise();
            cacheForDevelopment(portfolioData);
            return portfolioData;
        }
    }
};

export * as queryData from './queryData';
export default portfolios;
