import React from 'react';
import styled from 'styled-components';
import {
    FullScreenContainer,
    GlobalContainer,
} from '../src/web/theme/global-theme';
import Seo from '../src/web/components/seo';
import Image from 'next/image';
import projects from '../src/web/data/projects';
import CloseFullScreen from '../src/web/components/common/close-full-screen';

type ProjectImageBackgroundProps = Readonly<{
    backgroundImage: string;
}>;

const Surprise = ({
    seconds,
    shownPopup,
    onCloseMessage,
}: Readonly<{
    seconds: string;
    shownPopup: boolean;
    onCloseMessage: () => void;
}>) =>
    shownPopup ? null : (
        <SurpriseContainer>
            <CloseFullScreen color="black" close={onCloseMessage} />
            <Content>
                <img
                    src={require('../public/images/others/surprised.gif')}
                    alt="surprised.gif"
                />
                <HeaderMessage>WOW</HeaderMessage>
                <ParagraphMessage>
                    You have seen my project for more than {seconds} seconds,
                    Thank You!
                </ParagraphMessage>
            </Content>
        </SurpriseContainer>
    );

const Project = () => {
    const popUpWaitDuration = 8000;
    const popUpShownKey = 'shown';

    const [state, setState] = React.useState({
        shownPopup: true,
    });

    const { shownPopup } = state;

    React.useEffect(() => {
        const item = localStorage.getItem(popUpShownKey);
        const surprise =
            item && JSON.parse(item)
                ? undefined
                : setTimeout(() => {
                      setState((prev) => ({
                          ...prev,
                          shownPopup: false,
                      }));
                      localStorage.setItem(popUpShownKey, JSON.stringify(true));
                  }, popUpWaitDuration + 500);
        return () => clearTimeout(surprise);
    }, []);

    return (
        <GlobalContainer>
            <Seo
                title="Projects"
                keywords={['Project', 'Software Engineer']}
                content="Every side projects deemed important/useful will be shown here as projects. All side projects is available as repositories/organization on Github"
            />
            <Surprise
                shownPopup={shownPopup}
                seconds={(popUpWaitDuration / 1000).toFixed(1)}
                onCloseMessage={() =>
                    setState((prev) => ({
                        ...prev,
                        shownPopup: true,
                    }))
                }
            />
            <ProjectContainer>
                {projects.map(({ name, description, url }) => {
                    const path = 'images/projects';
                    return (
                        <ProjectItemContainer key={name}>
                            <ProjectItemBackground
                                backgroundImage={`${path}/background/${name}.webp`}
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
                                <Caption>{description}</Caption>
                            </ImageTextContainer>
                        </ProjectItemContainer>
                    );
                })}
            </ProjectContainer>
        </GlobalContainer>
    );
};

const SurpriseContainer = styled(FullScreenContainer)`
    background-color: #fff44f;
`;

const Content = styled.div`
    text-align: center;
`;

const HeaderMessage = styled.h1`
    color: black;
    font-size: 5em;
`;

const ParagraphMessage = styled.p`
    color: black;
    font-size: 1.25em;
`;

const ProjectContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    animation: fadeIn ease 0.5s;
    @media (max-width: 877px) {
        grid-template-columns: auto;
    }
`;

const ProjectItemBackground = styled.div`
    height: 40vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({
        backgroundImage,
    }: ProjectImageBackgroundProps) => backgroundImage});
    @media (max-width: 877px) {
        height: 250px;
    }
`;

const ProjectItemContainer = styled.div`
    position: relative;
    justify-content: center;
    align-items: center;
    &:hover ${ProjectItemBackground} {
        transition: all 1s ease;
        filter: brightness(20%);
    }
    @media (max-width: 877px) {
        width: 100%;
    }
`;

const Caption = styled.div`
    width: 25vw;
    transition: 1s;
    font-size: 0.9em;
    font-weight: 600;
    color: transparent;
    padding: 0 8px;
    box-sizing: border-box;
    @media (max-width: 877px) {
        width: 50vw;
    }
    @media (max-width: 586px) {
        font-size: 0.7em;
    }
`;

const ImageTextContainer = styled.div`
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

export default Project;
