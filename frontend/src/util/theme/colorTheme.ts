import { DefaultTheme } from 'styled-components';
import { Theme } from './Theme';

const darkTheme: Theme = {
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

    portfolioButtonBrightness: 'brightness(0%) invert(1)',
    portfolioButtonBrightnessHover: 'brightness(0%) invert(0.1)',
    contactTickBrightness: 'brightness(0%) invert(0)',
    googleIconBackground: '#FFF',
    scrollBarBackground: '#000D0D',
};

const lightTheme: Theme = {
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

    portfolioButtonBrightness: 'brightness(0%) invert(0.2)',
    portfolioButtonBrightnessHover: 'brightness(0%) invert(0.9)',
    contactTickBrightness: 'brightness(0%) invert(1)',
    googleIconBackground: '#1D1E1f',
    scrollBarBackground: '#F5F5F5',
};

export const primaryTheme: DefaultTheme = {
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
    theme: darkTheme,
};

export const secondaryTheme: DefaultTheme = {
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
    theme: lightTheme,
};

export const getTheme = (theme: DefaultTheme) => isPrimary(theme) ? secondaryTheme : primaryTheme;
export const isPrimary = (theme: DefaultTheme) => theme.theme === darkTheme;

export const KEY = '8bf5222d-038e-4dfd-ab93-ab6267f8dc55';
export const PRIMARY = '7611fdc9-cb5c-4e4f-9c66-9bd609c70a08';
export const SECONDARY = '50a47b63-cfde-4c7a-a9c6-3329a841188b';