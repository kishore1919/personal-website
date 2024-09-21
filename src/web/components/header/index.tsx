import type { Mode } from '@poolofdeath20/util';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import consts from '../../const';
import useBreakpoint from '../../hooks/use-breakpoint-value';
import useHeight from '../../hooks/use-height';
import Holder from '../common/holder';

import { Contact, Github, Instagram, LinkedIn, Projects } from './icons';
import ThemeMenu from './theme-menu';

const Header = () => {
	const router = useRouter();
	const route = router.route.replace('/', '') || 'home';

	const breakPoint = useBreakpoint();

	const height = useHeight();

	return (
		<Holder
			sx={{
				boxSizing: 'border-box',
			}}
		>
			<Box
				sx={{
					width: '100%',
				}}
			>
				<AppBar
					elevation={0}
					position="fixed"
					sx={({ palette }) => {
						return {
							backgroundColor: 'custom.default',
							display: 'grid',
							placeItems: 'center',
							borderBottom: !height
								? undefined
								: `1px solid ${palette.grey[palette.mode === 'dark' ? 900 : 500]}`,
						};
					}}
				>
					<Toolbar
						sx={{
							py: 2,
							px: breakPoint === 'xs' ? 1 : `0px !important`,
							width: consts.width.projects[breakPoint ?? 'xl'],
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Box>
							<Link
								href="/"
								style={{
									textDecoration: 'none',
								}}
							>
								<Image
									alt="logo"
									height={36}
									loading="lazy"
									src="/images/icons/icon-72x72.png"
									style={{
										display: 'block',
									}}
									width={36}
								/>
							</Link>
						</Box>
						<Stack
							alignContent="center"
							direction="row"
							justifyContent="flex-end"
							spacing={{
								xs: 1,
								sm: 2,
							}}
						>
							<Projects route={route} />
							<Contact route={route} />
							<Github />
							<LinkedIn />
							<Instagram />
							<ThemeMenu />
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</Holder>
	);
};

export type { Mode };

export default Header;
