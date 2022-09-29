import React from 'react';
import styled, { keyframes } from 'styled-components';
import { GlobalContainer } from '../src/web/theme/GlobalTheme';
import Title from '../src/web/components/common/Title';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

type BackToHomeButtonProps = Readonly<{
    timeToChange: number;
}>;

const Error: NextPage = () => {
    const router = useRouter();

    const delay = 0.5;
    const timeToChange = 10 + delay;

    const [state, setState] = React.useState({
        countDown: timeToChange - delay,
    });

    const { countDown } = state;

    React.useEffect(() => {
        if (countDown === 0) {
            router.replace('/');
        }
        return () =>
            clearTimeout(
                setTimeout(
                    () =>
                        setState((prev) => ({
                            ...prev,
                            countDown: prev.countDown - 1,
                        })),
                    1000
                )
            );
    }, [countDown]);

    return (
        <Container>
            <Title
                title="404 Error"
                content="You took the wrong turn and came here"
            />
            <ErrorContentContainer>
                <ErrorLeft>
                    <ErrorMessageTitle>Oops! You seems lost.</ErrorMessageTitle>
                    <ErrorMessageDescription>
                        Yeah, I am as confused as you are.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        From what I&apos;ve seen, it appears that the page you
                        are looking for is now beyond my reach.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        Luckily, unlike some other mistakes, this can be fixed.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        So let&apos;s get you..
                    </ErrorMessageDescription>

                    <BackToHomeTimer>
                        Back to Home in: 00:00:
                        {`${countDown >= 10 ? '' : '0'}${countDown}`}
                    </BackToHomeTimer>
                    <BackToHomeAlternative>OR</BackToHomeAlternative>
                    <BackToHomeButton timeToChange={timeToChange}>
                        Go <Link href="/">Home</Link> Immediately
                    </BackToHomeButton>
                </ErrorLeft>
                <ErrorRight>
                    <ErrorMessageFourZeroFour>404</ErrorMessageFourZeroFour>
                </ErrorRight>
            </ErrorContentContainer>
        </Container>
    );
};

const Container = styled(GlobalContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorContentContainer = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 877px) {
        text-align: center;
        flex-direction: column-reverse;
        > div {
            margin: 10px 0 10px 0;
        }
    }
`;

const ErrorLeft = styled.div`
    flex: 0.5;
`;

const ErrorRight = styled.div`
    flex: 0.5;
    text-align: center;
`;

const ErrorMessageFourZeroFour = styled.h1`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    font-size: 135px;
    @media (max-width: 877px) {
        font-size: 100px;
        margin: 0 !important;
    }
`;

const ErrorMessageTitle = styled.h2`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    font-size: 40px;
    @media (max-width: 877px) {
        font-size: 30px;
    }
`;

const ErrorMessageDescription = styled.p`
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
`;

const BackToHomeTimer = styled.div`
    padding: 15px 0 0 0;
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
`;

const BackToHomeAlternative = styled.p`
    color: ${({ theme }) => theme.theme.highEmphasesTextColor};
    padding: 0 0 0 110px;
    @media (max-width: 877px) {
        padding: 0 0 0 0;
    }
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
    > a {
        background-color: ${({ theme }) => theme.errorHomeButton} !important;
        background: linear-gradient(
                to left,
                ${({ theme }) => theme.theme.primaryColor} 50%,
                ${({ theme }) => theme.errorHomeButton} 50%
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
    }
`;

export default Error;
