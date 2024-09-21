import { BiLogoReact, BiNotepad } from 'react-icons/bi';
import {
	BsFillTerminalFill,
	BsBrowserChrome,
	BsReddit,
	BsServer,
	BsWindowDesktop,
	BsCodeSlash,
	BsRobot,
	BsFilesAlt,
} from 'react-icons/bs';
import { FaChessBoard, FaRegFileCode } from 'react-icons/fa';
import { GiTicTacToe } from 'react-icons/gi';
import { ImNpm } from 'react-icons/im';
import { PiDotsNine } from 'react-icons/pi';
import { SiAdguard, SiDeno, SiEslint, SiTypescript } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

const projects = [
	{
		category: 'Gitignored',
		projects: [
			{
				name: 'Web',
				description: 'The Web Application that is UI/UX friendly',
				githubLink:
					'https://github.com/gervinfung/gitignored/tree/main/apps/web',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Terminal',
				description:
					'The CLI Application that cache and with distinctive colors for commands/arguments',
				githubLink:
					'https://github.com/gervinfung/gitignored/tree/main/apps/cli',
				icon: {
					color: '#2F393F',
					Component: BsFillTerminalFill,
				},
			},
		],
	},
	{
		category: 'Periotable',
		projects: [
			{
				name: 'Web',
				description: 'The Responsive Web Application',
				githubLink:
					'https://github.com/gervinfung/periotable/tree/main/apps/web',
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Desktop',
				description: 'The Multi-Platform Desktop Application',
				githubLink:
					'https://github.com/gervinfung/periotable/tree/main/apps/desktop',
				icon: {
					color: '#174276',
					Component: BsWindowDesktop,
				},
			},
		],
	},
	{
		category: 'Informations',
		projects: [
			{
				name: 'Useful Websites',
				description:
					'A collection of useful unknown websites based on reddit post',
				githubLink:
					'https://github.com/GervinFung/useful-unknown-website-comments',
				icon: {
					color: '#FF4500',
					Component: BsReddit,
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
				icon: {
					color: '#F06292',
					Component: GiTicTacToe,
				},
			},
			{
				name: 'Connect4',
				description: 'A Connect-4 Game written in C# WinForm',
				githubLink: 'https://github.com/GervinFung/Connect4',
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
				icon: {
					color: '#C12127',
					Component: ImNpm,
				},
			},
			{
				name: 'React',
				description: 'React Starter Template',
				githubLink: 'https://github.com/GervinFung/react-starter',
				icon: {
					color: '#087EA4',
					Component: BiLogoReact,
				},
			},
			{
				name: 'Next.js',
				description: 'Nextjs Starter Template',
				githubLink: 'https://github.com/GervinFung/nextjs-starter',
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
				icon: {
					color: '#1A73E8',
					Component: BsBrowserChrome,
				},
			},
			{
				name: 'Server',
				description: 'The server of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/server',
				icon: {
					color: '#E23A2E',
					Component: BsServer,
				},
			},
			{
				name: 'Desktop',
				description: 'The desktop application of UTARi',
				githubLink: 'https://github.com/UTARi-Accommodation/desktop',
				icon: {
					color: '#174276',
					Component: BsWindowDesktop,
				},
			},
			{
				name: 'Common',
				description: 'All commonly used functions and typings',
				githubLink: 'https://github.com/UTARi-Accommodation/common',
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
				icon: {
					color: '#2F393F',
					Component: BsFillTerminalFill,
				},
			},
			{
				name: 'Guard Data',
				description: 'Safely guard JSON data as intended type',
				githubLink: 'https://github.com/GervinFung/guard-data',
				icon: {
					color: '#279847',
					Component: SiAdguard,
				},
			},
		],
	},
];

export default projects;
