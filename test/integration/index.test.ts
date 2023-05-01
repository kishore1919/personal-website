import { beforeAll, afterAll, describe } from 'vitest';
import Server from '../server';
import Database from '../../src/api/database';
import testContactFormSubmissionPost from './contact-form-submission';

const testIntegration = () => {
    const server = Server.create();
    const database = Database.instance();
    beforeAll(async () => {
        await server.start();
        await (await database).clearCollections();
    });
    describe('Integration Test', () => {
        testContactFormSubmissionPost();
    });
    afterAll(async () => {
        server.kill();
        await (await database).close();
    });
};

testIntegration();
