import React from 'react';
import type { NextPage } from 'next';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as MuiLink from '@mui/material/Link';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import Seo from '../src/web/components/seo';
import Holder from '../src/web/components/common/holder';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import {
	BsFillTerminalFill,
	BsBrowserChrome,
	BsServer,
	BsWindowDesktop,
	BsCodeSlash,
	BsRobot,
	BsFilesAlt,
} from 'react-icons/bs';
import { FaChessBoard, FaRegFileCode } from 'react-icons/fa';
import { ImNpm } from 'react-icons/im';
import { SiAdguard, SiDeno, SiEslint, SiTypescript } from 'react-icons/si';
import { BiLogoReact, BiNotepad } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { GiTicTacToe } from 'react-icons/gi';
import { PiDotsNine } from 'react-icons/pi';

const projects = [
	{
		category: 'Gitignored',
		projects: [
			{
				name: 'Web',
				description: 'The Web Application that is UI/UX friendly',
				githubLink: 'https://github.com/gervinfung/gitignored',
				imagePath: '/gitignored/web',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Terminal',
				description:
					'The CLI Application that cache and with distinctive colors for commands/arguments',
				githubLink: 'https://github.com/gervinfung/gitignored',
				imagePath: '/gitignored/terminal',
				icon: {
					color: '#2F393F',
					Component: BsFillTerminalFill,
				},
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
				icon: {
					color: '#FFF',
					Component: FaChessBoard,
				},
			},
			{
				name: 'AndroidSimpleAIChess',
				description:
					'First Android Project - Parallel AI Chess Game with 10 different levels',
				githubLink:
					'https://github.com/GervinFung/AndroidSimpleAIChess',
				imagePath: '/games/androidsimpleaichess',
				icon: {
					color: '#FFF',
					Component: FaChessBoard,
				},
			},
			{
				name: 'SimpleParallelChessAI',
				description:
					'A Parallel AI Chess Game from Level 1 to Level 10 made with Java Swing',
				githubLink:
					'https://github.com/GervinFung/SimpleParallelChessAI',
				imagePath: '/games/simpleparallelchessai',
				icon: {
					color: '#FFF',
					Component: FaChessBoard,
				},
			},
			{
				name: 'TicTacToe',
				description:
					'AI Tic-Tac-Toe Game made with Java Swing. Play in 3x3 grid up to 10x10',
				githubLink: 'https://github.com/GervinFung/TicTacToe',
				imagePath: '/games/tictactoe',
				icon: {
					color: '#F06292',
					Component: GiTicTacToe,
				},
			},
			{
				name: 'Connect4',
				description: 'A Connect-4 Game written in C# WinForm',
				githubLink: 'https://github.com/GervinFung/Connect4',
				imagePath: '/games/connect4',
				icon: {
					color: '#44475A',
					Component: PiDotsNine,
				},
			},
		],
	},
	{
		category: 'TypeScript/NPM',
		projects: [
			{
				name: 'Gen Env Type Def',
				description:
					'Generate type definitions for environment variables from different environment files with support for both import.meta.env and process.env',
				githubLink: 'https://github.com/GervinFung/gen-env-type-def',
				imagePath: '/typescript/gen-env-type-def',
				icon: {
					color: '#C12127',
					Component: ImNpm,
				},
			},
			{
				name: 'Ts Add Js Extension',
				description:
					'Add .js extension to each relative import/export statement in JavaScript file',
				githubLink: 'https://github.com/GervinFung/ts-add-js-extension',
				imagePath: '/typescript/ts-add-js-extension',
				icon: {
					color: '#C12127',
					Component: ImNpm,
				},
			},
			{
				name: 'Util',
				description:
					'My personal utility functions that I use in my projects',
				githubLink:
					'https://github.com/GervinFung/npm-tools/tree/main/packages/util',
				imagePath: '/typescript/ts-add-js-extension',
				icon: {
					color: '#C12127',
					Component: ImNpm,
				},
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
				icon: {
					color: '#15803D',
					Component: SiDeno,
				},
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
				icon: {
					color: '#2196F3',
					Component: BsFilesAlt,
				},
			},
			{
				name: 'Eslint Config PoolOfDeath20',
				description: 'My ESLint shareable config',
				githubLink:
					'https://github.com/GervinFung/npm-tools/tree/main/packages/eslint-config',
				imagePath: '/configurations/eslint-config-poolofdeath20',
				icon: {
					color: '#4B32C3',
					Component: SiEslint,
				},
			},
			{
				name: 'Tsconfig PoolOfDeath20',
				description: 'My commonly used TypeScript config',
				githubLink:
					'https://github.com/GervinFung/npm-tools/tree/main/packages/tsconfig',
				imagePath: '/configurations/eslint-config-poolofdeath20',
				icon: {
					color: '#3178C6',
					Component: SiTypescript,
				},
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
				icon: {
					color: '#C12127',
					Component: ImNpm,
				},
			},
			{
				name: 'React',
				description: 'React Starter Template',
				githubLink: 'https://github.com/GervinFung/react-starter',
				imagePath: '/starter-templates/npm-package',
				icon: {
					color: '#087EA4',
					Component: BiLogoReact,
				},
			},
			{
				name: 'Next.js',
				description: 'Nextjs Starter Template',
				githubLink: 'https://github.com/GervinFung/nextjs-starter',
				imagePath: '/starter-templates/npm-package',
				icon: {
					Component: TbBrandNextjs,
				},
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
				icon: {
					color: '#D5C4A1',
					Component: BiNotepad,
				},
			},
			{
				name: 'Notepad FX',
				description:
					'Fist JavaFX project - an upgraded version of the previous Notepad Text Editor',
				githubLink: 'https://github.com/GervinFung/TextEditorFX',
				imagePath: '/texteditor/notepadfx',
				icon: {
					color: '#D5C4A1',
					Component: BiNotepad,
				},
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
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Server',
				description: 'The server of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/server',
				imagePath: '/utari/server',
				icon: {
					color: '#E23A2E',
					Component: BsServer,
				},
			},
			{
				name: 'Desktop',
				description: 'The desktop application of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/desktop',
				imagePath: '/utari/desktop',
				icon: {
					color: '#174276',
					Component: BsWindowDesktop,
				},
			},
			{
				name: 'Common',
				description: 'All commonly used functions and typings',
				githubLink: 'https://github.com/UTARi-Accommodation/common',
				imagePath: '/utari/common',
				icon: {
					color: '#E91E63',
					Component: BsCodeSlash,
				},
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
				icon: {
					color: '#24A1C8',
					Component: BsRobot,
				},
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
				icon: {
					color: '#6A1B9A',
					Component: FaRegFileCode,
				},
			},
			{
				name: 'React Unix Terminal',
				description:
					'A customizable unix terminal emulator for React on web, with customizable command',
				githubLink: 'https://github.com/GervinFung/react-unix-terminal',
				imagePath: '/toys/react-unix-terminal',
				icon: {
					color: '#2F393F',
					Component: BsFillTerminalFill,
				},
			},
			{
				name: 'Guard Data',
				description: 'Safely guard JSON data as intended type',
				githubLink: 'https://github.com/GervinFung/guard-data',
				imagePath: '/toys/guard-data',
				icon: {
					color: '#279847',
					Component: SiAdguard,
				},
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
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		process.env.NEXT_PUBLIC_NODE_ENV === 'testing'
			? undefined
			: {
					transition: 'opacity 1s',
					transitionDelay: `${project.delay}00ms`,
					opacity: show ? 1 : 0,
				};

	const { palette } = useTheme();

	const isWhite = project.icon.color === '#FFF';

	return (
		<Box
			sx={({ palette }) => {
				return {
					display: 'flex',
					flexDirection: 'column',
					transition: '0.2s ease-out',
					borderRadius: 2,
					'&:hover': {
						backdropFilter: 'blur(10px)',
						backgroundColor:
							palette.mode === 'dark' ? '#111' : '#EEE',
					},
					...animation,
				};
			}}
		>
			<MuiLink.default
				href={project.githubLink}
				target="_blank"
				rel="noopener noreferrer"
				underline="none"
			>
				<Box
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<Box>
						<project.icon.Component
							size={32}
							style={{
								color:
									isWhite && palette.mode === 'light'
										? '#000'
										: project.icon.color ??
											palette.text.secondary,
							}}
						/>
					</Box>
					<Box>
						<Box>
							<Typography
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
									boxSizing: 'border-box',
									wordBreak: 'break-word',
								}}
							>
								{project.description}
							</Typography>
						</Box>
					</Box>
				</Box>
			</MuiLink.default>
		</Box>
	);
};

const Projects: NextPage = () => {
	const breakPoint = useBreakpoint();

	return (
		<React.Fragment>
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
										<Typography sx={{ fontWeight: 700 }}>
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
															xs={12}
															xm={6}
															lg={4}
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
		</React.Fragment>
	);
};

export default Projects;
