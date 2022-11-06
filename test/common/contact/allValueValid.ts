import {
    isAllValueValid,
    getName,
    getEmail,
    getMessage,
} from '../../../src/common/contact';
import { describe, it, expect } from 'vitest';

const testValidator = () =>
    describe('Value Valiadator', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message = 'Wendy is here to test';
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
            expect(
                isAllValueValid({
                    name: getName(name),
                    email: getEmail(email),
                    message: getMessage('123456789'),
                })
            ).toBe(false);
        });
    });

export default testValidator;
