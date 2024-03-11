import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import Layout from '../layout';
import ErrorContainer from './';
import { Error } from '../common/alert';
import type { Children } from '../../type/react';

type State = Readonly<{
	closedAlert: boolean;
	error: Error | undefined;
}>;

class ErrorBoundary extends React.Component<
	Readonly<
		Children & {
			router: NextRouter;
		}
	>,
	State
> {
	state: State = {
		error: undefined,
		closedAlert: false,
	};

	static getDerivedStateFromError = (error: Error): State => {
		return {
			error,
			closedAlert: false,
		};
	};

	componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
		console.error({ error, errorInfo });
		this.setState({ error });
	};

	render = () => {
		return !this.state.error ? (
			this.props.children
		) : (
			<Layout>
				<Head>
					<title>Error</title>
				</Head>
				{this.state.closedAlert ? null : (
					<Error
						onClose={() => {
							this.setState({ closedAlert: true });
						}}
					>
						{this.state.error.message}
					</Error>
				)}
				<ErrorContainer
					type="reload"
					messages={[
						'Oops! Seems like there is a problem',
						'There are mysteries to the universe we are never meant to solve',
						'But this problem is not among them',
						'The answer is carried inside',
						'Meanwhile, click the button below',
					]}
				/>
			</Layout>
		);
	};
}

export default withRouter(ErrorBoundary);
