import parse from 'parse-dont-validate';

const links = {
    gmail: 'gervinfungdaxuen@gmail.com',
    github: 'https://github.com/GervinFung',
    facebook: 'https://www.facebook.com/GervinFung',
    instagram: 'https://www.instagram.com/poolofdeath20',
    linkedin: 'https://www.linkedin.com/in/gervin-fung-387409209',
    domain: parse(process.env.NEXT_PUBLIC_ORIGIN)
        .asString()
        .elseThrow('NEXT_PUBLIC_ORIGIN is not a string'),
} as const;

export default links;
