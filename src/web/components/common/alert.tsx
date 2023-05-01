import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

type AlertParams = Readonly<{
    onClose: () => void;
    children: React.ReactNode;
}>;

const Container = ({
    children,
}: Readonly<{
    children: ReturnType<typeof Alert>;
}>) => (
    <Snackbar
        open
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        {children}
    </Snackbar>
);

const Error = ({ children, onClose }: AlertParams) => (
    <Container>
        <Alert severity="error" onClose={onClose}>
            <AlertTitle>Error</AlertTitle>
            {children}
        </Alert>
    </Container>
);
const Warning = ({ children, onClose }: AlertParams) => (
    <Container>
        <Alert severity="warning" onClose={onClose}>
            <AlertTitle>Warning</AlertTitle>
            {children}
        </Alert>
    </Container>
);

const Info = ({ children, onClose }: AlertParams) => (
    <Container>
        <Alert severity="info" onClose={onClose}>
            <AlertTitle>Info</AlertTitle>
            {children}
        </Alert>
    </Container>
);

const Success = ({ children, onClose }: AlertParams) => (
    <Container>
        <Alert severity="success" onClose={onClose}>
            <AlertTitle>Success</AlertTitle>
            {children}
        </Alert>
    </Container>
);

export { Error, Warning, Info, Success };
