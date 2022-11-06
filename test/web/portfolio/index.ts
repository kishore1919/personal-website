import testParser from './parser';
import { describe } from 'vitest';

const testPortfolio = () =>
    describe('Portfolio', () => {
        testParser();
    });

export default testPortfolio;
