import {
    parseAsCustom,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import type { Data, Email, Message, Name } from '../../common/contact';

const parseAsData = (data: any): Data => {
    const type = parseAsCustom<Data['type'], Error>({
        value: data.type,
        predicate: (type) =>
            type === 'succeed' || type === 'input' || type === 'failed',
        ifParsingFailThen: 'throw',
        message: 'type is not type of Data[type]',
    });
    switch (type) {
        case 'succeed': {
            return {
                type,
            };
        }
        case 'failed': {
            const { error } = data;
            return {
                type,
                error: parseAsString({
                    string: error,
                    ifParsingFailThen: 'throw',
                    message: 'error is not a string',
                }),
            };
        }
        case 'input': {
            const { message, email, name } = data;
            return {
                type,
                message: parseAsMessage(message),
                email: parseAsEmail(email),
                name: parseAsName(name),
            };
        }
    }
};

const parseAsInfo = (info: unknown) =>
    parseAsReadonlyObject({
        object: info,
        ifParsingFailThen: 'throw',
        message: 'info is not an object',
        parse: (info) => ({
            value: parseAsString({
                string: info.value,
                ifParsingFailThen: 'throw',
                message: 'value is not a string',
            }),
            error: parseAsString({
                string: info.error,
                ifParsingFailThen: 'throw',
                message: 'error is not a string',
            }),
        }),
    });

const parseAsName = (name: unknown): Name => {
    const { value, error } = parseAsInfo(name);
    return {
        value,
        error: parseAsCustom({
            value: error,
            ifParsingFailThen: 'throw',
            message: 'error is not type of error in Name',
            predicate: (error) =>
                error === '' ||
                error === '*Please do not leave name section empty*' ||
                error === '*Please do not leave name section blank*',
        }),
    };
};

const parseAsEmail = (email: unknown): Email => {
    const { value, error } = parseAsInfo(email);
    return {
        value,
        error: parseAsCustom({
            value: error,
            ifParsingFailThen: 'throw',
            message: 'error is not typeof error in Email',
            predicate: (error) =>
                error === '' ||
                error === '*Please do not leave email section empty*' ||
                error === '*Please do not leave email section blank*' ||
                error === '*Please enter valid email format*',
        }),
    };
};

const parseAsMessage = (message: unknown): Message => {
    const { value, error } = parseAsInfo(message);
    return {
        value,
        error: parseAsCustom({
            value: error,
            ifParsingFailThen: 'throw',
            message: 'error is not typeof error in Email',
            predicate: (error) =>
                error === '' ||
                error === '*Please do not leave message section empty*' ||
                error === '*Please do not leave message section blank*' ||
                error === '*At least 7 words are required*',
        }),
    };
};

export default parseAsData;
