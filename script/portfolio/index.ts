import fetch from 'node-fetch';
import {
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import { Portfolios } from '../../src/common/portfolio';
import fs from 'fs';

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
                          languages: [
                              parseAsString(repo.language).orElseThrowDefault(
                                  `language for ${repo.name}`
                              ),
                          ],
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
    const languages = Array.from(
        new Set(
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
        )
    ).filter((language) => language !== 'Makefile');

    return parseAsReadonlyObject(
        await (
            await fetch(`https://api.github.com/orgs/${organizationName}`)
        ).json(),
        (organization) => ({
            languages,
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

const portfolioCache = (path: string) => ({
    hasBeenCreated: () => fs.existsSync(path),
    create: (portfolios: Portfolios) =>
        fs.writeFile(path, JSON.stringify(portfolios, null, 4), (err) =>
            err
                ? console.error(err)
                : console.log(`generated cache for at ${path}`)
        ),
});

const main = async () => {
    const force = process.argv[2];
    const path = `${process.cwd()}/src/api/portfolio/data.json`;
    const cache = portfolioCache(path);
    if (cache.hasBeenCreated() && force !== '-f') {
        console.log(`cache has been created at ${path}`);
    } else {
        cache.create(
            (
                await Promise.all(
                    ['Utari-Room', 'Gitignored-App', 'P-YNPM'].map(
                        fetchGithubOrganization
                    )
                )
            ).concat(await fetchGithubUserRepo())
        );
    }
};

main();
