import type { Data } from '../../common/contact';

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
	// 3G: native fetch instead of axios (~12KB gz) for this single POST.
	return fetch(`${process.env['NEXT_PUBLIC_ORIGIN']}/api/contact`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(values),
	})
		.then(async (response) => {
			return (await response.json()) as Data;
		})
		.catch((error: unknown) => {
			console.error(error);
			throw new SendMessageError();
		});
};

export { sendMessage, SendMessageError };
