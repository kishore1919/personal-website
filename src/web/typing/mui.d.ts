import { colorTheme } from '../theme';

type Common = {
	custom: typeof colorTheme;
	background: Theme['background'];
};

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Theme extends Common {}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Palette extends Common {}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface PaletteOptions extends Common {}

	interface BreakpointOverrides {
		xm: true;
	}
}
