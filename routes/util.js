import { createReadStream } from 'fs';
import fetch from 'node-fetch';

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMPTY_STRING = '';
const ALL = 'All';

const readPortfolio = () => {
    const filename = 'public/files/portfolio.txt';
    return new Promise((resolve, reject) => {
        const fetchData = [];
        createReadStream(filename).on('data', data => {
            data.toString().split('\n').forEach(stringData => {
                const commaSplit = stringData.toString().split(',');
                fetchData.push({
                    path: commaSplit[0],
                    caption: commaSplit[1].replace('\r', ''),
                });
            });
        }).on('end', () => {
            resolve(Object.freeze(fetchData));
        }).on('error', reject);
    });
};

const fetchGithubAPI = async () => {
    const res = await new Promise((resolve, reject) => resolve(fetch('https://api.github.com/users/GervinFung/repos')));
    return await Object.freeze(res.json());
};

const checkForBlankString = (string) => string.split('').filter((char) => EMPTY_STRING === char).length === string.length;

const validateEmail = (senderEmail) => {
    if (undefined === senderEmail || senderEmail.length === 0) {
        return '*Please do not leave email section empty*';
    }
    if (REGEX_EMAIL.test(senderEmail)) {
        return EMPTY_STRING;
    } else {
        return '*Please enter valid email format*';
    }
};

const validateMsg = (msg) => {
    if (undefined === msg || msg.length === 0) {
        return '*Please do not leave message section empty*';
    } else if (checkForBlankString(msg)) {
        return '*Please do not leave message section blank*';
    } else {
        if (msg.length < 10) {
            return '*At least 10 words are required*';
        } else {
            return EMPTY_STRING;
        }
    }
};

const validateName = (visitorName) => {
    if (undefined === visitorName || visitorName.length === 0) {
        return '*Please do not leave name section empty*';
    } else if (checkForBlankString(visitorName)) {
        return '*Please do not leave name section blank*';
    } else {
        return EMPTY_STRING;
    }
};

const getLanguageSelector = (github, portfolioData) => {
    const languages = [];
    languages.push(ALL);
    portfolioData.forEach(portfolio => {
        const name = portfolio.path;
        github.forEach(git => {
            if (git.name === name && !languages.includes(git.language)) {
                languages.push(git.language);
            }
        });
    });
    return Object.freeze(languages);
};

const getPortfolioLanguageQuery = (portfolioLang, github, portfolioData) => {
    if (portfolioLang === ALL) {
        return Object.freeze(portfolioData);
    }
    const portfolioQueried = [];
    portfolioData.forEach(portfolio => {
        const name = portfolio.path;
        github.forEach(git => {
            if (git.name === name && git.language === portfolioLang) {
                portfolioQueried.push(portfolio);
            }
        });
    });
    return Object.freeze(portfolioQueried);
};

const validatePageNumQuery = (portfolio) => {
    if (portfolio === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (parseInt(portfolio, 10) >= 0) {
        return parseInt(portfolio, 10) * numberOfPortfolioPerPage;
    }
    return 0;
};

const validatePortfolioLanguageQuery = (github, language) => {
    if (language === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (language === undefined) {
        return ALL;
    }
    const finalisedLang = language === 'CPP' ? 'C++' : language;
    for (let i = 0; i < github.length; i++) {
        if (github[i].language === finalisedLang) {
            return finalisedLang;
        }
    }
    return ALL;
};

const getPageNumQuery = (param, portfolioData, totalNumberOfPortfolio) => {
    const portfolioQueried = [];
    for (let i = param; i < totalNumberOfPortfolio; i++) {
        portfolioQueried.push(portfolioData[i]);
        if (i - param === 8) {
            return Object.freeze(portfolioQueried);
        }
    }
    return Object.freeze(portfolioQueried);
};

export const numberOfPortfolioPerPage = 9;
export const portfolioDataPromise = readPortfolio();
export const githubAPI = fetchGithubAPI();
export { validateEmail, validateName, validateMsg, validatePageNumQuery, validatePortfolioLanguageQuery, getPortfolioLanguageQuery, getPageNumQuery, getLanguageSelector, }
