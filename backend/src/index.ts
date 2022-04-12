import express from 'express';
import path from 'path';
import cors from 'cors';
import contactRouter from './router/contact';
import portfolioRouter from './router/portfolio';
import buildRouter from './router/build';

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

    portfolioRouter(app).query();
    contactRouter(app).sendEmail();
    buildRouter(app, build).send();
})();
