import * as React from 'react';
import styled, { css, DefaultTheme, keyframes } from 'styled-components';
import { FaSun, FaMoon, FaArrowUp } from 'react-icons/fa';
import { isPrimary } from '../util/theme/colorTheme';
import { HashLoading, ErrorBoundary } from './HashLoading';
const NavLinks = React.lazy(() => import('./NavLinks'));
const FullScreen = React.lazy(() => import('./FullScreenNav'));

interface BackToTopAnimation {
    readonly slideIn: boolean;
}

interface BackToTopProps {
    readonly scroll: boolean;
}

const BackToTop = ({ scroll }: BackToTopProps) => {
    const [state, setState] = React.useState({
        animate: scroll,
        load: scroll,
    });

    React.useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            animate: scroll,
        }));
        setTimeout(
            () =>
                setState((prevState) => ({
                    ...prevState,
                    load: scroll,
                })),
            scroll ? 350 : 0
        );
    }, [scroll]);

    const { animate, load } = state;

    if (load) {
        return (
            <BackToTopContainer>
                <ArrowUpContainer
                    slideIn={animate}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <ArrowUp />
                </ArrowUpContainer>
            </BackToTopContainer>
        );
    }
    return null;
};

interface HeaderProps {
    readonly theme: DefaultTheme;
    readonly updateTheme: () => void;
}

const Header = ({ theme, updateTheme }: HeaderProps) => {
    const hamburgerBreakPoint = 646;

    const [state, setState] = React.useState({
        show: false,
        scroll: false,
        width: window.innerWidth,
    });

    React.useEffect(() => {
        const handlePageOffset = () =>
            setState((prevState) => ({
                ...prevState,
                scroll: window.pageYOffset > 100,
            }));
        window.addEventListener('scroll', handlePageOffset);
        return () => {
            window.removeEventListener('scroll', handlePageOffset);
        };
    }, []);

    React.useEffect(() => {
        const handleResizeWindow = () =>
            setState((prevState) => ({
                ...prevState,
                width: window.innerWidth,
            }));
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    const setShow = (show: boolean) =>
        setState((prevState) => ({
            ...prevState,
            show,
        }));

    const { show, scroll, width } = state;

    const ToggleComponent = () =>
        isPrimary(theme) ? <ToggleThemeSun /> : <ToggleThemeMoon />;

    const NavLinksElem = () =>
        width <= hamburgerBreakPoint ? null : (
            <NavLinks fullScreen={false} close={() => setShow(false)} />
        );

    const HamburgerNavElem = () =>
        width > hamburgerBreakPoint ? null : (
            <HamburgerNav onClick={() => setShow(true)}>
                <HamburgerButton>☰</HamburgerButton>
            </HamburgerNav>
        );

    return (
        <Container>
            <NavWrapper>
                <ErrorBoundary>
                    <React.Suspense fallback={<HashLoading />}>
                        <NavLinksElem />
                        <RightSide>
                            <ToggleThemeContainer>
                                <ToggleThemeButton onClick={updateTheme}>
                                    <ToggleComponent />
                                </ToggleThemeButton>
                            </ToggleThemeContainer>
                            <Brand>
                                <Name
                                    onClick={() =>
                                        window.scrollTo(
                                            0,
                                            document.body.scrollHeight
                                        )
                                    }
                                >
                                    PoolOfDeath20
                                </Name>
                            </Brand>
                            <HamburgerNavElem />
                        </RightSide>
                        <FullScreen show={show} close={() => setShow(false)} />
                    </React.Suspense>
                </ErrorBoundary>
            </NavWrapper>
            <BackToTop scroll={scroll} />
        </Container>
    );
};

const Container = styled.header`
    background-color: transparent;
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 38px;
    @media (max-width: 962px) {
        display: block;
    }
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    @media (max-width: 994px) {
        justify-content: center;
        margin-bottom: 20px;
    }
    @media (max-width: 646px) {
        display: grid;
        text-align: center;
        > div {
            margin: 7px 0 7px 0;
        }
    }
`;

const ToggleThemeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ToggleThemeButton = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    width: 35px;
    height: 35px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;

const ToggleTheme = css`
    letter-spacing: 1px !important;
    color: ${({ theme }) => theme.theme.primaryColor};
    font-size: 1.5em !important;
`;

const ToggleThemeSun = styled(FaSun)`
    ${ToggleTheme}
`;
const ToggleThemeMoon = styled(FaMoon)`
    ${ToggleTheme}
`;

const Brand = styled.div`
    color: ${({ theme }) => theme.theme.secondaryColor};
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px 5px 10px;
    @media (max-width: 586px) {
        font-size: 1em;
    }
`;

const Name = styled.span`
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.theme.secondaryColor};
`;

const HamburgerNav = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
`;

const HamburgerButton = styled.button`
    background-color: transparent;
    font-size: 2em;
    color: ${({ theme }) => theme.theme.secondaryColor};
    border: none;
`;

const BackToTopContainer = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const FadeOut = keyframes`
    0% {
        opacity:1;
        transform: scale(1);
    }
    100% {
        opacity:0;
        transform: scale(0.9);
    }
`;

const FadeIn = keyframes`
    0% {
        opacity:0;
        transform: scale(0.9);
    }
    100% {
        opacity:1;
        transform: scale(1);
    }
`;

const ArrowUpContainer = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    padding: 15px;
    margin: 10px;
    animation: ${({ slideIn }: BackToTopAnimation) =>
            slideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -moz-animation: ${({ slideIn }: BackToTopAnimation) =>
            slideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -webkit-animation: ${({ slideIn }: BackToTopAnimation) =>
            slideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -o-animation: ${({ slideIn }: BackToTopAnimation) =>
            slideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -ms-animation: ${({ slideIn }: BackToTopAnimation) =>
            slideIn ? FadeIn : FadeOut}
        ease 0.5s;
    &:hover {
        cursor: pointer;
        transition: 0.1s ease all;
    }
    &:active {
        transform: scale(1.25);
    }
    &:focus {
        outline: none;
    }
`;

const ArrowUp = styled(FaArrowUp)`
    font-size: 1.5em !important;
    color: ${({ theme }) => theme.theme.primaryColor} !important;
`;

export default Header;
