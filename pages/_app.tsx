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
import type { Mode } from '../src/web/components/header';

const App = (props: AppProps) => {
	const modeKey = 'mode';

	const [mode, setMode] = React.useState('dark' as Mode);

	React.useEffect(() => {
		const value = localStorage.getItem(modeKey);

		setMode(
			value === 'dark' || value === 'light'
				? value
				: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		);
	}, []);

	React.useEffect(() => {
		localStorage.setItem(modeKey, mode);
	}, [mode]);

	const theme = React.useMemo(() => {
		const { fontFamily } = consts;

		return responsiveFontSizes(
			createTheme({
				typography: {
					fontFamily,
				},
				palette: {
					mode,
					background: {
						default:
							mode === 'dark'
								? colorTheme.contrast.black
								: colorTheme.contrast.white,
					},
					primary: {
						main: colorTheme.blue.light,
					},
					secondary: {
						main: colorTheme.green.dark,
					},
					custom: {
						...colorTheme,
						default:
							mode === 'dark'
								? colorTheme.contrast.black
								: colorTheme.contrast.white,
						opposite:
							mode === 'light'
								? colorTheme.contrast.black
								: colorTheme.contrast.white,
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
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<ErrorBoundary>
				<main>
					<Layout isDarkMode={mode === 'dark'} setMode={setMode}>
						<props.Component {...props.pageProps} />
					</Layout>
				</main>
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default App;
