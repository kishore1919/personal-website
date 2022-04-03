import * as React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../theme/GlobalTheme';
import FadeLoader from 'react-spinners/FadeLoader';
import { primaryTheme } from '../theme/colorTheme';

export const HashLoading = () => (
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

export class ErrorBoundary extends React.Component<
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

    componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) =>
        console.error('Uncaught error: ', error, errorInfo);

    render = (): JSX.Element | React.ReactNode => {
        if (this.state.hasError) {
            return (
                <Container>
                    <InnerContainer>
                        <LoadingMessage>
                            Oops! Seems like there&apos;s a problem loading the
                            content
                        </LoadingMessage>
                        <LoadingMessage>Please try again</LoadingMessage>
                    </InnerContainer>
                </Container>
            );
        }
        return this.props.children;
    };
}

const Container = styled(GlobalContainer)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const LoadingMessage = styled.p`
    color: ${({ theme }) => theme.theme.secondaryColor};
    font-size: 35px;
    margin: 0 0 50px 0 !important;
`;

const InnerContainer = styled.div`
    display: grid;
    place-items: center;
`;
