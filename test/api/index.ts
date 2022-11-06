import testPortfolio from './portfolio';
import { describe } from 'vitest';

const testApi = () =>
    describe('Api', () => {
        testPortfolio();
    });

export default testApi;
