import React from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

const SecondaryMainButton = ({
    sx,
    title,
    onClick,
}: Readonly<{
    title: string;
    sx?: SxProps<Theme>;
    onClick: ButtonProps['onClick'];
}>) => (
    <Button
        disableElevation
        onClick={onClick}
        variant="contained"
        sx={(theme) => ({
            width: 'fit-content',
            color: 'custom.white',
            backgroundColor: 'secondary.main',
            fontSize: '1em',
            '&:hover': {
                backgroundColor: 'secondary.dark',
            },
            ...(!sx
                ? undefined
                : typeof sx === 'function'
                ? sx(theme)
                : 'width' in sx
                ? sx
                : undefined),
        })}
    >
        {title}
    </Button>
);

export { SecondaryMainButton };
