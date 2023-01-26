import type { Browser } from 'puppeteer';

const getWebSnapshot = async ({
    link,
    port,
    browser,
    platform,
}: Readonly<{
    port: number;
    link: string;
    browser: Browser;
    platform: 'pc' | 'tablet' | 'mobile';
}>) => {
    const page = await browser.newPage();
    await page.setViewport(
        platform === 'pc'
            ? { width: 1920, height: 1080 }
            : platform === 'tablet'
            ? {
                  width: 820,
                  height: 1180,
              }
            : {
                  width: 375,
                  height: 667,
              }
    );
    await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
    ]);
    await page.goto(`http://0.0.0.0:${port}/${link === 'home' ? '' : link}`);
    await new Promise((resolve) =>
        setTimeout(resolve, (link === 'resume' ? 6 : 3) * 1000)
    );
    await page.screenshot({
        fullPage: true,
    });

    return {
        link,
    } as const;
};

export { getWebSnapshot };
