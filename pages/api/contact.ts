import Database from '../../src/api/database';
import cors from '../../src/api/cors';
import type { EndPointFunc } from '../../src/api/endpoint';
import type { Data } from '../../src/common/contact';
import { ContactMessageParser } from '../../src/common/contact';

const contact: EndPointFunc<Data> = async (request, response) => {
	await cors<Data>()(request, response);
	if (request.method !== 'POST') {
		return response.status(404).json('Only accept POST request');
	}

	const { body } = request;

	if (typeof body !== 'object' || body === null) {
		return response.status(200).json({
			type: 'input',
			name: {
				status: 'error',
				reason: 'Please do not leave name section empty',
			},
			email: {
				status: 'error',
				reason: 'Please do not leave email section empty',
			},
			message: {
				status: 'error',
				reason: 'Please do not leave message section empty',
			},
		});
	}

	const { name, email, message } = body;

	const values = {
		name: typeof name !== 'string' ? '' : name,
		email: typeof email !== 'string' ? '' : email,
		message: typeof message !== 'string' ? '' : message,
	};

	const contactMessageParser = ContactMessageParser.of(values);

	const responseSucceed = {
		type: 'succeed',
	} as const;

	if (body.isHoneyPot ?? false) {
		return response.status(200).json(responseSucceed);
	}

	const { status, ...rest } = contactMessageParser.allValueIsValid();

	if (status === 'error') {
		return response.status(200).json({
			...rest,
			type: 'input',
		});
	}

	const database = await Database.instance();

	const insertResult = await database
		.insertContactFormMessage(values)
		.then(() => {
			return responseSucceed;
		})
		.catch(() => {
			return {
				type: 'failed',
			} as const;
		});

	response
		.status(insertResult.type === 'succeed' ? 200 : 500)
		.json(insertResult);
};

export default contact;
