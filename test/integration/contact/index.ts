import jsonResponse from '../response';
import parseAsData from '../../../src/web/parser/contact';
import { equal } from '../../util';

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
        it('should return input status if input had not pass the validation', async () => {
            const results = [
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
                        name: { value: 'Pepper', error: '' },
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
                            value: 'This is freaking awesome',
                            error: '',
                        },
                        email: {
                            value: '',
                            error: '*Please do not leave email section empty*',
                        },
                        name: { value: 'Pepper', error: '' },
                    },
                },
            ].map(async ({ input, output }) => {
                const response = await jsonResponse({
                    param: 'contact',
                    requestInit: {
                        method: 'POST',
                        body: JSON.stringify(input),
                    },
                });
                const data = parseAsData(response);
                return equal(data, output);
            });
            expect(results.length).toBe(3);
            expect(results.every((result) => result)).toBe(true);
        });
    });

export default testContactPost;
