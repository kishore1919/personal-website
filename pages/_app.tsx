import React from 'react';
import type { AppProps } from 'next/app';
import {
    getConfigKey,
    getTheme,
    getThemeFromConfigValue,
    getThemeFromPrevTheme,
    config,
} from '../src/web/theme/colorTheme';
import styled, { ThemeProvider } from 'styled-components';
import Layout from '../src/web/App';
import Font from '../src/web/components/common/Font';
import ErrorBoundary from '../src/web/components/error/ErrorBoundary';
import HashLoading from '../src/web/components/error/HashLoading';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

const App = ({ Component, pageProps }: AppProps) => {
    const { key } = config;

    const [state, setState] = React.useState({
        theme: (() => {
            if (typeof localStorage === 'undefined') {
                return getTheme(true);
            }
            const value = localStorage.getItem(key);
            return value
                ? getThemeFromConfigValue(value)
                : getTheme(
                      window.matchMedia('(prefers-color-scheme: dark)').matches
                  );
        })(),
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
                <Font />
                <ErrorBoundary>
                    <React.Suspense fallback={<HashLoading />}>
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
                    </React.Suspense>
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
