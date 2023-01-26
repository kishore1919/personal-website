import React from 'react';
import Script from 'next/script';
import links from '../../data/links';

const Schema = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: (
            ['Home', 'Project', 'About', 'Contact', 'Résumé'] as const
        ).map((name, index) => ({
            name,
            '@type': 'ListItem',
            position: index + 1,
            item: `${links.domain}/${
                name === 'Home'
                    ? ''
                    : name === 'Résumé'
                    ? 'resume'
                    : name.toLowerCase()
            }`,
        })),
    };

    return (
        <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData, undefined, 4),
            }}
        />
    );
};

export default Schema;
