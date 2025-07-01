import type { SxProps, Theme } from '@mui/material/styles';
import type { NextPage } from 'next';

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


const Contact: NextPage = () => {
	const [show, setShow] = useState(false);
	const breakPoint = useBreakpoint() as keyof typeof consts.width.others;

	useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		(process.env['NEXT_PUBLIC_NODE_ENV'] === 'testing'
			? undefined
			: {
					transition: 'opacity 1s',
					transitionDelay: '200ms',
					opacity: show ? 1 : 0,
				});

	return (
		<React.Fragment>
			<Seo
				description={contactPageContent.seo.description}
				keywords={contactPageContent.seo.keywords}
				title={contactPageContent.seo.title}
				url={contactPageContent.seo.url}
			/>
			<Holder sx={animation}>
				<Section
					elevation={0}
					sx={({ palette }) => ({
						borderRadius: 0,
						boxShadow: [
							`-5px 5px ${palette.custom.striking.green}`,
							`5px -5px ${palette.custom.striking.red}`,
						].join(' ,'),
						width: consts.width.others[breakPoint ?? 'xl'],
						backgroundColor: 'background.default',
					})}
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
							formFacadeURL={process.env['NEXT_PUBLIC_FORMFACAD_URL']}
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
