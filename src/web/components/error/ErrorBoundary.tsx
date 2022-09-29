import React from 'react';
import styled from 'styled-components';
import { ToastError } from '../toaser';
import { Container, InnerContainer, LoadingMessage } from './styled';

type State = Readonly<{
    hasError: boolean;
}>;

export default class ErrorBoundary extends React.Component<
    Readonly<{
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
        const { name, cause, message, stack } = error;
        console.error({ name, cause, message, stack, componentStack });
        return ToastError(error);
    };

    render = (): JSX.Element | React.ReactNode =>
        !this.state.hasError ? (
            this.props.children
        ) : (
            <Container>
                <InnerContainer>
                    <LoadingMessage>
                        <FirstWord>Oops!</FirstWord>
                    </LoadingMessage>
                    <LoadingMessage>Something went rogue</LoadingMessage>
                    <LoadingMessage>Do try again</LoadingMessage>
                    <LoadingMessage>
                        Please file an issue{' '}
                        <IssueLink href="https://github.com/GervinFung/my-web/issues">
                            here
                        </IssueLink>
                    </LoadingMessage>
                    <LoadingMessage>
                        if you keep seeing this message
                    </LoadingMessage>
                </InnerContainer>
            </Container>
        );
}

const FirstWord = styled.div`
    color: ${({ theme }) => theme.redColor};
`;

const IssueLink = styled.a.attrs({
    rel: 'noopener noreferrer',
})`
    text-decoration: none;
    color: ${({ theme }) => theme.greenColor};
`;
