import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Header from '../header';
import Footer from '../footer';

const Layout = (
	props: Readonly<
		{ children?: React.ReactNode } & Partial<Parameters<typeof Header>[0]>
	>
) => {
	return (
		<>
			{!(props.setMode && props.isDarkMode !== undefined) ? null : (
				<Header setMode={props.setMode} isDarkMode={props.isDarkMode} />
			)}
			<CssBaseline />
			<GlobalStyles
				styles={`
                * {
                    scroll-behavior: smooth !important;
                }
                *::-webkit-scrollbar {
                    width: 8px;
                }
                *::-webkit-scrollbar-track {
                    background-color: transparent !important;
                }
                *::-webkit-scrollbar-thumb {
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 9999px;
                    background-color: gray;
                }
          `}
			/>
			<Box
				sx={{
					mt: 4,
					width: '100%',
				}}
			>
				{props?.children}
			</Box>
			<Footer />
		</>
	);
};

export default Layout;
