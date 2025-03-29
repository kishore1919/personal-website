import { colorTheme } from '../theme';

type Common = Readonly<{
	custom: typeof colorTheme;
	background: Theme['background'];
}>;

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
	interface Theme extends Common {}

	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
	interface Palette extends Common {}

	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type
	interface PaletteOptions extends Common {}

	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface BreakpointOverrides {
		xm: true;
	}
}
