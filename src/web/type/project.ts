import type { IconType } from 'react-icons';

type Project = Readonly<{
	name: string;
	description: string;
	githubLink: string;
	icon: Readonly<{
		color?: string;
		Component: IconType;
	}>;
}>;

type ProjectCategory = Readonly<{
	category: string;
	projects: ReadonlyArray<Project>;
}>;

export type { Project, ProjectCategory };
