import type { EndPointFunc } from '../../src/api/endpoint';
import type { Data } from '../../src/common/contact';

// import { string, object, safeParse, optional, boolean } from 'valibot';

// import cors from '../../src/api/cors';
// // import Database from '../../src/api/database';
// import { ContactMessageParser } from '../../src/common/contact';

const contact: EndPointFunc<Data> = async () => {
	// console.log('Contact endpoint called');
}
// 	await cors<Data>()(request, response);

// 	if (request.method !== 'POST') {
// 		return response.status(404).json('Only accept POST request');
// 	}

// 	const body = safeParse(
// 		object({
// 			name: string(),
// 			email: string(),
// 			message: string(),
// 			isHoneyPot: optional(boolean()),
// 		}),
// 		request.body
// 	);

// 	if (!body.success) {
// 		return response.status(200).json({
// 			type: 'input',
// 			name: {
// 				status: 'error',
// 				reason: 'Please do not leave name section empty',
// 			},
// 			email: {
// 				status: 'error',
// 				reason: 'Please do not leave email section empty',
// 			},
// 			message: {
// 				status: 'error',
// 				reason: 'Please do not leave message section empty',
// 			},
// 		});
// 	}

// 	const parser = ContactMessageParser.from(body.output);

// 	const responseSucceed = {
// 		type: 'succeed',
// 	} as const;

// 	if (body.output.isHoneyPot) {
// 		return response.status(200).json(responseSucceed);
// 	}

// 	const { status, ...rest } = parser.allValueIsValid();

// 	if (status === 'error') {
// 		return response.status(200).json({
// 			...rest,
// 			type: 'input',
// 		});
// 	}

// 	// const database = Database.instance();

// 	// const insertResult = await database
// 	// 	.insertContactFormMessage(parser.value())
// 	// 	.then(() => {
// 	// 		return responseSucceed;
// 	// 	})
// 	// 	.catch(() => {
// 	// 		return {
// 	// 			type: 'failed',
// 	// 		} as const;
// 	// 	});

// 	// response
// 	// 	.status(insertResult.type === 'succeed' ? 200 : 500)
// 	// 	.json(insertResult);
// };

export default contact;
