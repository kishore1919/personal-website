import React from 'react';
import Layout from '../layout';
import { ToastError } from '../toaser';
import ErrorContainer from './';
import { withRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import type { LinkTitle } from '../navigation/links';

type State = Readonly<{
    hasError: boolean;
}>;

class ErrorBoundary extends React.Component<
    Readonly<{
        router: NextRouter;
        children: React.ReactNode;
    }>,
    State
> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError = (_: Error): State => ({
        hasError: true,
    });

    componentDidCatch = (error: Error, { componentStack }: React.ErrorInfo) => {
        console.error({ ...error, componentStack });
        return ToastError(error);
    };

    render = (): JSX.Element | React.ReactNode =>
        !this.state.hasError ? (
            this.props.children
        ) : (
            <Layout>
                <ErrorContainer
                    type="refresh"
                    name={this.props.router.pathname as LinkTitle}
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
