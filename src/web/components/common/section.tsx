import type { Children } from '../../type/react';
import type { SxProps, Theme } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import React from 'react';

const Section = (
	props: Readonly<
		Children & {
			elevation?: number;
			sx?: SxProps<Theme>;
		}
	>
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
