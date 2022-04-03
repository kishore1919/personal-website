import * as React from 'react';
import styled from 'styled-components';
import CloseFullScreen from '../CloseFullScreen';
import { FullScreenContainer } from '../../theme/GlobalTheme';
import SyncLoader from 'react-spinners/SyncLoader';
import { primaryTheme } from '../../theme/colorTheme';

const LoadingPortoflio = () => (
    <LoadingPortoflioFullScreen>
        <SyncLoader
            loading={true}
            size={20}
            color={primaryTheme.theme.secondaryColor}
        />
    </LoadingPortoflioFullScreen>
);

const Surprise = ({
    isShow,
    closeMessage,
}: Readonly<{
    isShow: boolean;
    closeMessage: () => void;
}>) =>
    !isShow ? null : (
        <SurpriseFullScreen>
            <CloseFullScreen color="black" close={closeMessage} />
            <SurpriseContent>
                <img
                    src="asset/images/others/surprised.gif"
                    alt="surprised.gif"
                />
                <HeaderMessage>WOW</HeaderMessage>
                <ParagraphMessage>
                    You have seen my portfolio for more than 5 seconds, Thank
                    You!
                </ParagraphMessage>
            </SurpriseContent>
        </SurpriseFullScreen>
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
