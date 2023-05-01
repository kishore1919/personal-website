import React from 'react';
import Container, { type ContainerProps } from '@mui/material/Container';
import type { SxProps, Theme } from '@mui/material/styles';

const Holder = (
    props: Readonly<{
        id?: ContainerProps['id'];
        sx?: SxProps<Theme>;
        children: React.ReactNode;
        holderRef?: ContainerProps['ref'];
    }>
) => {
    const sx: SxProps<Theme> = {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        maxWidth: 'none !important',
        padding: '0 !important',
    };

    const { holderRef, ...rest } = props;

    return (
        <Container
            ref={holderRef}
            {...{
                ...rest,
                sx: (theme: Theme) => ({
                    ...sx,
                    ...(typeof props.sx === 'function'
                        ? props.sx(theme)
                        : props.sx),
                }),
            }}
            component="div"
        />
    );
};

export default Holder;
