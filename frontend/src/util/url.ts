const serverURL = '/api';
export const portfolioURL = `${serverURL}/portfolio`;
export const contactURL = `${serverURL}/contact`;
export const portfolioQuery = (page: number, language: string) =>
    `${serverURL}/portfolio?page=${page}&language=${language}`;
