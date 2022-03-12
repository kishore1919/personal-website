import dotenv from 'dotenv';
dotenv.config();

export const contactConfig = {
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS,
};
