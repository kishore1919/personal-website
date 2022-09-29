import 'styled-components';

type Theme = Readonly<{
    type: 'primary' | 'secondary';
    primaryColor: '#FEFEFE' | '#121212';
    secondaryColor: '#121212' | '#FEFEFE';
    contactMeLabel: '#0FFBF9' | '#00539C';
    aboutMeDescription: '#CDC764' | '#4b371c';
    highEmphasesTextColor: '#FFFFFFE2' | '#000000DD';
    mediumEmphasesTextColor: '#FFFFFF99' | '#000000B3';
    disabledTextColor: '#FFFFFF61' | '#00000061';
    contactInputHover: '#2B2B2B' | '#FAFAFA';
    resumeListText: '#000000B2' | '#FFFFFFE2';
    hoverColor: '#000000B2' | '#00000019';
    googleIconBackground: '#1D1E1f' | '#FFF';
    scrollBarBackground: '#000D0D' | '#F5F5F5';
}>;

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly fontFamily: 'Orbitron';
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
