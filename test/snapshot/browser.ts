import type { Argument } from '@poolofdeath20/util';
import type { Browser, Page } from 'puppeteer';

const setTheme = async (
	props: Readonly<{
		page: Page;
		mode: 'dark';
	}>
) => {
	await props.page.emulateMediaFeatures([
		{
			name: 'prefers-color-scheme',
			value: props.mode,
		},
	]);

	// this solves puppeteer theme issue
	await props.page.evaluate((mode) => {
		return localStorage.setItem('mode', mode);
	}, props.mode);
	await props.page.evaluate((mode) => {
		return localStorage.setItem('mode', mode);
	}, props.mode);
};

const getWebSnapshot = async (
	param: Readonly<{
		link: string;
		port: number;
		browser: Browser;
		platform: 'pc' | 'tablet' | 'mobile';
		mode: Argument<typeof setTheme>['mode'];
	}>
) => {
	const page = await param.browser.newPage();
	await page.setViewport(
		param.platform === 'pc'
			? { width: 1920, height: 1080 }
			: param.platform === 'tablet'
				? {
						width: 820,
						height: 1180,
					}
				: {
						width: 375,
						height: 667,
					}
	);

	await page.goto(
		`http://0.0.0.0:${param.port}/${
			param.link === 'home' ? '' : param.link
		}`
	);

	await setTheme({
		page,
		mode: param.mode,
	});

	await page.reload({
		waitUntil: 'networkidle0',
	});

	await page.evaluate(() => {
		window.scrollTo(0, window.document.body.scrollHeight);
	});

	const allImagesLoadResult = await page.evaluate(() => {
		return Promise.all<'completed' | 'loaded' | 'failed'>(
			Array.from(document.querySelectorAll('img')).map((image) => {
				if (image.complete) {
					return Promise.resolve('completed');
				}
				return new Promise((resolve) => {
					image.addEventListener('load', () => {
						return resolve('loaded');
					});
					image.addEventListener('error', () => {
						return resolve('failed');
					});
				});
			})
		);
	});

	if (
		allImagesLoadResult.length !==
		allImagesLoadResult.filter((result) => {
			return result !== 'failed';
		}).length
	) {
		throw new Error('There are images that failed to load');
	}

	const image = await page.screenshot({ fullPage: true });

	await page.close();

	return image;
};

export { getWebSnapshot };
