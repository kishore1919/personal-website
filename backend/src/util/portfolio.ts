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

const fetchGithubAPI = async () =>
    (
        await fetch('https://api.github.com/users/GervinFung/repos?per_page=50')
    ).json();

const readPortfolio = (): Promise<ReadonlyArray<PortfolioData>> => {
    return new Promise((resolve, reject) => {
        let fetchData: ReadonlyArray<PortfolioData> = [];
        createReadStream('public/portfolio.txt')
            .on('data', (data) => {
                fetchData = data
                    .toString()
                    .replace('\r', '')
                    .split('\n')
                    .map((stringData) => {
                        const [path, caption] = stringData
                            .toString()
                            .split(',');
                        return {
                            path,
                            caption,
                        };
                    });
            })
            .on('end', () => resolve(fetchData))
            .on('error', reject);
    });
};

export const queryLanguageSelector = ({
    all,
    github,
    portfolioData,
}: {
    readonly all: 'All';
    readonly github: any;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
}): ReadonlyArray<string> => {
    const languages = portfolioData.flatMap((portfolio) => {
        const name = portfolio.path;
        return github.flatMap((repo: any) =>
            repo.name === name ? [repo.language] : []
        );
    });
    return [all, ...Array.from(new Set(languages))];
};

export const queryPortfolio = ({
    all,
    github,
    portfolioData,
    selectedLanguage,
}: {
    readonly all: 'All';
    readonly github: any;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
}): ReadonlyArray<PortfolioData> => {
    if (selectedLanguage === all) {
        return portfolioData;
    }

    const portfolioQueried = portfolioData.flatMap((portfolio) => {
        const name = portfolio.path;
        return github.flatMap((repo: any) =>
            repo.name === name && repo.language === selectedLanguage
                ? [portfolio]
                : []
        );
    });

    return portfolioQueried;
};

export const validatePageQuery = ({
    numberOfPortfolioPerPage,
    page,
}: {
    readonly page: string;
    readonly numberOfPortfolioPerPage: number;
}): number => {
    const parsedPage = Number.parseInt(page, 10);
    if (parsedPage >= 0) {
        return parsedPage * numberOfPortfolioPerPage;
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

export const validatePortfolioLanguageQuery = ({
    all,
    github,
    language,
}: {
    readonly github: any;
    readonly language: string;
    readonly all: 'All';
}): string | 'All' => {
    const finalizedLang = processLanguage(language).toLowerCase();
    const langFound = github.find(
        (repo: any) =>
            repo.language && repo.language.toLowerCase() === finalizedLang
    );
    return langFound === undefined ? all : langFound.language;
};

export const queryPortfolioForPaging = ({
    pageNumber,
    portfolioData,
}: {
    readonly pageNumber: number;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
}): ReadonlyArray<PortfolioData> =>
    portfolioData.flatMap((_, index) => {
        const data = portfolioData[index + pageNumber];
        return index < 9 ? (data ? [data] : []) : [];
    });

export const githubAPI = fetchGithubAPI();
export const portfolioDataPromise = readPortfolio();
