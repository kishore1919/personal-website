import React from 'react';
import Head from 'next/head';
import { NavLinkType } from './NavLinks';

const Title = ({
    title,
    content,
}: Readonly<{
    title: NavLinkType['title'] | '404 Error';
    content: string;
}>) => (
    <Head>
        <meta charSet="utf-8" name="description" content={content} />
        {/* ref: https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196 */}
        <title>{`PoolOfDeath20 | ${title}`}</title>
    </Head>
);

export default Title;
