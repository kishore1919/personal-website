import React, { Suspense, lazy, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { HashLoading, ErrorBoundary } from './HashLoading';
import NavLinks from './NavLinks';
const CloseFullScreen = lazy(() => import('./CloseFullScreen'));
const FullScreenContainer = lazy(() => import('../util/theme/GlobalTheme').then(module => ({ default: module.FullScreenContainer })));

interface FullScreenAnimation {
    readonly slideIn: boolean;
}

interface FullScreenProps {
    readonly show: boolean;
    readonly close: () => void;
}

const FullScreen = ({ show, close }: FullScreenProps): JSX.Element | null => {

    const [animate, setAnimate] = useState(show);
    const [load, setLoad] = useState(show);

    useEffect(() => {
        setAnimate(show);
        setLoad(show);
    }, [show]);

    if (load) {
        return (
            <ErrorBoundary>
                <Suspense fallback={<HashLoading/>}>
                    <FullScreenNav slideIn={animate}>
                        <CloseFullScreen close={() => {
                            setAnimate(false);
                            setTimeout(() => {
                                close();
                                setLoad(false);
                            }, 350);
                        }}/>
                        <NavLinks fullScreen={true} close={close}/>
                    </FullScreenNav>
                </Suspense>
            </ErrorBoundary>
        );
    } return null;
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
    animation: ${({ slideIn: show }: FullScreenAnimation) => show ? FullScreenSlideIn : FullScreenSlideOut} ease 0.5s;
    -moz-animation: ${({ slideIn: show }: FullScreenAnimation) => show ? FullScreenSlideIn : FullScreenSlideOut} ease 0.5s;
    -webkit-animation: ${({ slideIn: show }: FullScreenAnimation) => show ? FullScreenSlideIn : FullScreenSlideOut} ease 0.5s;
    -o-animation: ${({ slideIn: show }: FullScreenAnimation) => show ? FullScreenSlideIn : FullScreenSlideOut} ease 0.5s;
    -ms-animation: ${({ slideIn: show }: FullScreenAnimation) => show ? FullScreenSlideIn : FullScreenSlideOut} ease 0.5s;
`;

export default FullScreen;