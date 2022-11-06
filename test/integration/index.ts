import child from 'child_process';
import testContactPost from './contact';
import testPortfolioQuery from './portfolio';
import testCases from 'cases-of-test';
import SpawnDetachedChildProcess from 'spawn-detached-child-process';
import { beforeAll, afterAll, describe, it } from 'vitest';

const testIntegration = () => {
    const server = SpawnDetachedChildProcess.create({
        command: 'make',
        args: ['start'],
    });
    beforeAll(() => {
        child.execSync('make build');
        server.start();
    });
    describe('Integration Test', () => {
        it('should ensure that all requests can be sent and all response can be parsed', async () => {
            await server.wait({
                seconds: 5,
            });
            testCases({
                tests: [[testPortfolioQuery], [testContactPost]],
            });
        });
    });
    afterAll(() => {
        server.terminate();
    });
};

export default testIntegration;
