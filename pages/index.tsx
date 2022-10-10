import React from 'react';
import styled from 'styled-components';
import HomeMessage from '../src/web/components/index/HomeMessage';
import Game from '../src/web/components/index/Game';
import Link from 'next/link';
import { GlobalContainer } from '../src/web/theme/GlobalTheme';
import { NextPage } from 'next';
import Seo from '../src/web/components/seo';

const Home: NextPage = () => (
    <GlobalContainer>
        <Seo
            title="Home"
            keywords={['Home', 'Game', 'TicTacToe', 'ConnectFour']}
            content="Everything you want to know about me as a software engineer, can be found here. You can relax and have a game or two here before you start to browse other pages"
        />
        <TwoColumnWrapper>
            <HomeMessage />
            <Game />
        </TwoColumnWrapper>
        <PortfolioButtonContainer>
            <Link href="/portfolio">View My Work</Link>
        </PortfolioButtonContainer>
    </GlobalContainer>
);

const TwoColumnWrapper = styled.div`
    justify-content: space-around;
    align-items: center;
    display: flex;
    transition: 0.5s ease all;
    @media (max-width: 994px) {
        justify-content: center;
        display: block;
    }
`;

const PortfolioButtonContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 30px;
    > a {
        text-align: center;
        position: relative;
        display: block;
        color: ${({ theme }) => theme.theme.highEmphasesTextColor};
        text-decoration: none;
        font-size: 1.3em;
        border: 3px solid ${({ theme }) => theme.ctaColor};
        padding: 16px 25px;
        text-transform: uppercase;
        overflow: hidden;
        transition: 0.5s all ease;

        ::before {
            background: ${({ theme }) => theme.ctaColor};
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: -1;
            transition: all 0.6s ease;
            width: 100%;
            height: 0%;
            transform: translate(-50%, -50%) rotate(45deg);
        }

        :hover::before {
            height: 450%;
        }

        @media (max-width: 388px) {
            font-size: 1em;
            padding: 15px 25px;
        }
    }
`;

export default Home;
