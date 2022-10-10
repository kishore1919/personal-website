import React from 'react';
import Head from 'next/head';
import Footer from './components/footer';
import Header from './components/header';
import GlobalStyle from './theme/GlobalTheme';
import { DefaultTheme } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import { url } from './util/const';

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
    const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

    const description =
        'A Full Stack Developer. Everything you want to know about PoolOfDeath20 or Gervin Fung Da Xuen can be found here';

    const iconPath = '/asset/images/icons';

    return (
        <>
            <GlobalStyle />
            <Head>
                <title>{title}</title>
            </Head>
            <DefaultSeo
                title={title}
                canonical={url}
                defaultTitle={title}
                titleTemplate={title}
                description={description}
                twitter={{
                    handle: '@poolofdeath20',
                    site: '@poolofdeath20',
                    cardType: 'summary_large_image',
                }}
                openGraph={{
                    title,
                    url,
                    description,
                    images: dimensions.map((dimension) => ({
                        alt: description,
                        width: dimension,
                        height: dimension,
                        url: `${iconPath}/icon-${dimension}x${dimension}.png`,
                    })),
                }}
                additionalMetaTags={[
                    {
                        name: 'keyword',
                        content:
                            'Gervin Fung Da Xuen, PoolOfDeath20, UTAR, Dart, Rust, Java, React, NextJS, Portfolio, FullStack, Developer',
                    },
                    {
                        name: 'author',
                        content: 'PoolOfDeath20 | Gervin Fung Da Xuen',
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                    },
                    {
                        name: 'mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        name: 'apple-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        name: 'application-name',
                        content: 'PoolOfDeath20',
                    },
                    {
                        name: 'application-mobile-web-app-title',
                        content: 'PoolOfDeath20',
                    },
                    {
                        name: 'theme-color',
                        content: '#000D0D',
                    },
                    {
                        name: 'msapplication-navbutton-color',
                        content: '#000D0D',
                    },
                    {
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#000D0D',
                    },
                    {
                        name: 'msapplication-starturl',
                        content: 'index.html',
                    },
                ]}
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        type: 'image/x-icon',
                        href: `${iconPath}/favicon.ico`,
                    },
                    {
                        rel: 'apple-touch-icon',
                        type: 'image/x-icon',
                        href: `${iconPath}/favicon.ico`,
                    },
                    ...dimensions.flatMap((dimension) => {
                        const sizes = `${dimension}x${dimension}`;
                        const href = `${iconPath}/icon-${sizes}.png`;
                        const icon = {
                            href,
                            sizes,
                            rel: 'icon',
                        };
                        const appleTouchIcon = {
                            href,
                            sizes,
                            rel: 'apple-touch-icon',
                        };
                        return [icon, appleTouchIcon];
                    }),
                ]}
            />
            <Header theme={theme} setTheme={setTheme} />
            <div
                style={{
                    width: '100%',
                    margin: 'auto',
                }}
            >
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
