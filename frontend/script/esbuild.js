import { build } from 'esbuild';
import dotenv from 'dotenv';
import { parseAsEnvs, parseAsEnv } from 'esbuild-env-parsing';

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
        define: parseAsEnvs(['NODE_ENV', 'PUBLIC_URL']),
        logLevel: 'silent',
        watch:
            parseAsEnv({
                env: process.env.NODE_ENV,
                name: 'node env',
            }) !== 'DEVELOPMENT'
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
