import express from 'express';
import { getSpecifiedResponse, getUnspecifiedResponse } from './util/portfolio';
import emailResponse from './util/contact';
import path from 'path';

const { static: expressStatic, json, urlencoded } = express;
const app = express();
const port = process.env.PORT || 3000;

app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));
app.listen(port, () => console.log(`Express listening at port ${port}`));

app.get('/api/portfolio', async (req, res) => {
    if (req.method === 'GET') {
        const page = req.query.page;
        const language = req.query.language;
        res.status(200).json(
            typeof page === 'string' && typeof language === 'string'
                ? getSpecifiedResponse(page, language)
                : getUnspecifiedResponse()
        );
    } else {
        throw new Error('Only accept GET request');
    }
});

app.post('/api/contact', async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        res.status(200).json(
            await emailResponse({
                name,
                email,
                message,
            })
        );
    } else {
        throw new Error('Only accept POST request');
    }
});

const build = '../frontend/build';
app.use(expressStatic(path.resolve(build)));
app.get('*', (_, res) => res.sendFile(path.resolve(build, 'index.html')));
