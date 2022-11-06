import axios from 'axios';

type RequestInit = Parameters<typeof fetch>[1];

const jsonResponse = async ({
    requestInit,
    param,
}: Readonly<{
    requestInit: RequestInit;
    param: string;
}>) => {
    const method = requestInit?.method;
    const url = `http://0.0.0.0:3000/api/${param}`;
    const config = {
        responseType: 'json',
        headers: {
            'content-type': 'application/json',
        },
    } as const;
    switch (method?.toLowerCase()) {
        case 'get': {
            return (await axios.get(url, config)).data;
        }
        case 'post': {
            return (
                await axios.post(url, {
                    body: requestInit?.body,
                    ...config,
                })
            ).data;
        }
        default: {
            throw new Error(`Unknown method of ${method}`);
        }
    }
};

export default jsonResponse;
