import 'styled-components';

interface Theme {
    readonly type: 'primary' | 'secondary';
    readonly primaryColor: '#FEFEFE' | '#121212';
    readonly secondaryColor: '#121212' | '#FEFEFE';
    readonly contactMeLabel: '#0FFBF9' | '#00539C';
    readonly aboutMeDescription: '#CDC764' | '#4b371c';
    readonly highEmphasesTextColor: '#FFFFFFE2' | '#000000DD';
    readonly mediumEmphasesTextColor: '#FFFFFF99' | '#000000B3';
    readonly disabledTextColor: '#FFFFFF61' | '#00000061';
    readonly contactInputHover: '#2B2B2B' | '#FAFAFA';
    readonly resumeListText: '#000000B2' | '#FFFFFFE2';
    readonly hoverColor: '#000000B2' | '#00000019';

    readonly portfolioButtonBrightness:
        | 'brightness(0%) invert(1)'
        | 'brightness(0%) invert(0.2)';
    readonly portfolioButtonBrightnessHover:
        | 'brightness(0%) invert(0.1)'
        | 'brightness(0%) invert(0.9)';
    readonly contactTickBrightness:
        | 'brightness(0%) invert(0)'
        | 'brightness(0%) invert(1)';

    readonly googleIconBackground: '#1D1E1f' | '#FFF';
    readonly scrollBarBackground: '#000D0D' | '#F5F5F5';
}

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly contactInputPlaceholder: '#35383B';
        readonly contactInputBorder: '#37383B';
        readonly redColor: '#CC0F39';
        readonly greenColor: '#0FFBF9';
        readonly ctaColor: '#FF0038';
        readonly contactGreenGlitch: '#0FFBF9';
        readonly contactRedGlitch: '#CC0F39';
        readonly blackPiece: '#333';
        readonly redPiece: '#DC143C';
        readonly errorHomeButton: '#1dacd6';
        readonly theme: Theme;
    }
}
