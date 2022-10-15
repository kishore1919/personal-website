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
            const name = parseAsString(repo.name).elseThrow(
                'name is not a string'
            );
            return ![
                'adonix-blog',
                'my-web',
                'LibGDX-Chess-Game',
                'TextEditorFX',
                'SimpleParallelChessAI',
                'AndroidSimpleAIChess',
            ].includes(name)
                ? []
                : [
                      parseAsReadonlyObject(repo, (repo) => ({
                          name,
                          languages: [
                              parseAsString(repo.language).elseThrow(
                                  `language for ${repo.name} is not a string`
                              ),
                          ],
                          description: parseAsString(
                              repo.description
                          ).elseThrow(
                              `description for ${repo.name} is not a string`
                          ),
                          url: parseAsString(repo.html_url).elseThrow(
                              `html url for ${repo.name} is not a string`
                          ),
                      })).elseThrow('repo is not an object'),
                  ];
        }
    )
        .elseThrow('repositories is not an array')
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
                              parseAsString(repo.language).elseThrow(
                                  'language is not a string'
                              ),
                          ]
            )
                .elseThrow('repositories is not an array')
                .flat()
        )
    ).filter((language) => language !== 'Makefile');

    return parseAsReadonlyObject(
        await (
            await fetch(`https://api.github.com/orgs/${organizationName}`)
        ).json(),
        (organization) => ({
            languages,
            name: parseAsString(organization.login).elseThrow(
                'login is not a string'
            ),
            description: parseAsString(organization.description).elseThrow(
                'description is not a string'
            ),
            url: parseAsString(organization.html_url).elseThrow(
                'html_url is not a string'
            ),
        })
    ).elseThrow('organization is not an object');
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

const generatePortfolioData = async () => {
    const force = process.argv[2];
    const path = `${process.cwd()}/src/api/portfolio/data.json`;
    const cache = portfolioCache(path);
    if (cache.hasBeenCreated() && force !== '-f') {
        console.log(`cache has been created at ${path}`);
    } else {
        cache.create(
            (
                await Promise.all(
                    ['UTARi-Accommodation', 'Gitignored-App', 'Packer-Man'].map(
                        fetchGithubOrganization
                    )
                )
            ).concat(await fetchGithubUserRepo())
        );
    }
};

generatePortfolioData();
