import express from 'express';
import { getSpecifiedResponse, getUnspecifiedResponse } from './util/portfolio';
import emailResponse from './util/contact';
import path from 'path';
import cors from 'cors';

const { static: expressStatic, json, urlencoded } = express;

(() => {
    const build = '../frontend/build';

    const app = (() => {
        const app = express();
        const port = process.env.PORT || 3000;

        const middleWares = [
            json({ limit: '10mb' }),
            urlencoded({ extended: true }),
            cors({
                origin: process.env.PUBLIC_URL,
                credentials: true,
            }),
            expressStatic(path.resolve(build)),
        ];

        app.use(middleWares);

        app.listen(port, () =>
            console.log(
                `🚀 Express listening at port ${port} 🚀 at time: ${new Date()}`
            )
        );
        return app;
    })();

    app.get('/api/portfolio', async (req, res) => {
        if (req.method !== 'GET') {
            throw new Error('Only accept GET request');
        } else {
            const page = req.query.page;
            const language = req.query.language;
            res.status(200).json(
                typeof page === 'string' && typeof language === 'string'
                    ? await getSpecifiedResponse(page, language)
                    : await getUnspecifiedResponse()
            );
        }
    });

    app.post('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
            throw new Error('Only accept POST request');
        } else {
            const { name, email, message } = req.body;
            res.status(200).json(
                await emailResponse({
                    name,
                    email,
                    message,
                })
            );
        }
    });

    app.get('*', (_, res) => res.sendFile(path.resolve(build, 'index.html')));
})();
