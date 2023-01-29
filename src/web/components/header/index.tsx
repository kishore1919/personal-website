import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import NavLinks from '../navigation/links';
import useWindowResize from '../../hook/window-width-resize';

const BackToTop = ({
    isScroll,
}: Readonly<{
    isScroll: boolean;
}>) => {
    const [state, setState] = React.useState({
        isLoad: isScroll,
    });

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
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

    return !state.isLoad ? null : <BackToTopContainer />;
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

export default Header;
