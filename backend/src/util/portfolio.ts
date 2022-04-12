import fetch from 'node-fetch';
import { parseAsReadonlyArray, parseAsString } from 'parse-dont-validate';
import { PortfolioData } from '../../../common/src/portfolio';

const fetchGithubUser = async (): Promise<ReadonlyArray<PortfolioData>> =>
    parseAsReadonlyArray(
        await (
            await fetch(
                'https://api.github.com/users/GervinFung/repos?per_page=50'
            )
        ).json(),
        (repo) => {
            const { name, language, html_url, description } = repo;
            const parsedName = parseAsString(name).orElseThrowDefault('name');
            return ![
                'my-web',
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
            ].find((portfolioName) => parsedName === portfolioName)
                ? []
                : [
                      {
                          name: parsedName,
                          language:
                              parseAsString(language).orElseThrowDefault(
                                  'language'
                              ),
                          description:
                              parseAsString(description).orElseThrowDefault(
                                  'description'
                              ),
                          url: parseAsString(html_url).orElseThrowDefault(
                              'html_url'
                          ),
                      },
                  ];
        }
    )
        .orElseThrowDefault('repositories')
        .flat();

const fetchGithubOrganization = async (
    organizationName: string
): Promise<PortfolioData> => {
    const { language } = Array.from(
        parseAsReadonlyArray(
            await (
                await fetch(
                    `https://api.github.com/orgs/${organizationName}/repos`
                )
            ).json(),
            (repo) =>
                !repo.language
                    ? []
                    : [
                          parseAsString(repo.language).orElseThrowDefault(
                              'language'
                          ),
                      ]
        )
            .orElseThrowDefault('repositories')
            .flat()
            .reduce((prev, language) => {
                if (language) {
                    const prevCount = prev.get(language);
                    return prev.set(
                        language,
                        prevCount === undefined ? 1 : prevCount + 1
                    );
                }
                return prev;
            }, new Map<string, number>())
    ).reduce(
        (prev, [language, count]) =>
            prev.count < count
                ? {
                      language,
                      count,
                  }
                : prev,
        {
            language: '' as string,
            count: 0 as number,
        } as const
    );
    const organization: any = await (
        await fetch(`https://api.github.com/orgs/${organizationName}`)
    ).json();
    const { login, description, html_url } = organization;
    return {
        name: parseAsString(login).orElseThrowDefault('login'),
        language,
        description:
            parseAsString(description).orElseThrowDefault('description'),
        url: parseAsString(html_url).orElseThrowDefault('html_url'),
    };
};

const portfolioLanguages = (
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
    const parsedPage = parseInt(page, 10);
    return parsedPage >= 0 ? parsedPage * numberOfPortfolioPerPage : 0;
};

const findLanguageQueried = (
    portfolioData: ReadonlyArray<PortfolioData>,
    language: string
): string | 'All' => {
    const finalizedLang = language === 'C' ? 'C#' : language;

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

const portfolioDataPromise = async () =>
    (
        await Promise.all(['Utari-Room', 'P-YNPM'].map(fetchGithubOrganization))
    ).concat(await fetchGithubUser());

const numberOfPortfolioPerPage = 9;

export {
    portfolioDataPromise,
    findLanguageQueried,
    parsePageQuery,
    portfolioLanguages,
    findPortfoliosFromLanguage,
    paginatePortfolio,
    numberOfPortfolioPerPage,
};
