import testContactPost from './contact';
import { beforeAll, afterAll, describe, it } from 'vitest';
import { Server } from '../util';

const testIntegration = () => {
    const server = Server.create();
    beforeAll(async () => {
        await server.start();
    });
    describe('Integration Test', () => {
        it('should ensure that all requests can be sent and all response can be parsed', () => {
            testContactPost();
        });
    });
    afterAll(() => {
        server.kill();
    });
};

testIntegration();
