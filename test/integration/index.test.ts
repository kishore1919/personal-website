import testContactPost from './contact';
import { beforeAll, afterAll, describe } from 'vitest';
import { Server } from '../util';

const testIntegration = () => {
    const server = Server.create();
    beforeAll(async () => {
        await server.start();
    });
    describe('Integration Test', () => {
        testContactPost();
    });
    afterAll(() => {
        server.kill();
    });
};

testIntegration();
