import express from 'express';
import {
    githubAPI,
    portfolioDataPromise,
    queryLanguageSelector,
    queryPortfolioForPaging,
    queryPortfolio,
    validatePageQuery,
    validatePortfolioLanguageQuery,
} from './util/portfolio.js';
import {
    getName,
    getEmail,
    getMessage,
    allValueValid,
    Data,
} from './util/contact.js';
import nodemailer from 'nodemailer';
import path from 'path';
import compression from 'compression';

const { static: expressStatic, json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 8080;

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));
app.listen(port, () => console.log(`listening at port ${port}`));
app.use(compression());

const returnResponse = async ({
    all,
    language,
    numberOfPortfolioPerPage,
    pageNumber,
}: {
    readonly pageNumber: number;
    readonly numberOfPortfolioPerPage: number;
    readonly all: 'All';
    readonly language: string;
}) => {
    const github = await githubAPI;

    const selectedLanguage = validatePortfolioLanguageQuery({
        all,
        github,
        language,
    });
    const portfolioData = await portfolioDataPromise;
    const portfolioQueried = queryPortfolio({
        all,
        github,
        portfolioData,
        selectedLanguage,
    });

    const portfolioForPagingQueried = queryPortfolioForPaging({
        pageNumber,
        portfolioData: portfolioQueried,
    });
    const numberOfPagesQueried = Math.ceil(
        portfolioQueried.length / numberOfPortfolioPerPage
    );

    const portfolioLanguageQueried = queryLanguageSelector({
        all,
        github,
        portfolioData,
    });
    return {
        numberOfPagesQueried,
        portfolioLanguageQueried,
        portfolioForPagingQueried,
        selectedLanguage,
    };
};

app.get('/api/portfolio', async (req, res) => {
    if (req.method === 'GET') {
        const all = 'All';
        const numberOfPortfolioPerPage = 9;
        const page = req.query.page;
        const language = req.query.language;
        if (typeof page === 'string' && typeof language === 'string') {
            const paging = validatePageQuery({
                numberOfPortfolioPerPage,
                page,
            });
            res.status(200).json(
                await returnResponse({
                    all,
                    language,
                    numberOfPortfolioPerPage,
                    pageNumber: paging,
                })
            );
        } else {
            res.status(200).json(
                await returnResponse({
                    all,
                    language: all,
                    numberOfPortfolioPerPage,
                    pageNumber: 0,
                })
            );
        }
    } else {
        throw new Error('Only accept GET request');
    }
});

app.post('/api/contact', (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;
        const name = getName(body.name);
        const email = getEmail(body.email);
        const message = getMessage(body.message);

        if (allValueValid(name, email, message)) {
            const myEmail = 'poolofdeath201@outlook.com';
            const options = {
                from: `${name.value} <${myEmail}>`,
                to: `Gervin Fung Da Xuen <${myEmail}>`,
                subject: 'Personal Website Contact Form',
                text: `Hello, my name is ${name.value}\n\nYou can reach me at ${email.value}\n\nI would like to ${message.value}`,
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
                        pass: 'Qh9ehdDdyzTTRg9a',
                    },
                })
                .sendMail(options, (error, info) => {
                    if (error) {
                        console.log(error.stack);
                        const failed: Data = {
                            type: 'failed',
                        };
                        res.status(200).json(failed);
                    } else {
                        console.log(info);
                        const succeed: Data = {
                            type: 'succeed',
                            name: {
                                ...name,
                                value: '',
                            },
                            email: {
                                ...email,
                                value: '',
                            },
                            message: {
                                ...message,
                                value: '',
                            },
                        };
                        res.status(200).json(succeed);
                    }
                });
        } else {
            const input: Data = {
                type: 'input',
                name,
                email,
                message,
            };
            res.status(200).json(input);
        }
    } else {
        throw new Error('Only accept POST request');
    }
});

const build = '../frontend/build';
app.use(expressStatic(path.resolve(build)));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
});
