import * as React from 'react';

const Home = React.lazy(() => import('./page/Index'));
const Portfolio = React.lazy(() => import('./page/Portfolio'));
const About = React.lazy(() => import('./page/About'));
const Resume = React.lazy(() => import('./page/Resume'));
const Contact = React.lazy(() => import('./page/Contact'));
const Error = React.lazy(() => import('./page/Error'));

import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './theme/GlobalTheme';
import { ThemeProvider } from 'styled-components';
import {
    getThemeFromPrevTheme,
    getTheme,
    keyConfig,
    getConfigKey,
    getThemeFromConfigKey,
} from './theme/colorTheme';
import { HashLoading, ErrorBoundary } from './components/HashLoading';

const App = () => {
    const { key } = keyConfig;
    const [state, setState] = React.useState({
        theme: (() => {
            const value = localStorage.getItem(key);
            return value
                ? getThemeFromConfigKey(value)
                : getTheme(
                      window.matchMedia('(prefers-color-scheme: dark)').matches
                  );
        })(),
    });

    const { theme } = state;

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <React.Suspense fallback={<HashLoading />}>
                        <GlobalStyle />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
                            rel="stylesheet"
                        />
                        <Header
                            theme={theme}
                            updateTheme={() =>
                                setState((prev) => {
                                    localStorage.setItem(
                                        key,
                                        getConfigKey(theme)
                                    );
                                    return {
                                        ...prev,
                                        theme: getThemeFromPrevTheme(theme),
                                    };
                                })
                            }
                        />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route
                                path="/portfolio"
                                exact
                                component={Portfolio}
                            />
                            <Route path="/contact" exact component={Contact} />
                            <Route path="/about" exact component={About} />
                            <Route path="/resume" exact component={Resume} />
                            <Route component={Error} />
                        </Switch>
                        <Footer />
                    </React.Suspense>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
