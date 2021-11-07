const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkForBlankString = (string: string) =>
    string.split('').filter((char) => ' ' === char).length === string.length;
const checkForEmptyString = (string: string) => string === '';
const sufficientMessageLength = (message: string) => message.length > 10;
const validateEmail = (email: string) => regexEmail.test(email);

type EmptyString = '';

export type Name = {
    readonly value: string;
    readonly error:
        | `*Please do not leave name section ${'empty' | 'blank'}*`
        | EmptyString;
};

export type Email = {
    readonly value: string;
    readonly error:
        | '*Please do not leave email section empty*'
        | '*Please enter valid email format*'
        | EmptyString;
};

export type Message = {
    readonly value: string;
    readonly error:
        | `*Please do not leave message section ${'empty' | 'blank'}*`
        | '*At least 10 words are required*'
        | EmptyString;
};

export type Data =
    | {
          readonly type: 'succeed' | 'input';
          readonly message: Message;
          readonly name: Name;
          readonly email: Email;
      }
    | {
          readonly type: 'failed';
      };

export const getName = (value: string): Name => {
    if (checkForEmptyString(value)) {
        return {
            value,
            error: '*Please do not leave name section empty*',
        };
    } else if (checkForBlankString(value)) {
        return {
            value,
            error: '*Please do not leave name section blank*',
        };
    }
    return {
        value,
        error: '',
    };
};

export const getEmail = (value: string): Email => {
    if (checkForEmptyString(value)) {
        return {
            value,
            error: '*Please do not leave email section empty*',
        };
    } else if (validateEmail(value)) {
        return {
            value,
            error: '',
        };
    }
    return {
        value,
        error: '*Please enter valid email format*',
    };
};

export const getMessage = (value: string): Message => {
    if (checkForEmptyString(value)) {
        return {
            value,
            error: '*Please do not leave message section empty*',
        };
    } else if (checkForBlankString(value)) {
        return {
            value,
            error: '*Please do not leave message section blank*',
        };
    } else if (sufficientMessageLength(value)) {
        return {
            value,
            error: '',
        };
    }
    return {
        value,
        error: '*At least 10 words are required*',
    };
};

export const allValueValid = (
    { value: name, error: nameErr }: Name,
    { value: email, error: emailErr }: Email,
    { value: message, error: messageErr }: Message
): boolean => {
    const noError =
        checkForEmptyString(nameErr) &&
        checkForEmptyString(emailErr) &&
        checkForEmptyString(messageErr);
    const nameInvalid = checkForBlankString(name) || checkForEmptyString(name);
    const messageInvalid =
        checkForBlankString(message) ||
        checkForEmptyString(message) ||
        !sufficientMessageLength(message);
    const inputValid = messageInvalid && validateEmail(email) && !nameInvalid;
    return noError && !inputValid;
};
