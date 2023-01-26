import React from 'react';
import Head from 'next/head';
import parse from 'parse-dont-validate';
import data from '../../../common/data';

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
        {data.nodeEnv !== 'production' ? null : (
            <meta
                name="google-site-verification"
                content={parse(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
                    .asString()
                    .elseGet(undefined)}
            />
        )}
    </Head>
);

export default Title;
