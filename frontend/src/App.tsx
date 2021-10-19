import React, { Suspense, lazy, useState, useEffect } from 'react';

const Home = lazy(() => import('./page/index'));
const Portfolio = lazy(() => import('./page/portfolio'));
const About = lazy(() => import('./page/about'));
const Resume = lazy(() => import('./page/resume'));
const Contact = lazy(() => import('./page/contact'));
const Error = lazy(() => import('./page/error'));
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './util/theme/GlobalTheme';
import { ThemeProvider } from 'styled-components';
import {
    primaryTheme,
    getTheme,
    isPrimary,
    secondaryTheme,
    KEY,
    PRIMARY,
    SECONDARY,
} from './util/theme/colorTheme';
import { HashLoading, ErrorBoundary } from './components/HashLoading';

const App = () => {
    const [theme, setTheme] = useState(() => {
        const value = localStorage.getItem(KEY);
        if (value) {
            return value === SECONDARY ? secondaryTheme : primaryTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? primaryTheme
            : secondaryTheme;
    });

    useEffect(() => {
        localStorage.setItem(KEY, isPrimary(theme) ? PRIMARY : SECONDARY);
    }, [theme]);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <Suspense fallback={<HashLoading />}>
                        <GlobalStyle />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
                            rel="stylesheet"
                        />
                        <Header
                            theme={theme}
                            updateTheme={() => setTheme(getTheme(theme))}
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
                    </Suspense>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
