import React from 'react';
import styled from 'styled-components';

type CloseButtonProps = Readonly<{
    color?: string;
}>;

const CloseFullScreen = ({
    close,
    color,
}: CloseButtonProps &
    Readonly<{
        close: () => void;
    }>) => (
    <CloseButton color={color} onClick={close}>
        &times;
    </CloseButton>
);

const CloseButton = styled.button`
    margin: 10px 20px 10px 20px;
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    border: none;
    background-color: transparent;
    top: 0;
    right: 0;
    transition: all ease 0.2s;
    &:hover,
    &:focus {
        transform: scale(1.5);
        text-decoration: none;
        cursor: pointer;
    }
    color: ${({ color }: CloseButtonProps) =>
        color === undefined
            ? ({ theme }) => theme.theme.highEmphasesTextColor
            : color};
`;

export default CloseFullScreen;
