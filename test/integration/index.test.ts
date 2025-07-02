import { beforeAll, afterAll, describe } from 'vitest';

import Database from '../../test/server/database';
import Server from '../server';

import { testContactFormSubmissionPost } from './contact-form-submission';

const testIntegration = () => {
	const server = Server.of(8080);
	const database = Database.instance();

	beforeAll(async () => {
		await server.start();
		await database.clearCollections();
	});

	describe('Integration Test', () => {
		testContactFormSubmissionPost();
	});

	afterAll(() => {
		server.kill();
	});
};

testIntegration();
