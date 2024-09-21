import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import Button from '@mui/material/Button';
import React from 'react';

const SecondaryMainButton = (
	props: Readonly<{
		title: string;
		sx?: SxProps<Theme>;
		onClick: ButtonProps['onClick'];
	}>
) => {
	const { sx } = props;
	return (
		<Button
			disableElevation
			onClick={props.onClick}
			sx={(theme) => {
				return {
					width: 'fit-content',
					color: 'custom.contrast.white',
					backgroundColor: 'secondary.main',
					fontSize: '1em',
					'&:hover': {
						backgroundColor: 'secondary.dark',
					},
					...(!sx
						? undefined
						: typeof sx === 'function'
							? sx(theme)
							: 'width' in sx
								? sx
								: undefined),
				};
			}}
			variant="contained"
		>
			{props.title}
		</Button>
	);
};

export { SecondaryMainButton };
