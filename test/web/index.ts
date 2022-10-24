import testContact from './contact';
import testPortfolio from './portfolio';
import testCases from 'cases-of-test';

const testWeb = () =>
    describe('Web', () => {
        testCases({
            tests: [[testPortfolio], [testContact]],
        });
    });

export default testWeb;
