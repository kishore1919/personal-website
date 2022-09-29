import { parseAsStringEnv } from 'esbuild-env-parsing';
import nodemailer from 'nodemailer';
import { parseAsString } from 'parse-dont-validate';
import cors from '../../src/api/cors';
import { EndPointFunc } from '../../src/api/endpoint';
import {
    isAllValueValid,
    Data,
    getEmail,
    getMessage,
    getName,
} from '../../src/common/contact';

const contact: EndPointFunc<Data> = async (req, res) => {
    await cors<Data>()(req, res);
    if (req.method !== 'POST') {
        res.status(404).json('Only accept POST request');
    } else {
        const { body } = req;
        const { name, email, message } = body;
        const parsedName = getName(parseAsString(name).orElseGetEmptyString());
        const parsedEmail = getEmail(
            parseAsString(email).orElseGetEmptyString()
        );
        const parsedMessage = getMessage(
            parseAsString(message).orElseGetEmptyString()
        );
        if (
            !isAllValueValid({
                name: parsedName,
                email: parsedEmail,
                message: parsedMessage,
            })
        ) {
            res.status(200).json({
                type: 'input',
                name: parsedName,
                email: parsedEmail,
                message: parsedMessage,
            } as Data);
        } else {
            const email = parseAsStringEnv({
                env: process.env.EMAIL,
                name: 'email',
            });
            const pass = parseAsStringEnv({
                env: process.env.PASS,
                name: 'pass',
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
                    res.status(200).json(
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
