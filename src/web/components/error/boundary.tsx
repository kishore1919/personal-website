import type { Children } from '../../type/react';
import type { NextRouter } from 'next/router';

import Head from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';

import { Error } from '../common/alert';
import Layout from '../layout';

import ErrorContainer from '.';

type Props = Readonly<
	Children & {
		router: NextRouter;
	}
>;

type State = Readonly<{
	closedAlert: boolean;
	error: Error | undefined;
}>;

class ErrorBoundary extends React.Component<Props, State> {
	static getDerivedStateFromError = (error: Error): State => {
		return {
			error,
			closedAlert: false,
		};
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			error: undefined,
			closedAlert: false,
		};
	}

	override shouldComponentUpdate(_: Props, nextState: State) {
		return nextState.error?.message !== this.state.error?.message;
	}

	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error({ error, errorInfo });
		// eslint-disable-next-line react/no-set-state
		this.setState({ error });
	}

	override render() {
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
							// eslint-disable-next-line react/no-set-state
							this.setState({ closedAlert: true });
						}}
					>
						{this.state.error.message}
					</Error>
				)}
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
	}
}

export default withRouter(ErrorBoundary);
