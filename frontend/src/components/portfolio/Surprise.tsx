import * as React from 'react';
import styled from 'styled-components';
import { HashLoading, ErrorBoundary } from '../HashLoading';
const CloseFullScreen = React.lazy(() => import('../CloseFullScreen'));
const FullScreenContainer = React.lazy(() =>
    import('../../util/theme/GlobalTheme').then((module) => ({
        default: module.FullScreenContainer,
    }))
);
import SyncLoader from 'react-spinners/SyncLoader';
import { primaryTheme } from '../../util/theme/colorTheme';

interface SurpriseProps {
    readonly show: boolean;
    readonly closeMessage: () => void;
}

const LoadingPortoflio = (): JSX.Element => (
    <ErrorBoundary>
        <React.Suspense fallback={<HashLoading />}>
            <LoadingPortoflioFullScreen>
                <SyncLoader
                    loading={true}
                    size={20}
                    color={primaryTheme.theme.secondaryColor}
                />
            </LoadingPortoflioFullScreen>
        </React.Suspense>
    </ErrorBoundary>
);

const Surprise = ({ show, closeMessage }: SurpriseProps): JSX.Element | null =>
    !show ? null : (
        <ErrorBoundary>
            <React.Suspense fallback={<HashLoading />}>
                <SurpriseFullScreen>
                    <CloseFullScreen color="black" close={closeMessage} />
                    <SurpriseContent>
                        <img
                            src="asset/images/others/surprised.gif"
                            alt="surprised.gif"
                        />
                        <HeaderMessage>WOW</HeaderMessage>
                        <ParagraphMessage>
                            You have seen my portfolio for more than 5 seconds,
                            Thank You!
                        </ParagraphMessage>
                    </SurpriseContent>
                </SurpriseFullScreen>
            </React.Suspense>
        </ErrorBoundary>
    );

const SurpriseFullScreen = styled(FullScreenContainer)`
    background-color: #fff44f;
`;

const LoadingPortoflioFullScreen = styled(FullScreenContainer)`
    background-color: #00000066;
`;

const SurpriseContent = styled.div`
    text-align: center;
`;

const HeaderMessage = styled.h1`
    color: black;
    font-size: 5em;
`;

const ParagraphMessage = styled.p`
    color: black;
    font-size: 1.25em;
`;

export { Surprise, LoadingPortoflio };
