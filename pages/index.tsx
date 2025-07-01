import type { SxProps, Theme } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Link from 'next/link';
import React from 'react';

import Holder from '../src/web/components/common/holder';
import Seo from '../src/web/components/seo';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import { homePageContent } from '../src/web/information/content';

const Content = (
	props: TypographyProps &
		Readonly<{
			delay: number;
		}>
) => {
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		process.env['NEXT_PUBLIC_NODE_ENV'] === 'testing'
			? undefined
			: {
					transition: 'opacity 1s',
					transitionDelay: '200ms',
					opacity: show ? 1 : 0,
				};

	return (
		<Typography
			{...props}
			sx={{
				mt: 3,
				textAlign: 'justify',
				color: 'text.secondary',
				whiteSpace: 'pre-wrap',
				...animation,
			}}
			variant="subtitle1"
		/>
	);
};

const Index: NextPage = () => {
	const [time, setTime] = React.useState(Date.now());

	const breakPoint = useBreakpoint();

	React.useEffect(() => {
		const timer = setInterval(() => {
			return setTime(Date.now());
		}, 1000);

		return () => {
			return clearInterval(timer);
		};
	}, []);

	const isDay = () => {
		const hours = new Date(time).getHours();

		return hours >= 6 && hours < 18;
	};

	return (
		<React.Fragment>
			<Seo
				description={homePageContent.seo.description}
				keywords={homePageContent.seo.keywords}
				title={homePageContent.seo.title}
				url={undefined}
			/>
			<Holder>
				<Typography
					sx={({ palette }) => {
						return {
							mb: '16px',
							textShadow: [
								`4px 1px ${palette.custom.striking.green}`,
								`-4px 1px ${palette.custom.striking.red}`,
							].join(' ,'),
						};
					}}
					variant={
						!breakPoint ? 'h2' : breakPoint === 'xs' ? 'h1' : 'h2'
					}
				>
					{homePageContent.title}
				</Typography>
				<Holder
					sx={{
						width: consts.width.others[breakPoint ?? 'xl'],
					}}
				>
					<Content
						delay={1}
						sx={{
							color: 'text.primary',
							mt: 3,
						}}
					>
						{isDay()
							? homePageContent.content[0]
							: homePageContent.content[1]}
					</Content>
					<Content delay={2}>
						{homePageContent.content[2]}
					</Content>
					<Content delay={4}>
						{homePageContent.content[3]}
					</Content>
					<Content delay={6}>
						{homePageContent.content[4]}{' '}
						<Box
							sx={{
								display: 'inline-block',
							}}
						>
							<Box
								component="a"
								aria-label="projects link"
								href={homePageContent.links.projects}
								sx={{
									color: 'text.primary',
									textDecoration: 'underline',
								}}
							>
								here
							</Box>
						</Box>
					</Content>
					<Content delay={8}>
						{homePageContent.content[5]}
					</Content>
				</Holder>
			</Holder>
		</React.Fragment>
	);
};

export default Index;
