import * as React from 'react';
import styled from 'styled-components';
import CloseFullScreen from '../CloseFullScreen';
import { FullScreenContainer } from '../../theme/GlobalTheme';
import HashLoader from 'react-spinners/HashLoader';
import { primaryTheme } from '../../theme/colorTheme';

type MessageProps = Readonly<{
    isShow: boolean;
    closeMessage: () => void;
}>;

const FinalMessage = ({ isShow, closeMessage }: MessageProps) =>
    !isShow ? null : (
        <Background
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const { currentTarget, target } = event;
                if (currentTarget === target) {
                    closeMessage();
                }
            }}
        >
            <FinalContent>
                <CloseFinal onClick={closeMessage}>&times;</CloseFinal>
                <FinalContentImage />
                <FinalContentParagraph>
                    Your Message Has Been Successfully Sent!
                </FinalContentParagraph>
                <FinalContentParagraph>Thank You!</FinalContentParagraph>
            </FinalContent>
        </Background>
    );

const SendingMessage = ({ isShow, closeMessage }: MessageProps) =>
    !isShow ? null : (
        <Background
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const { currentTarget, target } = event;
                if (currentTarget === target) {
                    closeMessage();
                }
            }}
        >
            <CloseFullScreen close={closeMessage} />
            <SendingContent>
                <Sending>Sending...</Sending>
                <HashLoader
                    loading={true}
                    size={100}
                    color={primaryTheme.theme.secondaryColor}
                />
            </SendingContent>
        </Background>
    );

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
    alt: 'tick.webp',
})`
    width: auto;
    height: 7vw;
    filter: ${({ theme }) => theme.theme.contactTickBrightness};
`;

const CloseFinal = styled.span`
    color: #aaaaaa;
    float: right;
    margin-top: -15px;
    font-size: 1.5em;
    font-weight: bold;
    &:hover,
    &:focus {
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
    background-color: transparent;
    display: grid;
    place-items: center;
`;

export { FinalMessage, SendingMessage };
