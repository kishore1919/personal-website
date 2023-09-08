import mongoose, { type ObjectId } from 'mongoose';
import config from './config';
import { contactFormMessageSchema } from './schema';

type ContactFormMessage = Readonly<{
	name: string;
	email: string;
	message: string;
}>;

export default class Database {
	private readonly client: ReturnType<typeof mongoose.connect>;
	private readonly collections: typeof config.collections;

	private static readonly create = async () => {
		if (config.srv) {
			const url = `mongodb${config.srv}://${config.auth.user}:${config.auth.password}@${config.address}/${config.dbName}?authSource=admin&retryWrites=true&w=majority`;

			return new this(url, config.collections);
		}
		if (config.port) {
			const url = `mongodb://${config.auth.user}:${config.auth.password}@${config.address}:${config.port}/${config.dbName}?authSource=admin&retryWrites=true&w=majority`;

			return new this(url, config.collections);
		}

		throw new Error('Port or SRV are not defined');
	};

	private static database: Promise<Database> | undefined = undefined;

	static readonly instance = (): Promise<Database> => {
		switch (typeof this.database) {
			case 'undefined': {
				this.database = Database.create();
			}
		}
		return this.database;
	};

	private constructor(url: string, collections: typeof config.collections) {
		this.client = mongoose.connect(url);
		this.collections = collections;
	}

	// testing purpose only
	readonly close = async () => {
		return (await this.client).disconnect();
	};
	readonly clearCollections = async () => {
		return await this.getContactFormMessage().deleteMany({});
	};
	readonly getAllContactFormMessages = async () => {
		try {
			const contactFormMessage = this.getContactFormMessage();
			return {
				result: 'succeed',
				messages: await contactFormMessage
					.find<ContactFormMessage>(
						{},
						{ name: 1, email: 1, message: 1 }
					)
					.exec(),
			} as const;
		} catch (error) {
			return {
				result: 'failed',
				error,
			} as const;
		}
	};
	readonly checkConnectionStatus = async () => {
		try {
			const instance = await this.client;
			const state = instance.connection.readyState;
			switch (state) {
				case 1: {
					return {
						result: 'succeed',
					} as const;
				}
			}
			throw new Error(`Database connection state is ${state} where 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting, 99 = uninitialized
            `);
		} catch (error) {
			return {
				result: 'failed',
				error,
			} as const;
		}
	};

	private readonly getContactFormMessage = () => {
		return mongoose.model(
			this.collections.contactFormMessage,
			contactFormMessageSchema
		);
	};

	readonly insertContactFormMessage = async (
		formMessage: ContactFormMessage
	) => {
		try {
			const contactFormMessage = this.getContactFormMessage();
			const result = await new contactFormMessage({
				...mongoose.sanitizeFilter(formMessage),
				createdOn: new Date(),
			}).save();
			return {
				result: 'succeed',
				message: contactFormMessage
					.findOne<
						ContactFormMessage &
							Readonly<{
								_id: ObjectId;
							}>
					>(
						{
							_id: result._id,
						},
						{
							projection: {
								_id: 1,
								name: 1,
								email: 1,
								message: 1,
							},
						}
					)
					.exec(),
			} as const;
		} catch (error) {
			return {
				result: 'failed',
				error,
			} as const;
		}
	};
}

export type { ContactFormMessage };
