import fetch from 'node-fetch';
import {
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Portfolios } from '../../../common/src/portfolio';

const fetchGithubUserRepo = async (): Promise<Portfolios> =>
    parseAsReadonlyArray(
        await (
            await fetch(
                'https://api.github.com/users/GervinFung/repos?per_page=50'
            )
        ).json(),
        (repo) => {
            const name = parseAsString(repo.name).orElseThrowDefault('name');
            return ![
                'adonix-blog',
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
): Promise<Portfolios[0]> => {
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

const portfolioLanguages = (portfolios: Portfolios): ReadonlyArray<string> =>
    Array.from(new Set(portfolios.map((data) => data.language)))
        .concat('All')
        .sort((a, b) => a.localeCompare(b));

const findPortfoliosFromLanguage = (
    portfolios: Portfolios,
    selectedLanguage: string
): Portfolios =>
    selectedLanguage === 'All'
        ? portfolios
        : portfolios.filter(({ language }) => language === selectedLanguage);

const parsePageQuery = (
    page: string,
    numberOfPortfolioPerPage: number
): number => {
    const parsedPage = parseInt(page, 10);
    return parsedPage < 0 ? 0 : parsedPage * numberOfPortfolioPerPage;
};

const findLanguageQueried = (
    portfolios: Portfolios,
    language: string
): string | 'All' => {
    const finalizedLang = language === 'C' ? 'C#' : language;
    return (
        portfolios.find((data) => data.language === finalizedLang)?.language ??
        'All'
    );
};

const paginatePortfolio = (
    portfolios: Portfolios,
    pageNumber: number
): Portfolios =>
    portfolios.flatMap((_, index) => {
        const data = portfolios[index + pageNumber];
        return index >= 9 ? [] : !data ? [] : [data];
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
