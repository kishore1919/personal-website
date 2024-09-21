import Script from 'next/script';
import React from 'react';

import links from '../../links';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: (['home', 'projects', 'contact'] as const).map(
			(name) => {
				return {
					name,
					'@type': 'ListItem',
					position: 1,
					item: `${links.domain}/${name === 'home' ? '' : name}`,
				};
			}
		),
	};

	return (
		<Script
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, undefined, 4),
			}}
			id="breadcrumb-list"
			type="application/ld+json"
		/>
	);
};

export default Schema;
