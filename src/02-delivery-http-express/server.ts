import { HttpApp } from "./http-app";
import express from 'express';
import bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import winston from 'winston';
import expressWinston from 'express-winston';

const logger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        //winston.format.colorize(),
        winston.format.json()
    ),
    msg: "HTTP {{req.method}} {{req.url}}",
    colorize: false,
})

function notFoundMiddleware(req: express.Request, res: express.Response) {
    res.status(404).json({ message: 'Route not found' });
}

export const Server = {
    serve: function (app: HttpApp, port: number) {
        const serverBuilder = express();
        serverBuilder.use(express.json());
        serverBuilder.use(bodyParser.json());
        serverBuilder.use(logger);
        serverBuilder.use(app.routes());
        serverBuilder.use(notFoundMiddleware);
        console.log(listEndpoints(serverBuilder));
        serverBuilder.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });


    }
}
