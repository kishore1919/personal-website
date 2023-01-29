import { describe, it, expect } from 'vitest';
import parseAsData from '../../src/web/parser/contact';
import { jsonResponse } from '../util';

const testContactPost = () =>
    describe('Api contact post test', () => {
        const dummy = {
            name: 'Pepper Potts',
            email: 'pepperpottsishot@mail.com',
            message: 'THIS IS MADLY AWESOME!!!',
        } as const;

        it('should return success status if input passed the validation', async () => {
            const response = await jsonResponse({
                param: 'contact',
                requestInit: {
                    method: 'POST',
                    body: dummy,
                },
            });
            expect(parseAsData(response).type).toBe('succeed');
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
                const response = await jsonResponse({
                    param: 'contact',
                    requestInit: {
                        method: 'POST',
                        body: input,
                    },
                });
                return expect(parseAsData(response)).toStrictEqual(output);
            }
        );
    });

export default testContactPost;
