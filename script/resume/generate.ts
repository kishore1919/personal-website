import fs from 'fs';
import childProcess from 'child_process';

const run = (command: string) => {
    console.log(command);
    childProcess.execSync(command, { stdio: 'inherit' });
};

const main = () => {
    run('git clone https://github.com/GervinFung/resume.git --depth 1');
    run('cd resume && make install');

    const assetFiles = 'public/files';
    if (!fs.existsSync(assetFiles)) {
        fs.mkdirSync(assetFiles);
    }

    run(
        'mv resume/dist/GervinFungDaXuen-Résumé.pdf public/files/GervinFungDaXuen-Résumé.pdf'
    );
    run('rm -rf resume');
};

main();
