import React from 'react';
import styled from 'styled-components';
import Footer from '../footer';
import Header from '../header';
import GlobalStyle from '../../theme/global-theme';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <>
        <GlobalStyle />
        <Header />
        <GoogleAnalytics trackPageViews />
        <Container>{children}</Container>
        <Footer />
    </>
);

const Container = styled.div`
    width: 100%;
    margin: auto;
`;

export default Layout;
