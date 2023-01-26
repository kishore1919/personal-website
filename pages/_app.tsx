import React from 'react';
import type { AppProps } from 'next/app';
import {
    getConfigKey,
    getTheme,
    getThemeFromPrevTheme,
    config,
} from '../src/web/theme/color-theme';
import styled, { ThemeProvider } from 'styled-components';
import Layout from '../src/web/components/layout';
import Font from '../src/web/components/common/font';
import ErrorBoundary from '../src/web/components/error/error-boundary';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const App = ({ Component, pageProps }: AppProps) => {
    const { key } = config;

    const [state, setState] = React.useState({
        theme: getTheme({
            isDark: true,
        }),
    });

    const { theme } = state;

    React.useEffect(() => {
        injectStyle();
    }, []);

    React.useEffect(() => {
        localStorage.setItem(key, getConfigKey(theme));
    }, [JSON.stringify(theme)]);

    return (
        <ThemeProvider theme={theme}>
            <EmptyContainer>
                <ToastContainer bodyClassName="toastBody" />
                <Font family="JetBrains Mono" />
                <ErrorBoundary>
                    <Layout
                        theme={theme}
                        setTheme={() =>
                            setState((prev) => ({
                                ...prev,
                                theme: getThemeFromPrevTheme(theme),
                            }))
                        }
                    >
                        <Component {...pageProps} />
                    </Layout>
                </ErrorBoundary>
            </EmptyContainer>
        </ThemeProvider>
    );
};

const EmptyContainer = styled.main`
    .toastBody {
        font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
    }
`;

export default App;
