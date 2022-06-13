import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLinkType } from './NavLinks';

const Title = ({
    title,
    content,
}: Readonly<{
    title: NavLinkType['title'] | '404 Error';
    content: string;
}>) => (
    <Helmet>
        <meta charSet="utf-8" name="description" content={content} />
        <title>PoolOfDeath20 | {title}</title>
    </Helmet>
);

export default Title;
