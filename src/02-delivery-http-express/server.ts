import { HttpApp } from "./http-app";
import express from 'express';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';


function notFoundMiddleware(req: express.Request, res: express.Response) {
    res.status(404).json({ message: 'Route not found' });
}

function requestLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log('Request body:', req.body);
    next();
}

function responseLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode}`);
        console.log('Response body:', body);
        originalSend.call(res, body);
        return res;
    };
    next();
}


export const Server = {
    serve: function (app: HttpApp, port: number) {
        const serverBuilder = express();
        serverBuilder.use(express.json());
        serverBuilder.use(bodyParser.json());
        serverBuilder.use(requestLogger);
        serverBuilder.use(app.routes());
        serverBuilder.use(responseLogger);
        serverBuilder.use(notFoundMiddleware);
        console.log(listEndpoints(serverBuilder));
        serverBuilder.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });

    }
}



