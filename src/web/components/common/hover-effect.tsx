import React from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const BlurryClusterHoverEffect = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pointer = React.useRef() as React.MutableRefObject<HTMLDivElement>;

    const pointerAnimation = keyframes`
        from {
            rotate: 0deg;
        }
        to {
            rotate: 360deg;
        }
        50% {
            scale: 1 1.5;
        }
    `;

    const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test';

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
            onPointerMove={(event) => {
                pointer.current.animate(
                    {
                        left: `${event.clientX}px`,
                        top: `${event.clientY / 2}px`,
                    },
                    { duration: 3000, fill: 'forwards' }
                );
            }}
        >
            <Box
                ref={pointer}
                sx={{
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    width: 300,
                    height: 300,
                    position: 'fixed',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    translate: '-50% 25%',
                    animation: isTest
                        ? undefined
                        : `${pointerAnimation} 20s infinite`,
                    background: isTest
                        ? undefined
                        : 'linear-gradient(to right, #DD030A, #00C7A6)',
                }}
            >
                <Box
                    sx={{
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        backdropFilter: 'blur(100px)',
                    }}
                />
            </Box>
            {children}
        </Box>
    );
};

export { BlurryClusterHoverEffect };
