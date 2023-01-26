import React from 'react';
import { DefaultSeo } from 'next-seo';
import type { DeepReadonly } from '../../../common/type';
import type { LinkTitle } from '../navigation/links';
import Schema from '../schema';
import Title from '../common/title';
import links from '../../data/links';

const Seo = (
    props: DeepReadonly<{
        content: string;
        keywords: string[];
        title: Exclude<LinkTitle, '404 Error'>;
    }>
) => {
    const { content, keywords } = props;

    const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

    const iconPath = '/images/icons';

    const name = 'Gervin';

    const title = `${name} | ${props.title}`;

    const description = props.content;

    return (
        <>
            <Title title={title} content={content} />
            <Schema />
            <DefaultSeo
                title={title}
                canonical={links.domain}
                defaultTitle={title}
                titleTemplate={title}
                description={description}
                twitter={{
                    handle: `@${name}`,
                    site: `@${name}`,
                    cardType: 'summary_large_image',
                }}
                openGraph={{
                    title,
                    url: links.domain,
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
                        content: `Gervin Fung Da Xuen, ${name}, Dart, Rust, Java, React, NextJS, FullStack, Developer, ${keywords.join(
                            ','
                        )}`,
                    },
                    {
                        name: 'author',
                        content: 'Gervin Fung Da Xuen',
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
                        content: name,
                    },
                    {
                        name: 'application-mobile-web-app-title',
                        content: name,
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
