import type { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import BackToTop from '../button/back-to-top';
import Footer from '../footer';
import Header from '../header';

const Layout = (props: Readonly<PropsWithChildren>) => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<CssBaseline />
			<Stack
				spacing={{
					xs: 10,
					lg: 12,
				}}
				sx={{
					minHeight: '100vh',
					backgroundColor:
						theme.palette.mode === 'dark'
							? 'background.surface'
							: undefined,
				}}
			>
				<Stack spacing={16} sx={{ flexGrow: 1 }}>
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
