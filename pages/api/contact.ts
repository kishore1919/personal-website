import nodemailer from 'nodemailer';
import { parseAsString } from 'parse-dont-validate';
import cors from '../../src/api/cors';
import type { EndPointFunc } from '../../src/api/endpoint';
import type { Data } from '../../src/common/contact';
import {
    getName,
    getEmail,
    getMessage,
    isAllValueValid,
} from '../../src/common/contact';

const contact: EndPointFunc<Data> = async (request, response) => {
    await cors<Data>()(request, response);
    if (request.method !== 'POST') {
        response.status(404).json('Only accept POST request');
    } else {
        const { body } = request;
        const { name, email, message } = body;
        const parsedName = getName(
            parseAsString({
                string: name,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        const parsedEmail = getEmail(
            parseAsString({
                string: email,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        const parsedMessage = getMessage(
            parseAsString({
                string: message,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        if (
            !isAllValueValid({
                name: parsedName,
                email: parsedEmail,
                message: parsedMessage,
            })
        ) {
            response.status(200).json({
                type: 'input',
                body,
                shit2: typeof body,
                name: parsedName,
                email: parsedEmail,
                message: parsedMessage,
            } as Data);
        } else {
            const email = parseAsString({
                string: process.env.EMAIL,
                ifParsingFailThen: 'throw',
                message: 'EMAIL is not a stirng',
            });
            const pass = parseAsString({
                string: process.env.PASS,
                ifParsingFailThen: 'throw',
                message: 'PASS is not a stirng',
            });
            const options = {
                from: `${parsedName.value.trim()} <${email}>`,
                to: `Gervin Fung Da Xuen <${email}>`,
                subject: 'My Web Contact Form',
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
                        user: email,
                        pass,
                    },
                })
                .sendMail(options, (error) =>
                    response.status(200).json(
                        (!error
                            ? {
                                  type: 'succeed',
                              }
                            : {
                                  type: 'failed',
                                  error: error.message,
                              }) as Data
                    )
                );
        }
    }
};

export default contact;
