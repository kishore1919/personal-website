import type { Breakpoint } from '@mui/material/styles';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useBreakpoint = () => {
	const theme = useTheme();

	// 3G/low-end + SSR: noSsr avoids hydration mismatch flashes and lets the
	// server send text immediately instead of blocking on media queries.
	const matches = {
		xs: useMediaQuery(theme.breakpoints.up('xs'), { noSsr: true }),
		sm: useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true }),
		xm: useMediaQuery(theme.breakpoints.up('xm'), { noSsr: true }),
		md: useMediaQuery(theme.breakpoints.up('md'), { noSsr: true }),
		lg: useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true }),
		xl: useMediaQuery(theme.breakpoints.up('xl'), { noSsr: true }),
	};

	const validBreakpoints = Object.entries(matches)
		.filter(([_, isMatch]) => {
			return isMatch;
		})
		.map(([key]) => {
			return key as Breakpoint;
		});

	return validBreakpoints.at(-1);
};

export default useBreakpoint;
