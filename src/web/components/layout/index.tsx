import React, { type PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import Header from '../header';
import Footer from '../footer';
import BackToTop from '../button/back-to-top';

const Layout = (props: Readonly<PropsWithChildren>) => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<CssBaseline />
			<GlobalStyles
				styles={`
                *::-webkit-scrollbar {
                    width: 8px;
                }
                *::-webkit-scrollbar-track {
                    background-color: transparent !important;
                }
                *::-webkit-scrollbar-thumb {
                    border: 3px solid transparent;
                    background-clip: padding-box;
                    border-radius: 9999px;
                    background-color: ${theme.palette.grey[theme.palette.mode === 'dark' ? 100 : 900]};
                }
          `}
			/>
			<Stack
				spacing={{
					xs: 10,
					lg: 12,
				}}
				sx={(theme) => {
					return {
						backgroundColor:
							theme.palette.mode === 'dark'
								? 'background.surface'
								: undefined,
					};
				}}
			>
				<Stack spacing={16}>
					<Header />
					<BackToTop />
					{props.children}
				</Stack>
				<Footer />
			</Stack>
		</React.Fragment>
	);
};

export default Layout;
