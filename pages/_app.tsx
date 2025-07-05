import type { AppProps } from 'next/app';

import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@mui/material/styles';
import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import Fallback from '../src/web/components/error/fallback';
import Layout from '../src/web/components/layout';
import consts from '../src/web/const';
import { colorTheme } from '../src/web/theme';
import '../src/web/css/font.css';

const App = (props: AppProps) => {
	const theme = React.useMemo(() => {
		const { fontFamily } = consts;

		return responsiveFontSizes(
			createTheme({
				typography: {
					fontFamily,
				},
				palette: {
					mode: 'dark',
					background: {
						default: colorTheme.contrast.black,
					},
					primary: {
						main: colorTheme.blue.light,
					},
					secondary: {
						main: colorTheme.green.dark,
					},
					custom: {
						...colorTheme,
						default: colorTheme.contrast.black,
						opposite: colorTheme.contrast.white,
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
		);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<ErrorBoundary FallbackComponent={Fallback}>
				<main>
					<Layout>
						<props.Component {...props.pageProps} />
					</Layout>
				</main>
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default App;
