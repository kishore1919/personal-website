import child from 'child_process';
import testContactPost from './contact';
import testPortfolioQuery from './portfolio';
import testCases from 'cases-of-test';

const testIntegration = () => {
    beforeAll(() => {
        child.execSync('make build');
        child.exec('make start');
    });
    describe('Integration Test', () => {
        testCases({
            tests: [[testPortfolioQuery], [testContactPost]],
        });
    });
    afterAll(() => child.exec('kill $(lsof -t -i:3000)'));
};

export default testIntegration;
