import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { HashLoading, ErrorBoundary } from '../HashLoading';
const CloseFullScreen = lazy(() => import('../CloseFullScreen'));
const FullScreenContainer = lazy(() =>
    import('../../util/theme/GlobalTheme').then((module) => ({
        default: module.FullScreenContainer,
    }))
);

interface SurpriseProps {
    readonly show: boolean;
    readonly closeMessage: () => void;
}

const Surprise = ({
    show,
    closeMessage,
}: SurpriseProps): JSX.Element | null => {
    if (show) {
        return (
            <ErrorBoundary>
                <Suspense fallback={<HashLoading />}>
                    <FullScreen>
                        <CloseFullScreen color={'black'} close={closeMessage} />
                        <SurpriseContent>
                            <img
                                src="asset/images/others/surprised.gif"
                                alt="surprised.gif"
                            />
                            <HeaderMessage>WOW</HeaderMessage>
                            <ParagraphMessage>
                                You have seen my portfolio for more than 5
                                seconds, Thank You!
                            </ParagraphMessage>
                        </SurpriseContent>
                    </FullScreen>
                </Suspense>
            </ErrorBoundary>
        );
    }
    return null;
};

const FullScreen = styled(FullScreenContainer)`
    background-color: #fff44f;
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

export default Surprise;
