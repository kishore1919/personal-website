import React from 'react';
import Document, {
    type DocumentContext,
    Head,
    Main,
    NextScript,
    Html,
} from 'next/document';
import consts from '../src/web/const';

export default class Doc extends Document {
    static getInitialProps = async (context: DocumentContext) => {
        const { renderPage: originalRenderPage } = context;

        // Run the React rendering logic synchronously
        context.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        return await Document.getInitialProps(context);
    };

    render = () => (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href={`https://fonts.googleapis.com/css2?family=${consts.fontFamily
                        .split(' ')
                        .join('+')}:wght@${Array.from(
                        { length: 9 },
                        (_, i) => (i + 1) * 100
                    ).join(';')}&display=swap`}
                    rel="stylesheet"
                />
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
