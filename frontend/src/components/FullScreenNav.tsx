import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { HashLoading, ErrorBoundary } from './HashLoading';
import NavLinks from './NavLinks';
const CloseFullScreen = React.lazy(() => import('./CloseFullScreen'));
const FullScreenContainer = React.lazy(() =>
    import('../util/theme/GlobalTheme').then((module) => ({
        default: module.FullScreenContainer,
    }))
);

type FullScreenAnimation = Readonly<{
    slideIn: boolean;
}>;

const FullScreen = ({
    show,
    close,
}: Readonly<{
    show: boolean;
    close: () => void;
}>): JSX.Element | null => {
    const [state, setState] = React.useState({
        animate: show,
        load: show,
    });

    React.useEffect(() => {
        setState(() => ({
            animate: show,
            load: show,
        }));
    }, [show]);

    const { animate, load } = state;

    if (load) {
        return (
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <FullScreenNav slideIn={animate}>
                        <CloseFullScreen
                            close={() => {
                                setState((prev) => ({
                                    ...prev,
                                    animate: false,
                                }));
                                setTimeout(() => {
                                    close();
                                    setState((prev) => ({
                                        ...prev,
                                        load: false,
                                    }));
                                }, 350);
                            }}
                        />
                        <NavLinks fullScreen={true} close={close} />
                    </FullScreenNav>
                </React.Suspense>
            </ErrorBoundary>
        );
    }
    return null;
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
    animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -moz-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -webkit-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -o-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -ms-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
`;

export default FullScreen;
