import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Data, parseAsPortfolioData } from '../parser/portfolio';
import { GlobalContainer } from '../theme/GlobalTheme';
import Title from '../components/Title';
import Surprise from '../components/portfolio/Surprise';
import Loading from '../components/portfolio/Loading';
import { useHistory, useLocation } from 'react-router-dom';
import { portfolioQuery, apiPortfolioQuery, parseAsQueryParams } from '../url';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import useWindowResize from '../hook/windowWidthResize';

type PortfolioImageBackgroundProps = Readonly<{
    backgroundImage: string;
}>;

type PortfolioData = Readonly<{
    data: Data;
}>;

const Portfolio = () => {
    const history = useHistory();
    const location = useLocation();
    const { search } = location;
    const dotBreakPoint = 586;

    const [state, setState] = React.useState({
        data: undefined as Data | undefined,
        queryParams: parseAsQueryParams(search),
        isPush: false,
        isShow: false,
        isInitialLoad: true,
        isFetched: false,
    });

    const { data, queryParams, isInitialLoad, isPush, isShow, isFetched } =
        state;

    const { width } = useWindowResize();

    const url = portfolioQuery(queryParams);

    React.useEffect(() => {
        if (!isInitialLoad) {
            if (isPush) {
                history.push(`/portfolio?${url}`);
            }
            setState((prev) => ({
                ...prev,
                isFetched: false,
            }));
            fetch(apiPortfolioQuery(url))
                .then((response) => response.json())
                .then((json) => {
                    setState((prev) => ({
                        ...prev,
                        data: parseAsPortfolioData(json),
                        isFetched: true,
                    }));
                })
                .catch((error) => {
                    setState((prev) => ({
                        ...prev,
                        isFetched: true,
                    }));
                    console.error(error);
                });
        }
    }, [url, isInitialLoad]);

    React.useEffect(
        () =>
            history.listen(({ pathname, search }) => {
                if (pathname.startsWith('/portfolio')) {
                    setState((prev) => ({
                        ...prev,
                        isPush: false,
                        queryParams: parseAsQueryParams(search),
                    }));
                }
            }),
        [history]
    );

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            isInitialLoad: false,
        }));
        const surprise = showSurprise();
        if (!surprise) {
            return;
        }
        return () => clearTimeout(surprise);
    }, []);

    const showSurprise = () => {
        const viewedKey = '20799527-d73d-4ebd-87a9-efdca713af3e';
        const value = localStorage.getItem(viewedKey);
        if (!value) {
            return setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    isShow: true,
                }));
                localStorage.setItem(viewedKey, JSON.stringify(true));
            }, 5500);
        }
        return undefined;
    };

    const ShowPortfolios = ({ data: { portfolios } }: PortfolioData) => (
        <Container>
            <PortfolioContainer>
                {portfolios.map(({ name, description, url }) => (
                    <PortfolioItemContainer key={name}>
                        <PortfolioImageBackground
                            backgroundImage={`asset/images/portfolio/background/${name}.webp`}
                        />
                        <ImageTextContainer>
                            <div>
                                <PortfolioLink href={url}>
                                    <PortfolioLogo
                                        src={`asset/images/portfolio/logo/${name}.webp`}
                                        alt={`${name}.webp`}
                                    />
                                </PortfolioLink>
                            </div>
                            <Caption>{description}</Caption>
                        </ImageTextContainer>
                    </PortfolioItemContainer>
                ))}
            </PortfolioContainer>
        </Container>
    );

    const customQueryPortfolio = (page: number) =>
        queryPortfolio(
            page,
            new URLSearchParams(search).get('language') || 'All'
        );

    const getNextPage = (data: Data): number => {
        const { page } = queryParams;
        return page === data.page - 1 ? 0 : page + 1;
    };

    const getPrevPage = (data: Data): number => {
        const { page } = queryParams;
        return page === 0 ? data.page - 1 : page - 1;
    };

    const Buttons = ({ data }: PortfolioData) =>
        data.page === 1 ? null : (
            <div>
                <LeftButton
                    onClick={() => customQueryPortfolio(getPrevPage(data))}
                >
                    <LeftCircle />
                </LeftButton>
                <RightButton
                    onClick={() => customQueryPortfolio(getNextPage(data))}
                >
                    <RightCircle />
                </RightButton>
            </div>
        );

    const DotsNav = ({ data: { page } }: PortfolioData) =>
        page === 1 || width <= dotBreakPoint ? null : (
            <Dots>
                {Array.from({ length: page }, (_, i) => {
                    const Component = queryParams.page === i ? ActiveDot : Dot;
                    return (
                        <Component
                            onClick={() => customQueryPortfolio(i)}
                            key={i}
                        />
                    );
                })}
            </Dots>
        );

    const queryPortfolio = (page: number, language: string) => {
        setState((prev) => ({
            ...prev,
            queryParams: {
                ...prev.queryParams,
                page,
                language,
            },
            isPush: true,
        }));
    };

    const LanguageSelector = ({
        data: { language, languages },
    }: PortfolioData) => (
        <LanguageChooser>
            <Languages
                value={language}
                onChange={(event) => queryPortfolio(0, event.target.value)}
            >
                {[
                    <option key={0} disabled={true}>
                        Language
                    </option>,
                ].concat(
                    languages.map((language) => (
                        <option key={language}>{language}</option>
                    ))
                )}
            </Languages>
        </LanguageChooser>
    );

    return (
        <GlobalContainer>
            <Title
                title="Portfolio"
                content="PoolOfDeath20 or Gervin's repositories on github, the portfolio page"
            />
            {data ? (
                <>
                    <LanguageSelector data={data} />
                    <ShowPortfolios data={data} />
                    <Buttons data={data} />
                    <DotsNav data={data} />
                </>
            ) : isFetched ? null : (
                <Loading />
            )}
            <Surprise
                isShow={isShow}
                closeMessage={() =>
                    setState((prev) => ({
                        ...prev,
                        isShow: false,
                    }))
                }
            />
        </GlobalContainer>
    );
};

const LanguageChooser = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Languages = styled.select`
    font-size: 1.1em;
    margin: 0 0 15px 0;
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    border: 3px solid ${({ theme }) => theme.theme.secondaryColor};
    color: ${({ theme }) => theme.theme.primaryColor};
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
`;

const Container = styled.div`
    display: flex;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
`;

const PortfolioContainer = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100vw;
    animation: fadeIn ease 0.5s;
    @media (max-width: 877px) {
        flex-direction: column;
    }
`;

const PortfolioImageBackground = styled.div`
    height: 40vh;
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${({
        backgroundImage,
    }: PortfolioImageBackgroundProps) => backgroundImage});
    @media (max-width: 877px) {
        height: 250px;
    }
`;

const PortfolioItemContainer = styled.div`
    width: calc(100% / 3);
    position: relative;
    justify-content: center;
    align-items: center;
    &:hover ${PortfolioImageBackground} {
        transition: all 1s ease;
        filter: brightness(20%);
    }
    @media (max-width: 877px) {
        width: 100%;
    }
`;

const Caption = styled.div`
    transition: 1s;
    font-size: 0.9em;
    font-weight: 600;
    color: transparent;
    width: 30vw;
    @media (max-width: 877px) {
        width: 50vw;
        font-size: 1em;
    }
    @media (max-width: 586px) {
        font-size: 0.7em;
    }
`;

const ImageTextContainer = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding-left: 100px;
    padding-right: 100px;
    width: calc(100% - 200px);
    &:hover ${Caption} {
        color: ${({ theme }) => theme.greenColor};
    }
`;

const PortfolioLink = styled.a.attrs({
    target: 'blank',
    rel: 'noopener noreferrer',
})`
    display: block;
`;

const PortfolioLogo = styled.img`
    width: 15vh;
    margin-bottom: 20px;
    @media (max-width: 877px) {
        width: 10vh;
        margin-bottom: 20px;
    }
    @media (max-width: 586px) {
        width: 10vh;
        margin-bottom: 5px;
    }
`;

const PortfolioNavButton = styled.div`
    cursor: pointer;
    position: fixed;
    top: 50%;
`;

const LeftButtonSlideIn = keyframes`
    0% {left: -50%;}
    100% {left: 0%;}
`;

const LeftButton = styled(PortfolioNavButton)`
    left: 0;
    animation: ${LeftButtonSlideIn} ease 1.5s;
    -moz-animation: ${LeftButtonSlideIn} ease 1.5s;
    -webkit-animation: ${LeftButtonSlideIn} ease 1.5s;
    -o-animation: ${LeftButtonSlideIn} ease 1.5s;
    -ms-animation: ${LeftButtonSlideIn} ease 1.5s;
`;

const RightButtonSlideIn = keyframes`
    0% {right: -50%;}
    100% {right: 0%;}
`;

const RightButton = styled(PortfolioNavButton)`
    right: 0;
    animation: ${RightButtonSlideIn} ease 1.5s;
    -moz-animation: ${RightButtonSlideIn} ease 1.5s;
    -webkit-animation: ${RightButtonSlideIn} ease 1.5s;
    -o-animation: ${RightButtonSlideIn} ease 1.5s;
    -ms-animation: ${RightButtonSlideIn} ease 1.5s;
`;

const FaChevronCircle = css`
    height: auto;
    width: 50px;
    border-radius: 50%;
    color: ${({ theme }) => theme.theme.secondaryColor};
    transition: all 0.2s ease;
    &:hover {
        color: ${({ theme }) => theme.theme.primaryColor};
    }
`;

const LeftCircle = styled(FaChevronCircleLeft)`
    ${FaChevronCircle};
    padding: 0 0 0 2px;
`;

const RightCircle = styled(FaChevronCircleRight)`
    ${FaChevronCircle};
    padding: 0 2px 0 0;
`;

const Dots = styled.div`
    margin-top: 10px;
    text-align: center;
`;

const Dot = styled.div`
    cursor: pointer;
    height: 16px;
    width: 40px;
    margin: 10px;
    background-color: transparent;
    display: inline-block;
    border: 3px solid ${({ theme }) => theme.theme.secondaryColor};
    &:hover {
        transition: all 0.2s ease-in;
        background-color: ${({ theme }) => theme.theme.secondaryColor};
    }
    @media (max-width: 877px) {
        height: 10px;
        width: 20px;
    }
`;

const ActiveDot = styled(Dot)`
    background-color: ${({ theme }) => theme.theme.secondaryColor};
`;

export default Portfolio;
