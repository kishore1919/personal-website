import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import Holder from '../common/holder';
import { footerContent } from '../../information/content';

const Footer = () => {
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> = {
		transition: 'opacity 1s, transform 1s',
		transitionDelay: '200ms',
		opacity: show ? 1 : 0,
		transform: show ? 'translateY(0)' : 'translateY(20px)',
	};

	return (
		<Holder
			sx={{
				m: 0,
				p: 0,
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				width: '100%',
				zIndex: 1000,
				backdropFilter: 'blur(10px)',
				backgroundColor: (theme) =>
					theme.palette.mode === 'dark'
						? 'rgba(0, 0, 0, 0.7)'
						: 'rgba(255, 255, 255, 0.7)',
				borderTop: (theme) => `1px solid ${theme.palette.divider}`,
				...animation,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					py: 2,
				}}
			>
				<Typography
					variant="body2"
					sx={{
						color: 'text.secondary',
						textAlign: 'center',
						letterSpacing: '0.05em',
						fontWeight: 400,
					}}
				>
					{footerContent.location} {footerContent.copyright}
				</Typography>
			</Box>
		</Holder>
	);
};

export default Footer;
