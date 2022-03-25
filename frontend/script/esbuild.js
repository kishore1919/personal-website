import { build } from 'esbuild';
import dotenv from 'dotenv';

dotenv.config({});

(() =>
    build({
        entryPoints: ['src/index.tsx'],
        outfile: 'build/index.js',
        loader: {
            '.ts': 'tsx',
        },
        bundle: true,
        minify: true,
        minifyWhitespace: true,
        platform: 'browser',
        define: {
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
            'process.env.PUBLIC_URL': `"${process.env.PUBLIC_URL}"`,
        },
        logLevel: 'silent',
        watch:
            process.env.NODE_ENV !== 'DEVELOPMENT'
                ? undefined
                : {
                      onRebuild: (error, result) =>
                          console.log(error ?? result),
                  },
    })
        .then((r) => {
            console.dir(r);
            console.log('Build succeeded.');
        })
        .catch((e) => {
            console.log('Error building:', e.message);
            process.exit(1);
        }))();
