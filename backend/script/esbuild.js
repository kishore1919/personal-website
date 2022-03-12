import { build } from 'esbuild';

const main = ({ entryPoints, outfile }) =>
    build({
        entryPoints,
        outfile,
        bundle: true,
        minify: true,
        platform: 'node',
        target: 'node16.13.1',
        logLevel: 'silent',
    })
        .then((r) => {
            console.dir(r);
            console.log('Build succeeded.');
        })
        .catch((e) => {
            console.log('Error building:', e.message);
            process.exit(1);
        });

main({
    entryPoints: ['src/index.ts'],
    outfile: 'build/index.js',
});
