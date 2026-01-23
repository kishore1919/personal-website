import type { SxProps, Theme } from '@mui/material/styles';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExternalLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import Holder from '../src/web/components/common/holder';
import Seo from '../src/web/components/seo';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';
import projects from '../src/web/information/projects';
import { projectsPageContent } from '../src/web/information/content';

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
		(import.meta.env.MODE === 'test'
			? undefined
			: {
				transition: 'opacity 1s',
				transitionDelay: '200ms',
				opacity: show ? 1 : 0,
			});

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
			<ExternalLink
				href={project.githubLink}
				rel="external nofollow noopener noreferrer"
				target="_blank"
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
							// eslint-disable-next-line react/forbid-component-props
							style={{
								color:
									isWhite && palette.mode === 'light'
										? '#000'
										: (project.icon.color ??
											palette.text.secondary),
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
			</ExternalLink>
		</Box>
	);
};

const Projects = () => {
	const breakPoint = useBreakpoint();

	return (
		<React.Fragment>
			{/* SEO handled by Astro wrapper */}
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
										gap: 4,
									}}
								>
									<Box
										sx={{
											display: 'grid',
											placeItems: 'center',
										}}
									>
										<Typography
											sx={{
												fontWeight: 700,
											}}
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
															key={project.name}
															size={{
																lg: 4,
																xm: 6,
																xs: 12,
															}}
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
