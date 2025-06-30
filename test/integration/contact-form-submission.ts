import { describe, it, expect, beforeEach } from 'vitest';

import Database from '../../test/server/database';
import { sendMessage } from '../../src/web/api-functions/contact';

export const testContactFormSubmissionPost = () => {
	return describe('Api contact submission post test', () => {
		const dummy = {
			name: 'Pepper Potts',
			email: 'pepperpottsishot@mail.com',
			message: 'THIS IS MADLY AWESOME!!!',
		} as const;

		beforeEach(async () => {
			await Database.instance().clearCollections();
		});

		it('should return success status if input passed the validation', async () => {
			const response = await sendMessage(dummy);
			expect(response.type).toBe('succeed');
		});

		it('should return success status if honeypot is set, but do not insert into database', async () => {
			const instance = Database.instance();
			const response = await sendMessage({
				...dummy,
				isHoneyPot: true,
			});
			expect(response.type).toBe('succeed');

			const result = await instance.getAllContactFormMessages();
			expect(result.result).toBe('succeed');
			if (result.result !== 'succeed') {
				throw new Error(
					'asserted result to be succeed, cannot fail another if statement assertion'
				);
			}
			expect(result.messages).toHaveLength(0);
		});

		it.each([
			{
				input: {
					...dummy,
					name: '',
				},
				output: {
					type: 'input',
					name: {
						status: 'error',
						reason: 'Please do not leave name section empty',
					},
					email: { status: 'clean' },
					message: {
						status: 'clean',
					},
				},
			},
			{
				input: {
					...dummy,
					email: '',
				},
				output: {
					type: 'input',
					name: { status: 'clean' },
					email: {
						status: 'error',
						reason: 'Please do not leave email section empty',
					},
					message: {
						status: 'clean',
					},
				},
			},
			{
				input: {
					...dummy,
					message: '',
				},
				output: {
					type: 'input',
					name: { status: 'clean' },
					email: {
						status: 'clean',
					},
					message: {
						status: 'error',
						reason: 'Please do not leave message section empty',
					},
				},
			},
		] as const)(
			'should return input status if input of "%p" had not pass the validation',
			async ({ input, output }) => {
				const response = await sendMessage(input);
				expect(response).toStrictEqual(output);
			}
		);
	});
};
