import fs from 'fs';

import pkg from '../../package.json';
import { colorTheme } from '../../src/web/theme';

const main = () => {
	const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

	const webmanifest = {
		name: pkg.author,
		short_name: pkg.author,
		start_url: '/',
		display: 'standalone',
		background_color: colorTheme.contrast.black,
		description: pkg.description,
		categories: ['portfolio'],
		theme_color: colorTheme.contrast.black,
		icons: dimensions.map((dimension) => {
			const properties = {
				sizes: `${dimension}x${dimension}`,
				src: `/images/icons/icon-${dimension}x${dimension}.png`,
				type: 'image/png',
			};

			return dimension !== 512
				? properties
				: {
						...properties,
						purpose: 'any',
					};
		}),
	};

	const stringifiedWebmanifest = JSON.stringify(webmanifest, undefined, 4);

	fs.writeFileSync('public/site.webmanifest', stringifiedWebmanifest);

	fs.writeFileSync('public/manifest.json', stringifiedWebmanifest);
};

main();
