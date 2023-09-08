import axios from 'axios';
import type { Data } from '../../common/contact';

const sendMessage = (
	values: Readonly<{
		name: string;
		email: string;
		message: string;
		isHoneyPot?: true;
	}>
) => {
	return axios
		.post(`${process.env.NEXT_PUBLIC_ORIGIN}/api/contact`, values, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(({ data }) => {
			return data as Data;
		})
		.catch((error) => {
			console.error(error);
			throw new Error(
				`Oops! I can't send your email as there is an issue`
			);
		});
};

export { sendMessage };
