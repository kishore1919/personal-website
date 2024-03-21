import { isBlank, isEmpty } from '@poolofdeath20/util';

type Name = ReturnType<ContactMessageParser['parseName']>;

type Email = ReturnType<ContactMessageParser['parseEmail']>;

type Message = ReturnType<ContactMessageParser['parseMessage']>;

type Data = Readonly<
	| {
			type: 'succeed';
	  }
	| {
			type: 'failed';
	  }
	| {
			type: 'input';
			name: Name;
			email: Email;
			message: Message;
	  }
>;

type ContactMessageParserProps = Readonly<{
	name: string;
	email: string;
	message: string;
}>;

class ContactMessageParser {
	private constructor(private readonly props: ContactMessageParserProps) {}

	static readonly from = (props: ContactMessageParserProps) => {
		return new this(props);
	};

	private static readonly isValidEmail = (email: string) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	};

	private readonly parseName = () => {
		const { name } = this.props;
		if (isEmpty(name)) {
			return {
				status: 'error',
				reason: 'Please do not leave name section empty',
			} as const;
		}
		if (isBlank(this.props.name)) {
			return {
				status: 'error',
				reason: 'Please do not leave name section blank',
			} as const;
		}
		return {
			status: 'clean',
		} as const;
	};

	private readonly parseEmail = () => {
		const { email } = this.props;
		if (isEmpty(email)) {
			return {
				status: 'error',
				reason: 'Please do not leave email section empty',
			} as const;
		}
		if (isBlank(email)) {
			return {
				status: 'error',
				reason: 'Please do not leave email section blank',
			} as const;
		}
		if (!ContactMessageParser.isValidEmail(email)) {
			return {
				status: 'error',
				reason: 'Please enter valid email format',
			} as const;
		}
		return {
			status: 'clean',
		} as const;
	};

	private readonly parseMessage = () => {
		const { message } = this.props;
		if (isEmpty(message)) {
			return {
				status: 'error',
				reason: 'Please do not leave message section empty',
			} as const;
		}
		if (isBlank(message)) {
			return {
				status: 'error',
				reason: 'Please do not leave message section blank',
			} as const;
		}
		return {
			status: 'clean',
		} as const;
	};

	readonly parse = () => {
		return {
			name: this.parseName(),
			email: this.parseEmail(),
			message: this.parseMessage(),
		};
	};

	readonly allValueIsValid = () => {
		const result = this.parse();

		return {
			...result,
			status:
				result.name.status === 'clean' &&
				result.email.status === 'clean' &&
				result.message.status === 'clean'
					? 'clean'
					: 'error',
		} as const;
	};

	readonly value = () => {
		if (this.allValueIsValid()) {
			return this.props;
		}

		throw new Error('Valud is not valid. Please check the value again');
	};
}

export { ContactMessageParser };
export type { Data };
