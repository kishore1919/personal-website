import testContactPost from './contact';
import { beforeAll, afterAll, describe } from 'vitest';
import { Server } from '../util';
import Database from '../../src/api/contact/database';

const testIntegration = () => {
    const server = Server.create();
    beforeAll(async () => {
        await server.start();
        await (await Database.instance()).clearCollections();
    });

    describe('Integration Test', () => {
        testContactPost();
    });
    afterAll(async () => {
        server.kill();
        await (await Database.instance()).close();
    });
};

testIntegration();
