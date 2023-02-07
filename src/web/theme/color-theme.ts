import type { DefaultTheme } from 'styled-components';
import type { Theme } from './Theme';

const createDefaultTheme = (theme: Theme): DefaultTheme => ({
    fontFamily: 'JetBrains Mono',
    gray: '#35383B',
    white: '#E4F8B0',
    blue: {
        pale: '#90BCD7',
        bright: '#1DACD6',
    },
    red: '#FF3F4A',
    green: '#0FFBF9',
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
    resumeListText: '#000000B2',

    googleIconBackground: '#FFF',
    scrollBarBackground: '#000D0D',
    project: {
        techTool: '#202128',
        toolContainer: '#4184E426',
        toolColor: '#539BF5',
    },
});

// light theme
const secondaryTheme = createDefaultTheme({
    type: 'secondary',
    primaryColor: '#FEFEFE',
    secondaryColor: '#121212',
    contactMeLabel: '#00539C',
    highEmphasesTextColor: '#000000DD',
    mediumEmphasesTextColor: '#000000B3',
    resumeListText: '#FFFFFFE2',

    googleIconBackground: '#1D1E1f',
    scrollBarBackground: '#F5F5F5',
    project: {
        techTool: '#202128',
        toolContainer: '#4184E426',
        toolColor: '#539BF5',
    },
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
    getTheme({
        isDark: !isPrimary(theme),
    });

const getConfigKey = (theme: DefaultTheme) =>
    isPrimary(theme) ? config.value.primary : config.value.secondary;

const getThemeFromConfigValue = (value: string) =>
    getTheme({
        isDark: config.value.primary === value,
    });

const getTheme = ({
    isDark,
}: Readonly<{
    isDark: boolean;
}>) => (isDark ? primaryTheme : secondaryTheme);

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
