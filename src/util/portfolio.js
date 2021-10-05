import fetch from 'node-fetch';
import { createReadStream } from 'fs';

const fetchGithubAPI = async () => {
    const res = await new Promise((resolve, reject) =>
        resolve(
            fetch('https://api.github.com/users/GervinFung/repos?per_page=50')
        )
    );
    return await res.json();
};

const readPortfolio = async () => {
    const filename = 'src/asset/files/portfolio.txt';
    return new Promise((resolve, reject) => {
        let fetchData = [];
        createReadStream(filename)
            .on('data', (data) => {
                fetchData = data
                    .toString()
                    .split('\n')
                    .map((stringData) => {
                        const commaSplit = stringData.toString().split(',');
                        return {
                            path: commaSplit[0],
                            caption: commaSplit[1].replace('\r', ''),
                        };
                    });
            })
            .on('end', () => resolve(fetchData))
            .on('error', reject);
    });
};

export const queryLanguageSelector = (github, portfolioData, all) => {
    const languages = portfolioData
        .map((portfolio) => {
            const name = portfolio.path;
            return github
                .filter((repo) => repo.name === name)
                .map((repo) => repo.language);
        })
        .filter((portfolio) => portfolio.length !== 0)
        .flat(1);

    const uniqueLanguages = Array.from(new Set(languages));
    const allArray = [all];

    return allArray.concat(uniqueLanguages);
};

export const queryPortfolio = (
    selectedLanguage,
    github,
    portfolioData,
    all
) => {
    if (selectedLanguage === all) {
        return portfolioData;
    }

    const portfolioQueried = portfolioData
        .map((portfolio) => {
            const name = portfolio.path;
            return github
                .filter(
                    (repo) =>
                        repo.name === name && repo.language === selectedLanguage
                )
                .map((_) => portfolio);
        })
        .filter((portfolio) => portfolio.length !== 0)
        .flat(1);

    return portfolioQueried;
};

export const validatePageQuery = (page, numberOfPortfolioPerPage) => {
    if (page === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (parseInt(page, 10) >= 0) {
        return parseInt(page, 10) * numberOfPortfolioPerPage;
    }
    return 0;
};

const processLanguage = (language) => {
    if (language === 'CPP') {
        return 'C++';
    } else if (language === 'C') {
        return 'C#';
    }
    return language;
};

export const validatePortfolioLanguageQuery = (github, language, all) => {
    if (language === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    const finalizedLang = processLanguage(language).toLowerCase();
    const langFound = github.find(
        (repo) =>
            repo.language !== null &&
            repo.language.toLowerCase() === finalizedLang
    );
    return langFound === undefined ? all : langFound.language;
};

export const queryPortfolioForPaging = (
    pageNumber,
    portfolioData,
    totalPortfolioData
) => {
    const portfolioQueried = [];
    for (let i = pageNumber; i < totalPortfolioData; i++) {
        portfolioQueried.push(portfolioData[i]);
        if (i - pageNumber === 8) {
            return portfolioQueried;
        }
    }
    return portfolioQueried;
};

export const githubAPI = fetchGithubAPI();
export const portfolioDataPromise = readPortfolio();
