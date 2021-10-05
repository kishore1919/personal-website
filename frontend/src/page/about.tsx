import React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import Title from '../components/Title';

const About = (): JSX.Element => (
    <ContentContainer>
        <Title
            title={'About'}
            content={
                'Everything you need to know about PoolOfDeath20 or Gervin can be found here'
            }
        />
        <Container>
            <TwoRowsContainer>
                <ProfileImageContainer>
                    <ProfileImage />
                </ProfileImageContainer>
                <div>
                    <ProfileContentContainerHeaderOne>
                        Bonjour! Je vous remercie de votre visite!
                    </ProfileContentContainerHeaderOne>
                    <ProfileContentContainerParagraph>
                        See that guy? It is me! I am Gervin Fung Da Xuen and I
                        am not a French
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        I am an undergraduate studying Software Engineering.
                        Java is my primary language in programming and currently
                        I am trying to learn web development and python.
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        Never in a million years would I have thought the
                        subject that I once hated the most would become my
                        hobby. My 1<sup>st</sup> Program, a.k.a. The Hello World
                        Program was written in C language during my foundation
                        UTAR
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        However during that time I am not interested in
                        programming, it was not until I decided to do some
                        projects myself, that I discover programming can also be
                        very fun, the sheer joy of making things in your own
                        design is simply fantastic and frustrating
                    </ProfileContentContainerParagraph>
                    <ProfileContentContainerParagraph>
                        The Projects in Portfolio Page are what I have
                        programmed during my free time. Hoped you enjoyed!
                    </ProfileContentContainerParagraph>
                </div>
            </TwoRowsContainer>
        </Container>
    </ContentContainer>
);

const ContentContainer = styled(GlobalContainer)``;

const Container = styled.div`
    display: flex;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
`;

const TwoRowsContainer = styled.div`
    width: 90%;
    height: 100%;
    display: block;
`;

const ProfileImageContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    @media (max-width: 877px) {
        flex-direction: column;
        width: 100%;
    }
`;

const ProfileImage = styled.img.attrs({
    src: 'asset/images/others/about.webp',
    alt: 'profile-picture',
})`
    border-radius: 50%;
    width: 25%;
    height: auto;
    @media (max-width: 877px) {
        width: 50%;
    }
`;

const ProfileContentContainerHeaderOne = styled.h1`
    text-align: center;
    font-size: 2.5em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    letter-spacing: 5.5px;
    text-shadow: 4px 2px ${({ theme }) => theme.greenColor},
        -4px 2px ${({ theme }) => theme.redColor};
    @media (max-width: 586px) {
        font-size: 1.5em;
    }
`;

const ProfileContentContainerParagraph = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.theme.aboutMeDescription};
    font-size: 1.3em;
    @media (max-width: 586px) {
        font-size: 1em;
    }
`;

export default About;
