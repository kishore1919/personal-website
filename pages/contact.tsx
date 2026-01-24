import type { SxProps, Theme } from '@mui/material/styles';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';

// import { ContactMessageParser } from '../src/common/contact';
import Holder from '../src/web/components/common/holder';
import Section from '../src/web/components/common/section';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import Seo from '../src/web/components/seo';
import { contactPageContent, headerContent } from '../src/web/information/content';
import Link from '@mui/material/Link';


const Contact = () => {
	const [show, setShow] = useState(false);
	const breakPoint = useBreakpoint() as keyof typeof consts.width.others;

	useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> =
		(import.meta.env.MODE === 'test'
			? {}
			: {
				transition: 'opacity 1s',
				transitionDelay: '200ms',
				opacity: show ? 1 : 0,
			});

	const emailText = contactPageContent.content[1];
	const emailMatch = emailText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
	const email = emailMatch ? emailMatch[0] : headerContent.links.github; // Fallback or use a specific one
	const [prefix, suffix] = emailMatch ? emailText.split(email) : [emailText, ''];

	return (
		<React.Fragment>
			{/* SEO handled by Astro wrapper */}
			<Holder sx={{
				...animation,
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				minHeight: '60vh' // Ensures there's enough room to feel "centered"
			}}>
				<Section
					elevation={0}
					sx={({ palette }) => {
						const striking = (palette as any).custom?.striking || { green: '#0FFBF9', red: '#FF3F4A' };
						return {
							borderRadius: 2, // Added some rounding
							boxShadow: [
								`-5px 5px ${striking.green}`,
								`5px -5px ${striking.red}`,
							].join(' ,'),
							width: consts.width.others[breakPoint ?? 'xl'],
							backgroundColor: 'background.default',
						};
					}}
				>
					<Box
						sx={{
							width: '100%',
							display: 'grid',
							placeItems: 'center',
						}}
					>
						<Section
							sx={{
								py: 6, // Increased padding
								px: 4,
								borderRadius: 2,
								textAlign: 'center',
								backgroundColor: 'custom.opposite',
							}}
						>
							<Typography variant="h5" sx={{ fontWeight: 'bold', color: 'custom.default', mb: 2 }}>
								{contactPageContent.content[0]}
							</Typography>
							<Typography sx={{ fontWeight: '500', color: 'custom.default' }}>
								{prefix}
								<Link
									href={`mailto:${email}`}
									sx={({ palette }) => ({
										color: (palette as any).custom?.striking?.red || 'error.main',
										textDecoration: 'none',
										backgroundColor: 'rgba(255, 63, 74, 0.1)',
										px: 1,
										py: 0.5,
										borderRadius: 1,
										fontWeight: 'bold',
										transition: '0.3s all ease-in-out',
										'&:hover': {
											backgroundColor: 'rgba(255, 63, 74, 0.3)',
											color: (palette as any).custom?.striking?.red || 'error.main',
										}
									})}
								>
									{email}
								</Link>
								{suffix}
							</Typography>
							<Typography sx={{ mt: 2, color: 'custom.default', opacity: 0.8 }}>
								{contactPageContent.content[2]}
							</Typography>
						</Section>
					</Box>
				</Section>
			</Holder>
		</React.Fragment>
	);
};

export default Contact;

/*
	--- Helper Components (if needed in the future) ---

	const TextFieldInput = (props: { ... }) => { ...existing code... }
	const HoneyPot = (props: { ... }) => { ...existing code... }
*/
