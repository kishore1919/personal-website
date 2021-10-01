const contactUtil = Object.freeze({
    messageEmptyErr: '*Please do not leave message section empty*',
    messageBlankErr: '*Please do not leave message section blank*',
    messageLessThanTenWordsErr: '*At least 10 words are required*',

    nameEmptyErr: '*Please do not leave name section empty*',
    nameBlankErr: '*Please do not leave name section blank*',

    emailEmptyErr: '*Please do not leave email section empty*',
    emailInvalidErr: '*Please enter valid email format*',
    regexEmail: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    emptyString: '',
    blankString: ' ',
});

const checkForBlankString = (string) => string.split('').filter(char => contactUtil.blankString === char).length === string.length;
const checkStringNullOrUndefined = (string) => undefined === string || string === null;
const checkForEmptyString = (string) => string.length === 0;
const sufficientMessageLength = (message) => message.length > 10;
const validateEmail = (email) => contactUtil.regexEmail.test(email);

export const status = Object.freeze({
    succeed: 'succeed',
    failed: 'failed',
    input: 'input'
});

export const getNameError = (name) => {
    const { nameEmptyErr, nameBlankErr, emptyString } = contactUtil;
    if (checkStringNullOrUndefined(name) || checkForEmptyString(name)) {
        return nameEmptyErr;
    } else if (checkForBlankString(name)) {
        return nameBlankErr;
    } return emptyString;
};

export const getEmailError = (email) => {
    const { emailEmptyErr, emailInvalidErr, emptyString } = contactUtil;
    if (checkStringNullOrUndefined(email) || checkForEmptyString(email)) {
        return emailEmptyErr;
    } else if (validateEmail(email)) {
        return emptyString;
    } return emailInvalidErr;
};

export const getMessageError = (message) => {
    const { messageEmptyErr, messageBlankErr, messageLessThanTenWordsErr, emptyString } = contactUtil;
    if (checkStringNullOrUndefined(message) || checkForEmptyString(message)) {
        return messageEmptyErr;
    } else if (checkForBlankString(message)) {
        return messageBlankErr;
    } else if (sufficientMessageLength(message)) {
        return emptyString;
    } return messageLessThanTenWordsErr;
};

export const allValueValid = (name, email, message, nameErr, emailErr, messageErr) => {
    const noError = checkForEmptyString(nameErr) && checkForEmptyString(emailErr) && checkForEmptyString(messageErr);
    const nameInvalid = checkStringNullOrUndefined(name) || checkForBlankString(name) || checkForEmptyString(name);
    const messageInvalid = checkStringNullOrUndefined(message) || checkForBlankString(message) || checkForEmptyString(message) || !sufficientMessageLength(message);
    const inputValid = messageInvalid && validateEmail(email) && !nameInvalid;
    return noError && !inputValid;
};