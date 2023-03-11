import { Controller } from "src/02-delivery-http-express/controller";
import { Network } from "../model";
import { Service } from "./service";
import { Router, Request, Response } from "express";
import { SignInput } from "@org/core/sign";
import { Boundary, CombineInputDetails, Intent } from "@org/core/solana";
import { CombineInput } from "@org/core/combine";
import { BroadcastInput } from "@org/core/broadcast";


export class SolanaController implements Controller {
    private readonly service: Service;
    constructor(private readonly boundaries: Map<Network, Boundary>) {
        this.service = new Service(boundaries)
    }

    routes(): Router {
        const router = Router();

        router.post('/solana/:network/encode', async (req, res, next) => {
            let { network } = req.params;
            if (!(network in Network)) {
                return res.status(400).json({ error: 'Invalid network value' });
            }
            let input: Intent = req.body;
            await this.service.encode(network as Network, input)
                .then(encoded => res.status(200).json(encoded))
                .catch(next)
        });

        router.post('/solana/:network/sign', async (req: Request, res: Response, next) => {
            let { network } = req.params;
            if (!(network in Network)) {
                return res.status(400).json({ error: 'Invalid network value' });
            }
            let input: SignInput = req.body;
            await this.service.sign(network as Network, input)
                .then(encoded => res.status(200).json(encoded))
                .catch(next)
        });

        router.post('/solana/:network/combine', async (req: Request, res: Response, next) => {
            let { network } = req.params;
            if (!(network in Network)) {
                return res.status(400).json({ error: 'Invalid network value' });
            }
            let input: CombineInput<CombineInputDetails> = req.body;
            await this.service.combine(network as Network, input)
                .then(encoded => res.status(200).json(encoded))
                .catch(next)
        });

        router.post('/solana/:network/broadcast', async (req: Request, res: Response, next) => {
            let { network } = req.params;
            if (!(network in Network)) {
                return res.status(400).json({ error: 'Invalid network value' });
            }
            let input: BroadcastInput = req.body;
            await this.service.broadcast(network as Network, input)
                .then(encoded => res.status(200).json(encoded))
                .catch(next)
        });

        return router;
    }

}
