import { parseAsString, parseAsBoolean } from 'parse-dont-validate';
import Database from '../../src/api/database';
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

        const responseSucceed = {
            type: 'succeed',
        } as const;

        if (
            parseAsBoolean({
                boolean: body.isHoneyPot,
                ifParsingFailThen: 'get',
                alternativeValue: false,
            })
        ) {
            return response.status(200).json(responseSucceed);
        }

        const name = getName(
            parseAsString({
                string: body.name,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        const email = getEmail(
            parseAsString({
                string: body.email,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        const message = getMessage(
            parseAsString({
                string: body.message,
                ifParsingFailThen: 'get',
                alternativeValue: '',
            })
        );
        if (
            !isAllValueValid({
                name,
                email,
                message,
            })
        ) {
            response.status(200).json({
                type: 'input',
                name,
                email,
                message,
            } as Data);
        } else {
            const database = await Database.instance();
            const result: Data = await database
                .insertContactFormMessage({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                })
                .then(() => responseSucceed)
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
