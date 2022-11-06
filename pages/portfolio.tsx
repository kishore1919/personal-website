import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Data, parseAsPortfolioQueryParam } from '../src/web/parser/portfolio';
import { GlobalContainer } from '../src/web/theme/GlobalTheme';
import Surprise from '../src/web/components/portfolio/Surprise';
import { portfolioQuery, url } from '../src/web/url';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import useWindowResize from '../src/web/hook/windowWidthResize';
import { useRouter } from 'next/router';
import { parseAsString } from 'parse-dont-validate';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import {
    processErrorMessage,
    ToastPromise,
} from '../src/web/components/toaser';
import { processPortfolioQuery } from './api/portfolio';
import Seo from '../src/web/components/seo';

type PortfolioImageBackgroundProps = Readonly<{
    backgroundImage: string;
}>;

const getServerSideProps = async (
    context: Parameters<GetServerSideProps>[number]
) => {
    context.res.setHeader(
        'Cache-Control',
        ['immutable', `s-maxage=${24 * 60 * 60 * 10}`].join(', ')
    );

    const getResponse = () => {
        try {
            return {
                status: 'success',
                data: processPortfolioQuery(context),
            } as const;
        } catch (error) {
            return {
                status: 'failed',
                error: processErrorMessage(error),
            } as const;
        }
    };
    return {
        props: {
            response: getResponse(),
        },
    };
};

const Portfolio = (
    serverProps: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const router = useRouter();
    const { query } = router;
    const dotBreakPoint = 586;
    const popUpWaitDuration = 8000;
    const popUpShownKey = 'shown';

    const [state, setState] = React.useState({
        shownPopup: true,
        updatedOn: Date.now(),
        initialDate: Date.now(),
        shouldPushToHistory: false,
        queryParams: parseAsPortfolioQueryParam(query),
    });

    const { response } = serverProps;

    const {
        shownPopup,
        initialDate,
        updatedOn,
        queryParams,
        shouldPushToHistory,
    } = state;

    const { width } = useWindowResize();

    const searchUrl = `${url.portfolio}?${portfolioQuery(queryParams)}`;

    const firstLoad = initialDate === updatedOn;

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

    React.useEffect(() => {
        if (shouldPushToHistory) {
            setState((state) => ({
                ...state,
                shouldPushToHistory: false,
            }));
            router.push(searchUrl.replace('/api', ''));
        }

        const { language } = queryParams;
        const promise = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                switch (response.status) {
                    case 'failed':
                        return reject(response.error);
                    case 'success':
                        return resolve(
                            `Fetched ${language} portfolio${
                                response.data.portfolios.length > 1 ? '' : 's'
                            }`
                        );
                }
            }, 200);
        });

        if (!firstLoad) {
            ToastPromise({
                promise,
                pending: `Fetching ${language} portfolios`,
                success: {
                    render: ({ data }) => data as any,
                },
                error: {
                    render: ({ data }) => data as any,
                },
            });
        } else {
            promise
                .catch((error) => {
                    ToastPromise({
                        success: undefined,
                        pending: undefined,
                        error: {
                            render: ({ data }) => data as any,
                        },
                        promise: new Promise<string>((_, reject) =>
                            reject(error)
                        ),
                    });
                })
                .finally(() =>
                    setState((prev) => ({
                        ...prev,
                        updatedOn: Date.now(),
                    }))
                );
        }
    }, [searchUrl]);

    const customQueryPortfolio = (page: number) =>
        queryPortfolio(
            page,
            parseAsString({
                string: query.language,
                ifParsingFailThen: 'get',
                alternativeValue: 'all',
            })
        );

    const getNextPage = (data: Data): number => {
        const { page } = queryParams;
        return page === data.page - 1 ? 0 : page + 1;
    };

    const getPrevPage = (data: Data): number => {
        const { page } = queryParams;
        return page === 0 ? data.page - 1 : page - 1;
    };

    const queryPortfolio = (page: number, language: string) => {
        setState((prev) => ({
            ...prev,
            shouldPushToHistory: true,
            queryParams: {
                ...prev.queryParams,
                page,
                language,
            },
        }));
    };

    const Content = () => {
        switch (response.status) {
            case 'failed':
                return null;
            case 'success': {
                const { data } = response;
                return (
                    <>
                        <LanguageChooser>
                            <Languages
                                value={data.language}
                                onChange={(event) =>
                                    queryPortfolio(0, event.target.value)
                                }
                            >
                                {[
                                    <option key={0} disabled={true}>
                                        Language
                                    </option>,
                                ].concat(
                                    data.languages.map((language) => (
                                        <option key={language}>
                                            {language}
                                        </option>
                                    ))
                                )}
                            </Languages>
                        </LanguageChooser>
                        <Container>
                            <PortfolioContainer>
                                {data.portfolios.map(
                                    ({ name, description, url }) => (
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
                                    )
                                )}
                            </PortfolioContainer>
                        </Container>
                        {data.page !== 1 && (
                            <div>
                                <LeftButton
                                    onClick={() =>
                                        customQueryPortfolio(getPrevPage(data))
                                    }
                                >
                                    <LeftCircle />
                                </LeftButton>
                                <RightButton
                                    onClick={() =>
                                        customQueryPortfolio(getNextPage(data))
                                    }
                                >
                                    <RightCircle />
                                </RightButton>
                            </div>
                        )}
                        {!(data.page === 1 || width <= dotBreakPoint) && (
                            <Dots>
                                {Array.from(
                                    { length: data.page },
                                    (_, index) => {
                                        const Component =
                                            queryParams.page === index
                                                ? ActiveDot
                                                : Dot;
                                        return (
                                            <Component
                                                key={index}
                                                onClick={() =>
                                                    customQueryPortfolio(index)
                                                }
                                            />
                                        );
                                    }
                                )}
                            </Dots>
                        )}
                    </>
                );
            }
        }
    };

    return (
        <GlobalContainer>
            <Seo
                title="Portfolio"
                keywords={['Portfolio', 'Software Engineer']}
                content="Every side projects deemed important/useful will be shown here as portfolios. All side projects is available as repositories/organization on Github"
            />
            {!shownPopup && (
                <Surprise
                    seconds={(popUpWaitDuration / 1000).toFixed(1)}
                    shownPopup={shownPopup}
                    onCloseMessage={() =>
                        setState((prev) => ({
                            ...prev,
                            shownPopup: true,
                        }))
                    }
                />
            )}
            <Content />
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
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
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

const PortfolioNavButton = styled.button`
    cursor: pointer;
    position: fixed;
    top: 50%;
    background-color: transparent;
    border: none;
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
        transform: scale(1.12);
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

export { getServerSideProps };
export default Portfolio;
