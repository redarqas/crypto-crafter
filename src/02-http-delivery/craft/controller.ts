
import { NextFunction, Request, Response, Router } from 'express';
import { Controler } from "../controller"


class CraftControler implements Controler {
    private _router = Router();

    routes(): Router {
        return this._router
    }

    //TODO, IOC happens here
}

