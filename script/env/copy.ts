import ci from 'ci-info';
import childProcess from 'child_process';
import parse from 'parse-dont-validate';

const main = () => {
    const environment = parse(process.argv.at(2))
        .asString()
        .elseThrow('Must have environment')
        .replace(/-/g, '');
    console.log({ environment });
    if (!ci.isCI) {
        childProcess.execSync(`cp .env.${environment} .env`, {
            stdio: 'inherit',
        });
    }
};

main();
