import express from 'express';
import * as util from './util.js';
import nodemailer from 'nodemailer';

const socialLinks = [
    { link: 'https://www.linkedin.com/in/gervin-fung-387409209/', class: 'fab fa-linkedin-in' },
    { link: 'https://www.facebook.com/GervinFung', class: 'fab fa-facebook-f' },
    { link: 'https://www.instagram.com/poolofdeath20/', class: 'fab fa-instagram' },
    { link: 'mailto:gervinfungdaxuen@gmail.com"', class: 'fab fa-google' },
    { link: 'https://github.com/GervinFung/Room', class: 'fab fa-github' }
];

const iconSize = [128,144,152,192,256,512];

const router = express.Router();
const email = 'poolofdeath201@outlook.com';
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
       ciphers:'SSLv3',
    },
    auth: {
        user: email,
        pass: 'Qh9ehdDdyzTTRg9',
    },
});

// Routing
router.get('/', (req, res) => {
    const style = ['index/index.css', 'index/tictactoe.css'];
    const js = ['Connect4JS/board/Board.js', 'index/connect4.js', 'TicTacToe/board/Board.js', 'index/tictactoe.js', 'index/index.js'];
    const module = true;
    res.status(200).render('pages/index', {
        title:'Home Page',
        iconSize,
        style, js, module,
        description:'PoolOfDeath20 or Gervin\'s home page',
        socialLinks,
    });
});

router.get('/about', (req, res) => {
    const style = ['about.css'];
    res.status(200).render('pages/about', {
        title:'About Me',
        style,
        iconSize,
        description:'Everything you need to know about PoolOfDeath20 or Gervin can be found here',
        socialLinks,
    });
});

router.get('/contact', (req, res) => {
    const style = ['contact.css'];
    const js = ['contact.js'];
    res.status(200).render('pages/contact', {
        title:'Contact Me',
        style, js,
        iconSize,
        description:'PoolOfDeath20 or Gervin\'s contact page. Come to this page to contact him',
        socialLinks,
    });
});


router.post('/contact', (req, res) => {
    const body = req.body;
    const name = body.name;
    const senderEmail = body.email;
    const message = body.message;

    const emailErr = util.validateEmail(senderEmail);
    const nameErr = util.validateName(name);
    const messageErr = util.validateMsg(message);

    if (messageErr.length === 0 && emailErr.length === 0 && nameErr.length === 0) {
        const options = {
            from:  `${name} <${email}>`,
            to: `Gervin Fung Da Xuen <${email}>`,
            subject: 'Personal Website Contact Form',
            text: `Hello, my name is ${name}.\n\nYou can reach me at ${senderEmail}.\n\nI would like to ${message}`,
        };

        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.error(error);
                res.status(200).json({
                    status: 'fail',
                });
            } else {
                console.log('succeed');
                res.status(200).json({
                    status: 'success',
                });
            }
        });
    } else {
        res.json({
            status: 'input',
            messageErr: messageErr,
            nameErr: nameErr,
            emailErr: emailErr,
        });
    }

});

router.get('/portfolio', (req, res) => {
    const style = ['portfolio.css'];
    const js = ['portfolio.js'];

    const githubAPI = util.githubAPI;
    const portfolioDataPromise = util.portfolioDataPromise;
    const numberOfPortfolioPerPage = util.numberOfPortfolioPerPage;

    githubAPI.then(github => {
        const pageNum = util.validatePageNumQuery(req.query.page);
        const portfolioLang = util.validatePortfolioLanguageQuery(github, req.query.language);
        portfolioDataPromise.then((portfolioData) => {
            const portfolioLangQueried = util.getPortfolioLanguageQuery(portfolioLang, github, portfolioData);
            const totalNumberOfPortfolio = portfolioLangQueried.length;
            const portfolioQueried = util.getPageNumQuery(pageNum, portfolioLangQueried, totalNumberOfPortfolio);
            const numberOfPage = Math.ceil(totalNumberOfPortfolio / numberOfPortfolioPerPage);
            const languages = util.getLanguageSelector(github, portfolioData);
            res.status(200).render('pages/portfolio', {
                title:'Portfolio',
                style, js,
                iconSize,
                description:'PoolOfDeath20 or Gervin\'s repositories on github, the portfolio page',
                socialLinks,
                portfolioQueried, portfolioLang, numberOfPage, languages,
            });
        });
    });
});

router.get('/resume', (req, res) => {
    const style = ['resume.css', 'font/Montserrat/stylesheet.css'];
    res.status(200).render('pages/resume', {
        title:'Resume',
        style,
        iconSize,
        description:'PoolOfDeath20 or Gervin\'s resume page',
        socialLinks,
    });
});

export default router;
