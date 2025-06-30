import type { ButtonProps } from '@mui/material/Button';

import { keyframes } from '@emotion/react';
import Button from '@mui/material/Button';
import React from 'react';

const chargeHomeButton = keyframes`
    0% {
        background-position: 100% 0%;
    }
    100% {
        background-position: 0% -100%;
    }
`;

const ClickRefresh = (
	props: Readonly<{
		title: string;
		onClick: ButtonProps['onClick'];
		timeToChange: number;
	}>
) => {
	return (
		<Button
			disableElevation
			onClick={props.onClick}
			sx={({ palette }) => {
				return {
					fontWeight: 600,
					backgroundColor: 'custom.blue.dark',
					background: [
						`linear-gradient(to left`,
						`${palette.background.default} 50%`,
						`${palette.custom.blue.dark} 50%)`,
					].join(','),
					backgroundSize: '200%',
					display: 'inline-block',
					animation: `${chargeHomeButton} ease-in-out ${props.timeToChange}s`,
					'&:hover': {
						backgroundPosition: 'left !important',
					},
				};
			}}
			title={props.title}
		/>
	);
};

export default ClickRefresh;