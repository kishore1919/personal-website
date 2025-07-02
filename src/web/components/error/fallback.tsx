import type { FallbackProps } from 'react-error-boundary';

import Head from 'next/head';
import React from 'react';

import { Error } from '../common/alert';
import Layout from '../layout';

import ErrorContainer from '.';

const Fallback = (props: FallbackProps) => {
	return (
		<Layout>
			<Head>
				<title>Error</title>
			</Head>
			<Error onClose={props.resetErrorBoundary}>{props.error.message}</Error>
			<ErrorContainer
				messages={[
					'Oops! Seems like there is a problem',
					'There are mysteries to the universe we are never meant to solve',
					'But this problem is not among them',
					'The answer is carried inside',
					'Meanwhile, click the button below',
				]}
				type="reload"
			/>
		</Layout>
	);
};

export default Fallback;
