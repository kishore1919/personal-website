import React, { useEffect } from 'react';

const Title = (
	props: Readonly<{
		title: string;
		content: string;
	}>
) => {
	useEffect(() => {
		document.title = props.title;
		const meta = document.querySelector('meta[name="description"]');
		if (meta) {
			meta.setAttribute('content', props.content);
		}
	}, [props.title, props.content]);

	return null;
};

export default Title;
