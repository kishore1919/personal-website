import React from 'react';
import styled from 'styled-components';
import CloseFullScreen from '../CloseFullScreen';
import { FullScreenContainer } from '../../theme/GlobalTheme';

const Surprise = ({
    seconds,
    shownPopup,
    onCloseMessage,
}: Readonly<{
    seconds: string;
    shownPopup: boolean;
    onCloseMessage: () => void;
}>) =>
    shownPopup ? null : (
        <Container>
            <CloseFullScreen color="black" close={onCloseMessage} />
            <Content>
                <img
                    src="asset/images/others/surprised.gif"
                    alt="surprised.gif"
                />
                <HeaderMessage>WOW</HeaderMessage>
                <ParagraphMessage>
                    You have seen my portfolio for more than {seconds} seconds,
                    Thank You!
                </ParagraphMessage>
            </Content>
        </Container>
    );

const Container = styled(FullScreenContainer)`
    background-color: #fff44f;
`;

const Content = styled.div`
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
