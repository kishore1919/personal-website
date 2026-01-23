import type { Data } from '../../common/contact';

import axios from 'axios';

class SendMessageError extends Error {
	constructor(message = `Oops! I can't send your email as there is an issue`) {
		super(message);
		this.name = 'SendMessageError';
	}
}

const sendMessage = async (
	values: Readonly<{
		name: string;
		email: string;
		message: string;
		isHoneyPot?: true;
	}>
) => {
	const origin = import.meta.env.PUBLIC_ORIGIN || (typeof window !== 'undefined' ? window.location.origin : '');
	return axios
		.post(`${origin}/api/contact`, values, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(({ data }) => {
			return data as Data;
		})
		.catch((error: unknown) => {
			console.error(error);
			throw new SendMessageError();
		});
};

export { sendMessage, SendMessageError };
