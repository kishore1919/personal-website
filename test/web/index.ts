import testContact from './contact';
import testPortfolio from './portfolio';

const testWeb = () =>
    describe('Web', () => {
        testPortfolio();
        testContact();
    });

export default testWeb;
