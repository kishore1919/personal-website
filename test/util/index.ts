import axios from 'axios';
import child from 'child_process';

const serverConfig = {
    port: 8080,
} as const;

class Server {
    private readonly port: number;

    private constructor() {
        this.port = serverConfig.port;
    }

    static create = () => new this();

    getPort = () => this.port;

    kill = () => {
        child.exec(`kill $(lsof -t -i:${this.port})`);
    };

    start = async () => {
        const server = child
            .exec(`make start arguments="-p ${this.port}"`)
            .on('spawn', () => console.log('spawned server'))
            .on('message', (message) => console.log(message.toString()))
            .on('error', console.error)
            .on('kill', () => {
                this.kill();
            });
        server.stdout?.setEncoding('utf-8');
        server.stderr?.setEncoding('utf-8');
        await new Promise<void>((resolve) => {
            server.stdout?.on('data', (data: string) => {
                if (data.includes('ready - started server')) {
                    resolve();
                }
            });
        });
    };
}

type RequestInit = Parameters<typeof fetch>[1];

const jsonResponse = async ({
    param,
    requestInit,
}: Readonly<{
    param: string;
    requestInit: RequestInit;
}>) => {
    const method = requestInit?.method;
    const url = `http://0.0.0.0:${serverConfig.port}/api/${param}`;
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

export { Server, jsonResponse };
