import testContact from './contact';
import { describe } from 'vitest';

const testCommon = () =>
    describe('Common', () => {
        testContact();
    });

export default testCommon;
