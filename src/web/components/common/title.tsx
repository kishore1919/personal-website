import React from 'react';
import Head from 'next/head';

const Title = (
	props: Readonly<{
		title: string;
		content: string;
	}>
) => {
	return (
		<Head>
			<meta charSet="utf-8" name="description" content={props.content} />
			{/* ref: https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196 */}
			<title>{props.title}</title>
		</Head>
	);
};

export default Title;
