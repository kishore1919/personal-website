import { inRangeOf, isBlank, isEmpty } from 'granula-string';

const validateEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

type EmptyString = '';

type Name = Readonly<{
    value: string;
    error:
        | `*Please do not leave name section ${'empty' | 'blank'}*`
        | EmptyString;
}>;

type Email = Readonly<{
    value: string;
    error:
        | `*Please do not leave email section ${'empty' | 'blank'}*`
        | '*Please enter valid email format*'
        | EmptyString;
}>;

type Message = Readonly<{
    value: string;
    error:
        | `*Please do not leave message section ${'empty' | 'blank'}*`
        | '*At least 10 words are required*'
        | EmptyString;
}>;

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
          message: Message;
          name: Name;
          email: Email;
      }
>;

const getName = (value: string): Name => ({
    value,
    error: isEmpty(value)
        ? '*Please do not leave name section empty*'
        : isBlank(value)
        ? '*Please do not leave name section blank*'
        : defaultValue.error,
});

const getEmail = (value: string): Email => ({
    value,
    error: isEmpty(value)
        ? '*Please do not leave email section empty*'
        : isBlank(value)
        ? '*Please do not leave email section blank*'
        : validateEmail(value)
        ? defaultValue.error
        : '*Please enter valid email format*',
});

const getMessage = (value: string): Message => ({
    value,
    error: isEmpty(value)
        ? '*Please do not leave message section empty*'
        : isBlank(value)
        ? '*Please do not leave message section blank*'
        : inRangeOf(value, {
              min: 10,
              excludeBlankSpace: true,
          })
        ? defaultValue.error
        : '*At least 10 words are required*',
});

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
        !inRangeOf(message.value, {
            min: 10,
            excludeBlankSpace: true,
        });
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
