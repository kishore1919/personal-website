const process = require('process');
const url = process.env.NEXT_PUBLIC_ORIGIN;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: url,
	generateRobotsTxt: true, // (optional)
	exclude: ['/server-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${url}/server-sitemap.xml`],
	},
};
