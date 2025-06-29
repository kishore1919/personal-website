import type { SxProps, Theme } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';

import Holder from '../src/web/components/common/holder';
import Seo from '../src/web/components/seo';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';

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
				description="I am Kishore Selvaraj. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
				keywords={['Personal Website']}
				title="Home"
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
					Kishore selvaraj
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
						{isDay() ? 'Morning' : 'Evening'}! Thank you for visiting this site!
					</Content>
					<Content delay={2}>
						I am Kishore Selvaraj, a software engineer based in
						Bangalore and I build
						software both for fun and for a living. I am passionate
						about open-source software, and I build Infrastructure and websites.
					</Content>
					<Content delay={4}>
						I have been coding since 2021, and it all started when I
						wanted to make a weather app in react and then
						with the Django. Later, during an internship i got in to DEVOPS, I broadened my skillset to include
						Docker, Terraform, Linux, Git, Kubernetes began making web applications and deploying them.
						After some time, I began using opensource applications and started contribution to them.
					</Content>
					<Content delay={6}>
						Python and bash are my primary languages in
						software engineering, although I believe I am capable
						of using other languages as well, aside from Python. My
						passion lies in the ability to work on web applications,
						CLI tools, Deployment and infrastructure automation. You can find
						my full projects list{' '}
						<Box
							sx={{
								display: 'inline-block',
							}}
						>
							<Box
								component="a"
								aria-label="projects link"
								href="/projects"
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
						Outside of programming, I enjoy reading interesting
						articles, working out, bike rides and playing video games with my
						friends.
					</Content>
				</Holder>
			</Holder>
		</React.Fragment>
	);
};

export default Index;
