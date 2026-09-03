import type { DocumentContext } from 'next/document';

import Document, { Head, Main, NextScript, Html } from 'next/document';
import React from 'react';

export default class Doc extends Document {
	static override async getInitialProps(context: DocumentContext) {
		const { renderPage: originalRenderPage } = context;

		// Run the React rendering logic synchronously
		context.renderPage = () => {
			return originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: (App) => {
					return App;
				},
				// Useful for wrapping in a per-page basis
				enhanceComponent: (Component) => {
					return Component;
				},
			});
		};

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		return await super.getInitialProps(context);
	}

	override render() {
		return (
			<Html lang="en">
				<Head>
					<link href="/manifest.json" rel="manifest" />
					<meta name="theme-color" content="#000000" />
					{/* 3G: preload only the primary font weight; other weights load on demand */}
					<link
						rel="preload"
						href="/font/jetbrains-mono-v17-latin-regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					{/* 3G: early connection to external profiles linked in header */}
					<link rel="dns-prefetch" href="https://github.com" />
					<link rel="dns-prefetch" href="https://www.linkedin.com" />
					<link rel="dns-prefetch" href="https://medium.com" />
				</Head>
				<body
					style={{
						padding: 0,
						margin: 0,
						overflowX: 'hidden',
					}}
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
