import config from '../../../test/config';

const url = (() => {
    const api = `${
        process.env.NEXT_PUBLIC_NODE_ENV !== 'test' ? '' : config().baseUrl
    }/api`;
    return {
        contact: `${api}/contact`,
    } as const;
})();

export { url };
