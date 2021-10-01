import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
const CloseFullScreen = lazy(() => import('../CloseFullScreen'));
const FullScreenContainer = lazy(() => import('../../util/theme/GlobalTheme').then(module => ({ default: module.FullScreenContainer })));
import { HashLoading, ErrorBoundary } from '../HashLoading';
import HashLoader from 'react-spinners/HashLoader';
import { primaryTheme } from '../../util/theme/colorTheme';

interface MessageProps {
    readonly show: boolean;
    readonly closeMessage: () => void;
}

const FinalMessage = ({ show, closeMessage }: MessageProps): JSX.Element | null => {
    if (show) {
        return (
            <ErrorBoundary>
                <Suspense fallback={<HashLoading/>}>
                    <Background onClick={closeMessage}>
                        <FinalContent>
                        <CloseFinal onClick={closeMessage}>&times;</CloseFinal>
                        <FinalContentImage/>
                        <FinalContentParagraph>Your Message Has Been Successfully Sent!</FinalContentParagraph>
                        <FinalContentParagraph>Thank You!</FinalContentParagraph>
                        </FinalContent>
                    </Background>
                </Suspense>
            </ErrorBoundary>
        );
    } return null;
};

const SendingMessage = ({ show, closeMessage }: MessageProps): JSX.Element | null => {
    if (show) {
        return (
            <ErrorBoundary>       
                <Suspense fallback={<HashLoading/>}>
                    <Background onClick={closeMessage}>
                        <CloseFullScreen close={closeMessage}/>
                        
                        <SendingContent>
                            <Sending>Sending...</Sending>
                            <HashLoader loading={true} size={100} color={primaryTheme.theme.secondaryColor}/>
                        </SendingContent>
                    </Background>
                </Suspense>
            </ErrorBoundary>
        );
    } return null;
};

const Background = styled(FullScreenContainer)`
    background-color: #00000066;
`;

const Content = styled.div`
    margin: auto;
    padding: 20px;
    border: none;
    width: auto;
    font-size: 1.5em;
`;

const FinalContent = styled(Content)`
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    text-align: center;
    @media (max-width: 927px) {
        font-size: 1em;
        width: 55vw;
    }
`;

const FinalContentParagraph = styled.p`
    color: ${({ theme }) => theme.theme.primaryColor};
`;

const FinalContentImage = styled.img.attrs({
    src: 'asset/images/others/tick.webp',
    alt: 'tick.webp'
})`
    width: auto;
    height: 7vw;
    filter: ${({ theme }) => theme.theme.contactTickBrightness};
`;

const CloseFinal = styled.span`
    color: #AAAAAA;
    float: right;
    margin-top: -15px;
    font-size: 1.5em;
    font-weight: bold;
    &:hover, &:focus {
        color: ${({ theme }) => theme.theme.primaryColor};
        text-decoration: none;
        cursor: pointer;
    }
`;

const Sending = styled.p`
    color: ${({ theme }) => theme.theme.secondaryColor};
    font-size: 35px;
    margin: 0 0 50px 0 !important;
`;


const SendingContent = styled(Content)`
    background-color: transparent;    display: grid;
    place-items: center;
`;

export { FinalMessage, SendingMessage };
