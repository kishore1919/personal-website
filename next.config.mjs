import process from 'process';
import { fileURLToPath } from 'url';
import path from 'path';

import withPWAInit from '@ducanh2912/next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env['NEXT_PUBLIC_NODE_ENV'] === 'development';

const withPWA = withPWAInit({
	dest: 'public',
	sw: 'service-worker.js',
	disable: isDevelopment,
	register: true,
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	productionBrowserSourceMaps: false,
	outputFileTracingRoot: __dirname,
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	modularizeImports: {
		'@mui/icons-material': {
			transform: '@mui/icons-material/{{member}}',
		},
		'react-icons/bs': {
			transform: 'react-icons/bs/{{member}}',
		},
		'react-icons/si': {
			transform: 'react-icons/si/{{member}}',
		},
		'react-icons/fa6': {
			transform: 'react-icons/fa6/{{member}}',
		},
	},
	experimental: {
		optimizePackageImports: [
			'@mui/material',
			'@mui/icons-material',
			'react-icons',
		],
	},
	async headers() {
		return [
			{
				source: '/font/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/images/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

export default withPWA(config);
