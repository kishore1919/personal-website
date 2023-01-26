import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GlobalContainer } from '../src/web/theme/global-theme';
import type { NextPage } from 'next';
import Seo from '../src/web/components/seo';

const Home: NextPage = () => {
    const [state, setState] = React.useState({
        time: Date.now(),
    });

    const { time } = state;
    const startDate = new Date(2021, 1, 1);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setState((prev) => ({
                ...prev,
                time: Date.now(),
            }));
        }, 1000);
        return () => clearTimeout(timer);
    }, [time]);

    const isDay = () => {
        const hours = new Date(time).getHours();
        return hours >= 6 && hours < 18;
    };

    const Projects = ({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) => <Link href="/projects">{children}</Link>;

    return (
        <GlobalContainer>
            <Seo
                title="Home"
                keywords={['Home', 'Game', 'TicTacToe', 'ConnectFour']}
                content="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. You can relax and have a game or two here before you start to browse other pages"
            />
            <TwoColumnWrapper>
                <Message>
                    <Name>Gervin</Name>
                </Message>
                <ContentContainer>
                    <Content>
                        {isDay() ? 'Bonjour' : 'Bonsoir'}! Je vous remercie de
                        votre visite!
                    </Content>
                    <Content>
                        I am Gervin, I am not a french and I am a full time
                        Software Engineer in Didian by day and an undergraduate
                        undertaking Bachelor of Science in Software Engineering
                        by night
                    </Content>
                    <Content>
                        I have been coding since {startDate.getUTCFullYear()},
                        it all started when I wanted to make a Chess game with
                        Java Swing and subsequently with LibGDX framework, then
                        with an intern applicant test, I expanded into
                        TypeScript making web application and mobile
                        application. After some time, I started using Rust to
                        build terminal tool
                    </Content>
                    <Content>
                        Having said that, TypeScript, Java and Rust are my
                        primary languages in software engineering even though I
                        believe I can use other languages as well, except for
                        PHP
                    </Content>
                    <Content>
                        Meanwhile, being able to work on web application, mobile
                        application and development tools are where my passion
                        lies. You can find my full projects list{' '}
                        <Projects>here</Projects>
                    </Content>
                    <Content>
                        Outside of programming, I enjoy reading some interesting
                        articles, working out and playing video games with my
                        friends
                    </Content>
                </ContentContainer>
            </TwoColumnWrapper>
            <ProjectButtonContainer>
                <Projects>
                    <ProjectButton>VIEW MY PROJECTS</ProjectButton>
                </Projects>
            </ProjectButtonContainer>
        </GlobalContainer>
    );
};

const Message = styled.div`
    display: grid;
    place-items: center;
`;

const Name = styled.p`
    text-align: left;
    font-size: 4em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    margin: 1vw;
    @media (max-width: 994px) {
        text-align: center;
    }
    @media (max-width: 586px) {
        font-size: 3em;
    }
    @media (max-width: 286px) {
        font-size: 2em;
    }
    text-transform: uppercase;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    text-shadow: 4px 1px ${({ theme }) => theme.green},
        -4px 1px ${({ theme }) => theme.red};
`;

const TwoColumnWrapper = styled.div`
    justify-content: space-around;
    align-items: center;
    display: flex;
    flex-direction: column;
    transition: 0.5s ease all;
`;

const ContentContainer = styled.div`
    width: 60%;
    @media (max-width: 994px) {
        width: 70%;
    }
    @media (max-width: 882px) {
        width: 80%;
    }
    @media (max-width: 682px) {
        width: 85%;
    }
`;

const Content = styled.p`
    text-align: justify;
    margin: 36px 0;
    > a {
        color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    }
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
`;

const ProjectButtonContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 30px;
    > a {
        text-decoration: none;
    }
`;

const ProjectButton = styled.div`
    font-size: 1em;
    padding: 16px 48px;
    border: 1px solid ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.red};
    background: linear-gradient(
        to right,
        ${({ theme }) => theme.red} 50%,
        transparent 50%
    );
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.2s ease-out;
    cursor: pointer;
    :hover {
        background-position: left bottom;
        color: ${({ theme }) => theme.theme.secondaryColor};
    }
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

export default Home;
