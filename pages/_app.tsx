import React from 'react';
import type { AppProps } from 'next/app';
import {
    getConfigKey,
    getTheme,
    getThemeFromConfigValue,
    getThemeFromPrevTheme,
    config,
} from '../src/web/theme/colorTheme';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary, HashLoading } from '../src/web/components/HashLoading';
import Layout from '../src/web/App';

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

    React.useEffect(
        () => localStorage.setItem(key, getConfigKey(theme)),
        [JSON.stringify(theme)]
    );

    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <Layout
                        title="PoolOfDeath20"
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
        </ThemeProvider>
    );
};

export default App;
