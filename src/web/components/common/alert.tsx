import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import type { Children } from '../../type/react';

type AlertProps = Readonly<
	Children & {
		onClose: () => void;
	}
>;

const Container = (
	props: Readonly<{
		children: ReturnType<typeof Alert>;
	}>
) => {
	return (
		<Snackbar
			open
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			{props.children}
		</Snackbar>
	);
};

const Error = (props: AlertProps) => {
	return (
		<Container>
			<Alert severity="error" onClose={props.onClose}>
				<AlertTitle>Error</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Warning = (props: AlertProps) => {
	return (
		<Container>
			<Alert severity="warning" onClose={props.onClose}>
				<AlertTitle>Warning</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Info = (props: AlertProps) => {
	return (
		<Container>
			<Alert severity="info" onClose={props.onClose}>
				<AlertTitle>Info</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Success = (props: AlertProps) => {
	return (
		<Container>
			<Alert severity="success" onClose={props.onClose}>
				<AlertTitle>Success</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

export { Error, Warning, Info, Success };
