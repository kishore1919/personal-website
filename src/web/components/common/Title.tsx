import React from 'react';
import Head from 'next/head';

const Title = ({
    title,
    content,
}: Readonly<{
    title: string;
    content: string;
}>) => (
    <Head>
        <meta charSet="utf-8" name="description" content={content} />
        {/* ref: https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196 */}
        <title>{title}</title>
    </Head>
);

export default Title;
