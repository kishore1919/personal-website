import React from 'react';
import type { AppProps } from 'next/app';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import { colorTheme } from '../src/web/theme';
import ErrorBoundary from '../src/web/components/error/boundary';
import consts from '../src/web/const';
import Layout from '../src/web/components/layout';
import '../src/web/css/font.css';

const App = (props: AppProps) => {
    const { fontFamily } = consts;

    const theme = React.useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    typography: {
                        fontFamily,
                    },
                    palette: {
                        mode: 'dark',
                        primary: {
                            main: colorTheme.blue.light,
                        },
                        secondary: {
                            main: colorTheme.green.dark,
                        },
                        custom: {
                            ...colorTheme,
                        },
                    },
                    components: {
                        MuiCssBaseline: {
                            styleOverrides: `@font-face {${[
                                `font-family: '${fontFamily}'`,
                                'font-size: normal',
                                'font-display: swap',
                            ].join(';\n')}}`,
                        },
                    },
                    breakpoints: {
                        values: {
                            xs: 0,
                            sm: 500,
                            xm: 700,
                            md: 900,
                            lg: 1200,
                            xl: 1500,
                        },
                    },
                })
            ),
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary>
                <Layout>
                    <main>
                        <props.Component {...props.pageProps} />
                    </main>
                </Layout>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default App;
