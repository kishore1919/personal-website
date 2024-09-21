import type { ObjectId } from 'mongoose';

import mongoose from 'mongoose';

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

	private static readonly create = () => {
		const environment = process.env.NEXT_PUBLIC_NODE_ENV;

		const isLocal =
			environment === 'testing' || environment === 'development';

		const url = isLocal
			? `mongodb://${config.auth.user}:${config.auth.password}@${config.address}:${config.port}/${config.database}?authSource=admin&retryWrites=true&w=majority`
			: `mongodb+srv://${config.auth.user}:${config.auth.password}@${config.address}/${config.database}?authSource=admin&retryWrites=true&w=majority`;

		return new this(url, config.collections);
	};

	private static database: Database | undefined = undefined;

	static readonly instance = () => {
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
