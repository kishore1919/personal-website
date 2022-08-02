import express from 'express';
import path from 'path';
import cors from 'cors';
import contactRouter from './router/contact';
import portfolioRouter from './router/portfolio';
import buildRouter from './router/build';
import { parseAsStringEnv } from 'esbuild-env-parsing';

const { static: expressStatic, json, urlencoded } = express;

(() => {
    const build = '../frontend/build';

    const app = (() => {
        const app = express();
        const port = process.env.PORT || 3000;

        const middleWares = [
            json({ limit: '10mb' }),
            urlencoded({ extended: true }),
            expressStatic(path.resolve(build)),
            cors({
                credentials: true,
                origin: parseAsStringEnv({
                    env: process.env.ORIGIN,
                    name: 'ORIGIN',
                }),
            }),
        ];

        app.use(middleWares);

        app.listen(port, () =>
            console.log(
                `🚀 Express listening at port ${port} 🚀 at time: ${new Date()}`
            )
        );
        return app;
    })();

    portfolioRouter(app).query();
    contactRouter(app).sendEmail();
    buildRouter(app, build).send();
})();
