import React from 'react';
import Layout from '../layout';
import ErrorContainer from './';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import { Error } from '../common/alert';

type State = Readonly<{
    closedAlert: boolean;
    error: Error | undefined;
}>;

class ErrorBoundary extends React.Component<
    Readonly<{
        router: NextRouter;
        children: React.ReactNode;
    }>,
    State
> {
    state: State = {
        error: undefined,
        closedAlert: false,
    };

    static getDerivedStateFromError = (error: Error): State => ({
        error,
        closedAlert: false,
    });

    componentDidCatch = (error: Error, { componentStack }: React.ErrorInfo) => {
        console.error({ ...error, componentStack });
        this.setState({ error });
    };

    render = (): JSX.Element | React.ReactNode =>
        !this.state.error ? (
            this.props.children
        ) : (
            <Layout title="Error">
                {this.state.closedAlert ? null : (
                    <Error onClose={() => this.setState({ closedAlert: true })}>
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
}

export default withRouter(ErrorBoundary);
