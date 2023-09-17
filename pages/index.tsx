import React from 'react';
import type { NextPage } from 'next';
import Seo from '../src/web/components/seo';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import Holder from '../src/web/components/common/holder';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import Link from 'next/link';

const Content = (
	props: TypographyProps &
		Readonly<{
			delay: number;
		}>
) => {
	const [show, setState] = React.useState(false);

	React.useEffect(() => {
		setState(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		process.env.NEXT_PUBLIC_NODE_ENV === 'testing'
			? undefined
			: {
					transition: 'opacity 1s',
					transitionDelay: `${props.delay}00ms`,
					opacity: show ? 1 : 0,
			  };

	return (
		<Typography
			{...props}
			variant="subtitle1"
			sx={{
				mt: 3,
				textAlign: 'justify',
				color: 'text.secondary',
				whiteSpace: 'pre-wrap',
				...animation,
			}}
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
				title="Home"
				keywords={['Personal Website']}
				description="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
			/>
			<Holder>
				<Typography
					variant={
						!breakPoint ? 'h2' : breakPoint === 'xs' ? 'h1' : 'h2'
					}
					sx={({ palette }) => {
						return {
							mb: '16px',
							textShadow: [
								`4px 1px ${palette.custom.striking.green}`,
								`-4px 1px ${palette.custom.striking.red}`,
							].join(' ,'),
						};
					}}
				>
					GERVIN
				</Typography>
				<Holder sx={{ width: consts.width.others[breakPoint ?? 'xl'] }}>
					<Content delay={1} sx={{ color: 'text.primary', mt: 3 }}>
						{isDay() ? 'Bonjour' : 'Bonsoir'}! Je vous remercie de
						votre visite!
					</Content>
					<Content delay={2}>
						I am Gervin Fung Da Xuen, and I am not French. I build
						software both for fun and for a living. I am passionate
						about open-source software, and I build websites,
						desktop applications, mobile applications, and
						development tools
					</Content>
					<Content delay={4}>
						I have been coding since 2021, and it all started when I
						wanted to make a Chess game with Java Swing and then
						with the LibGDX framework. Later, during an intern
						applicant test, I broadened my skillset to include
						TypeScript and began making web and mobile applications.
						After some time, I began using Rust to create terminal
						applications
					</Content>
					<Content delay={6}>
						TypeScript, Java, and Rust are my primary languages in
						software engineering, although I believe I am capable of
						using other languages as well, aside from PHP. My
						passion lies in the ability to work on web applications,
						mobile applications, and development tools. You can find
						my full projects list{' '}
						<Box
							sx={{
								display: 'inline-block',
							}}
						>
							<Link
								href="/projects"
								style={{
									textDecoration: 'none',
								}}
							>
								<Box
									sx={{
										color: 'text.primary',
										textDecoration: 'underline',
									}}
								>
									here
								</Box>
							</Link>
						</Box>
					</Content>
					<Content delay={8}>
						Outside of programming, I enjoy reading interesting
						articles, working out, and playing video games with my
						friends.
					</Content>
				</Holder>
			</Holder>
		</React.Fragment>
	);
};

export default Index;
