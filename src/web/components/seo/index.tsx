import React from 'react';
import { DefaultSeo } from 'next-seo';
import { url } from '../../util/const';
import type { DeepReadonly } from '../../../common/type';
import type { NavLinkTitle } from '../NavLinks';
import Schema from '../schema';
import Title from '../common/Title';

const Seo = (
    props: DeepReadonly<{
        content: string;
        keywords: string[];
        title: Exclude<NavLinkTitle, '404 Error'>;
    }>
) => {
    const { content, keywords } = props;

    const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

    const iconPath = '/asset/images/icons';

    const title = `PoolOfDeath20 | ${props.title}`;

    const description = props.content;

    return (
        <>
            <Title title={title} content={content} />
            <Schema />
            {process.env.NODE_ENV !== 'production' ? null : (
                <meta
                    name="google-site-verification"
                    content="vG1OQpBCHqykih99YTtLbz5tbGA5JKo7-zCwJRFvpBw"
                />
            )}
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
                        content: `Gervin Fung Da Xuen, PoolOfDeath20, Dart, Rust, Java, React, NextJS, FullStack, Developer, ${keywords.join(
                            ','
                        )}`,
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
        </>
    );
};

export default Seo;
