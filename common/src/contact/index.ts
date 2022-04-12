import { GranulaString, isEmpty } from 'granula-string';

const validateEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

type EmptyString = '';

type Name = Readonly<{
    value: GranulaString;
    error:
        | `*Please do not leave name section ${'empty' | 'blank'}*`
        | EmptyString;
}>;

type Email = Readonly<{
    value: GranulaString;
    error:
        | `*Please do not leave email section ${'empty' | 'blank'}*`
        | '*Please enter valid email format*'
        | EmptyString;
}>;

type Message = Readonly<{
    value: GranulaString;
    error:
        | `*Please do not leave message section ${'empty' | 'blank'}*`
        | '*At least 10 words are required*'
        | EmptyString;
}>;

type Data = Readonly<
    | {
          type: 'succeed' | 'input';
          message: Message;
          name: Name;
          email: Email;
      }
    | {
          type: 'failed';
          error: string;
      }
>;

const getName = (string: string): Name => {
    const value = GranulaString.createFromString(string);
    return {
        value,
        error: value.isEmpty()
            ? '*Please do not leave name section empty*'
            : value.isBlank()
            ? '*Please do not leave name section blank*'
            : '',
    };
};

const getEmail = (string: string): Email => {
    const value = GranulaString.createFromString(string);
    return {
        value,
        error: value.isEmpty()
            ? '*Please do not leave email section empty*'
            : value.isBlank()
            ? '*Please do not leave email section blank*'
            : validateEmail(value.valueOf())
            ? ''
            : '*Please enter valid email format*',
    };
};

const getMessage = (string: string): Message => {
    const value = GranulaString.createFromString(string);
    return {
        value,
        error: value.isEmpty()
            ? '*Please do not leave message section empty*'
            : value.isBlank()
            ? '*Please do not leave message section blank*'
            : value.inRangeOf({
                  min: 10,
                  excludeBlankSpace: true,
              })
            ? ''
            : '*At least 10 words are required*',
    };
};

const allValueValid = (
    { value: name, error: nameErr }: Name,
    { value: email, error: emailErr }: Email,
    { value: message, error: messageErr }: Message
): boolean => {
    const noError =
        isEmpty(nameErr) && isEmpty(emailErr) && isEmpty(messageErr);
    const nameInvalid = name.isBlank() || name.isEmpty();
    const messageInvalid =
        message.isBlank() ||
        message.isEmpty() ||
        !message.inRangeOf({
            min: 10,
            excludeBlankSpace: true,
        });
    const inputValid =
        messageInvalid && validateEmail(email.valueOf()) && !nameInvalid;
    return noError && !inputValid;
};

export { allValueValid, getMessage, getEmail, getName };
export type { Name, Email, Message, Data };
