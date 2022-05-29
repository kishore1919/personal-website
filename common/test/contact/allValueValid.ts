import {
    isAllValueValid,
    getName,
    getEmail,
    getMessage,
} from '../../src/contact';

const testValidator = () =>
    describe('Value Valiadator', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message = 'Wendy is here to test';
        it('should attest all values are valid', () => {
            expect(
                isAllValueValid(
                    getName(name),
                    getEmail(email),
                    getMessage(message)
                )
            ).toBe(true);
        });
        it('should attest all values are valid except name', () => {
            expect(
                isAllValueValid(
                    getName(''),
                    getEmail(email),
                    getMessage(message)
                )
            ).toBe(false);
            expect(
                isAllValueValid(
                    getName(' '),
                    getEmail(email),
                    getMessage(message)
                )
            ).toBe(false);
        });
        it('should attest all values are valid except email', () => {
            expect(
                isAllValueValid(
                    getName(name),
                    getEmail(''),
                    getMessage(message)
                )
            ).toBe(false);
            expect(
                isAllValueValid(
                    getName(name),
                    getEmail(' '),
                    getMessage(message)
                )
            ).toBe(false);
            expect(
                isAllValueValid(
                    getName(name),
                    getEmail('wendy@g'),
                    getMessage(message)
                )
            ).toBe(false);
        });
        it('should attest all values are valid except message', () => {
            expect(
                isAllValueValid(getName(name), getEmail(email), getMessage(''))
            ).toBe(false);
            expect(
                isAllValueValid(getName(name), getEmail(email), getMessage(' '))
            ).toBe(false);
            expect(
                isAllValueValid(
                    getName(name),
                    getEmail(email),
                    getMessage('123456789')
                )
            ).toBe(false);
        });
    });

export default testValidator;
