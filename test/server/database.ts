class Database {
	private static _instance: Database;

	private constructor() {}

	static instance() {
		if (!Database._instance) {
			Database._instance = new Database();
		}
		return Database._instance;
	}

	async clearCollections() {
		// Mock implementation for clearing collections
		return Promise.resolve();
	}

	async getAllContactFormMessages() {
		// Mock implementation for getting all contact form messages
		return Promise.resolve({
			result: 'succeed',
			messages: [],
		});
	}
}

export default Database;
