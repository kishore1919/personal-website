import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import NavLinks from './NavLinks';
import CloseFullScreen from './CloseFullScreen';
import { FullScreenContainer } from '../theme/GlobalTheme';

type FullScreenAnimation = Readonly<{
    isSlideIn: boolean;
}>;

const FullScreen = ({
    isShow,
    close,
}: Readonly<{
    isShow: boolean;
    close: () => void;
}>) => {
    const [state, setState] = React.useState({
        isAnimate: isShow,
        isLoad: isShow,
    });

    React.useEffect(() => {
        setState(() => ({
            isAnimate: isShow,
            isLoad: isShow,
        }));
    }, [isShow]);

    const { isAnimate, isLoad } = state;

    return !isLoad ? null : (
        <FullScreenNav isSlideIn={isAnimate}>
            <CloseFullScreen
                close={() => {
                    setState((prev) => ({
                        ...prev,
                        isAnimate: false,
                    }));
                    setTimeout(() => {
                        close();
                        setState((prev) => ({
                            ...prev,
                            isLoad: false,
                        }));
                    }, 350);
                }}
            />
            <NavLinks isFullScreen={true} close={close} />
        </FullScreenNav>
    );
};

const FullScreenSlideIn = keyframes`
    0% {top: -100%;}
    100% {top: 0%;}
`;

const FullScreenSlideOut = keyframes`
    0% {top: 0%;}
    100% {top: -100%;}
`;

const FullScreenNav = styled(FullScreenContainer)`
    background-color: ${({ theme }) => theme.theme.primaryColor};
    animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -moz-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -webkit-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -o-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -ms-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
`;

export default FullScreen;
