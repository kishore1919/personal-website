import { parseAsStringEnv } from 'esbuild-env-parsing';
import express from 'express';
import nodemailer from 'nodemailer';
import { parseAsString } from 'parse-dont-validate';
import {
    isAllValueValid,
    Data,
    getEmail,
    getMessage,
    getName,
    defaultValue,
} from '../../../common/src/contact';

const contactRouter = (app: express.Application) => ({
    sendEmail: () =>
        app.post('/api/contact', (req, res) => {
            if (req.method !== 'POST') {
                res.status(404).json('Only accept POST request');
            } else {
                const { body } = req;
                const { name, email, message } = body;
                const parsedName = getName(
                    parseAsString(name).orElseGetEmptyString()
                );
                const parsedEmail = getEmail(
                    parseAsString(email).orElseGetEmptyString()
                );
                const parsedMessage = getMessage(
                    parseAsString(message).orElseGetEmptyString()
                );
                if (isAllValueValid(parsedName, parsedEmail, parsedMessage)) {
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
                                (error
                                    ? {
                                          type: 'failed',
                                          error: error.message,
                                      }
                                    : {
                                          type: 'succeed',
                                          name: defaultValue,
                                          email: defaultValue,
                                          message: defaultValue,
                                      }) as Data
                            )
                        );
                } else {
                    res.status(200).json({
                        type: 'input',
                        name,
                        email,
                        message,
                    } as Data);
                }
            }
        }),
});

export default contactRouter;
