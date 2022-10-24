import {
    parseAsCustomType,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import type { Data, Email, Message, Name } from '../../common/contact';

const parseAsData = (data: any): Data => {
    const type = parseAsCustomType<Data['type']>(
        data.type,
        (type) => type === 'succeed' || type === 'input' || type === 'failed'
    ).elseThrow('type is not type of Data[type]');
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
                error: parseAsString(error).elseThrow('error is not a string'),
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
    parseAsReadonlyObject(info, (info) => ({
        value: parseAsString(info.value).elseThrow('value is not a string'),
        error: parseAsString(info.error).elseThrow('error is not a string'),
    })).elseThrow('info is not an object');

const parseAsName = (name: unknown): Name => {
    const { value, error } = parseAsInfo(name);
    return {
        value,
        error: parseAsCustomType<Name['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave name section empty*' ||
                error === '*Please do not leave name section blank*'
        ).elseThrow('error is not type of error in Name'),
    };
};

const parseAsEmail = (email: unknown): Email => {
    const { value, error } = parseAsInfo(email);
    return {
        value,
        error: parseAsCustomType<Email['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave email section empty*' ||
                error === '*Please do not leave email section blank*' ||
                error === '*Please enter valid email format*'
        ).elseThrow('error is not typeof error in Email'),
    };
};

const parseAsMessage = (message: unknown): Message => {
    const { value, error } = parseAsInfo(message);
    return {
        value,
        error: parseAsCustomType<Message['error']>(
            error,
            (error) =>
                error === '' ||
                error === '*Please do not leave message section empty*' ||
                error === '*Please do not leave message section blank*' ||
                error === '*At least 10 words are required*'
        ).elseThrow('error is not typeof error in Email'),
    };
};

export default parseAsData;
