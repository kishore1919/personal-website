import { Portfolios } from '../../../common/src/portfolio';
import fs from 'fs';

const devPortfolioCache = (() => {
    const cacheFolder = `${process.cwd()}/cache`;
    const path = `${cacheFolder}/portfolios.json`;
    return {
        cacheForDevelopment: (portfolios: Portfolios) => {
            fs.mkdir(cacheFolder, (err: unknown) =>
                err ? console.error(err) : console.log(`created ${cacheFolder}`)
            );
            fs.writeFile(path, JSON.stringify(portfolios, null, 4), (err) =>
                err
                    ? console.error(err)
                    : console.log(`generated cache for at ${path}`)
            );
        },
        getCache: async (): Promise<
            Readonly<
                | {
                      type: 'cache';
                      portfolios: Portfolios;
                  }
                | {
                      type: 'nocache';
                  }
            >
        > => {
            try {
                const promise = await new Promise<string | false>(
                    (resolve, reject) => {
                        let fetchData = '';
                        fs.createReadStream(path)
                            .on('data', (data) => (fetchData = data.toString()))
                            .on('end', () => resolve(fetchData))
                            .on('error', () => reject(false));
                    }
                );
                return !promise
                    ? {
                          type: 'nocache',
                      }
                    : {
                          type: 'cache',
                          portfolios: JSON.parse(promise),
                      };
            } catch (error) {
                console.dir(error, { depth: null });
                return {
                    type: 'nocache',
                };
            }
        },
    };
})();

export default devPortfolioCache;
