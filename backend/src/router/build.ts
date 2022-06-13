import express from 'express';
import path from 'path';

const buildRouter = (app: express.Application, build: string) => ({
    send: () =>
        app.get('*', (req, res) =>
            req.method !== 'GET'
                ? res.status(404).json('Only accept GET request')
                : res.sendFile(path.resolve(build, 'index.html'))
        ),
});

export default buildRouter;
