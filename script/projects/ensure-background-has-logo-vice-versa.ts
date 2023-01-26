import fs from 'fs';

const main = () => {
    const parentDir = 'public/images/projects';
    const background = fs.readdirSync(`${parentDir}/background`);
    const logo = fs.readdirSync(`${parentDir}/logo`);
    const backgroundWithNoMatchingLogo = background.filter(
        (background) => !logo.includes(background)
    );
    const logoWithNoMatchingBackground = logo.filter(
        (logo) => !background.includes(logo)
    );
    const backgroundWithNoMatchingLogoCount =
        backgroundWithNoMatchingLogo.length;
    const logoWithNoMatchingBackgroundCount =
        logoWithNoMatchingBackground.length;
    if (backgroundWithNoMatchingLogoCount) {
        throw new Error(
            `background: ${backgroundWithNoMatchingLogo.join(
                '\n'
            )} has no matching logo`
        );
    }
    if (logoWithNoMatchingBackgroundCount) {
        throw new Error(
            `logo: ${logoWithNoMatchingBackground.join(
                '\n'
            )} has no matching background`
        );
    }
    if (
        !(
            backgroundWithNoMatchingLogoCount &&
            logoWithNoMatchingBackgroundCount
        )
    ) {
        console.log('All background has matching logo and vice versa');
    }
};

main();
