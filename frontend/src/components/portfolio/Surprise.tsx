import * as React from 'react';
import styled from 'styled-components';
import { HashLoading, ErrorBoundary } from '../HashLoading';
const CloseFullScreen = React.lazy(() => import('../CloseFullScreen'));
const FullScreenContainer = React.lazy(() =>
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
                <React.Suspense fallback={<HashLoading />}>
                    <FullScreen>
                        <CloseFullScreen color="black" close={closeMessage} />
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
                </React.Suspense>
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
