import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { Response } from '../endpoint';
import { parseAsStringEnv } from 'esbuild-env-parsing';

const initMiddleware =
    <T>(
        middleware: (
            req: NextApiRequest,
            res: NextApiResponse<T>,
            callback: (result: unknown) => void
        ) => void
    ) =>
    (req: NextApiRequest, res: NextApiResponse<T>) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: unknown) =>
                result instanceof Error ? reject(result) : resolve(result)
            );
        });

const cors = <T>() =>
    initMiddleware<Response<T>>(
        Cors({
            credentials: true,
            origin: parseAsStringEnv({
                env: process.env.ORIGIN,
                name: 'ORIGIN',
            }),
        })
    );

export default cors;
