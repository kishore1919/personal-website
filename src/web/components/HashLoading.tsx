import React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../theme/GlobalTheme';
import FadeLoader from 'react-spinners/FadeLoader';
import { primaryTheme } from '../theme/colorTheme';

const HashLoading = () => (
    <Container>
        <InnerContainer>
            <LoadingMessage>Loading...</LoadingMessage>
            <FadeLoader
                loading={true}
                color={primaryTheme.theme.secondaryColor}
            />
        </InnerContainer>
    </Container>
);

type State = Readonly<{
    hasError: boolean;
}>;

class ErrorBoundary extends React.Component<
    Readonly<{
        children: React.ReactNode;
    }>,
    State
> {
    state: State = {
        hasError: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError = (_: Error): State => ({
        hasError: true,
    });

    componentDidCatch = (
        { name, cause, message, stack }: Error,
        { componentStack }: React.ErrorInfo
    ) => {
        console.error({ name, cause, message, stack, componentStack });
        return alert(
            `name: ${name}\ncause: ${cause}\nmessage: ${message}\nstack: ${stack}\ncomponentStack: ${componentStack}`
        );
    };

    render = (): JSX.Element | React.ReactNode =>
        !this.state.hasError ? (
            this.props.children
        ) : (
            <Container>
                <InnerContainer>
                    <LoadingMessage>
                        Oops! Seems like there&apos;s a problem loading the
                        content
                    </LoadingMessage>
                    <LoadingMessage>Please try again</LoadingMessage>
                    <LoadingMessage>
                        If you think this is an issue, please file an issue{' '}
                        <IssueLink href="https://github.com/GervinFung/my-web/issues">
                            here
                        </IssueLink>
                    </LoadingMessage>
                </InnerContainer>
            </Container>
        );
}

const Container = styled(GlobalContainer)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-family: 'Orbitron', sans-serif !important;
    background-color: ${({ theme }) => theme.theme.primaryColor};
`;

const LoadingMessage = styled.p`
    font-size: 35px;
    margin: 0 0 50px 0 !important;
    color: ${({ theme }) => theme.theme.secondaryColor};
`;

const IssueLink = styled.a.attrs({
    rel: 'noopener noreferrer',
})`
    text-decoration: none;
    color: ${({ theme }) => theme.greenColor};
`;

const InnerContainer = styled.div`
    display: grid;
    place-items: center;
`;

export { HashLoading, ErrorBoundary };
