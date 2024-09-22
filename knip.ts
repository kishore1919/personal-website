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
		'script/env/type-def.ts',
		'script/mongo-setup/document.js',
		'script/site/webmanifest.ts',
	],
	ignoreDependencies: [
		'@poolofdeath20/prettier-config-generator',
		'eslint',
		'gen-env-type-def',
		'next-sitemap',
		'prettier',
		'vite-node',
		'@eslint/compat',
		'@eslint/js',
		'typescript-eslint',
	],
	ignoreBinaries: ['make'],
};

export default config;
