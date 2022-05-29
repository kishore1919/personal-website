import parseAsData from '../../src/parser/contact';

const testParser = () =>
    describe('Parser', () => {
        it('should parse type of succeed', () => {
            const succeed = {
                type: 'succeed',
                name: {
                    value: '',
                    error: '',
                },
                email: {
                    value: '',
                    error: '',
                },
                message: {
                    value: '',
                    error: '',
                },
            };
            expect(parseAsData(succeed)).toStrictEqual(succeed);
        });
        describe('parse type of input', () => {
            it('should parse when name is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: '',
                        error: '*Please do not leave name section empty*',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '',
                    },
                    message: {
                        value: 'testing purpose',
                        error: '',
                    },
                };
                expect(parseAsData(input)).toStrictEqual(input);
            });
            it('should parse when email is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: 'Bruce',
                        error: '',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '*Please enter valid email format*',
                    },
                    message: {
                        value: 'testing purpose',
                        error: '',
                    },
                };
                expect(parseAsData(input)).toStrictEqual(input);
            });
            it('should parse when message is faulty', () => {
                const input = {
                    type: 'input',
                    name: {
                        value: 'Bruce',
                        error: '',
                    },
                    email: {
                        value: 'brucewayne@gmail.com',
                        error: '',
                    },
                    message: {
                        value: '',
                        error: '*Please do not leave message section empty*',
                    },
                };
                expect(parseAsData(input)).toStrictEqual(input);
            });
        });
        it('should parse type of failed', () => {
            const failed = {
                type: 'failed',
                error: 'testing purpose',
            };
            expect(parseAsData(failed)).toStrictEqual(failed);
        });
    });

export default testParser;
