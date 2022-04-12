import {
    allValueValid,
    getName,
    getEmail,
    getMessage,
} from '../../src/contact';

const testContactValidation = () =>
    describe('Contact allValueValid', () => {
        const name = 'Wendy';
        const email = 'wendy2000@gmail.com';
        const message = 'Wendy is here to test';
        it('should attest all values are valid', () => {
            expect(
                allValueValid(
                    getName(name),
                    getEmail(email),
                    getMessage(message)
                )
            ).toBe(true);
        });
        it('should attest all values are valid except name', () => {
            expect(
                allValueValid(getName(''), getEmail(email), getMessage(message))
            ).toBe(false);
            expect(
                allValueValid(
                    getName(' '),
                    getEmail(email),
                    getMessage(message)
                )
            ).toBe(false);
        });
        it('should attest all values are valid except email', () => {
            expect(
                allValueValid(getName(name), getEmail(''), getMessage(message))
            ).toBe(false);
            expect(
                allValueValid(getName(name), getEmail(' '), getMessage(message))
            ).toBe(false);
            expect(
                allValueValid(
                    getName(name),
                    getEmail('wendy@g'),
                    getMessage(message)
                )
            ).toBe(false);
        });
        it('should attest all values are valid except message', () => {
            expect(
                allValueValid(getName(name), getEmail(email), getMessage(''))
            ).toBe(false);
            expect(
                allValueValid(getName(name), getEmail(email), getMessage(' '))
            ).toBe(false);
            expect(
                allValueValid(
                    getName(name),
                    getEmail(email),
                    getMessage('123456789')
                )
            ).toBe(false);
        });
    });

export default testContactValidation;
