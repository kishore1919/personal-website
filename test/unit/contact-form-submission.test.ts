import { describe, it, expect } from 'vitest';
import {
    getEmail,
    getMessage,
    getName,
    isAllValueValid,
} from '../../src/common/contact';
import parseAsData from '../../src/web/parser/contact';

describe('Contact', () => {
    describe('Parser', () => {
        it('should parse type of succeed', () => {
            const succeed = {
                type: 'succeed',
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
    describe('Value Valiadator', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message =
            'Wendy is here to test cause the number of characters must be long enough';
        it.only('should attest all values are valid', () => {
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(email),
                    message: getMessage(message),
                })
            ).toBe(true);
        });
        it('should attest all values are valid except name', () => {
            expect(
                isAllValueValid({
                    name: getName(''),
                    email: getEmail(email),
                    message: getMessage(message),
                })
            ).toBe(false);
            expect(
                isAllValueValid({
                    name: getName(' '),
                    email: getEmail(email),
                    message: getMessage(message),
                })
            ).toBe(false);
        });
        it('should attest all values are valid except email', () => {
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(''),
                    message: getMessage(message),
                })
            ).toBe(false);
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(' '),
                    message: getMessage(message),
                })
            ).toBe(false);
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail('wendy@g'),
                    message: getMessage(message),
                })
            ).toBe(false);
        });
        it('should attest all values are valid except message', () => {
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(email),
                    message: getMessage(''),
                })
            ).toBe(false);
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(email),
                    message: getMessage(' '),
                })
            ).toBe(false);
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(email),
                    message: getMessage('123456789'),
                })
            ).toBe(false);
        });
    });
});
