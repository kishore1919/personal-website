const express = require('express');
const router = express.Router(); 
const fs = require('fs');
const fetch = require('node-fetch');

const email = 'poolofdeath201@outlook.com';
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMPTY_STRING = '';
const ALL = 'All';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: email,
        pass: 'Qh9ehdDdyzTTRg9'
    }
});

const socialLinks = [
    { link: 'https://www.linkedin.com/in/gervin-fung-387409209/', class: 'fab fa-linkedin-in' },
    { link: 'https://www.facebook.com/GervinFung', class: 'fab fa-facebook-f' },
    { link: 'https://www.instagram.com/poolofdeath20/', class: 'fab fa-instagram' },
    { link: 'mailto:gervinfungdaxuen@gmail.com"', class: 'fab fa-google' },
    { link: 'https://github.com/GervinFung/Room', class: 'fab fa-github' }
];

const iconSize = [128,144,152,192,256,512];

const numberOfPortfolioPerPage = 9;
const portfolioDataPromise = readPortfolio();
const githubAPI = fetchGithubAPI();

// Routing 
router.get('/', (req, res) => {
    const style = ['index/index.css', 'index/tictactoe.css'];
    const js = ['Connect4JS/board/Board.js', 'index/connect4.js', 'TicTacToe/board/Board.js', 'index/tictactoe.js'];
    const module = true;
    res.status(200).render('pages/index', {
        title:'Home Page',
        iconSize,
        style, js, module,
        description:'PoolOfDeath20 or Gervin\'s home page',
        socialLinks
    });
});

router.get('/about', (req, res) => {
    const style = ['about.css'];
    res.status(200).render('pages/about', {
        title:'About Me',
        style,
        iconSize,
        description:'Everything you need to know about PoolOfDeath20 or Gervin can be found here',
        socialLinks
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
        socialLinks
    });
});


router.post('/contact', (req, res) => {
    const body = req.body;
    const name = body.name;
    const senderEmail = body.email;
    const message = body.message;

    const emailErr = validateEmail(senderEmail);
    const nameErr = validateName(name);
    const messageErr = validateMsg(message);

    if (messageErr.length === 0 && emailErr.length === 0 && nameErr.length === 0) {
        const options = {
            from:  `${name} <${email}>`,
            to: `Gervin Fung Da Xuen <${email}>`,
            subject: 'Personal Website Contact Form',
            text: `Hello, my name is ${name}.\n\nYou can reach me at ${senderEmail}.\n\nI would like to ${message}`
        }
    
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.error(error);
                res.status(200).json({
                    status: 'fail'
                });
            } else {
                console.log('succeed');
                res.status(200).json({
                    status: 'success'
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

function checkForBlankString(string) {
    let j = 0;
    const length = string.length;
    for (let i = 0; i < length; i++) {
        if (EMPTY_STRING === string.charAt(i)) {
            j++;
        }
    }
    return length === j;
}

function validateEmail(senderEmail) {
    if (undefined === senderEmail || 0 === senderEmail.length) {
        return '*Please do not leave email section empty*';
    }
    if (REGEX_EMAIL.test(senderEmail)) {
        return EMPTY_STRING;
    } else {
        return '*Please enter valid email format*';
    }
}

function validateMsg(msg) {
    if (undefined === msg || 0 === msg.length) {
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
}

function validateName(visitorName) {
    if (undefined === visitorName || 0 === visitorName.length) {
        return '*Please do not leave name section empty*';
    } else if (checkForBlankString(visitorName)) {
        return '*Please do not leave name section blank*';
    } else {
        return EMPTY_STRING;
    }
}

router.get('/portfolio', (req, res) => {
    const style = ['portfolio.css'];
    const js = ['portfolio.js'];
    githubAPI.then(github => {
        const pageNum = validatePageNumQuery(req.query.page);
        const portfolioLang = validatePortfolioLanguageQuery(github, req.query.language);
        portfolioDataPromise.then((portfolioData) => {
            const portfolioLangQueried = getPortfolioLanguageQuery(portfolioLang, github, portfolioData);
            const totalNumberOfPortfolio = portfolioLangQueried.length;
            const portfolioQueried = getPageNumQuery(pageNum, portfolioLangQueried, totalNumberOfPortfolio);
            const numberOfPage = Math.ceil(totalNumberOfPortfolio / numberOfPortfolioPerPage);
            const languages = getLanguageSelector(github, portfolioData);
            res.status(200).render('pages/portfolio', {
                title:'Portfolio',
                style, js,
                iconSize,
                description:'PoolOfDeath20 or Gervin\'s repositories on github, the portfolio page',
                socialLinks,
                portfolioQueried, portfolioLang, numberOfPage, languages
            });
        });
    });
});

function getLanguageSelector(github, portfolioData) {
    const languages = [];
    languages.push(ALL);
    portfolioData.forEach(portfolio => {
        const name = portfolio.path;
        github.forEach(git => {
            if (git.name === name && !languages.includes(git.language)) {
                languages.push(git.language);
            };
        });
    })
    return Object.freeze(languages);
}

function getPortfolioLanguageQuery(portfolioLang, github, portfolioData) {
    if (portfolioLang === ALL) {
        return Object.freeze(portfolioData);
    }
    const portfolioQueried = [];
    portfolioData.forEach(portfolio => {
        const name = portfolio.path;
        github.forEach(git => {
            if (git.name === name && git.language === portfolioLang) {
                portfolioQueried.push(portfolio);
            };
        });
    })
    return Object.freeze(portfolioQueried);
}

function fetchGithubAPI() {
    return new Promise((resolve, reject) => {
        resolve(fetch('https://api.github.com/users/GervinFung/repos'));
    }).then(res => {
        return Object.freeze(res.json());
    });
}

function validatePageNumQuery(portfolio) {
    if (portfolio === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (parseInt(portfolio) >= 0) {
        return parseInt(portfolio) * numberOfPortfolioPerPage;
    }
    return 0;
}

function validatePortfolioLanguageQuery(github, language) {
    if (language === null) {
        throw new Error('Portfolio query/param cannot be null');
    }
    if (language === undefined) {
        return ALL;
    }
    const finalisedLang = language === 'CPP' ? 'C++' : language;
    for (let i = 0; i < github.length; i++) {
        if (github[i].language === finalisedLang) {
            return finalisedLang
        };
    }
    return ALL;
}

function getPageNumQuery(param, portfolioData, totalNumberOfPortfolio) {
    const portfolioQueried = [];
    for (let i = param; i < totalNumberOfPortfolio; i++) {
        portfolioQueried.push(portfolioData[i]);
        if (i - param === 8) {
            return Object.freeze(portfolioQueried);
        }
    }
    return Object.freeze(portfolioQueried);
}

function readPortfolio(){
    const filename = 'public/files/portfolio.txt';
    return new Promise((resolve, reject) => {
        const fetchData = [];
        fs.createReadStream(filename).on('data', data => {
            data.toString().split('\n').forEach(stringData => {
                const commaSplit = stringData.toString().split(',');
                fetchData.push({
                    path: commaSplit[0],
                    caption: commaSplit[1].replace('\r', '')
                });
            })
        }).on('end', () => {
            resolve(Object.freeze(fetchData));
        }).on('error', reject)
    })
}

router.get('/resume', (req, res) => {
    const style = ['resume.css'];
    res.status(200).render('pages/resume', {
        title:'Resume',
        style,
        iconSize,
        description:'PoolOfDeath20 or Gervin\'s resume page',
        socialLinks
    });
});

module.exports = router;