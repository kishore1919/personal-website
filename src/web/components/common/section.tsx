import React from 'react';
import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';

const Section = (
	props: Readonly<{
		elevation?: number;
		sx?: SxProps<Theme>;
		children: React.ReactNode;
	}>
) => {
	const sx: SxProps<Theme> = {
		m: 0,
		mb: 2,
		p: 0,
		boxSizing: 'border-box',
		width: '100%',
	};

	return (
		<Paper
			{...{
				...props,
				elevation: props.elevation ?? 1,
				sx: (theme: Theme) => {
					return {
						...sx,
						...(typeof props.sx === 'function'
							? props.sx(theme)
							: props.sx),
					};
				},
			}}
		/>
	);
};

export default Section;
