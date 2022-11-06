import testContact from './contact';
import testPortfolio from './portfolio';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testWeb = () =>
    describe('Web', () => {
        testCases({
            tests: [[testPortfolio], [testContact]],
        });
    });

export default testWeb;
