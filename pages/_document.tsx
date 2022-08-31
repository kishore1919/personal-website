import React from 'react';
import Document, {
    DocumentContext,
    Head,
    Main,
    NextScript,
    Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class Doc extends Document {
    static getInitialProps = async (documentContext: DocumentContext) => {
        const sheet = new ServerStyleSheet();
        const { renderPage: originalRenderPage } = documentContext;

        try {
            // Run the React rendering logic synchronously
            documentContext.renderPage = () =>
                originalRenderPage({
                    // Useful for wrapping the whole react tree
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                    // Useful for wrapping in a per-page basis
                    enhanceComponent: (Component) => Component,
                });
            const initialProps = await Document.getInitialProps(
                documentContext
            );
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    };

    render = () => (
        <Html lang="en">
            <Head />
            <meta charSet="utf-8" />
            <link
                rel="icon"
                href="/asset/images/icons/favicon.ico"
                type="image/x-icon"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Website of PoolOfDeath20" />
            <meta
                name="apple-mobile-web-app-title"
                content="Website of PoolOfDeath20"
            />
            <meta name="theme-color" content="#000d0d" />
            <meta name="msapplication-navbutton-color" content="#000d0d" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta name="msapplication-starturl" content="index.html" />
            <link
                rel="icon"
                sizes="72x72"
                href="/asset/images/icons/icon-72x72.png"
            />
            <link
                rel="icon"
                sizes="96x96"
                href="/asset/images/icons/icon-96x96.png"
            />
            <link
                rel="icon"
                sizes="128x128"
                href="/asset/images/icons/icon-128x128.png"
            />
            <link
                rel="icon"
                sizes="144x144"
                href="/asset/images/icons/icon-144x144.png"
            />
            <link
                rel="icon"
                sizes="152x152"
                href="/asset/images/icons/icon-152x152.png"
            />
            <link
                rel="icon"
                sizes="192x192"
                href="/asset/images/icons/icon-192x192.png"
            />
            <link
                rel="icon"
                sizes="384x384"
                href="/asset/images/icons/icon-384x384.png"
            />
            <link
                rel="icon"
                sizes="512x512"
                href="/asset/images/icons/icon-512x512.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="72x72"
                href="/asset/images/icons/icon-72x72.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="96x96"
                href="/asset/images/icons/icon-96x96.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="128x128"
                href="/asset/images/icons/icon-128x128.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="/asset/images/icons/icon-144x144.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/asset/images/icons/icon-152x152.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="192x192"
                href="/asset/images/icons/icon-192x192.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="384x384"
                href="/asset/images/icons/icon-384x384.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="512x512"
                href="/asset/images/icons/icon-512x512.png"
            />
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
