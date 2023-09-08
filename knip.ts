import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: [
		'pages/api/**/*.ts',
		'pages/**/*.tsx',
		'src/**/*.tsx',
		'src/**/*.ts',
		'script/**/*.s',
	],
	ignore: [
		'next-sitemap.config.js',
		'script/env/copy.ts',
		'script/env/type-def.ts',
		'script/mongo-setup/document.js',
		'script/site/webmanifest.ts',
	],
	ignoreDependencies: [
		'vite-node',
		'next-sitemap',
		'prettier',
		'gen-env-type-def',
		'eslint-config-next',
		'@poolofdeath20/prettier-config-generator',
		'eslint',
	],
	ignoreBinaries: ['make', 'package.json'],
};

export default config;
