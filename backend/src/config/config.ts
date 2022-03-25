import dotenv from 'dotenv';
dotenv.config();

const contactConfig = {
    email: process.env.EMAIL,
    pass: process.env.PASS,
};

export default contactConfig;
