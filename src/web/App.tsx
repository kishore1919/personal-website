import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import GlobalStyle from './theme/GlobalTheme';
import { DefaultTheme } from 'styled-components';

const Layout = ({
    children,
    theme,
    setTheme,
}: Readonly<{
    children: React.ReactNode;
    theme: DefaultTheme;
    setTheme: () => void;
}>) => (
    <>
        <GlobalStyle />
        <Header theme={theme} setTheme={setTheme} />
        <div
            style={{
                width: '100%',
                margin: 'auto',
            }}
        >
            {children}
        </div>
        <Footer />
    </>
);

export default Layout;
