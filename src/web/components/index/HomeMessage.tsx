import React from 'react';
import styled from 'styled-components';

const HomeMessage = () => (
    <IndexMessage>
        <IndexMessageParagraph>Hello</IndexMessageParagraph>
        <IndexMessageParagraph>I am</IndexMessageParagraph>
        <IndexNameParagraph>Gervin</IndexNameParagraph>
    </IndexMessage>
);

const IndexMessage = styled.div`
    @media (max-width: 962px) {
        margin-bottom: 30px;
    }
`;

const IndexMessageParagraph = styled.p`
    text-align: left;
    font-size: 5em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    margin: 2vw;
    @media (max-width: 994px) {
        font-size: 4em;
        text-align: center;
    }
    @media (max-width: 586px) {
        font-size: 3em;
    }
    @media (max-width: 286px) {
        font-size: 2em;
    }
`;

const IndexNameParagraph = styled(IndexMessageParagraph)`
    text-transform: uppercase;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    letter-spacing: 5.5px;
    text-shadow: 4px 1px ${({ theme }) => theme.greenColor},
        -4px 1px ${({ theme }) => theme.redColor};
`;

export default HomeMessage;
