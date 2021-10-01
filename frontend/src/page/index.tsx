import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
const HomeMessage = lazy(() => import('../components/index/HomeMessage'));
const Game = lazy(() => import('../components/index/Game'));
import { Link } from 'react-router-dom';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import Title from '../components/Title';
import { HashLoading, ErrorBoundary } from '../components/HashLoading';

const Home = (): JSX.Element => (
    <ContentContainer>
        <Title title={'Home'} content={'PoolOfDeath20 or Gervin\'s home page'}/>
        <TwoColumnWrapper>
            <ErrorBoundary>
                <Suspense fallback={<HashLoading/>}>
                    <HomeMessage/>
                    <Game/>
                </Suspense>
            </ErrorBoundary>
        </TwoColumnWrapper>
        <PortfolioButtonContainer>
            <Link to='/portfolio'>View My Work</Link>
        </PortfolioButtonContainer>
    </ContentContainer>
);

const ContentContainer = styled(GlobalContainer)``;

const TwoColumnWrapper = styled.div`
    justify-content: space-around;
    align-items: center;
    display: flex;
    transition: 0.5s ease all;
    @media (max-width: 877px) {
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

        ::before{
            background: ${({ theme }) => theme.ctaColor};
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: -1;
            transition: all 0.6s ease;
            width: 100%;
            height: 0%;
            transform: translate(-50%,-50%) rotate(45deg);
        }

        :hover::before{
            height: 450%;
        }

        @media (max-width: 388px) {
            font-size: 1em;
            padding: 15px 25px;
        }
    }
`;

export default Home;