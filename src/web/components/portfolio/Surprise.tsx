import React from 'react';
import styled from 'styled-components';
import CloseFullScreen from '../CloseFullScreen';
import { FullScreenContainer } from '../../theme/GlobalTheme';

const Surprise = ({
    isShow,
    closeMessage,
}: Readonly<{
    isShow: boolean;
    closeMessage: () => void;
}>) =>
    !isShow ? null : (
        <Container>
            <CloseFullScreen color="black" close={closeMessage} />
            <Content>
                <img
                    src="asset/images/others/surprised.gif"
                    alt="surprised.gif"
                />
                <HeaderMessage>WOW</HeaderMessage>
                <ParagraphMessage>
                    You have seen my portfolio for more than 5 seconds, Thank
                    You!
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
