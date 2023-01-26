import fs from 'fs';
import axios from 'axios';
import parse from 'parse-dont-validate';
import type { Projects } from '../../src/common/project';

const fetchGithubUserRepo = async () =>
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
                'LibGDX-Chess-Game',
                'TextEditorFX',
            ].includes(name)
                ? []
                : [
                      parse(repo)
                          .asReadonlyObject((repo) => ({
                              name,
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

const fetchGithubOrganization = async (organizationName: string) =>
    parse(
        await (
            await axios.get(`https://api.github.com/orgs/${organizationName}`)
        ).data
    )
        .asReadonlyObject((organization) => ({
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

const projectsCache = (path: string) => ({
    hasBeenCreated: () => fs.existsSync(path),
    create: (projectss: Projects) =>
        fs.writeFile(
            path,
            [
                `const projects = ${JSON.stringify(
                    projectss,
                    null,
                    4
                )} as const`,
                `export default projects`,
            ].join('\n'),
            (error) =>
                error
                    ? console.error(error)
                    : console.log(`Generated cache for at ${path}`)
        ),
});

const main = async () => {
    const force = process.argv.at(2);
    const path = `${process.cwd()}/src/web/data/projects.ts`;
    const cache = projectsCache(path);
    if (cache.hasBeenCreated() && force !== '--f') {
        console.log(`Cache has been created at ${path}`);
    } else {
        cache.create(
            (
                await Promise.all(
                    ['Gitignored-App', 'Packer-Man', 'UTARi-Accommodation'].map(
                        fetchGithubOrganization
                    )
                )
            ).concat(await fetchGithubUserRepo())
        );
    }
};

main();
