import axios from 'axios';
import parse from 'parse-dont-validate';
import { Portfolios } from '../../src/common/portfolio';
import fs from 'fs';

const fetchGithubUserRepo = async (): Promise<Portfolios> =>
    parse(
        await (
            await axios.get(
                'https://api.github.com/users/GervinFung/repos?per_page=50'
            )
        ).data
    )
        .asReadonlyArray((repo) => {
            const name = parse(repo.name)
                .asString()
                .elseThrow('name is not a string');
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
                      parse(repo)
                          .asReadonlyObject((repo) => ({
                              name,
                              languages: [
                                  parse(repo.language)
                                      .asString()
                                      .elseThrow(
                                          `language for ${repo.name} is not a string`
                                      ),
                              ],
                              description: parse(repo.description)
                                  .asString()
                                  .elseThrow(
                                      `description for ${repo.name} is not a string`
                                  ),
                              url: parse(repo.html_url)
                                  .asString()
                                  .elseThrow(
                                      `html url for ${repo.name} is not a string`
                                  ),
                          }))
                          .elseThrow('repo is not an object'),
                  ];
        })
        .elseThrow('repositories is not an array')
        .flat();

const fetchGithubOrganization = async (
    organizationName: string
): Promise<Portfolios[0]> => {
    const languages = Array.from(
        new Set(
            parse(
                await (
                    await axios.get(
                        `https://api.github.com/orgs/${organizationName}/repos`
                    )
                ).data
            )
                .asReadonlyArray((repo) =>
                    !repo.language
                        ? []
                        : [
                              parse(repo.language)
                                  .asString()
                                  .elseThrow('language is not a string'),
                          ]
                )
                .elseThrow('repositories is not an array')
                .flat()
        )
    ).filter((language) => language !== 'Makefile');

    return parse(
        await (
            await axios.get(`https://api.github.com/orgs/${organizationName}`)
        ).data
    )
        .asReadonlyObject((organization) => ({
            languages,
            name: parse(organization.login)
                .asString()
                .elseThrow('login is not a string'),
            description: parse(organization.description)
                .asString()
                .elseThrow('description is not a string'),
            url: parse(organization.html_url)
                .asString()
                .elseThrow('html_url is not a string'),
        }))
        .elseThrow('organization is not an object');
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
