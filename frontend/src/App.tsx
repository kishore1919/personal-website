import * as React from 'react';

const Home = React.lazy(() => import('./page/index'));
const Portfolio = React.lazy(() => import('./page/portfolio'));
const About = React.lazy(() => import('./page/about'));
const Resume = React.lazy(() => import('./page/resume'));
const Contact = React.lazy(() => import('./page/contact'));
const Error = React.lazy(() => import('./page/error'));
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './util/theme/GlobalTheme';
import { ThemeProvider } from 'styled-components';
import {
    getThemeFromPrevTheme,
    getTheme,
    keyConfig,
    getConfigKey,
    getThemeFromConfigKey,
} from './util/theme/colorTheme';
import { HashLoading, ErrorBoundary } from './components/HashLoading';

const App = () => {
    const { key } = keyConfig;
    const [theme, setTheme] = React.useState(() => {
        const value = localStorage.getItem(key);
        return value
            ? getThemeFromConfigKey(value)
            : getTheme(
                  window.matchMedia('(prefers-color-scheme: dark)').matches
              );
    });

    React.useEffect(() => {
        localStorage.setItem(key, getConfigKey(theme));
    }, [theme]);

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
                                setTheme(getThemeFromPrevTheme(theme))
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
