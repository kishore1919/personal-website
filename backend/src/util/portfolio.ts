import fetch from 'node-fetch';
import { createReadStream } from 'fs';

export interface PortfolioData {
    readonly path: string;
    readonly caption: string;
}

export interface Data {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguageQueried: ReadonlyArray<string>;
    readonly portfolioForPagingQueried: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
}

const fetchGithubAPI = async () => {
    const res = await fetch(
        'https://api.github.com/users/GervinFung/repos?per_page=50'
    );
    return await res.json();
};

const readPortfolio = (): Promise<ReadonlyArray<PortfolioData>> => {
    const filename = 'src/asset/files/portfolio.txt';
    return new Promise((resolve, reject) => {
        let fetchData: ReadonlyArray<PortfolioData> = [];
        createReadStream(filename)
            .on('data', (data) => {
                fetchData = data
                    .toString()
                    .replace('\r', '')
                    .split('\n')
                    .map((stringData) => {
                        const commaSplit = stringData.toString().split(',');
                        return {
                            path: commaSplit[0],
                            caption: commaSplit[1],
                        };
                    });
            })
            .on('end', () => resolve(fetchData))
            .on('error', reject);
    });
};

export const queryLanguageSelector = (
    github: any,
    portfolioData: ReadonlyArray<PortfolioData>,
    all: 'All'
): ReadonlyArray<string> => {
    const languages = portfolioData
        .map((portfolio) => {
            const name = portfolio.path;
            return github
                .filter((repo: any) => repo.name === name)
                .map((repo: any) => repo.language);
        })
        .filter((portfolio) => portfolio.length)
        .flat(1);
    return [all, ...Array.from(new Set(languages))];
};

export const queryPortfolio = (
    selectedLanguage: string,
    github: any,
    portfolioData: ReadonlyArray<PortfolioData>,
    all: 'All'
): ReadonlyArray<PortfolioData> => {
    if (selectedLanguage === all) {
        return portfolioData;
    }

    const portfolioQueried = portfolioData
        .map((portfolio) => {
            const name = portfolio.path;
            return github
                .filter(
                    (repo: any) =>
                        repo.name === name && repo.language === selectedLanguage
                )
                .map((_: any) => portfolio);
        })
        .filter((portfolio) => portfolio.length)
        .flat(1);

    return portfolioQueried;
};

export const validatePageQuery = (
    page: string | null,
    numberOfPortfolioPerPage: number
): number => {
    if (page === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (parseInt(page, 10) >= 0) {
        return parseInt(page, 10) * numberOfPortfolioPerPage;
    }
    return 0;
};

const processLanguage = (language: string): string => {
    if (language === 'CPP') {
        return 'C++';
    } else if (language === 'C') {
        return 'C#';
    }
    return language;
};

export const validatePortfolioLanguageQuery = (
    github: any,
    language: string,
    all: 'All'
): string | 'All' => {
    if (language === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    const finalizedLang = processLanguage(language).toLowerCase();
    const langFound = github.find(
        (repo: any) =>
            repo.language && repo.language.toLowerCase() === finalizedLang
    );
    return langFound === undefined ? all : langFound.language;
};

export const queryPortfolioForPaging = (
    pageNumber: number,
    portfolioData: ReadonlyArray<PortfolioData>,
    totalPortfolioData: number
): ReadonlyArray<PortfolioData> => {
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
