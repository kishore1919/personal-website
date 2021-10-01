import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import FadeLoader from 'react-spinners/FadeLoader';
import { primaryTheme } from '../util/theme/colorTheme';

export const HashLoading = (): JSX.Element => {
    return (
        <Container>
            <InnerContainer>
                <LoadingMessage>Loading...</LoadingMessage>
                <FadeLoader loading={true} color={primaryTheme.theme.secondaryColor}/>
            </InnerContainer>
        </Container>
    );
};

interface Props {
    readonly children: ReactNode;
}

interface State {
    readonly hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {

    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError = (_: Error): State => ({
        hasError: true
    });

    public componentDidCatch = (error: Error, errorInfo: ErrorInfo) => console.error('Uncaught error: ', error, errorInfo);

    public render = (): JSX.Element | ReactNode => {
        if (this.state.hasError) {
            return (
                <Container>
                    <InnerContainer>
                        <LoadingMessage>Oops! Seems like there&apos;s a problem loading the content</LoadingMessage>
                        <LoadingMessage>Please try again</LoadingMessage>
                    </InnerContainer>
                </Container>
            )
        } return this.props.children;
    }
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