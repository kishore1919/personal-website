import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import React from 'react';

import ErrorContainer from '../src/web/components/error';

const getServerSideProps = (
	context: Parameters<GetServerSideProps>[number]
) => {
	return {
		props: {
			statusCode: context.res.statusCode,
		},
	};
};

const Error = (
	serverProps: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return (
		<ErrorContainer
			messages={[
				'Oops! You seems lost',
				'Yeah, I am as confused as you are',
				'From what I have seen, it appears that the page you are looking for is now beyond my reach',
				'Luckily, unlike some other mistakes, this can be fixed',
				`So let's get you...`,
			]}
			statusCode={serverProps.statusCode}
			type={serverProps.statusCode === 404 ? 'replace' : 'reload'}
		/>
	);
};

export { getServerSideProps };
export default Error;
