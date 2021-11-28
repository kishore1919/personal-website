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

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

app.use(
    bodyParser({
        jsonLimit: '10mb',
    })
);

app.listen(process.env.PORT || 8080).on('error', console.error);
app.use(router.routes()).use(router.allowedMethods());

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

router.get('/api/portfolio', async (context, next) => {
    const { request, response } = context;
    if (request.method === 'GET') {
        const all = 'All';
        const numberOfPortfolioPerPage = 9;
        const page = request.query.page;
        const language = request.query.language;
        if (typeof page === 'string' && typeof language === 'string') {
            const paging = validatePageQuery({
                numberOfPortfolioPerPage,
                page,
            });
            response.body = await returnResponse({
                all,
                language,
                numberOfPortfolioPerPage,
                pageNumber: paging,
            });
        } else {
            response.body = await returnResponse({
                all,
                language: all,
                numberOfPortfolioPerPage,
                pageNumber: 0,
            });
        }
    } else {
        throw new Error('Only accept GET request');
    }
    await next();
});

router.post('/api/contact', async (context, next) => {
    const { request, response } = context;
    if (request.method === 'POST') {
        const body = request.body;
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
            const data: Data = await new Promise((resolve) => {
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
                    .sendMail(options, (error) => {
                        resolve(
                            error
                                ? {
                                      type: 'failed',
                                  }
                                : {
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
                                  }
                        );
                    });
            });
            response.body = data;
        } else {
            response.body = {
                type: 'input',
                name,
                email,
                message,
            } as Data;
        }
    } else {
        throw new Error('Only accept POST request');
    }
    await next();
});

const build = path.resolve('../frontend/build');
app.use(koaStatic(build));
