type Name = ReturnType<typeof getName>;

type Email = ReturnType<typeof getEmail>;

type Message = ReturnType<typeof getMessage>;

type Data = Readonly<
    | {
          type: 'succeed';
      }
    | {
          type: 'failed';
          error: string;
      }
    | {
          type: 'input';
          name: Name;
          email: Email;
          message: Message;
      }
>;

const validateEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

const isBlank = (value: string) =>
    value.split('').filter((c) => ' ' === c).length === value.length;

const isEmpty = (s: string) => s === '';

const numberOfCharacters = 7;

const inRange = (value: string) =>
    value.split(' ').filter(Boolean).length >= numberOfCharacters;

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
            : validateEmail(value)
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
            : inRange(value)
            ? defaultValue.error
            : (`*At least ${numberOfCharacters} words are required*` as const),
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
    const hasNoError =
        isEmpty(name.error) && isEmpty(email.error) && isEmpty(message.error);
    const isNameInvalid = isBlank(name.value) || isEmpty(name.value);
    const isMessageInvalid =
        isBlank(message.value) ||
        isEmpty(message.value) ||
        !inRange(message.value);
    const isinputValid =
        isMessageInvalid && validateEmail(email.value) && !isNameInvalid;
    return hasNoError && !isinputValid;
};

const defaultValue = {
    value: '',
    error: '',
} as const;

export { isAllValueValid, getMessage, getEmail, getName, defaultValue };
export type { Name, Email, Message, Data };
