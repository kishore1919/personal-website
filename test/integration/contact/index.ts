import jsonResponse from '../response';
import parseAsData from '../../../src/web/parser/contact';
import { describe, it, expect } from 'vitest';

const testContactPost = () =>
    describe('Api contact post test', () => {
        const dummy = {
            name: 'Test - Pepper',
            email: 'pepper@gmail.com',
            message: 'This is freaking awesome',
        } as const;

        it('should return success status if input passed the validation', async () => {
            const response = await jsonResponse({
                param: 'contact',
                requestInit: {
                    method: 'POST',
                    body: JSON.stringify(dummy),
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
                    email: { value: 'pepper@gmail.com', error: '' },
                    message: {
                        value: 'This is freaking awesome',
                        error: '',
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
                    name: { value: 'Test - Pepper', error: '' },
                    email: {
                        value: '',
                        error: '*Please do not leave email section empty*',
                    },
                    message: {
                        value: 'This is freaking awesome',
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
                    message: {
                        value: '',
                        error: '*Please do not leave message section empty*',
                    },
                    email: {
                        error: '',
                        value: 'pepper@gmail.com',
                    },
                    name: { value: 'Test - Pepper', error: '' },
                },
            },
        ] as const)(
            'should return input status if input of "%p" had not pass the validation',
            async ({ input, output }) => {
                const response = await jsonResponse({
                    param: 'contact',
                    requestInit: {
                        method: 'POST',
                        body: JSON.stringify(input),
                    },
                });
                return expect(parseAsData(response)).toStrictEqual(output);
            }
        );
    });

export default testContactPost;
