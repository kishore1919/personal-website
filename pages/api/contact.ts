import { parseAsString } from 'parse-dont-validate';
import Database from '../../src/api/contact/database';
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
                name: parsedName,
                email: parsedEmail,
                message: parsedMessage,
            } as Data);
        } else {
            const database = await Database.instance();
            const result: Data = await database
                .insertContactFormMessage({
                    name: parsedName.value,
                    email: parsedEmail.value,
                    message: parsedMessage.value,
                })
                .then(
                    () =>
                        ({
                            type: 'succeed',
                        } as const)
                )
                .catch(
                    () =>
                        ({
                            type: 'failed',
                        } as const)
                );
            response.status(result.type === 'succeed' ? 200 : 500).json(result);
        }
    }
};

export default contact;
