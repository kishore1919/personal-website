import dotenv from 'dotenv';
dotenv.config();

export const contactInfo = {
    email: process.env.EMAIL,
    pass: process.env.PASS,
} as const;
