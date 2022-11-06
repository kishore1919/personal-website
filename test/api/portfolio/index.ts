import testProcessing from './processing';
import { describe } from 'vitest';

const testPortfolio = () =>
    describe('Portfolio', () => {
        testProcessing();
    });

export default testPortfolio;
