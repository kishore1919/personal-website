import { colorTheme } from '../theme';

declare module '@mui/material/styles' {
    interface Theme {
        custom: typeof colorTheme;
    }

    interface Palette {
        custom: typeof colorTheme;
    }

    interface PaletteOptions {
        custom: typeof colorTheme;
    }

    interface BreakpointOverrides {
        xm: true;
    }
}
