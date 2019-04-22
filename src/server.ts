import express, { NextFunction, Response, Request } from "express";
import { HttpError } from "./HttpError";
import reposRouter from './routes/repos';
import nockGithub from '../tests/nock.github';

export const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).send();
    }
    next();
});
app.use ((req, res, next) => {
    if (!req.accepts('application/json')) {
        throw new HttpError('Not acceptable', 406);
    }
    next();
});

//routes
app.use('/repos', reposRouter);

//error handling
app.use ((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError && err.status != 500) {
        return res.status(err.status).json(err.toResponseObject());
    }
    let internalError = HttpError.internalErrorResponseObject();
    if (app.get('env') === 'development') {
        internalError.error = {
            name: err.name,
            message: err.message,
            stack: err.stack,
        };
    }
    res.status(500).json(internalError);
});

const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});
