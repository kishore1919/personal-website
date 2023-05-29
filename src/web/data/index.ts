import resume from 'resume';
import { guard } from '../../common/type';

const projectUtil = {
    subProjectIndicator: '->',
} as const;

const projects = () => {
    const { openSourceProjects } = resume;

    const gitignored = openSourceProjects.gitignored();
    const npmPackages = openSourceProjects.npmPackages();
    const utari = openSourceProjects.utari();

    const replacePresentWithNow =
        (index: number) => (strings: ReadonlyArray<string>) =>
            guard({
                error: () =>
                    new Error(
                        `replacePresentWithNow has no element at index ${index}`
                    ),
                value: strings
                    .map((string) => string.replace('Present', 'Now'))
                    .at(index),
            });

    const replacePresentWithNowFirst = replacePresentWithNow(0);

    return (
        [
            {
                name: gitignored.project,
                brief: 'Blazingly fast development tools to generate useful gitignore templates',
                date: replacePresentWithNowFirst(
                    gitignored.aboutAndDateList.map((param) => param.date)
                ),
                tags: [
                    'Command-line Interfaces',
                    'Development Tools',
                    'Web Scrap',
                    'Developer Experience',
                ],
                imagesName: ['main', 'templates', 'more-templates', 'cli'],
                externalLinks: {
                    github: 'https://github.com/Gitignored-App',
                    homePage: 'https://gitignored.vercel.app',
                },
                description: gitignored.descriptions.flatMap(
                    (param) => param.descriptions
                ),
            },
            {
                name: 'parse-dont-validate',
                brief: 'Validating data acts as a gatekeeper, parsing them into meaningful data types adds valuable information to raw data',
                date: replacePresentWithNowFirst(
                    npmPackages.aboutAndDateList.map((param) => param.date)
                ),
                tags: [
                    'Open Source',
                    'Data Validation',
                    'Immutable Data',
                    'NPM package',
                ],
                imagesName: ['main'],
                externalLinks: {
                    github: 'https://github.com/GervinFung/parse-dont-validate',
                    homePage:
                        'https://www.npmjs.com/package/parse-dont-validate',
                },
                description: [
                    ...npmPackages.descriptions.flatMap((param) =>
                        param.title.includes('denoify')
                            ? []
                            : `${guard({
                                  value: param.title.split(' - ').at(0),
                                  error: () =>
                                      new Error(
                                          'Title do not have first element'
                                      ),
                              })} ${projectUtil.subProjectIndicator} ${
                                  param.descriptions
                              }`
                    ),
                ],
            },
            {
                name: 'ts-add-js-extension',
                brief: 'Append the JavaScript extension to a relative import/export statement without relying on the TypeScript compiler',
                date: replacePresentWithNowFirst(
                    npmPackages.aboutAndDateList.map((param) => param.date)
                ),
                tags: ['Open Source', 'NPM package'],
                imagesName: ['main'],
                externalLinks: {
                    github: 'https://github.com/GervinFung/ts-add-js-extension',
                    homePage:
                        'https://www.npmjs.com/package/ts-add-js-extension',
                },
                description: [
                    [
                        `ts-add-js-extension ${projectUtil.subProjectIndicator} This package automates the process of adding a file extension to transpiled JavaScript code in ESM format`,
                        'The absence of a file extension in the transpiled files can prevent successful importing and exporting of the code, thus affecting execution of the code',
                        'The package searches for the transpiled files and adds the specified JavaScript file extension to resolve the issue',
                    ].join('. '),
                ],
            },
            {
                name: 'UTARi',
                brief: 'Final Year Project - an application to help UTAR students look for accommodations around UTAR area',
                date: replacePresentWithNowFirst(
                    utari.aboutAndDateList.map((param) => param.date)
                ),
                tags: [
                    'Final Year Project',
                    'Pet Project',
                    'Web Scrap',
                    'Data Validation',
                ],
                imagesName: [
                    'home',
                    'general-unit',
                    'detailed-unit',
                    'how-it-works',
                ],
                externalLinks: {
                    github: 'https://github.com/UTARi-Accommodation',
                },
                description: utari.descriptions.flatMap(
                    (param) => param.descriptions
                ),
            },
            {
                name: 'LibGDX-Chess-Game',
                brief: 'A LibGDX based Parallel AI Chess Game playable on many devices from Level 1 to Level 10',
                date: 'Feb 2021 - Jun 2021',
                tags: [
                    'Indie Game',
                    'Pet Project',
                    'Immutable Data Structure',
                    'AI',
                    'Algorithm',
                ],
                imagesName: ['welcome', 'about', 'normal', 'yellow', 'blue'],
                externalLinks: {
                    github: 'https://github.com/GervinFung/LibGDX-Chess-Game',
                },
                description: [
                    'Developed a Chess Titan alternative using Java Swing, Android UI, and later libGDX frameworks to enable efficient maintenance and mobile deployment, incorporating features such as move highlighting, adjustable AI levels, move history, available moves display, undo functionality and more. Acquired proficiency in both object-oriented and functional programming, as well as data structures, algorithms, and multithreading. Recognized with 9 developer stars and 3 forks',
                ],
            },
            {
                name: 'TextEditorFX',
                brief: 'Fist JavaFX project - an upgraded version of the previous Text Editor',
                date: 'May 2021 - Jun 2021',
                tags: [
                    'Notepad Alternative',
                    'Pet Project',
                    'State Management',
                ],
                imagesName: ['home', 'feature'],
                externalLinks: {
                    github: 'https://github.com/GervinFung/TextEditorFX',
                },
                description: [
                    `To address the issue of Notepad's problematic undo functionality which reverts to unintended third edit instead of the first, I created a more reliable alternative editor that encompasses all the essential features of Notepad, but with proper undo capability. This editor has potential for future enhancements. A peer developer has acknowledged its success with a star`,
                ],
            },
        ] as const
    ).map(
        (project) =>
            ({
                id: project.name.toLowerCase(),
                ...project,
            } as const)
    );
};

export { projectUtil, projects };
