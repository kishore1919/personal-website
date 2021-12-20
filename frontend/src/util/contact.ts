declare global {
    interface String {
        isEmpty: () => boolean;
        isBlank: () => boolean;
        hasSufficientLength: (length: number) => boolean;
    }
}

String.prototype.isBlank = function () {
    return this.split('').filter((char) => ' ' === char).length === this.length;
};

String.prototype.isEmpty = function () {
    return this === '';
};

String.prototype.hasSufficientLength = function (length: number) {
    return (
        this.split('').filter((char) => !(char.isBlank() || char.isEmpty()))
            .length >= length
    );
};

const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        | '*Please do not leave email section blank*'
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
          readonly error: string;
      };

export const getName = (value: string): Name => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave name section empty*'
        : value.isBlank()
        ? '*Please do not leave name section blank*'
        : '',
});

export const getEmail = (value: string): Email => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave email section empty*'
        : value.isBlank()
        ? '*Please do not leave email section blank*'
        : validateEmail(value)
        ? ''
        : '*Please enter valid email format*',
});

export const getMessage = (value: string): Message => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave message section empty*'
        : value.isBlank()
        ? '*Please do not leave message section blank*'
        : value.hasSufficientLength(10)
        ? ''
        : '*At least 10 words are required*',
});

export const allValueValid = (
    { value: name, error: nameErr }: Name,
    { value: email, error: emailErr }: Email,
    { value: message, error: messageErr }: Message
): boolean => {
    const noError =
        nameErr.isEmpty() && emailErr.isEmpty() && messageErr.isEmpty();
    const nameInvalid = name.isBlank() || name.isEmpty();
    const messageInvalid =
        message.isBlank() ||
        message.isEmpty() ||
        !message.hasSufficientLength(10);
    const inputValid = messageInvalid && validateEmail(email) && !nameInvalid;
    return noError && !inputValid;
};
