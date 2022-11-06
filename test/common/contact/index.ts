import testValidator from './allValueValid';
import { describe } from 'vitest';

const testContact = () =>
    describe('Contact', () => {
        testValidator();
    });

export default testContact;
