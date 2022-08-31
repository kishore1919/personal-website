import fetch from 'node-fetch';

type RequestInit = Parameters<typeof fetch>[1];

const jsonResponse = async ({
    requestInit,
    param,
}: Readonly<{
    requestInit: RequestInit;
    param: string;
}>) =>
    await (
        await fetch(`http://localhost:3000/api/${param}`, {
            ...requestInit,
            headers: {
                'content-type': 'application/json',
            },
        })
    ).json();

export default jsonResponse;
