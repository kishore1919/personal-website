import { build } from 'esbuild';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PUBLIC_URL: process.env.PUBLIC_URL,
    NODE_ENV: process.env.NODE_ENV,
};

const main = ({ entryPoints, outfile, loader }) =>
    build({
        entryPoints,
        outfile,
        loader,
        bundle: true,
        minify: true,
        platform: 'browser',
        define: {
            'process.env.NODE_ENV': `"${config.NODE_ENV}"`,
            'process.env.PUBLIC_URL': `"${config.PUBLIC_URL}"`,
        },
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
    entryPoints: ['src/index.tsx'],
    outfile: 'build/index.js',
    loader: {
        '.ts': 'tsx',
    },
});
