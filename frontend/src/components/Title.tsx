import React from 'react';
import { Helmet } from 'react-helmet-async';

interface TitleProps {
    readonly title: string;
    readonly content: string;
}

const Title = ({ title, content }: TitleProps) => {
    return (
        <Helmet>
            <meta charSet="utf-8" name="description" content={content} />
            <title>{title}</title>
        </Helmet>
    );
};

export default Title;
