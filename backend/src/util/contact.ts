import { parseAsString } from 'parse-dont-validate';
import nodemailer from 'nodemailer';
import { contactInfo } from '../config/config';

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

const validateEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );

type EmptyString = '';

type Name = {
    readonly value: string;
    readonly error:
        | `*Please do not leave name section ${'empty' | 'blank'}*`
        | EmptyString;
};

type Email = {
    readonly value: string;
    readonly error:
        | '*Please do not leave email section empty*'
        | '*Please do not leave email section blank*'
        | '*Please enter valid email format*'
        | EmptyString;
};

type Message = {
    readonly value: string;
    readonly error:
        | `*Please do not leave message section ${'empty' | 'blank'}*`
        | '*At least 10 words are required*'
        | EmptyString;
};

type Data =
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

const getName = (value: string): Name => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave name section empty*'
        : value.isBlank()
        ? '*Please do not leave name section blank*'
        : '',
});

const getEmail = (value: string): Email => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave email section empty*'
        : value.isBlank()
        ? '*Please do not leave email section blank*'
        : validateEmail(value)
        ? ''
        : '*Please enter valid email format*',
});

const getMessage = (value: string): Message => ({
    value,
    error: value.isEmpty()
        ? '*Please do not leave message section empty*'
        : value.isBlank()
        ? '*Please do not leave message section blank*'
        : value.hasSufficientLength(10)
        ? ''
        : '*At least 10 words are required*',
});

const allValueValid = (
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

export default ({
    name,
    email,
    message,
}: {
    readonly name: unknown;
    readonly email: unknown;
    readonly message: unknown;
}): Promise<Data> =>
    new Promise((resolve) => {
        try {
            const parsedName = getName(
                parseAsString(name).orElseThrowError('name')
            );
            const parsedEmail = getEmail(
                parseAsString(email).orElseThrowError('email')
            );
            const parsedMessage = getMessage(
                parseAsString(message).orElseThrowError('message')
            );
            if (allValueValid(parsedName, parsedEmail, parsedMessage)) {
                const myEmail = contactInfo.email;
                const options = {
                    from: `${parsedName.value.trim()} <${myEmail}>`,
                    to: `Gervin Fung Da Xuen <${myEmail}>`,
                    subject: 'Personal Website Contact Form',
                    text: `Hello, my name is ${parsedName.value.trim()}\n\nYou can reach me at ${
                        parsedEmail.value
                    }\n\nI would like to ${parsedMessage.value.trim()}`,
                };
                nodemailer
                    .createTransport({
                        host: 'smtp-mail.outlook.com',
                        port: 587,
                        secure: false,
                        tls: {
                            ciphers: 'SSLv3',
                        },
                        auth: {
                            user: myEmail,
                            pass: contactInfo.pass,
                        },
                    })
                    .sendMail(options, (error) => {
                        resolve(
                            (error
                                ? {
                                      type: 'failed',
                                      error: error.message,
                                  }
                                : {
                                      type: 'succeed',
                                      name: {
                                          ...parsedName,
                                          value: '',
                                      },
                                      email: {
                                          ...parsedEmail,
                                          value: '',
                                      },
                                      message: {
                                          ...parsedMessage,
                                          value: '',
                                      },
                                  }) as Data
                        );
                    });
            } else {
                resolve({
                    type: 'input',
                    name,
                    email,
                    message,
                } as Data);
            }
        } catch (error) {
            console.error(error);
            resolve({
                type: 'failed',
                error: (error as Error).message,
            } as Data);
        }
    });
