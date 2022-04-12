import express from 'express';
import path from 'path';

const buildRouter = (app: express.Application, build: string) => ({
    send: () =>
        app.get('*', (_, res) =>
            res.sendFile(path.resolve(build, 'index.html'))
        ),
});

export default buildRouter;
