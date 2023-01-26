import React from 'react';

const useWindowResize = () => {
    const [state, setState] = React.useState({
        width: 0,
    });

    React.useEffect(() => {
        const updateWidth = () =>
            setState((prev) => ({
                ...prev,
                width: window.innerWidth,
            }));
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return state;
};

export default useWindowResize;
