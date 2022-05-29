import testProcessing from './processing';
import testDataPromise from './query';

const testPortfolio = () =>
    describe('Portfolio', () => {
        testProcessing();
        testDataPromise();
    });

export default testPortfolio;
