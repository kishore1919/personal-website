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

	private readonly validate = (
		value: string,
		fieldName: 'name' | 'email' | 'message'
	) => {
		if (isEmpty(value)) {
			return {
				status: 'error',
				reason: `Please do not leave ${fieldName} section empty`,
			} as const;
		}
		if (isBlank(value)) {
			return {
				status: 'error',
				reason: `Please do not leave ${fieldName} section blank`,
			} as const;
		}
		return {
			status: 'clean',
		} as const;
	};

	private static readonly isValidEmail = (email: string) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	};

	private readonly parseName = () => {
		return this.validate(this.props.name, 'name');
	};

	private readonly parseEmail = () => {
		const basicValidation = this.validate(this.props.email, 'email');
		if (basicValidation.status === 'error') {
			return basicValidation;
		}

		if (!ContactMessageParser.isValidEmail(this.props.email)) {
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
		return this.validate(this.props.message, 'message');
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
		if (this.allValueIsValid().status === 'clean') {
			return this.props;
		}

		throw new Error('Valud is not valid. Please check the value again');
	};
}

export { ContactMessageParser };
export type { Data };
