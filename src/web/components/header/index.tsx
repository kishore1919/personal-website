import React from 'react';
import styled, { DefaultTheme, keyframes } from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import NavLinks from '../navigation/links';
import useWindowResize from '../../hook/window-width-resize';

type BackToTopAnimation = Readonly<{
    isSlideIn: boolean;
}>;

const BackToTop = ({
    isScroll,
}: Readonly<{
    isScroll: boolean;
}>) => {
    const [state, setState] = React.useState({
        isLoad: isScroll,
        isAnimate: isScroll,
    });

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            isAnimate: isScroll,
        }));
        const timer = setTimeout(
            () =>
                setState((prev) => ({
                    ...prev,
                    isLoad: isScroll,
                })),
            isScroll ? 350 : 0
        );
        return () => clearTimeout(timer);
    }, [isScroll]);

    const { isAnimate, isLoad } = state;

    return !isLoad ? null : (
        <BackToTopContainer>
            <ArrowUpContainer
                isSlideIn={isAnimate}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ArrowUp />
            </ArrowUpContainer>
        </BackToTopContainer>
    );
};

const Header = (
    _: Readonly<{
        theme: DefaultTheme;
        setTheme: () => void;
    }>
) => {
    const [state, setState] = React.useState({
        isScroll: false,
    });

    const { isScroll } = state;
    const { width } = useWindowResize();

    React.useEffect(() => {
        const handlePageOffset = () =>
            setState((prev) => ({
                ...prev,
                isScroll: window.pageYOffset > 100,
            }));
        window.addEventListener('scroll', handlePageOffset);
        return () => {
            window.removeEventListener('scroll', handlePageOffset);
        };
    }, []);

    return !width ? null : (
        <Container>
            <NavWrapper>
                <NavLinks />
            </NavWrapper>
            <BackToTop isScroll={isScroll} />
        </Container>
    );
};

const Container = styled.header`
    background-color: transparent;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

const NavWrapper = styled.div`
    box-sizing: border-box;
    padding: 36px 0;
`;

const BackToTopContainer = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
    margin: 0 12px 12px 0;
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

const ArrowUpContainer = styled.button`
    border-radius: 50%;
    border: none;
    padding: 16px;
    margin: 16px;
    box-shadow: 0 0 3px black;
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -moz-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -webkit-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -o-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
        ease 0.5s;
    -ms-animation: ${({ isSlideIn }: BackToTopAnimation) =>
            isSlideIn ? FadeIn : FadeOut}
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
    font-size: 1.15em !important;
    color: ${({ theme }) => theme.theme.primaryColor} !important;
`;

export default Header;
