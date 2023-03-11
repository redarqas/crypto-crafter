import { HttpApp } from "../02-delivery-http-express";
import { Config } from "./config";
import { DepedencyGraph as CraftDepedencyGraph } from "./solana/craft/dependency-graph";

export const Program = {
    make: function (config: Config): HttpApp {
        let solanaControler = CraftDepedencyGraph.make(config.solana)
        return new HttpApp([solanaControler])
    }
}
