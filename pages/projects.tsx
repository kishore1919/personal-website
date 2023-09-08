import React from 'react';
import type { NextPage } from 'next';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import type { SxProps, Theme } from '@mui/material/styles';
import Seo from '../src/web/components/seo';
import Holder from '../src/web/components/common/holder';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';

const projects = [
	{
		category: 'Gitignored',
		projects: [
			{
				name: 'Web',
				description: 'The Web Application that is UI/UX friendly',
				githubLink: 'https://github.com/Gitignored-App/web',
				imagePath: '/gitignored/web',
			},
			{
				name: 'Terminal',
				description:
					'The CLI Application that cache and with distinctive colors for commands/arguments',
				githubLink: 'https://github.com/Gitignored-App/cli',
				imagePath: '/gitignored/terminal',
			},
		],
	},
	{
		category: 'Games',
		projects: [
			{
				name: 'LibGDX-Chess-Game',
				description:
					'A LibGDX AI Multithreaded Chess Game playable on many devices from Level 1 to Level 10',
				githubLink: 'https://github.com/GervinFung/LibGDX-Chess-Game',
				imagePath: '/games/libgdx-chess-game',
			},
			{
				name: 'AndroidSimpleAIChess',
				description:
					'First Android Project - Parallel AI Chess Game with 10 different levels',
				githubLink:
					'https://github.com/GervinFung/AndroidSimpleAIChess',
				imagePath: '/games/androidsimpleaichess',
			},
			{
				name: 'SimpleParallelChessAI',
				description:
					'A Parallel AI Chess Game from Level 1 to Level 10 made with Java Swing',
				githubLink:
					'https://github.com/GervinFung/SimpleParallelChessAI',
				imagePath: '/games/simpleparallelchessai',
			},
			{
				name: 'TicTacToe',
				description:
					'AI Tic-Tac-Toe Game made with Java Swing. Play in 3x3 grid up to 10x10',
				githubLink: 'https://github.com/GervinFung/TicTacToe',
				imagePath: '/games/tictactoe',
			},
			{
				name: 'Connect4',
				description: 'A Connect-4 Game written in C# WinForm',
				githubLink: 'https://github.com/GervinFung/Connect4',
				imagePath: '/games/connect4',
			},
			{
				name: 'MinimalTicTacToe',
				description:
					'AI TicTacToe made with React, TypeScript and Styled-Components for fun. Play in 3x3 grid up to 5x5',
				githubLink: 'https://github.com/GervinFung/MinimalTicTacToe',
				imagePath: '/games/minimaltictactoe',
			},
		],
	},
	{
		category: 'TypeScript',
		projects: [
			{
				name: 'Gen Env Type Def',
				description:
					'Generate type definitions for environment variables from different environment files with support for both import.meta.env and process.env',
				githubLink: 'https://github.com/GervinFung/gen-env-type-def',
				imagePath: '/typescript/gen-env-type-def',
			},
			{
				name: 'Ts Add Js Extension',
				description:
					'Add .js extension to each relative import/export statement in JavaScript file',
				githubLink: 'https://github.com/GervinFung/ts-add-js-extension',
				imagePath: '/typescript/ts-add-js-extension',
			},
		],
	},
	{
		category: 'Deno',
		projects: [
			{
				name: 'Denoify',
				description:
					'For NPM module authors that would like to support Deno but do not want to write and maintain a port',
				githubLink: 'https://github.com/garronej/denoify',
				imagePath: '/deno/denoify',
			},
		],
	},
	{
		category: 'Configurations',
		projects: [
			{
				name: 'Dotfiles',
				description: 'My dotfiles that are XDG_CONFIG_HOME compliant',
				githubLink: 'https://github.com/GervinFung/.config',
				imagePath: '/configurations/dotfiles',
			},
			{
				name: 'Eslint Config PoolOfDeath20',
				description: 'My ESLint shareable config',
				githubLink:
					'https://github.com/GervinFung/eslint-config-poolofdeath20',
				imagePath: '/configurations/eslint-config-poolofdeath20',
			},
		],
	},
	{
		category: 'Starter Templates',
		projects: [
			{
				name: 'NPM Package',
				description: 'NPM Package Starter Template',
				githubLink: 'https://github.com/GervinFung/npm-package-starter',
				imagePath: '/starter-templates/npm-package',
			},
		],
	},
	{
		category: 'Text Editor',
		projects: [
			{
				name: 'Notepad',
				description:
					'Text Editor similar to NotePad that can undo all of your edit',
				githubLink: 'https://github.com/GervinFung/TextEditor',
				imagePath: '/texteditor/notepad',
			},
			{
				name: 'Notepad FX',
				description:
					'Fist JavaFX project - an upgraded version of the previous Notepad Text Editor',
				githubLink: 'https://github.com/GervinFung/TextEditorFX',
				imagePath: '/texteditor/notepadfx',
			},
		],
	},
	{
		category: 'Blog',
		projects: [
			{
				name: 'Adonis OS',
				description: 'The abandoned blog',
				githubLink: 'https://github.com/GervinFung/adonis-os-blog',
				imagePath: '/blog/adonis-os',
			},
			{
				name: 'Adonix',
				description: 'Blog - Remake of Adonis OS Blog',
				githubLink: 'https://github.com/GervinFung/adonix-blog',
				imagePath: '/blog/adonix',
			},
		],
	},
	{
		category: 'UTARi',
		projects: [
			{
				name: 'Web',
				description: 'The web application of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/web',
				imagePath: '/utari/web',
			},
			{
				name: 'Server',
				description: 'The server of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/server',
				imagePath: '/utari/server',
			},
			{
				name: 'Desktop',
				description: 'The desktop application of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/desktop',
				imagePath: '/utari/desktop',
			},
			{
				name: 'Common',
				description: 'All commonly used functions and typings',
				githubLink: 'https://github.com/UTARi-Accommodation/common',
				imagePath: '/utari/common',
			},
		],
	},
	{
		category: 'Bots',
		projects: [
			{
				name: 'JKLM bot',
				description: 'A JKLM bot written for fun',
				githubLink: 'https://github.com/GervinFung/jklm-bot',
				imagePath: '/bots/jklm-bot',
			},
		],
	},
	{
		category: 'Toys',
		projects: [
			{
				name: 'Brainfuck',
				description:
					'Partial optimized Brainfuck implementation in TypeScript',
				githubLink: 'https://github.com/GervinFung/brainfuck',
				imagePath: '/toys/brainfuck',
			},
			{
				name: 'React Unix Terminal',
				description:
					'A customizable unix terminal emulator for React on web, with customizable command',
				githubLink: 'https://github.com/GervinFung/react-unix-terminal',
				imagePath: '/toys/react-unix-terminal',
			},
			{
				name: 'Guard Data',
				description: 'Safely guard JSON data as intended type',
				githubLink: 'https://github.com/GervinFung/guard-data',
				imagePath: '/toys/guard-data',
			},
		],
	},
];

const Item = (
	project: (typeof projects)[0]['projects'][0] &
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
					transitionDelay: `${project.delay}00ms`,
					opacity: show ? 1 : 0,
			  };

	return (
		<Card
			variant="outlined"
			sx={{
				borderTopRightRadius: 'none',
				borderTopLeftRadius: 'none',
				backgroundColor: 'transparent',
				...animation,
			}}
		>
			<CardActionArea
				sx={{
					'&:hover > a > div > div > div > h6': {
						color: 'text.primary',
					},
					'&:hover > a > div > div > div > p': {
						color: 'text.secondary',
					},
				}}
			>
				<Link
					key={project.name}
					href={project.githubLink}
					target="_blank"
					rel="noopener noreferrer"
					underline="none"
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gridGap: 8,
						}}
					>
						<Box>
							<Box
								key={project.name}
								alt={project.name}
								loading="lazy"
								component="img"
								src={`/images/projects/${
									project.imagePath ?? 'utari/background'
								}.png`}
								sx={{
									width: '100%',
									display: 'block',
								}}
							/>
						</Box>
						<Box
							sx={{
								p: 2,
							}}
						>
							<Box>
								<Typography
									variant="h6"
									sx={{
										color: 'text.secondary',
										fontWeight: 500,
									}}
								>
									{project.name}
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{
										color: 'text.disabled',
										fontSize: '0.9em',
										boxSizing: 'border-box',
										wordBreak: 'break-word',
									}}
								>
									{project.description}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Link>
			</CardActionArea>
		</Card>
	);
};

const Projects: NextPage = () => {
	const breakPoint = useBreakpoint();

	return (
		<>
			<Seo
				title="Projects"
				keywords={['Personal Website']}
				description="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organization on Github"
			/>
			<Holder>
				<Stack
					spacing={8}
					sx={{
						width: consts.width.projects[breakPoint ?? 'xl'],
					}}
				>
					{projects.map((subProjects, projectIndex) => {
						return (
							<Box key={subProjects.category}>
								<Box
									key={subProjects.category}
									sx={{
										display: 'grid',
										gridGap: 48,
									}}
								>
									<Box
										sx={{
											display: 'grid',
											placeItems: 'center',
										}}
									>
										<Typography
											variant="h3"
											sx={{ fontWeight: 700 }}
										>
											{subProjects.category}
										</Typography>
									</Box>
									<Box>
										<Grid
											container
											spacing={4}
											sx={{
												autoRows: '1fr',
											}}
										>
											{subProjects.projects.map(
												(project, index) => {
													const delay =
														(index +
															1 +
															projectIndex) *
														2;

													return (
														<Grid
															item
															key={project.name}
															xm={12}
															md={4}
														>
															<Item
																delay={delay}
																{...project}
															/>
														</Grid>
													);
												}
											)}
										</Grid>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Stack>
			</Holder>
		</>
	);
};

export default Projects;
