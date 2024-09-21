import type { Children } from '../../type/react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

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
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open
		>
			{props.children}
		</Snackbar>
	);
};

const Error = (props: AlertProps) => {
	return (
		<Container>
			<Alert onClose={props.onClose} severity="error">
				<AlertTitle>Error</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Warning = (props: AlertProps) => {
	return (
		<Container>
			<Alert onClose={props.onClose} severity="warning">
				<AlertTitle>Warning</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Info = (props: AlertProps) => {
	return (
		<Container>
			<Alert onClose={props.onClose} severity="info">
				<AlertTitle>Info</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

const Success = (props: AlertProps) => {
	return (
		<Container>
			<Alert onClose={props.onClose} severity="success">
				<AlertTitle>Success</AlertTitle>
				{props.children}
			</Alert>
		</Container>
	);
};

export { Error, Warning, Info, Success };
