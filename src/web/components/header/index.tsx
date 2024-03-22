import React, { type PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExternalLink from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DevicesIcon from '@mui/icons-material/Devices';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { alpha } from '@mui/material/styles';
import { isTruthy, type Mode, getPreferredMode } from '@poolofdeath20/util';
import Holder from '../common/holder';
import useBreakpoint from '../../hooks/use-breakpoint-value';
import links from '../../links';
import consts from '../../const';
import { ThemeContext } from '../../context/theme';
import type { Children } from '../../type/react';

const ids = ['home', 'projects', 'contact'] as const;

const useAnchorElement = () => {
	const [get, set] = React.useState(undefined as undefined | HTMLElement);

	const clear = () => {
		set(undefined);
	};

	return [get, set, clear] as const;
};

const SocialButton = (
	props: Readonly<
		Children & {
			href: string;
			'aria-label': string;
		}
	>
) => {
	return (
		<ExternalLink
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
				whiteSpace: 'pre-wrap',
				gap: 2,
			}}
		>
			{props.children}
		</ExternalLink>
	);
};

const InternalLinkWithIcon = (
	props: PropsWithChildren &
		Readonly<{
			href: string;
		}>
) => {
	return (
		<Link
			aria-label={`${props.href === '/' ? 'home' : props.href} link`}
			href={props.href}
			style={{
				textDecoration: 'none',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Stack
				direction="row"
				sx={{
					display: 'flex',
					alignItems: 'center',
					whiteSpace: 'pre-wrap',
					gap: 2,
				}}
			>
				{props.children}
			</Stack>
		</Link>
	);
};

type InternalEssentialIconsProps = Readonly<{
	route: string;
}>;

const Icons = {
	Projects: (props: InternalEssentialIconsProps) => {
		return (
			<InternalLinkWithIcon href="/projects">
				<IconButton aria-label="projects icon">
					<LightbulbIcon
						sx={{
							color:
								ids[1] === props.route
									? 'text.primary'
									: 'text.secondary',
						}}
					/>
				</IconButton>
			</InternalLinkWithIcon>
		);
	},
	Contact: (props: InternalEssentialIconsProps) => {
		return (
			<InternalLinkWithIcon href="/contact">
				<IconButton aria-label="contact icon">
					<EmailIcon
						sx={{
							color:
								ids[2] === props.route
									? 'text.primary'
									: 'text.secondary',
						}}
					/>
				</IconButton>
			</InternalLinkWithIcon>
		);
	},
	Github: () => {
		return (
			<SocialButton aria-label="github link" href={links.github}>
				<IconButton aria-label="github icon">
					<GitHubIcon
						sx={{
							color: 'text.secondary',
						}}
					/>
				</IconButton>
			</SocialButton>
		);
	},
	LinkedIn: () => {
		return (
			<SocialButton aria-label="linkedin link" href={links.linkedin}>
				<IconButton aria-label="linkedin icon">
					<LinkedInIcon
						sx={{
							color: 'text.secondary',
						}}
					/>
				</IconButton>
			</SocialButton>
		);
	},
	Instagram: () => {
		return (
			<SocialButton aria-label="instagram link" href={links.instagram}>
				<IconButton aria-label="instagram icon">
					<InstagramIcon
						sx={{
							color: 'text.secondary',
						}}
					/>
				</IconButton>
			</SocialButton>
		);
	},
};

const Item = (
	props: Children &
		Readonly<{
			onClick?: () => void;
		}>
) => {
	return (
		<MenuItem
			onClick={props.onClick}
			sx={{
				whiteSpace: 'pre-wrap',
				gap: 2,
			}}
		>
			{props.children}
		</MenuItem>
	);
};

const ThemeMenu = () => {
	const [get, set, clear] = useAnchorElement();

	const themeContext = React.useContext(ThemeContext);

	const onChooseTheme = (mode: Mode) => {
		return () => {
			themeContext.setMode(mode);
			clear();
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
					set(event.currentTarget);
				}}
			>
				{themeContext.mode === 'dark' ? <DarkIcon /> : <LightIcon />}
			</IconButton>
			<Menu
				open={isTruthy(get)}
				anchorEl={get}
				onClose={clear}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				sx={({ palette }) => {
					const value = palette.mode === 'dark' ? 0.1 : 0.2;

					return {
						'& .MuiPaper-root': {
							background: palette.custom.default,
							boxShadow: 'none',
							border: `1px solid ${alpha(palette.custom.opposite, value)}`,
						},
					};
				}}
			>
				<Item onClick={onChooseTheme('light')}>
					<LightIcon />
					<Typography>Light</Typography>
				</Item>
				<Item onClick={onChooseTheme('dark')}>
					<DarkIcon />
					<Typography>Dark</Typography>
				</Item>
				<Item onClick={onChooseTheme(getPreferredMode())}>
					<DevicesIcon
						aria-label="system mode icon"
						sx={{
							color: 'text.secondary',
						}}
					/>
					<Typography>System</Typography>
				</Item>
			</Menu>
		</React.Fragment>
	);
};

const Header = () => {
	const router = useRouter();
	const route = router.route.replace('/', '') || 'home';

	const breakPoint = useBreakpoint();
	const shouldUseMobileNavigation = breakPoint === 'xs';

	const InternalLinksWithIcon = () => {
		return (
			<React.Fragment>
				<Icons.Projects route={route} />
				<Icons.Contact route={route} />
			</React.Fragment>
		);
	};

	return (
		<Holder
			sx={{
				mb: shouldUseMobileNavigation ? 0 : 16,
				boxSizing: 'border-box',
			}}
		>
			<Box
				sx={{
					width: '100%',
				}}
			>
				<AppBar
					position={shouldUseMobileNavigation ? 'relative' : 'fixed'}
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
							py: 2,
							px: shouldUseMobileNavigation
								? 1
								: `0px !important`,
							width: consts.width.projects[breakPoint ?? 'xl'],
							display: 'flex',
							justifyContent: 'space-between',
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
						<Stack
							direction="row"
							spacing={{
								xs: 1,
								sm: 2,
							}}
							alignContent="center"
							justifyContent="flex-end"
						>
							<InternalLinksWithIcon />
							<Icons.Github />
							<Icons.LinkedIn />
							<Icons.Instagram />
							<ThemeMenu />
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</Holder>
	);
};

export type { Mode };

export default Header;
