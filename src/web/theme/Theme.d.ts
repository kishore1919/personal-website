import 'styled-components';

// TODO: tagged union
type Theme = Readonly<{
    type: 'primary' | 'secondary';
    primaryColor: '#FEFEFE' | '#121212';
    secondaryColor: '#121212' | '#FEFEFE';
    contactMeLabel: '#0FFBF9' | '#00539C';
    highEmphasesTextColor: '#FFFFFFE2' | '#000000DD';
    mediumEmphasesTextColor: '#FFFFFF99' | '#000000B3';
    resumeListText: '#000000B2' | '#FFFFFFE2';
    googleIconBackground: '#1D1E1f' | '#FFF';
    scrollBarBackground: '#000D0D' | '#F5F5F5';
    project: {
        techTool: '#202128' | '#202128';
        toolContainer: '#4184E426' | '#0969DA';
        toolColor: '#539BF5' | '#DDF5FF';
    };
}>;

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly fontFamily: 'JetBrains Mono';
        readonly gray: '#35383B';
        readonly red: '#FF3F4A';
        readonly white: '#E4F8B0';
        readonly green: '#0FFBF9';
        readonly blue: {
            readonly pale: '#90BCD7';
            readonly bright: '#1DACD6';
        };
        readonly theme: Theme;
    }
}
