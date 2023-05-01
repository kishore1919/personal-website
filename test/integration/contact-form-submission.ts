import { describe, it, expect, beforeEach } from 'vitest';
import Database from '../../src/api/database';
import sendMessage from '../../src/web/components/contact/send-message';

const testContactFormSubmissionPost = () =>
    describe('Api contact submission post test', () => {
        const dummy = {
            name: 'Pepper Potts',
            email: 'pepperpottsishot@mail.com',
            message: 'THIS IS MADLY AWESOME!!!',
        } as const;

        beforeEach(async () => {
            (await Database.instance()).clearCollections();
        });

        it('should return success status if input passed the validation', async () => {
            const response = await sendMessage(dummy);
            expect(response.type).toBe('succeed');
        });

        it('should return success status if honeypot is set, but do not insert into database', async () => {
            const instance = await Database.instance();
            const response = await sendMessage({
                ...dummy,
                isHoneyPot: true,
            });
            const result = await instance.getAllContactFormMessages();
            expect(response.type).toBe('succeed');
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
                        value: '',
                        error: '*Please do not leave name section empty*',
                    },
                    email: { error: '', value: dummy.email },
                    message: {
                        error: '',
                        value: dummy.message,
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
                    name: { value: dummy.name, error: '' },
                    email: {
                        value: '',
                        error: '*Please do not leave email section empty*',
                    },
                    message: {
                        value: dummy.message,
                        error: '',
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
                    name: { error: '', value: dummy.name },
                    email: {
                        error: '',
                        value: dummy.email,
                    },
                    message: {
                        value: '',
                        error: '*Please do not leave message section empty*',
                    },
                },
            },
        ] as const)(
            'should return input status if input of "%p" had not pass the validation',
            async ({ input, output }) => {
                const response = await sendMessage(input);
                return expect(response).toStrictEqual(output);
            }
        );
    });

export default testContactFormSubmissionPost;
