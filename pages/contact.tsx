import type { SxProps, Theme } from '@mui/material/styles';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';

// import { ContactMessageParser } from '../src/common/contact';
import Holder from '../src/web/components/common/holder';
import Section from '../src/web/components/common/section';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import FormfacadeEmbed from "@formfacade/embed-react";
import Seo from '../src/web/components/seo';
import { contactPageContent } from '../src/web/information/content';


const Contact = () => {
	const [show, setShow] = useState(false);
	const breakPoint = useBreakpoint() as keyof typeof consts.width.others;

	useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		(import.meta.env.MODE === 'test'
			? undefined
			: {
				transition: 'opacity 1s',
				transitionDelay: '200ms',
				opacity: show ? 1 : 0,
			});

	return (
		<React.Fragment>
			{/* SEO handled by Astro wrapper */}
			<Holder sx={animation}>
				<Section
					elevation={0}
					sx={({ palette }) => {
						const striking = (palette as any).custom?.striking || { green: '#0FFBF9', red: '#FF3F4A' };
						return {
							borderRadius: 0,
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
								py: 3,
								px: 4,
								borderRadius: 0,
								textAlign: 'center',
								backgroundColor: 'custom.opposite',
							}}
						>
							<Typography sx={{ fontWeight: 'bold', color: 'custom.default' }}>
								{contactPageContent.content[0]}
							</Typography>
							<Typography sx={{ fontWeight: 'bold', color: 'custom.default' }}>
								{contactPageContent.content[1]}
							</Typography>
						</Section>
						<FormfacadeEmbed
							formFacadeURL={import.meta.env.PUBLIC_FORMFACAD_URL}
							onSubmitForm={() => console.log('Form submitted')}
						/>
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
