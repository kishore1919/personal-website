import { isBlank, isEmpty } from './string';

type Name = ReturnType<typeof getName>;

type Email = ReturnType<typeof getEmail>;

type Message = ReturnType<typeof getMessage>;

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

const isValidEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

const getName = (value: string) =>
    ({
        value,
        error: isEmpty(value)
            ? '*Please do not leave name section empty*'
            : isBlank(value)
            ? '*Please do not leave name section blank*'
            : defaultValue.error,
    } as const);

const getEmail = (value: string) =>
    ({
        value,
        error: isEmpty(value)
            ? '*Please do not leave email section empty*'
            : isBlank(value)
            ? '*Please do not leave email section blank*'
            : isValidEmail(value)
            ? defaultValue.error
            : '*Please enter valid email format*',
    } as const);

const getMessage = (value: string) =>
    ({
        value,
        error: isEmpty(value)
            ? '*Please do not leave message section empty*'
            : isBlank(value)
            ? '*Please do not leave message section blank*'
            : defaultValue.error,
    } as const);

const isAllValueValid = ({
    name,
    email,
    message,
}: Readonly<{
    name: Name;
    email: Email;
    message: Message;
}>): boolean => {
    const noError =
        isEmpty(name.error) && isEmpty(email.error) && isEmpty(message.error);
    const isNameInvalid = isBlank(name.value) || isEmpty(name.value);
    const isMessageInvalid = isBlank(message.value) || isEmpty(message.value);

    const isInputValid =
        !isMessageInvalid && isValidEmail(email.value) && !isNameInvalid;

    return noError && isInputValid;
};

const defaultValue = {
    value: '',
    error: '',
} as const;

export { isAllValueValid, getMessage, getEmail, getName, defaultValue };
export type { Name, Email, Message, Data };
