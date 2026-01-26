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
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	productionBrowserSourceMaps: isDevelopment,
	outputFileTracingRoot: __dirname,
};

export default withPWA(config);
