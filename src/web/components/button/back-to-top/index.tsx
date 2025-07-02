import IconButton from '@mui/material/IconButton';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa6';

import useHeight from '../../../hooks/use-height';

const BackToTop = () => {
	const height = useHeight();

	return height <= 500 ? null : (
		<IconButton
			aria-label="back to top"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}
			sx={({ palette }) => {
				const { mode, grey } = palette;
				const isDark = mode === 'dark';

				const color = (dark: boolean) => {
					return grey[dark ? 50 : 900];
				};

				return {
					zIndex: 3,
					position: 'fixed',
					bottom: 10,
					right: 15,
					backgroundColor: 'transparent',
					color: color(isDark),
					'&:hover': {
						color: color(!isDark),
						backgroundColor: color(isDark),
					},
				};
			}}
		>
			<FaArrowUp fontSize="0.75em" />
		</IconButton>
	);
};

export default BackToTop;
