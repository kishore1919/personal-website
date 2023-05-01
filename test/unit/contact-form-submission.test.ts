import { describe, it, expect } from 'vitest';
import {
    getEmail,
    getMessage,
    getName,
    isAllValueValid,
} from '../../src/common/contact';

describe('Contact', () => {
    describe('Value Valiadator', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message =
            'Wendy is here to test cause the number of characters must be long enough';
        it('should attest all values are valid', () => {
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
        });
    });
});
