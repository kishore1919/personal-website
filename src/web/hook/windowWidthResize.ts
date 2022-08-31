import * as React from 'react';

const useWindowResize = () => {
    const [state, setState] = React.useState({
        width: (() => {
            if (typeof window === 'undefined') {
                return undefined;
            }
            return window.innerWidth;
        })(),
    });

    React.useEffect(() => {
        const handleResizeWindow = () =>
            setState((prev) => ({
                ...prev,
                width: window.innerWidth,
            }));
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    return state;
};

export default useWindowResize;
