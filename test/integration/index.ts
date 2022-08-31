import child from 'child_process';
import testContactPost from './contact';
import testPortfolioQuery from './portfolio';

const testIntegration = () => {
    beforeAll(() => {
        child.execSync('make build');
        child.exec('make start');
    });
    describe('Integration Test', () => {
        testPortfolioQuery();
        testContactPost();
    });
    afterAll(() => child.exec('kill $(lsof -t -i:3000)'));
};

export default testIntegration;
