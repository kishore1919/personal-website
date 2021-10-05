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
    getNameError,
    getEmailError,
    getMessageError,
    allValueValid,
    status,
} from './util/contact.js';
import nodemailer from 'nodemailer';
import path from 'path';
import cors from 'cors';
import compression from 'compression';

const { static: expressStatic, json, urlencoded } = express;
const app = express();
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
app.use(cors());
app.use(compression());

const build = 'frontend/build';

app.use(expressStatic(path.resolve(build)));

const returnResponse = async (
    paging,
    numberOfPortfolioPerPage,
    all,
    language
) => {
    const github = await githubAPI;

    const selectedLanguage = validatePortfolioLanguageQuery(
        github,
        language,
        all
    );
    const portfolioData = await portfolioDataPromise;
    const portfolioQueried = queryPortfolio(
        selectedLanguage,
        github,
        portfolioData,
        all
    );
    const totalNumberOfPortfolio = portfolioQueried.length;

    const portfolioForPagingQueried = queryPortfolioForPaging(
        paging,
        portfolioQueried,
        totalNumberOfPortfolio
    );
    const numberOfPagesQueried = Math.ceil(
        totalNumberOfPortfolio / numberOfPortfolioPerPage
    );

    const portfolioLanguageQueried = queryLanguageSelector(
        github,
        portfolioData,
        all
    );
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
            const paging = validatePageQuery(page, numberOfPortfolioPerPage);
            const response = await returnResponse(
                paging,
                numberOfPortfolioPerPage,
                all,
                language
            );
            res.status(200).json(response);
        } else {
            const response = await returnResponse(
                0,
                numberOfPortfolioPerPage,
                all,
                all
            );
            res.status(200).json(response);
        }
    } else {
        throw new Error('Only accept GET request');
    }
});

const myEmail = 'poolofdeath201@outlook.com';

const transporter = nodemailer.createTransport({
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
});

app.post('/api/contact', (req, res) => {
    if (req.method === 'POST') {
        const body = req.body;
        const name = body.name;
        const email = body.email;
        const message = body.message;

        const emailError = getEmailError(email);
        const nameError = getNameError(name);
        const messageError = getMessageError(message);

        if (
            allValueValid(
                name,
                email,
                message,
                nameError,
                emailError,
                messageError
            )
        ) {
            const options = {
                from: `${name} <${myEmail}>`,
                to: `Gervin Fung Da Xuen <${myEmail}>`,
                subject: 'Personal Website Contact Form',
                text: `Hello, my name is ${name}.\n\nYou can reach me at ${email}.\n\nI would like to ${message}`,
            };

            transporter.sendMail(options, (error, info) => {
                if (error) {
                    console.error(error.message);
                    res.status(200).json({ type: status.failed });
                } else {
                    console.log(info);
                    res.status(200).json({ type: status.succeed });
                }
            });
        } else {
            res.json({
                type: status.input,
                messageErr: messageError,
                nameErr: nameError,
                emailErr: emailError,
            });
        }
    } else {
        throw new Error('Only accept POST request');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(build, 'index.html'));
});
