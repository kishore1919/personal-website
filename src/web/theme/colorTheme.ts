import { DefaultTheme } from 'styled-components';
import { Theme } from './Theme';

const createDefaultTheme = (theme: Theme): DefaultTheme => ({
    fontFamily: 'Orbitron',
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
const primaryTheme = createDefaultTheme({
    type: 'primary',
    primaryColor: '#121212',
    secondaryColor: '#FEFEFE',
    contactMeLabel: '#0FFBF9',
    highEmphasesTextColor: '#FFFFFFE2',
    mediumEmphasesTextColor: '#FFFFFF99',
    disabledTextColor: '#FFFFFF61',
    contactInputHover: '#2B2B2B',
    resumeListText: '#000000B2',

    hoverColor: '#000000B2',

    googleIconBackground: '#FFF',
    scrollBarBackground: '#000D0D',
});

// light theme
const secondaryTheme = createDefaultTheme({
    type: 'secondary',
    primaryColor: '#FEFEFE',
    secondaryColor: '#121212',
    contactMeLabel: '#00539C',
    highEmphasesTextColor: '#000000DD',
    mediumEmphasesTextColor: '#000000B3',
    disabledTextColor: '#00000061',
    contactInputHover: '#FAFAFA',
    resumeListText: '#FFFFFFE2',

    hoverColor: '#00000019',

    googleIconBackground: '#1D1E1f',
    scrollBarBackground: '#F5F5F5',
});

const config = {
    key: 'theme',
    value: {
        primary: 'dark',
        secondary: 'light',
    },
} as const;

const isPrimary = ({ theme: { type } }: DefaultTheme) => type === 'primary';

const getThemeFromPrevTheme = (theme: DefaultTheme) =>
    getTheme(!isPrimary(theme));

const getConfigKey = (theme: DefaultTheme) =>
    isPrimary(theme) ? config.value.primary : config.value.secondary;

const getThemeFromConfigValue = (value: string) =>
    getTheme(config.value.primary === value);

const getTheme = (isDark: boolean) => (isDark ? primaryTheme : secondaryTheme);

const isDarkResume = (value: string | boolean) => {
    if (typeof value === 'boolean') {
        return value ? 'Dark' : 'Light';
    }
    return value === config.value.primary ? 'Dark' : 'Light';
};

export {
    primaryTheme,
    secondaryTheme,
    config,
    isPrimary,
    getThemeFromPrevTheme,
    getConfigKey,
    getThemeFromConfigValue,
    getTheme,
    isDarkResume,
};
