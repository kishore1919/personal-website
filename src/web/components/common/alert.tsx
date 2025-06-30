import type { Children } from '../../type/react';

import Alert, { type AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

type AlertProps = Readonly<
	Children & {
		onClose: () => void;
		severity: AlertColor;
		title: string;
	}
>;

const CustomAlert = (props: AlertProps) => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open
		>
			<Alert onClose={props.onClose} severity={props.severity}> 
				<AlertTitle>{props.title}</AlertTitle>
				{props.children}
			</Alert>
		</Snackbar>
	);
};

const Error = (props: Omit<AlertProps, 'severity' | 'title'>) => (
	<CustomAlert {...props} severity="error" title="Error" />
);

const Warning = (props: Omit<AlertProps, 'severity' | 'title'>) => (
	<CustomAlert {...props} severity="warning" title="Warning" />
);

const Info = (props: Omit<AlertProps, 'severity' | 'title'>) => (
	<CustomAlert {...props} severity="info" title="Info" />
);

const Success = (props: Omit<AlertProps, 'severity' | 'title'>) => (
	<CustomAlert {...props} severity="success" title="Success" />
);

export { Error, Warning, Info, Success };
