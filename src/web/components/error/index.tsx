import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '../../../common/data';
import { GlobalContainer } from '../../theme/global-theme';
import Title from '../common/title';
import type { LinkNavigation, LinkTitle } from '../navigation/links';

type BackToHomeButtonProps = Readonly<{
    timeToChange: number;
}>;

type BreakPoint = Readonly<{
    breakPoint: number;
}>;

const ErrorContainer = (
    props: Readonly<
        {
            statusCode?: number;
            messages: ReadonlyArray<string>;
        } & (
            | {
                  type: 'refresh';
                  name: LinkTitle;
              }
            | {
                  type: 'link-to';
                  replaceTo: LinkNavigation;
              }
        )
    >
) => {
    const { messages, statusCode } = props;
    const router = useRouter();

    const delay = 0.5;
    const breakPoint = 877;
    const timeToChange = 15 + delay;

    const [state, setState] = React.useState({
        countDown: timeToChange - delay,
    });

    const { countDown } = state;

    React.useEffect(() => {
        if (countDown === 0) {
            props.type === 'refresh'
                ? router.reload()
                : router.replace(props.replaceTo);
        }
        console.log({
            hi: data.nodeEnv,
        });
        if (data.nodeEnv === 'test') {
            return;
        }
        const goTo = setTimeout(
            () =>
                setState((prev) => ({
                    ...prev,
                    countDown: prev.countDown - 1,
                })),
            1000
        );
        return () => clearTimeout(goTo);
    }, [countDown]);

    const getName = (): LinkTitle => {
        switch (props.type) {
            case 'refresh': {
                return props.name;
            }
            case 'link-to': {
                const { replaceTo } = props;
                return replaceTo === '/'
                    ? 'Home'
                    : replaceTo === '/projects'
                    ? 'Projects'
                    : replaceTo === '/contact'
                    ? 'Contact'
                    : 'Resume';
            }
        }
    };

    const name = getName();

    const ErrorContainer =
        statusCode !== undefined
            ? ErrorContentContainer
            : ErrorContentContainerWithoutStatusCode;

    return (
        <Container>
            <Title
                title={`${statusCode ?? ''} Error`}
                content="You took the wrong turn and came here"
            />
            <ErrorContainer>
                <ErrorLeft>
                    <div>
                        {messages.map((message, index) => {
                            const Message = !index
                                ? ErrorMessageTitle
                                : ErrorMessageDescription;
                            return <Message key={message}>{message}</Message>;
                        })}
                    </div>
                    {props.type === 'refresh' ? (
                        <>
                            <RefreshButtonContainer>
                                <RefreshButton
                                    onClick={router.reload}
                                    timeToChange={timeToChange}
                                >
                                    Refresh
                                </RefreshButton>
                            </RefreshButtonContainer>
                            <BackToHomeAlternative>OR</BackToHomeAlternative>
                            <BackToHomeTimer>
                                Auto Refresh in: 00:00:
                                {`${countDown >= 10 ? '' : '0'}${countDown}`}
                            </BackToHomeTimer>
                        </>
                    ) : (
                        <ErrorActionContainer breakPoint={breakPoint}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <BackToHomeTimer>
                                    Back to {name} in: 00:00:
                                    {`${
                                        countDown >= 10 ? '' : '0'
                                    }${countDown}`}
                                </BackToHomeTimer>
                                <BackToHomeAlternative>
                                    OR
                                </BackToHomeAlternative>
                                <BackToHomeButton
                                    breakPoint={breakPoint}
                                    timeToChange={timeToChange}
                                >
                                    Go{' '}
                                    <Link href={props.replaceTo}>{name}</Link>{' '}
                                    Immediately
                                </BackToHomeButton>
                            </div>
                        </ErrorActionContainer>
                    )}
                </ErrorLeft>
                {statusCode === undefined ? null : (
                    <ErrorRight>
                        <ErrorMessageFourZeroFour>
                            {statusCode}
                        </ErrorMessageFourZeroFour>
                    </ErrorRight>
                )}
            </ErrorContainer>
        </Container>
    );
};

const Container = styled(GlobalContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorContentContainerWithoutStatusCode = styled.div`
    width: 85%;
    text-align: center;
    @media (max-width: 877px) {
        > div {
            margin: 10px 0 10px 0;
        }
    }
`;

const ErrorContentContainer = styled.div`
    width: 85%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 877px) {
        display: flex;
        flex-direction: column-reverse;
        text-align: center;
        > div {
            margin: 10px 0 10px 0;
        }
    }
`;

const ErrorActionContainer = styled.div`
    display: flex;
    @media (max-width: ${({ breakPoint }: BreakPoint) => breakPoint}px) {
        display: block;
    }
`;

const ErrorLeft = styled.div`
    display: grid;
`;

const ErrorRight = styled.div`
    text-align: center;
`;

const ErrorMessageFourZeroFour = styled.h1`
    font-size: 10em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    @media (max-width: 877px) {
        font-size: 6em;
        margin: 0 !important;
    }
`;

const ErrorMessageTitle = styled.h2`
    font-size: 2em;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    @media (max-width: 877px) {
        font-size: 1.8em;
    }
`;

const ErrorMessageDescription = styled.p`
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
`;

const BackToHomeTimer = styled.div`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
`;

const BackToHomeAlternative = styled.p`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
`;

const ChargeHomeButton = keyframes`
    0% {
        background-position: 100% 0%;
    }
    100% {
        background-position: 0% -100%;
    }
`;

const BackToHomeButton = styled.div`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    align-self: baseline;
    @media (max-width: ${({ breakPoint }: BreakPoint & BackToHomeButtonProps) =>
            breakPoint}px) {
        align-self: normal;
    }
    > a {
        background-color: ${({ theme }) => theme.blue.bright} !important;
        background: linear-gradient(
                to left,
                ${({ theme }) => theme.theme.primaryColor} 50%,
                ${({ theme }) => theme.blue.bright} 50%
            )
            right;
        background-size: 200%;
        display: inline-block;
        padding: 12px 16px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.theme.secondaryColor};
        text-decoration: none;
        font-weight: 600;
        animation: ${ChargeHomeButton} ease-in-out
            ${({ timeToChange }) => timeToChange}s;
        -moz-animation: ${ChargeHomeButton} ease-in-out
            ${({ timeToChange }) => timeToChange}s;
        -webkit-animation: ${ChargeHomeButton} ease-in-out
            ${({ timeToChange }) => timeToChange}s;
        -o-animation: ${ChargeHomeButton} ease-in-out
            ${({ timeToChange }) => timeToChange}s;
        -ms-animation: ${ChargeHomeButton} ease-in-out
            ${({ timeToChange }) => timeToChange}s;

        &:hover {
            background-position: left !important;
            cursor: pointer;
        }
    }
`;

const RefreshButtonContainer = styled.div`
    display: grid;
    place-items: center;
`;

const RefreshButton = styled.button`
    border: none;
    font-size: 1em;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
    background-color: ${({ theme }) => theme.blue.bright} !important;
    background: linear-gradient(
            to left,
            ${({ theme }) => theme.theme.primaryColor} 50%,
            ${({ theme }) => theme.blue.bright} 50%
        )
        right;
    background-size: 200%;
    display: inline-block;
    padding: 12px 16px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.theme.secondaryColor};
    text-decoration: none;
    font-weight: 600;
    animation: ${ChargeHomeButton} ease-in-out
        ${({ timeToChange }: BackToHomeButtonProps) => timeToChange}s;
    -moz-animation: ${ChargeHomeButton} ease-in-out
        ${({ timeToChange }) => timeToChange}s;
    -webkit-animation: ${ChargeHomeButton} ease-in-out
        ${({ timeToChange }) => timeToChange}s;
    -o-animation: ${ChargeHomeButton} ease-in-out
        ${({ timeToChange }) => timeToChange}s;
    -ms-animation: ${ChargeHomeButton} ease-in-out
        ${({ timeToChange }) => timeToChange}s;

    &:hover {
        background-position: left !important;
        cursor: pointer;
    }
`;

export default ErrorContainer;
