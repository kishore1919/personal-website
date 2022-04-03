import { DefaultTheme } from 'styled-components';
import { Theme } from './Theme';

const createDefaultTheme = (theme: Theme): DefaultTheme => ({
    contactInputPlaceholder: '#35383B',
    contactInputBorder: '#37383B',
    redColor: '#CC0F39',
    greenColor: '#0FFBF9',
    ctaColor: '#FF0038',
    contactGreenGlitch: '#0FFBF9',
    contactRedGlitch: '#CC0F39',
    blackPiece: '#333',
    redPiece: '#DC143C',
    errorHomeButton: '#1dacd6',
    theme,
});

// dark theme
export const primaryTheme = createDefaultTheme({
    type: 'primary',
    primaryColor: '#121212',
    secondaryColor: '#FEFEFE',
    contactMeLabel: '#0FFBF9',
    aboutMeDescription: '#CDC764',
    highEmphasesTextColor: '#FFFFFFE2',
    mediumEmphasesTextColor: '#FFFFFF99',
    disabledTextColor: '#FFFFFF61',
    contactInputHover: '#2B2B2B',
    resumeListText: '#000000B2',

    hoverColor: '#000000B2',

    contactTickBrightness: 'brightness(0%) invert(0)',
    googleIconBackground: '#FFF',
    scrollBarBackground: '#000D0D',
});

// light theme
export const secondaryTheme = createDefaultTheme({
    type: 'secondary',
    primaryColor: '#FEFEFE',
    secondaryColor: '#121212',
    contactMeLabel: '#00539C',
    aboutMeDescription: '#4b371c',
    highEmphasesTextColor: '#000000DD',
    mediumEmphasesTextColor: '#000000B3',
    disabledTextColor: '#00000061',
    contactInputHover: '#FAFAFA',
    resumeListText: '#FFFFFFE2',

    hoverColor: '#00000019',

    contactTickBrightness: 'brightness(0%) invert(1)',
    googleIconBackground: '#1D1E1f',
    scrollBarBackground: '#F5F5F5',
});

const valueConfig = {
    primary: '7611fdc9-cb5c-4e4f-9c66-9bd609c70a08',
    secondary: '50a47b63-cfde-4c7a-a9c6-3329a841188b',
} as const;

export const keyConfig = {
    key: '8bf5222d-038e-4dfd-ab93-ab6267f8dc55',
} as const;

export const isPrimary = ({ theme: { type } }: DefaultTheme) =>
    type === 'primary';

export const getThemeFromPrevTheme = (theme: DefaultTheme) =>
    getTheme(!isPrimary(theme));

export const getConfigKey = (theme: DefaultTheme) =>
    isPrimary(theme) ? valueConfig.primary : valueConfig.secondary;

export const getThemeFromConfigKey = (value: string) =>
    getTheme(valueConfig.primary === value);

export const getTheme = (isDark: boolean) =>
    isDark ? primaryTheme : secondaryTheme;

export const isDarkResume = (value: string | boolean) => {
    if (typeof value === 'string') {
        return value === valueConfig.primary ? 'Dark' : 'Light';
    }
    return value ? 'Dark' : 'Light';
};
