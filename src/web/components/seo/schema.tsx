import React from 'react';
import { headerContent } from '../../information/content';

const Schema = () => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: (['home', 'projects', 'contact'] as const).map(
			(name, idx) => {
				return {
					name,
					'@type': 'ListItem',
					position: idx + 1,
					item: `${headerContent.links.domain}/${name === 'home' ? '' : name}`,
				};
			}
		),
	};

	return (
		<script
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, undefined, 4),
			}}
			id="breadcrumb-list"
			type="application/ld+json"
		/>
	);
};

export default Schema;
