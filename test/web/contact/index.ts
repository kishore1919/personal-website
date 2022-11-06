import testParser from './parser';
import { describe } from 'vitest';

const testContact = () =>
    describe('Contact', () => {
        testParser();
    });

export default testContact;
