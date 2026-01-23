import React from 'react';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './error/fallback';
import Layout from './layout';
import consts from '../const';
import { colorTheme } from '../theme';
import '../css/font.css';

const themeOptions = {
    typography: {
        fontFamily: consts.fontFamily,
    },
    palette: {
        mode: 'dark' as const,
        background: {
            default: colorTheme.contrast.black,
        },
        primary: {
            main: colorTheme.blue.light,
        },
        secondary: {
            main: colorTheme.green.dark,
        },
        // Inject custom properties into the palette as expected by existing components
        custom: {
            ...colorTheme,
            default: colorTheme.contrast.black,
            opposite: colorTheme.contrast.white,
        },
    },
    // Also inject at the top level for more standard MUI extension
    custom: {
        ...colorTheme,
        default: colorTheme.contrast.black,
        opposite: colorTheme.contrast.white,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `@font-face {${[
                `font-family: '${consts.fontFamily}'`,
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
};

const theme = responsiveFontSizes(createTheme(themeOptions));
// Use type assertion to ensure custom properties are preserved and available at runtime
(theme.palette as any).custom = themeOptions.palette.custom;
(theme as any).custom = themeOptions.custom;


const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={Fallback}>
                <Layout>
                    {children}
                </Layout>
            </ErrorBoundary>
        </ThemeProvider>
    );
};

export default AppWrapper;
