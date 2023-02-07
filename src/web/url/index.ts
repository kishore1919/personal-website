import type { QueryParams } from '../../common/project';

const url = (() => {
    const api = '/api';
    return {
        contact: `${api}/contact`,
    } as const;
})();

const projectQuery = (queryParams: QueryParams) =>
    Object.entries(queryParams).reduce((prev, [key, value]) => {
        if (!value) {
            return prev;
        }
        const pair = `${key}=${encodeURIComponent(value)}`;
        return !prev ? pair : `${prev}&${pair}`;
    }, '');

export { url, projectQuery };
