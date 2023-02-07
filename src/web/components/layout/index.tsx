import React from 'react';
import styled from 'styled-components';
import Footer from '../footer';
import Header from '../header';
import GlobalStyle from '../../theme/global-theme';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <>
        <GlobalStyle />
        <Header />
        <Container>{children}</Container>
        <Footer />
    </>
);

const Container = styled.div`
    width: 100%;
    margin: auto;
`;

export default Layout;
