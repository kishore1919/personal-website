import fetch from 'node-fetch';
import {
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { PortfolioData } from '../../../common/src/portfolio';

const fetchGithubUserRepo = async (): Promise<ReadonlyArray<PortfolioData>> =>
    parseAsReadonlyArray(
        await (
            await fetch(
                'https://api.github.com/users/GervinFung/repos?per_page=50'
            )
        ).json(),
        (repo) => {
            const name = parseAsString(repo.name).orElseThrowDefault('name');
            return ![
                'adonis-os-blog',
                'my-web',
                'gitignored',
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
            ].includes(name)
                ? []
                : [
                      parseAsReadonlyObject(repo, (repo) => ({
                          name,
                          language: parseAsString(
                              repo.language
                          ).orElseThrowDefault(`language for ${repo.name}`),
                          description: parseAsString(
                              repo.description
                          ).orElseThrowDefault(`description for ${repo.name}`),
                          url: parseAsString(repo.html_url).orElseThrowDefault(
                              `html url for ${repo.name}`
                          ),
                      })).orElseThrowDefault('repo'),
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
                const prevCount = prev.get(language);
                return prev.set(language, !prevCount ? 1 : prevCount + 1);
            }, new Map<string, number>())
    ).reduce(
        (prev, [language, count]) =>
            prev.count >= count
                ? prev
                : {
                      language,
                      count,
                  },
        {
            language: '',
            count: 0,
        } as Readonly<{
            language: string;
            count: number;
        }>
    );
    return parseAsReadonlyObject(
        await (
            await fetch(`https://api.github.com/orgs/${organizationName}`)
        ).json(),
        (organization) => ({
            language,
            name: parseAsString(organization.login).orElseThrowDefault('login'),
            description: parseAsString(
                organization.description
            ).orElseThrowDefault('description'),
            url: parseAsString(organization.html_url).orElseThrowDefault(
                'html_url'
            ),
        })
    ).orElseThrowDefault('organization');
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
    return parsedPage < 0 ? 0 : parsedPage * numberOfPortfolioPerPage;
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
    ).concat(await fetchGithubUserRepo());

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
