const theme = {
    fontFamily: 'JetBrains Mono',
    scrollBarBackground: '#000D0D',
    color: {
        primary: '#121212',
        secondary: '#FEFEFE',
        gray: '#35383B',
        red: '#FF3F4A',
        green: '#0FFBF9',
        blue: {
            pale: '#90BCD7',
            bright: '#1DACD6',
        },
    },
    text: {
        highEmphasis: '#FFFFFFE2',
        mediumEmphasis: '#FFFFFF99',
    },
    project: {
        techTool: '#202128',
        toolContainer: '#4184E426',
        toolColor: '#539BF5',
    },
    social: {
        icon: 'whitesmoke',
        facebook: '#3B5998',
        linkedin: '#1877f2',
        github: '#282A36',
        google: '#FFF',
        instagram: {
            normal: '#F09433',
            hover: '#DC2743',
            gradient: [
                '#F09433 0%',
                '#E6683C 25%',
                '#DC2743 50%',
                '#CC2366 75%',
                '#CC2366 75%',
            ].join(','),
        },
    },
} as const;

export { theme };
