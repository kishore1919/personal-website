import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import * as MuiLink from '@mui/material/Link';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
	isFalse,
	capitalize,
	isTruthy,
	type Mode,
	getPreferredMode,
	Defined,
} from '@poolofdeath20/util';
import Holder from '../common/holder';
import useWordScramble from '../../hooks/use-word-scramble';
import useBreakpoint from '../../hooks/use-breakpoint-value';
import links from '../../links';
import consts from '../../const';
import { ThemeContext } from '../../context/theme';
import type { Children } from '../../type/react';

const ids = ['home', 'projects', 'contact'] as const;

type Id = (typeof ids)[number];

const SocialButton = (
	props: Readonly<
		Children & {
			href: string;
			'aria-label': string;
		}
	>
) => {
	return (
		<MuiLink.default
			aria-label={props['aria-label']}
			href={props.href}
			target="_blank"
			rel="external nofollow noopener noreferrer"
			underline="none"
			sx={{
				display: 'flex',
				alignItems: 'center',
				borderRadius: '50%',
				border: 'none',
			}}
		>
			{props.children}
		</MuiLink.default>
	);
};

const CustomLink = (
	props: Readonly<{
		id: Id;
		isActive: boolean;
		shouldUseIcon: boolean;
	}>
) => {
	const wordScramble = useWordScramble({
		count: 10,
		timeOut: 30,
		content: capitalize(props.id),
	});

	return (
		<Link
			aria-label={`${props.id} link`}
			href={`/${props.id === 'home' ? '' : props.id}`}
			style={{ textDecoration: 'none' }}
		>
			{props.shouldUseIcon ? null : (
				<Box
					onMouseOver={wordScramble.start}
					onMouseOut={wordScramble.stop}
					sx={{
						transition: 'border 0.5s',
						boxSizing: 'border-box',
					}}
				>
					<Typography
						sx={({ palette }) => {
							return {
								fontWeight: props.isActive
									? 'bolder'
									: undefined,
								color: !props.isActive
									? palette.text.secondary
									: palette.text.primary,
								'&:hover': {
									color: palette.custom.opposite,
								},
							};
						}}
					>
						{wordScramble.word()}
					</Typography>
				</Box>
			)}
		</Link>
	);
};

type DontUseLink = Readonly<{
	dontUseLink?: true;
}>;

const EssentialIcons = {
	Projects: (props: DontUseLink) => {
		const Icon = (
			<IconButton aria-label="projects icon">
				<LightbulbIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<Link
				aria-label="projects link"
				href="/projects"
				style={{
					textDecoration: 'none',
				}}
			>
				{Icon}
			</Link>
		);
	},
	Contact: (props: DontUseLink) => {
		const Icon = (
			<IconButton aria-label="contact icon">
				<EmailIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<Link
				aria-label="contact link"
				href="/contact"
				style={{
					textDecoration: 'none',

					color: 'text.secondary',
				}}
			>
				{Icon}
			</Link>
		);
	},
	Github: (props: DontUseLink) => {
		const Icon = (
			<IconButton aria-label="github icon">
				<GitHubIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);
		return props.dontUseLink ? (
			Icon
		) : (
			<SocialButton aria-label="github link" href={links.github}>
				{Icon}
			</SocialButton>
		);
	},
	LinkedIn: (props: DontUseLink) => {
		const Icon = (
			<IconButton aria-label="linkedin icon">
				<LinkedInIcon
					sx={{
						color: 'text.secondary',
					}}
				/>
			</IconButton>
		);

		return props.dontUseLink ? (
			Icon
		) : (
			<SocialButton aria-label="linkedin link" href={links.linkedin}>
				{Icon}
			</SocialButton>
		);
	},
};

const ThemeMenu = () => {
	const [anchorElement, setAnchorElement] = React.useState(
		undefined as undefined | HTMLElement
	);

	const themeContext = React.useContext(ThemeContext);

	const onChooseTheme = (mode: Mode) => {
		return () => {
			themeContext.setMode(mode);
			setAnchorElement(undefined);
		};
	};

	const LightIcon = () => {
		return (
			<LightModeIcon
				aria-label="light mode icon"
				sx={{
					color: 'text.secondary',
				}}
			/>
		);
	};

	const DarkIcon = () => {
		return (
			<DarkModeIcon
				aria-label="dark mode icon"
				sx={{
					color: 'text.secondary',
				}}
			/>
		);
	};

	return (
		<React.Fragment>
			<IconButton
				aria-label="theme icon"
				onClick={(event) => {
					setAnchorElement(event.currentTarget);
				}}
			>
				{themeContext.mode === 'dark' ? <DarkIcon /> : <LightIcon />}
			</IconButton>
			<Menu
				open={isTruthy(anchorElement)}
				anchorEl={anchorElement}
				onClose={() => {
					setAnchorElement(undefined);
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuItem
					onClick={onChooseTheme('light')}
					sx={{
						whiteSpace: 'pre-wrap',
						gap: 3,
					}}
				>
					<LightIcon />
					<Typography>Light</Typography>
				</MenuItem>
				<MenuItem
					onClick={onChooseTheme('dark')}
					sx={{
						whiteSpace: 'pre-wrap',
						gap: 3,
					}}
				>
					<DarkIcon />
					<Typography>Dark</Typography>
				</MenuItem>
				<MenuItem
					onClick={onChooseTheme(getPreferredMode())}
					sx={{
						whiteSpace: 'pre-wrap',
						gap: 3,
					}}
				>
					<DevicesIcon
						aria-label="system mode icon"
						sx={{
							color: 'text.secondary',
						}}
					/>
					<Typography>System</Typography>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

const Header = () => {
	const router = useRouter();
	const route = router.route.replace('/', '');

	const breakPoint = useBreakpoint();
	const allShouldUseIcon = breakPoint === 'xm' || breakPoint === 'sm';
	const shouldUseBottonNavigation = breakPoint === 'xs';

	return (
		<Holder
			sx={{
				mb: shouldUseBottonNavigation ? 0 : 16,
				boxSizing: 'border-box',
			}}
		>
			{isFalse(shouldUseBottonNavigation) ? null : (
				<Box
					sx={{
						zIndex: 2,
						position: 'fixed',
						bottom: 0,
						width: '100%',
					}}
				>
					<BottomNavigation
						showLabels
						value={
							ids
								.map((id, index) => {
									return {
										id,
										index: !index ? undefined : index - 1,
									};
								})
								.find(({ id }) => {
									return id === route;
								})?.index
						}
						sx={{
							width: '100%',
							backgroundColor: 'transparent',
							backdropFilter: 'blur(250px)',
						}}
						onChange={(_, value) => {
							const open = (link: string) => {
								return window.open(
									link,
									'_blank',
									'external nofollow noopener noreferrer'
								);
							};

							if (value === 2) {
								return open(links.github);
							}

							if (value === 3) {
								return open(links.linkedin);
							}

							const id = Defined.parse(ids.at(value + 1)).orThrow(
								`value: ${value + 1} is out of range for ids: ${ids.join(', ')}`
							);

							return router.push(id, undefined, {
								shallow: true,
							});
						}}
					>
						<BottomNavigationAction
							label={capitalize(ids[0])}
							icon={<EssentialIcons.Projects dontUseLink />}
							sx={({ palette }) => {
								return {
									color:
										route === ids[1]
											? `${palette.text.primary} !important`
											: undefined,
								};
							}}
						/>
						<BottomNavigationAction
							label={capitalize(ids[1])}
							icon={<EssentialIcons.Contact dontUseLink />}
							sx={({ palette }) => {
								return {
									color:
										route === ids[2]
											? `${palette.text.primary} !important`
											: undefined,
								};
							}}
						/>
						<BottomNavigationAction
							label="Github"
							icon={<EssentialIcons.Github dontUseLink />}
						/>
						<BottomNavigationAction
							label="LinkedIn"
							icon={<EssentialIcons.LinkedIn dontUseLink />}
						/>
					</BottomNavigation>
				</Box>
			)}
			<Box
				sx={{
					width: '100%',
				}}
			>
				<AppBar
					position={shouldUseBottonNavigation ? 'relative' : 'fixed'}
					elevation={0}
					sx={{
						backgroundColor: 'transparent',
						display: 'grid',
						placeItems: 'center',
						backdropFilter: 'blur(250px)',
					}}
				>
					<Toolbar
						sx={{
							py: 3,
							px: `0px !important`,
							width: consts.width.projects[breakPoint ?? 'xl'],
							...(shouldUseBottonNavigation
								? {
										display: 'flex',
										justifyContent: 'space-between',
									}
								: {
										display: 'grid',
										gridTemplateColumns: '1fr 1fr 1fr',
									}),
						}}
					>
						<Box>
							<Link href="/" style={{ textDecoration: 'none' }}>
								<Image
									alt="logo"
									loading="lazy"
									src="/images/icons/icon-72x72.png"
									width={36}
									height={36}
									style={{
										display: 'block',
									}}
								/>
							</Link>
						</Box>
						{isFalse(shouldUseBottonNavigation) ? null : (
							<Box>
								<ThemeMenu />
							</Box>
						)}
						{shouldUseBottonNavigation ? null : (
							<Box>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-evenly',
										alignItems: 'center',
									}}
								>
									{ids.map((id) => {
										return (
											<CustomLink
												id={id}
												key={id}
												isActive={
													(route || 'home') === id
												}
												shouldUseIcon={allShouldUseIcon}
											/>
										);
									})}
								</Box>
							</Box>
						)}
						{shouldUseBottonNavigation ? null : (
							<Box>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
										gridGap: 24,
									}}
								>
									{!allShouldUseIcon ? null : (
										<React.Fragment>
											<EssentialIcons.Projects />
											<EssentialIcons.Contact />
										</React.Fragment>
									)}
									<EssentialIcons.Github />
									<EssentialIcons.LinkedIn />
									<SocialButton
										aria-label="instagram link"
										href={links.instagram}
									>
										<IconButton aria-label="instagram icon">
											<InstagramIcon
												sx={{
													color: 'text.secondary',
												}}
											/>
										</IconButton>
									</SocialButton>
									<ThemeMenu />
								</Box>
							</Box>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</Holder>
	);
};

export type { Mode };

export default Header;
