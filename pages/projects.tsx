import React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../src/web/theme/global-theme';
import Seo from '../src/web/components/seo';
import Image from 'next/image';
import useWordScramble from '../src/web/hook/word-scramble';

const Project = () => (
    <GlobalContainer>
        <Seo
            title="Projects"
            keywords={['Project', 'Software Engineer']}
            content="Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
        />
        <ProjectContainer>
            {(
                [
                    {
                        name: 'Gitignored-App',
                        description:
                            'Blazingly fast development tools to generate useful gitignore templates',
                        tools: [
                            'rust',
                            'cargo',
                            'nextjs',
                            'mongodb',
                            'vercel',
                            'typescript',
                            'styled-components',
                        ],
                        url: 'https://github.com/Gitignored-App',
                    },
                    {
                        name: 'Packer-Man',
                        description:
                            'A place that contains all of the packages I wrote to solve my problem',
                        tools: ['typescript', 'npm', 'dart'],
                        url: 'https://github.com/Packer-Man',
                    },
                    {
                        name: 'UTARi-Accommodation',
                        description:
                            'Final Year Project - an application to help UTAR students look for accommodations around UTAR area',
                        tools: [
                            'typescript',
                            'react',
                            'node',
                            'postgresql',
                            'firebase',
                            'heroku',
                            'netlify',
                            'styled-components',
                        ],
                        url: 'https://github.com/UTARi-Accommodation',
                    },
                    {
                        name: 'adonix-blog',
                        description: 'Personal Blog - Remake of Adonis OS Blog',
                        tools: [
                            'typescript',
                            'nextjs',
                            'mui',
                            'firebase',
                            'postgresql',
                            'vercel',
                        ],
                        url: 'https://github.com/GervinFung/adonix-blog',
                    },
                    {
                        name: 'LibGDX-Chess-Game',
                        description:
                            'A LibGDX based Parallel AI Chess Game playable on many devices from Level 1 to Level 10',
                        tools: ['libgdx', 'java'],
                        url: 'https://github.com/GervinFung/LibGDX-Chess-Game',
                    },
                    {
                        name: 'TextEditorFX',
                        description:
                            'Fist JavaFX project - an upgraded version of the previous Text Editor',
                        tools: ['javafx'],
                        url: 'https://github.com/GervinFung/TextEditorFX',
                    },
                ] as const
            ).map(({ name, description, url, tools }) => {
                const path = 'images/projects';

                const wordScrambleState = useWordScramble({
                    count: 20,
                    timeOut: 10,
                    content: description,
                });

                return (
                    <ProjectItemContainer key={name}>
                        <ProjectItemImageContainer
                            onMouseOver={wordScrambleState.start}
                            onFocus={wordScrambleState.start}
                            onMouseOut={wordScrambleState.stop}
                            onBlur={wordScrambleState.stop}
                        >
                            <ProjectItemBackground
                                alt={`${name}.webp`}
                                src={require(`../public/${path}/background/${name}.webp`)}
                            />
                            <ImageTextContainer>
                                <ProjectLogoContainer>
                                    <a
                                        href={url}
                                        target="blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            width={90}
                                            alt={`${name}.webp`}
                                            src={require(`../public/${path}/logo/${name}.webp`)}
                                        />
                                    </a>
                                </ProjectLogoContainer>
                                <Caption>{wordScrambleState.word()}</Caption>
                            </ImageTextContainer>
                        </ProjectItemImageContainer>
                        <ToolContainer>
                            {tools.map((tool, index) => (
                                <ToolElement key={index}>{tool}</ToolElement>
                            ))}
                        </ToolContainer>
                    </ProjectItemContainer>
                );
            })}
        </ProjectContainer>
    </GlobalContainer>
);

const ProjectContainer = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: auto auto auto;
    @media (max-width: 877px) {
        grid-template-columns: auto auto;
    }
    @media (max-width: 530px) {
        grid-template-columns: auto;
    }
`;

const ProjectItemBackground = styled(Image)`
    width: 100%;
    height: auto;
    display: block;
`;

const ProjectItemContainer = styled.div``;

const ProjectItemImageContainer = styled.div`
    position: relative;
    &:hover ${ProjectItemBackground} {
        transition: all 1s ease;
        filter: brightness(20%);
    }
`;

const Caption = styled.div`
    transition: 1s;
    font-size: 0.9em;
    font-weight: 600;
    color: transparent;
    padding: 0 8px;
    box-sizing: border-box;
    word-break: break-word;
    @media (max-width: 877px) {
        width: 50vw;
    }
    @media (max-width: 586px) {
        font-size: 0.7em;
    }
`;

const ImageTextContainer = styled.div`
    top: 0;
    display: grid;
    place-items: center;
    align-content: center;
    position: absolute;
    text-align: center;
    height: 100%;
    width: 100%;
    &:hover ${Caption} {
        color: ${({ theme }) => theme.green};
    }
`;

const ProjectLogoContainer = styled.div`
    padding: 0 0 8px 0;
    box-sizing: border-box;
`;

const ToolContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px;
    justify-content: space-evenly;
    padding: 8px;
    box-sizing: border-box;
    font-size: 0.9em;
    background-color: ${({ theme }) => theme.theme.project.techTool};
`;

const ToolElement = styled.div`
    padding: 8px 12px;
    border-radius: 8px;
    height: fit-content;
    color: ${({ theme }) => theme.theme.project.toolColor};
    background-color: ${({ theme }) => theme.theme.project.toolContainer};
`;

export default Project;
