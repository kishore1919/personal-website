import React from 'react';
import Head from 'next/head';

import Footer from './components/Footer';

import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./components/Header'), { ssr: false });

import GlobalStyle from './theme/GlobalTheme';
import { DefaultTheme } from 'styled-components';
import Font from './components/Font';

import { DefaultSeo } from 'next-seo';

const Layout = ({
    children,
    title,
    theme,
    setTheme,
}: Readonly<{
    children: React.ReactNode;
    title: string;
    theme: DefaultTheme;
    setTheme: () => void;
}>) => {
    const url = 'https://poolofdeath20.vercel.app';
    const description = 'PoolOfDeath20 or Gervin Fung Da Xuen website';

    return (
        <>
            <GlobalStyle />
            <Font />
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="shortcut icon" href="/images/icon/favicon.ico" />
            </Head>
            <DefaultSeo
                title={title}
                titleTemplate={title}
                defaultTitle={title}
                description={description}
                canonical={url}
                openGraph={{
                    title,
                    url,
                    description,
                    images: [
                        {
                            url: '/og-image.png',
                            width: 800,
                            height: 420,
                            alt: description,
                        },
                    ],
                }}
                twitter={{
                    handle: '@poolofdeath20',
                    site: '@poolofdeath20',
                    cardType: 'summary_large_image',
                }}
            />
            <Header theme={theme} setTheme={setTheme} />
            <div
                style={{
                    margin: 'auto',
                    width: '100%',
                }}
            >
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;

// export default dynamic(() => Promise.resolve(Layout), {
//   ssr: false,
// });
