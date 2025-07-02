import type { Children } from '../../type/react';

import Box from '@mui/material/Box';
import React from 'react';

const MarginTopBox = (
	props: Readonly<
		Children & {
			shouldNotMarginTop?: true;
		}
	>
) => {
	return (
		<Box
			sx={{
				m: 0,
				mt: !props.shouldNotMarginTop ? 4 : undefined,
				display: 'grid',
				placeItems: 'center',
			}}
		>
			{props.children}
		</Box>
	);
};

export default MarginTopBox;
