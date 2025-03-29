import type { ObjectId } from 'mongoose';

import mongoose from 'mongoose';
import { string, object, array, parse, custom } from 'valibot';

import config from './config';
import { contactFormMessageSchema } from './schema';

type ContactFormMessage = Readonly<{
	name: string;
	email: string;
	message: string;
}>;

export default class Database {
	private static readonly create = () => {
		const environment = process.env.NEXT_PUBLIC_NODE_ENV;

		const isLocal =
			environment === 'testing' || environment === 'development';

		const url = isLocal
			? `mongodb://${config.auth.user}:${config.auth.password}@${config.address}:${config.port}/${config.database}?authSource=admin&retryWrites=true&w=majority`
			: `mongodb+srv://${config.auth.user}:${config.auth.password}@${config.address}/${config.database}?authSource=admin&retryWrites=true&w=majority`;

		return new this({
			client: mongoose.connect(url),
			collections: config.collections,
		});
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

	private constructor(
		private readonly props: Readonly<{
			client: ReturnType<typeof mongoose.connect>;
			collections: typeof config.collections;
		}>
	) {}

	readonly collections = () => {
		return this.props.collections;
	};

	readonly client = () => {
		return this.props.client;
	};

	// testing purpose only
	readonly close = async () => {
		return (await this.client()).disconnect();
	};
	readonly clearCollections = async () => {
		return await this.getContactFormMessage().deleteMany({});
	};
	readonly getAllContactFormMessages = async () => {
		try {
			const contactFormMessage = this.getContactFormMessage();

			return {
				result: 'succeed',
				messages: parse(
					array(
						object({
							name: string(),
							email: string(),
							message: string(),
						})
					),
					await contactFormMessage
						.find(
							{},
							{
								name: 1,
								email: 1,
								message: 1,
							}
						)
						.exec()
				),
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
			this.collections().contactFormMessage,
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
				message: parse(
					object({
						_id: custom<ObjectId>(mongoose.isValidObjectId),
						name: string(),
						email: string(),
						message: string(),
					}),
					await contactFormMessage
						.findOne(
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
						.exec()
				),
			} as const;
		} catch (error) {
			return {
				result: 'failed',
				error,
			} as const;
		}
	};
}
