import { Controller } from "./controller";
import express from 'express';

export class HttpApp implements Controller {

    constructor(private readonly controllers: Controller[]) { }

    routes(): express.Router {
        const router = express.Router();
        for (const controller of this.controllers) {
            router.use(controller.routes());
        }
        return router;
    }
}