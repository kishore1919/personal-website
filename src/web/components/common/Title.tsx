import React from 'react';
import Head from 'next/head';
import { parseAsStringEnv } from 'esbuild-env-parsing';

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
        {process.env.NODE_ENV !== 'production' ? null : (
            <meta
                name="google-site-verification"
                content={parseAsStringEnv({
                    name: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
                    env: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
                })}
            />
        )}
    </Head>
);

export default Title;
