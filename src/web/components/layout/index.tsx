import React from 'react';
import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import Footer from '../footer';
import Header from '../header';
import GlobalStyle from '../../theme/global-theme';

const Layout = ({
    theme,
    children,
    setTheme,
}: Readonly<{
    theme: DefaultTheme;
    setTheme: () => void;
    children: React.ReactNode;
}>) => (
    <>
        <GlobalStyle />
        <Header theme={theme} setTheme={setTheme} />
        <Container>{children}</Container>
        <Footer />
    </>
);

const Container = styled.div`
    width: 100%;
    margin: auto;
`;

export default Layout;
