const api = '/api';
export const portfolioURL = `${api}/portfolio`;
export const contactURL = `${api}/contact`;
export const portfolioQuery = (page: number, language: string) =>
    `${portfolioURL}?page=${page}&language=${language}`;
