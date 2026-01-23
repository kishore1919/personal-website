import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';

import useBreakpoint from '../../hooks/use-breakpoint-value';
import Holder from '../common/holder';
import { footerContent } from '../../information/content';

const Footer = () => {
	const breakPoint = useBreakpoint();

	const isMobile = breakPoint === 'xs';

	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> = {
		transition: 'opacity 1s, transform 1s',
		transitionDelay: '200ms',
		opacity: show ? 1 : 0,
		transform: show ? 'translateY(0)' : 'translateY(-100%)',
	};

	return (
		<Holder
			sx={{
				m: 0,
				mt: 12,
				pb: 6,
				...animation,
			}}
		>
			<Box
				sx={[
					{
						mb: 4,
						textAlign: 'center',
					},
					!isMobile
						? {
							display: 'flex',
							justifyContent: 'center',
							gap: 2,
						}
						: {
							display: 'grid',
							placeItems: 'center',
							gridGap: 1,
						},
				]}
			>
				<Typography
					sx={{
						color: 'text.secondary',
						fontWeight: 500,
					}}
				>
					{footerContent.location}
				</Typography>
				{!isMobile && (
					<Typography sx={{ color: 'text.disabled' }}>•</Typography>
				)}
				<Typography
					sx={{
						color: 'text.secondary',
					}}
				>
					{footerContent.copyright}
				</Typography>
			</Box>
		</Holder>
	);
};

export default Footer;
