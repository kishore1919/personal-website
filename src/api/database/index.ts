import mongoose, { type ObjectId } from 'mongoose';
import mongodbConfig from './config';
import { contactFormMessageSchema } from './schema';

type ContactFormMessage = Readonly<{
    name: string;
    email: string;
    message: string;
}>;

export default class Database {
    private readonly client: ReturnType<typeof mongoose.connect>;
    private readonly contactFormMessage: string;

    private static readonly create = async () => {
        const config = mongodbConfig();
        const createURL = () => {
            const {
                auth: { user, password },
                dbName,
                port,
                address,
                srv,
            } = config;
            if (srv) {
                return `mongodb${srv}://${user}:${password}@${address}/${dbName}?authSource=admin&retryWrites=true&w=majority`;
            }
            if (port) {
                return `mongodb://${user}:${password}@${address}:${port}/${dbName}?authSource=admin&retryWrites=true&w=majority`;
            }
            throw new Error('Port or SRV are not defined');
        };

        return new this(createURL(), config);
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

    private constructor(url: string, config: ReturnType<typeof mongodbConfig>) {
        this.client = mongoose.connect(url);
        this.contactFormMessage = config.collections.contactFormMessage;
    }

    // testing purpose only
    readonly close = async () => (await this.client).disconnect();
    readonly clearCollections = async () =>
        await this.getContactFormMessage().deleteMany({});
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

    private readonly getContactFormMessage = () =>
        mongoose.model(this.contactFormMessage, contactFormMessageSchema);

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
