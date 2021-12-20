import fetch from 'node-fetch';
import { parseAsNumber, parseAsString } from 'parse-dont-validate';

type PortfolioData = {
    readonly name: string;
    readonly description: string;
    readonly language: string;
    readonly url: string;
};

type Data = {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguages: ReadonlyArray<string>;
    readonly portfolioPaginated: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
};

const fetchGithubUser = async (): Promise<ReadonlyArray<PortfolioData>> => {
    const repositories = await (
        await fetch('https://api.github.com/users/GervinFung/repos?per_page=50')
    ).json();
    if (Array.isArray(repositories)) {
        return repositories.flatMap((repo) => {
            const { name, language, html_url, description } = repo;
            const parsedName = parseAsString(name).orElseThrowError('name');
            const repoName = [
                'LibGDX-Chess-Game',
                'MinimalTicTacToe',
                'TextEditorFX',
                'SimpleParallelChessAI',
                'AndroidSimpleAIChess',
                'Connect4',
                'TicTacToe',
                'TextEditor',
                'RealTimeMarkdown',
                'Room',
                'KnapsackProblem',
                'SimpleParallelDispatcher',
            ].find((portfolioName) => parsedName === portfolioName);
            if (repoName) {
                return [
                    {
                        name: parsedName,
                        language:
                            parseAsString(language).orElseThrowError(
                                'language'
                            ),
                        description:
                            parseAsString(description).orElseThrowError(
                                'description'
                            ),
                        url: parseAsString(html_url).orElseThrowError(
                            'html_url'
                        ),
                    },
                ];
            }
            return [];
        });
    }
    throw new Error('Response returned from Github User API is not array type');
};

const fetchGithubOrganization = async (): Promise<PortfolioData> => {
    const repositories = await (
        await fetch('https://api.github.com/orgs/P-YNPM/repos')
    ).json();
    if (Array.isArray(repositories)) {
        const { language } = Array.from(
            repositories
                .reduce((prev: Map<string, number>, repo) => {
                    const { language } = repo;
                    const parsedLanguage =
                        parseAsString(language).orElseThrowError('language');
                    if (parsedLanguage) {
                        const prevItem = prev.get(parsedLanguage);
                        return prev.set(
                            language,
                            prevItem === undefined ? 1 : prevItem + 1
                        );
                    }
                    return prev;
                }, new Map<string, number>())
                .entries()
        ).reduce(
            (prev, [language, count]) => {
                return prev.count < count
                    ? {
                          language,
                          count,
                      }
                    : prev;
            },
            {
                language: '',
                count: 0,
            }
        );
        const organization: any = await (
            await fetch('https://api.github.com/orgs/P-YNPM')
        ).json();
        const { login, description, html_url } = organization;
        return {
            name: parseAsString(login).orElseThrowError('login'),
            language,
            description:
                parseAsString(description).orElseThrowError('description'),
            url: parseAsString(html_url).orElseThrowError('html_url'),
        };
    }
    throw new Error(
        'Response returned from Github Organization API is not array type'
    );
};

const portfolioLanguagesList = (
    portfolioData: ReadonlyArray<PortfolioData>
): ReadonlyArray<string> =>
    Array.from(new Set(portfolioData.map((data) => data.language)))
        .concat('All')
        .sort((a, b) => a.localeCompare(b));

const findPortfoliosFromLanguage = (
    portfolioData: ReadonlyArray<PortfolioData>,
    selectedLanguage: string
): ReadonlyArray<PortfolioData> =>
    selectedLanguage === 'All'
        ? portfolioData
        : portfolioData.filter(({ language }) => language === selectedLanguage);

const parsePageQuery = (
    page: string,
    numberOfPortfolioPerPage: number
): number => {
    const parsedPage = Number.parseInt(page, 10);
    return parsedPage >= 0 ? parsedPage * numberOfPortfolioPerPage : 0;
};

const findLanguageQueried = (
    portfolioData: ReadonlyArray<PortfolioData>,
    language: string
): string | 'All' => {
    const finalizedLang =
        language === 'CPP' ? 'C++' : language === 'C' ? 'C#' : language;

    return (
        portfolioData.find((data) => data.language === finalizedLang)
            ?.language ?? 'All'
    );
};

const paginatePortfolio = (
    portfolioData: ReadonlyArray<PortfolioData>,
    pageNumber: number
): ReadonlyArray<PortfolioData> =>
    portfolioData.flatMap((_, index) => {
        const data = portfolioData[index + pageNumber];
        return index < 9 ? (data ? [data] : []) : [];
    });

const portfolioData = (await fetchGithubUser()).concat(
    await fetchGithubOrganization()
);

export const getSpecifiedResponse = (
    page: number | string,
    language: string
): Data => {
    const numberOfPortfolioPerPage = 9;

    const selectedLanguage = findLanguageQueried(portfolioData, language);
    const portfolioQueried = findPortfoliosFromLanguage(
        portfolioData,
        selectedLanguage
    );

    return {
        numberOfPagesQueried: Math.ceil(
            portfolioQueried.length / numberOfPortfolioPerPage
        ),
        portfolioLanguages: portfolioLanguagesList(portfolioData),
        portfolioPaginated: paginatePortfolio(
            portfolioQueried,
            parseAsNumber(page, 'PositiveInteger').orElse(
                parsePageQuery(page as string, numberOfPortfolioPerPage)
            )
        ),
        selectedLanguage,
    };
};

export const getUnspecifiedResponse = () => getSpecifiedResponse(0, 'All');
